---
title: 'More Synchronization Mechanisms'
date: '2019-02-26'
description: ''
published: true
tags: ['cpsc457']
---

## Monitors

A **monitor** is a high level construct compared to mutexes and semaphores. A monitor is a **programming language construct** that controls access to shared data. Synchronization code automatically added by a compiler, then enforced at runtime. e.g. in Java, implemented using `synchronized() {...}`.

A monitor is a module that encapsulates:

- Shared data structure
- Methods that operate on these shared data structures
- Synchronization is done between concurrent method invocations

Data in monitors can only be accessed via the published methods. A properly implemented monitor is virtually impossible to use in a wrong way.

Another way to look at a monitor is:

- a thread safe class/object
- automatic mutual exclusion on every method (via built-in mutex)
- can include condition variables for signalling conditions

<!-- todo: finish -->

## Spinlocks

Spinlock is another synchronization mechanism. It's lightweight alternative to mutex. Implemented using busy waiting loops. Usually implemented in assembly, using **atomic operations**. It's very efficient if you know that wait time will be very short, because no re-scheduling required (only makes sense on multicore CPUs).

> Atomic operation - an operation that appears to execute instantaneously with respect to the rest of the system, i.e. it cannot be _interrupted_ by anything else

```c
spinlock s;

spin_lock(&s);
/* short critical section */
spin_unlock(&s);
```

## Other synchronization mechanisms

**Event flags**

A memory word with N bits. Different events may be associated with different bits in a flag. Available operations:

- Set flag
- Clear flag
- Wait for 1 flag
- Wait for any flag
- Wait for all flags

**Message passing**

Processes send each other **messages**. Messages can contain arbitrary data, delivered messages can be up in **mailboxes**. Processes can check contents of mailboxes, take messages out, or wait for messages. Common implementation is MPI (message passing interface). It's very popular in HPC (high performance computers).

Processes send each other **messages**. Messages can contain arbitrary data. Delivered messages can be queues up in **mailboxes**. Process can check contents of mailboxes, take messages out, or wait for messages. Common implementation is MPI (Message passing interface).

## Priority inversion

<!-- TODO: Finish all before synch hardware -->

## Synchronization hardware

Race conditions are prevented by ensuring that critical sections are protected by locks:

- A process must acquire a lock before entering a CS
- A process releases the lock when it exits the CS

Many modern systems provide special hardware instructions that implement useful atomic operations.

### Compare-and-swap (CAS)

Atomic operation used for synchronization. It's supported by most CPUs, e.g. `cmpxchg` on Intel. General algorithm for compare and swap:

- Compare contents of memory to `val1`
- If they are the same, change the memory to `val2`
- Return the old contents of memory

Operation must be atomic.

```c
int cas (int *mem, int val1, int val2) {
  int old = *mem;     //
  if (old == val1)    // Must be atomic! Can't implement it in c
    *mem = val2;      //
  return old;
}
```

Usage:

```c
int p = 0;

while (true) {
  while (cas(&p, 0, 1) == 1) { /* wait loop */ }
  // Critical section
  p = 0;
  // Non-critical section
}
```

**Compare-and-swap in GCC 4.4+**

`gcc` provides a number of atomic operations, including CAS:

- `type __sync_val_compare_and_swap(type *ptr, type oldval, type newval)`
  - atomic compare and swap
  - if the current value of `*ptr` is `oldval`, then write `newval` into `*ptr`
  - returns the original value of `*ptr`
- `bool __sync_bool_compare_and_swap(type *ptr, type oldval, type newval)`
  - same as above, but return `true` if `newval` was written

**Spinlock using compare-and-swap**:

<!-- TODO: Finish -->

### Test-and-set

A specialized version of compare-and-swap. Old hardware had test-and-set, newer hardware uses more generalized compare-and-swap. General algorithm:

- remember contents of memory
- set memory to true
- return the old contents of memory

```c
int tas(int *mem) {
  int old = *mem;  //
  *mem = true;     // atomic!
  return old;
}
```

Usage:

```c
int p = 0;
while (true) {
  while(tas(&p)) {  }
  // critical section
  p = 0;
  // non-critical section
}
```

### Swap

Another atomic operation that can be used for synchronization. General algorithm:

- atomically swap contents of two memory location

```c
void swap(int *a, int *b) {
  int tmr = *a; //
  *a = *b;      // atomic!
  *b = tmr;     //
}
```

Usage:

```c
int lock = 0;

while (1) {
  int key = true;
  while (key) {
    swap(&lock, &key);
  }
  // critical section
  lock = false;
  // non-critical section
}
```

---

### Bounded waiting with synchronization hardware

When used correctly, the atomic operations, such as compare-and-swap, test-and-set, swap can be used to achieve mutual exclusion, progress and speed. But they are too low level to achieve bounded waiting, especially for more than 2 processes. Bounded waiting can be 'added', e.g. via two shared variables:

```c
// a CS lock
int lock;
// which processes want to enter CS
int waiting[n];
```

Example:

```c
// TODO
```

---

Synchronization hardware can be used to implement mutual exclusion, progress, speed and even bounded waiting.

Drawbacks:

- busy-waiting (spinlocks)
- extra coding (e.g. to add bounded waiting)

Advantage:

- avoid system calls
- can be more efficient if expected wait time is short
- only makes sense on multi-CPU/core systems
