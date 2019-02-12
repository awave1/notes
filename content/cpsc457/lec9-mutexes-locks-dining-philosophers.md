---
title: 'Dining Philosophers, Locks, Mutexes'
date: '2019-02-12'
description: ''
published: true
tags: ['cpsc457', 'multithreading', 'concurrency']
---

## 'Dining Philosophers' Problem

![Philosophers](lec9-dining-philosophers.png)

There are 5 philosophers sitting around a table. Philosophers want to do 2 things, forever:

- eat, and then
- think

There are 5 bowls of food, one for each philosophers & 5 forks placed between bowls. Before eating, a philosopher must grab two forks, immediately to the left & right. Philosopher then eats for a short time. When done eating, the philosopher puts down the forks in their original positions. Philosopher then thinks for a short time.

**Software scenario**:

- 5 processes/threads, each needs exclusive access to two resources to proceed.

How to allocate resources so that all processes/threads get to execute? What is the **best** algorithm for threads/processes to follow?

Assuming each philosopher eats & thinks for the exact same amount of time, optimal schedule:

```
repeat:
  1 & 3 eat
  2 & 4 eat
  3 & 5 eat
  4 & 1 eat
  5 & 2 eat
```

> There is no solution for every case.

---

**Attempt 1**:

Assuming that philosophers are "perfectly synchronized". Each philosopher follows these steps:

```
repeat forever:
  grab left fork
  grab right fork
  eat
  put forks back
  think
```

This would lead to a <mark>**deadlock**</mark>:

- assuming all philosophers are reasonably synchronized
- each philosopher will end up grabbing the left fork
- each philosopher will be stuck trying to grab the right fork
- nobody gets to eat at all

**Attempt 2**:

```
repeat forever:
  repeat:
    try to grab left fork
    try to grab right fork
    if both forks grabbed:
      break
    else:
      put any grabbed forks back and take a short nap
  eat
  put forks back
  think
```

This would reach <mark>**livelock**</mark>:

- assuming they are all synchronized
- all philosophers will indefinitely switch switch between napping and attempting to eat
- nobody will eat - form of **starvation**

**Attempt 3**:

Same as before, but there is one pink hat that one philosopher is wearing

```
repeat forever:
  wait for hat
  grab forks, eat, put forks back
  give hat to someone else
  think
```

It would work, but:
- only one process get to eat
- but with 5 forks, 2 philosophers could be eating at the same time
- it defeats the purpose of multithreading (no parallelism of eating); not optimal use of resources
- called arbitrator solution

**Attempt 4**:

```
while true:
  repeat
    try to grab left fork
    try to grab right fork
    if both forks grabbed:
      break
    else:
      put any grabbed forks back
      take a short **RANDOM** nap
  eat
  put forks back
  think
```

We introduce a random **timeout** mechanism for preventing deadlocks. Likely to work, often used in real world, for example in networking. However, there is still a small chance for starvation:

- if sleep is the same for all philosophers, then no one gets to eat
- in some cases some philosophers might never get to eat, or some philosophers will get to eat less often than the others - *fairness problem*

**Attempt 5**:

- Label the forks with numbers: 1, ..., 5
- Each philosopher:
  - picks up the fork with the smallest number first, then the larger number second
  - if unable to pick up both forks, put a claimed fork down and take a short nap

This is a **resource hierarchy** solution - by establishing a **partial order** on resources. Starvation is still possible. Also not always practical for large/dynamic number of resources.

---

**Naive algorithm implementation**:

Even trying to implement a naive solution presents problems. Consider algorithm for #1:

```c
/* 
  Utencil state: 
    true = available
    false = unavailable
*/
bool forks[5];

while (true) {
  sleep(s);                          // think for s seconds
  while (!forks[i] || forks[i + 1]); // i + 1 % 5 arithmetic
  forks[i] = false;
  forks[i + 1] = false;
  sleep(m);                          // eat for m seconds
  forks[i] = true;
  forks[i + 1] = true;
}
```

Depending on the execution order (e.g. multicore machines, or timing of context switches):

- both philosophers could start eating at the same time
- i.e. both processes could enter the critical region

