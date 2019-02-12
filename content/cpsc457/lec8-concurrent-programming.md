---
title: 'Concurrent Programming'
date: '2019-02-07'
description: ''
published: false
tags: ['cpsc457']
---

## Threads and `fork()`

When `fork()` is called in a program with multiple threads. What happens is only the calling thread survives, other threads are not duplicated. This creates a problem if synchronization mechanisms used. It's possible to register a callback in case `fork()` is called using `pthread_atfork()`. However, generally **`fork()` should be avoided** in programs with multiple threads.

Some usages are sage: e.g.:

- `fork()` is immediately followed by `execve()` to execute external program
- `fork()` is executed before creating any threads

## Thread cancellation

Imagine a scenario when threads are used to parallelize database search. Multiple threads are searching different parts of the database. If one thread finds the result, how do we notify the other threads to stop searching?

There are two general approaches:

- Asynchronous cancellation
- Deferred cancellation (aka synchronous cancellation)

### Async cancellation

<!--async becuse there is no sync with thread that needs to be cancelled, as soon as the signal is received (so data might be missing)-->

One thread manually terminates the target thread using `pthread_kill(thread_id, SIGUSR1)` and then target is killed instantly.

Common problem is what happens to the data currently updated by the thread that is killed?

- Killed thread has no chance to clean up
- This can likely lead to leaving data in undefined state

Usually, it is better to use synchronous thread cancellation.

### Deferred / Synchronous Thread Cancellation

<!-- TODO: Finish -->

## Race Conditions

Race condition is a behavior where the output is dependent on the sequence of timing or other uncontrollable events (e.g. context switching, scheduling on multiple CPUs). Often a result of multiple processes/threads operating on a shared state/resource, e.g.:

- modifying shared memory
- reading/writing to files
- modifying filesystems
- reading/writing to databases

Let's take the following code for example

```c
// Global variable counter
int counter;

void incr() {
  // This function is assumes that this is atomic (not interfered by anyone else)
  int x = counter;
  x++;
  counter = x;
}

int main() {
  counter = 0;
  pthread_create(..., incr);
  pthread_create(..., incr);
  pthread_join(...);
  printf("%d\n", counter);
}
```

One possible **execution sequence**, leading to `counter = 2`

| **Thread 1**   | **Thread 2**   | **`counter`** |
|:--------------:|:--------------:|:-------------:|
|                |                | `0`           |
| `x = counter;` |                | `0`           |
| `x++;`         |                | `0`           |
| `counter = x;` |                | `1`           |
|                | `x = counter;` | `1`           |
|                | `x++;`         | `1`           |
|                | `counter = x;` | `2`           |

Another possible execution sequence leading to `counter = 1`

| **Thread 1**   | **Thread 2**   | **`counter`** |
|:--------------:|:--------------:|:-------------:|
|                |                | `0`           |
| `x = counter;` |                | `0`           |
|                | `x = counter;` | `0`           |
|                | `x++;`         | `0`           |
|                | `counter = x;` | `1`           |
| `x++;`         |                | `1`           |
| `counter = x;` |                | `1`           |

Debugging race conditions is hard, in some rare situations the output might be different, e.g. when system was less/more busy.

### Avoiding Race Conditions

We need to prevent more than one process/thread from accessing the shared resource at any given time. One approach is:

- identify **critical sections** in code where this could happen
- enforce **mutual exclusion** to make sure it does not happen

#### Critical Sections and Mutual Exclusion

<mark>Critical section/critical region</mark> is a part of the program that accesses the shared resource in a way that could lead to races or other undefined/unpredictable/unwanted behavior:

```c
int counter; // shared resource

/**
 * Critical section
 */
void incr() {
  int x = counter;
  x++;
  counter = x;
}
```

If we can arrange tasks such that no two processes or threads will ever be in their critical sections at the same time, we could avoid the race condition, therefore achieving <mark>mutual exclusion</mark>.

![Critical Sections and Mutual Exclusion](lec8-critical-sections-mutual-exclusion.png)

---

Requirements to avoid race conditions:

- No two processes may be simultaneously inside their critical sections
- No assumptions may be made about the speeds or the number of CPUs
- No process running outside its critical region may block other processes
- No process should have to wait forever to enter its critical section
  - a process should not remain in a critical section forever
