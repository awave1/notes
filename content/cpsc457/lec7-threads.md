---
title: 'Threads'
date: '2019-02-05'
description: ''
published: false
tags: ['cpsc457']
---

In many ways threads are similar to processes. Both can be used to write applications that need some parallelism. However, min differences are: threads are more efficient, threads are more complicated to program correctly.

Informally, a thread is "a process within a process", or "mini process". A process can have multiple threads, and a thread is always associated with a process. All threads within one process share the resources of the process. A process is like a container for all its threads. All threads are scheduled independently.

## Process vs Thread

Both processes and threads can be used to write concurrent applications, but there are important differences

- processes are independent and self contained
- threads exists as a subset of process
- threads belonging to the same process share many/most resources with each other
- processes interact only through OS mechanisms (IPC = interprocess communication)
- threads have more options for communication
- processes have easier access to built-in OS mechanisms, but they are usually less efficient than threads

## Common thread scenarios

- **pipeline**
  - a task is broken into a series of stages
  - each stage handled by a different thread
- **manager/worker**
  - one manager thread assigns work to worker threads
  - manager thread handles all I/O
  - worker threads can be static or dynamic
- **peer**
  - all threads work on the same or different tasks in parallel

### Thread pool

**Thread pool** is a software design pattern. Program creates and maintained a pool of worker threads. Pool size can be tuned, e.g. to the available computing resources. When program needs a thread, it takes one out of the pool.

<!-- TODO: finish -->

### Thread libraries

#### POSIX threads (aka pthreads)

To use POSIX threads:

- `#include <pthread.h>`
- compile with `gcc -lpthread`

pthread functions:

- `pthread_create(thread, attr, start_routine, arg)` starts a thread, similar to `fork()`
- `pthread_exit(status)` terminates the current thread, similar to `exit()` or you can return from `start_routine`
- `pthread_join(thread, *status)` blocks the main, calling, thread until the specified thread terminates, similar to `wait()`
- `pthread_attr_init(attr)` and `pthread_attr_destroy(attr)`
  - initializes/destroys thread attributes
  - these can be tuned with `pthread_attr_set*()` functions
