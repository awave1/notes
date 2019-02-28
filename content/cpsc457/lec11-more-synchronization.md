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

**Message passing**

Processes send each other **messages**. Messages can contain arbitrary data. Delivered messages can be queues up in **mailboxes**. Process can check contents of mailboxes, take messages out, or wait for messages. Common implementation is MPI (Message passing interface).

## Priority inversion