In that code, the shared resource is the global variable `forks[]`. The critical sections are:

```c{10-12,14-15}
/* 
  Utencil state: 
    true = available
    false = unavailable
*/
bool forks[5];

while (true) {
  sleep(s);
  while (!forks[i] || forks[i + 1]); // critical section
  forks[i] = false;
  forks[i + 1] = false;
  sleep(m);                          // critical section
  forks[i] = true;
  forks[i + 1] = true;
}
```

---

## Mutex (aka Lock)

**Mutex** is a synchronization mechanism used for ensuring **exclusive access** to a resource in concurrent programs. Think of mutex as a special boolean type that can represent a lock:

- `true` $\to$ locked
- `false` $\to$ unlocked

We can set it to `true` or `false` just like a regular boolean variable. But, if the lock is already locked, and some thread tries to also lock it, then the calling thread will be automatically suspended until whoever locked the lock, unlocks it.

```c
mutex lock;

// Will block if already TRUE
lock = TRUE;

/*
 Critical section

 it is protected by the mutex lock
*/

// May unblock some other thread
lock = FALSE;
```

Mutex is often implemented as an object with two possible states: *locked* and *unlocked*. It implements two operations `lock()` and `unlock()`. If multiple threads call `lock()` simultaneously, only one will proceed, the others will block. Therefore, only the thread *that locks* the mutes can *unlock it*.

A waiting queue is used to keep track of all threads waiting on the mutex to be unlocked. Once the mutex is unlocked, one of the blocked threads will be unlocked. *Note*: which one thread gets unlocked is usually not predictable. It can be implemented in software via busy waiting, but usually supported by hardware + OS. Portable libraries often try to use H/W mutex but are able to fall back to software.

### Mutex in pthread

| API                       | Description                                  |
|---------------------------|----------------------------------------------|
| `pthread_mutex_init()`    | create a mutex                               |
| `pthread_mutex_destroy()` | destroy a mutex                              |
| `pthread_mutex_lock()`    | lock a mutex, block if already locked        |
| `pthread_mutex_trylock()` | lock a mutex, or fail (non-blocking version) |
| `pthread_mutex_unlock()`  | unlock a mutex                               |

**Counter with mutex**:

```c
#include <pthread.h>

// initialized in main() with pthread_mutex_init()
pthread_mutex_t count_mutex;

// initialized in main() with counter = 0
int counter;

void incr() {
  // acquire the lock
  pthread_mutex_lock(&count_mutex);

  int x = counter;
  x++;
  counter = x;

  // release the lock
  pthread_mutex_unlock(&count_mutex);
}
```

**Dining philosopher with mutex**:

```c{7-11,15-18}{numberLines: true}
pthread_mutex_t mutex;
bool forks[5];

while (true) {
  sleep(s);

  pthread_mutex_lock(&mutex);
  while (!forks[i] || forks[i + 1]);
  forks[i] = false;
  forks[i + 1] = false;
  pthread_mutex_unlock(&mutex);

  sleep(m);

  pthread_mutex_lock(&mutex);
  forks[i] = true;
  forks[i + 1] = true;
  pthread_mutex_unlock(&mutex);
}
```

However, this will not work, due to **deadlock**. `while (!forks[i] || forks[i + 1]);` will result in an infinite loop. It can also be argued that this is a **livelock**.

---

## Summary

- **Critical section** - part of the program where a shared resource is accessed & may cause trouble
- **Mutual exclusion** - ensuring only one process accesses a resource at a time, e.g. only one process can enter critical section at a time
- **Mutex/lock** - mechanism to achieve mutual exclusion, two states + queue
- **Deadlock** - a state where each process/thread is waiting on another to release a lock $\to$ no progress is made
- **Livelock** - states of the process change, but none are progressing
- **Starvation** - one process does not get to run at all
- **Unfairness** - not all processes get equal opportunity to progress
- There are some thread issues:
  - `fork()`, cancellation, signals, thread pool
  - race conditions
    - critical section, mutual exclusion
  - dining philosophers problem
  - mutex
  - deadlock, livelock, starvation, fairness
