---
title: 'More Synchronization Mechanisms'
date: '2019-02-14'
description: ''
published: true
tags: ['cpsc457']
---

## Condition Variables

Condition variables are another type of synchronization primitives. They're used together with mutexes. CVs are perfect for implementing critical sections containing loops waiting for some condition.

```c
mutex &m;

// Critical section is protected with mutex `m`
lock(m);
  while (!condition) { ; }
unlock(m);
```

The condition can only become true, if **another thread runs it's critical section**. A common pattern of using CVs:

- a thread enters it's critical section (locks a mutex)
- inside critical sections, thread needs to wait for some condition to become true
- but the condition can only become true by allowing some other thread to lock the mutex
- the thread has to wait and release the mutex

```c
mutex &m;

lock(m);
  while (!condition) { wait(cv) }
unlock(m);
```

Now, some other thread can lock the mutex and execute code that will satisfy the condition. Eventually, the other thread:

- locks the mutex (optional)
- changes some state that will satisfy the condition
- notifies the waiting thread via condition variable
- releases the mutex (optional)

```c
mutex &m;

lock(m);
  condition = TRUE;
  signal(cv);
unlock(m);
```

POSIX provides with `pthread_cond_t` condition variable with following functions:

- `pthread_cond_wait(&cond, &mutex);`. Atomically releases mutex and causes the calling thread to block, until some other thread calls `pthread_cond_signal(&cond)`. After returning, the mutex is automatically re-acquired, the condition is also must be checked due to _spurious wakeups_.
- `pthread_cond_signal(&cond);`. Wakes (signals) up thread waiting on `cond`. If no threads waiting on condition, the signal is lost. Must be followed by `pthread_mutex_unlock()` **if the blocked thread uses the same mutex**.

**Example**:

Thread 1 decrementing counter, but never below 0, thread 2 incrementing counter. This doesn't have deadlocks and no busy waiting.

```c
// Thread 1

while(true) {
  pthread_mutex_lock(&mutex);
  
  while (count == 0) {
    pthread_cond_wait(&cond, &mutex);
  }
  count--;

  pthread_mutex_unlock(&mutex);
}

// Thread 2

while(true) {
  pthread_mutex_lock(&mutex);

  counter++;
  
  pthread_cond_signal(&cond);
  pthread_mutex_unlock(&mutex);
}
```

## Semaphore

Semaphore is another synchronization primitive. A special integer variable used for signalling. The value could indicate number of available units of some resource. Semaphore supports three operations:

- **Initialization**: can be initialized with any value 0 ... `INT_MAX`
- **Decrement**: reduces semaphore value by 1, blocks the calling process if < 0; `down(s)` or `wait(s)`.
- **Increment**: increases value by 1 and possibly unblocks another blocked prosess; `up(s)` or `signal(s)`.

Semaphore can be used to protect critical sections, similar to a mutex:

```c
semaphore s;

wait(s);
// Critical section ...
signal(s);
```

Each semaphore maintains a queue of processes blocked on the semaphore. When a semaphore is locked by a thread, it can be unlocked by **any thread**, as opposed to a mutex, where locking/unlocking must be done by the same thread. That makes semaphores more suitable for producer-consumer problems.

### Binary semaphore

It is a special type of semaphore, with value `[0, 1]`.

```c
void wait(int &s) {
  while (s == 0) {}
  s = 0;
}

void signal(int &s) {
  s = 1;
}
```

Where the bodies are executed **atomically**. An **atomic operation** is an operation that _appears to execute instanteneously_, with respect to the rest of the system, e.g. it cannot be interrupted by signals, threads, interrupts.

### Counting semaphore

A **general semaphore**, represents an integer value `S`, where:

- `S > 0`: value of `S` is the number of processes/threads that can issue a wait and immediately continue to execute.
- `S = 0`: all resources are busy, the calling thread/process must wait
- `S < 0`: (not all implementations do this), `abs(S)` represents the number of processes/threads that are waiting to be unblocked.

```c
void wait(int &s) {
  while (s <= 0) {}
  s--;
}

void signal(int &s) {
  s++;
}
```

Where the functions are executed **atomically**.

## Semaphores vs. Condition Variables

- `signal()` compared to `cv_signal()`:
  - `cv_signal()` is lost, if no thread is waiting.
  - `signal()` increments the semaphore always, and possibly wakes up a thread.
- `wait()` compared to `cv_wait`:
  - `cv_wait()` does not check the condition, always blocks.
  - `wait()` checks the value of the semaphore and may or may no block.

---

**Possible errors**

You need to be careful with order in which `signal` and `wait` are called.

```c
/*
 * The following will violate mutual exclusivity
 */
signal(s);
// Critical section ...
wait(s);

/*
 * This will lead to deadlock
 */
lock(mutex);
// Critical section ...
lock(mutex);
```