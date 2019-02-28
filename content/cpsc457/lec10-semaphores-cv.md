---
title: 'More Synchronization Mechanisms'
date: '2019-02-14'
description: ''
published: true
tags: ['cpsc457']
---

## Condition Variables

Condition variables are another type of synchronization primitives. They're used together with mutexes.

```c
lock(m);
  while (!condition) { ; }
unlock(m);
```

Where the condition can only become true if another thread runs it's critical section. A common pattern of using CVs:

- a thread enters it's critical section (locks a mutex)
- inside CS, thread needs to wait for some condition to become true
- but the condition can only become true by allowing some other thread to lock the mutex
- the thread has to wait and release the mutex

```c
lock(m);
  while (!condition) { wait(cv) }
unlock(m);
```

- now some other thread can lock the mutex and execute code that will satisfy the condition

Eventually, the other thread:

- locks the mutex (optional)
- changes some state that will satisfy the condition
- notifies the waiting thread via condition variable
- releases the mutex (optional)

```c
lock(m);
  condition = TRUE;
  signal(cv);
unlock(m);
```

## Semaphore

A special integer variable used for signalling. The value could indicate number of available units of some resource.
