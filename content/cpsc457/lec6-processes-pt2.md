---
title: 'Processes, pt2'
date: '2019-01-31'
description: ''
published: false
tags: ['cpsc457']
---

## CPU utilization

Example: OS is running 4 processes, P1, P2, P3 and P4

- P1 spends 40% of the time waiting on I/O (idle bound)
- P2 spends 20% of the time waiting on I/O
- P3 spends 50% of the time waiting on I/O
- P4 spends 90% of the time waiting on I/O (cpu bound)

If there is only one CPU, what will be CPU's utilization? i.e. what percentage of the time is the CPU going to be running 'something'?

Answer: CPU utilization = probability that at least one of the processes is *not* waiting on I/O = 1 - (probability that all processes are waiting on I/O) = $1 - (0.4 \cdot 0.2 \cdot 0.5 \cdot 0.9) = 0.964 = 96.4\%$.

Assume $N$ similar processes. Each process spends the same fraction $P$ of its time waiting on I/O, then:

$$
\text{CPU Utilization} = 1 - P^{N}
$$

CPU utilization as a function of the number of processes in memory:

![CPU utilization as a function of the number of processes in memory](lec6-cpu-util-graph.png)

## Resource allocation

There are several options for allocating resources for a new process:

- child obtains resources directly from the OS
  - most common and easiest to implement, most OS do this
  - **drawback**: something like 'for bomb' will destroy the system
- child obtains subset of parent's resources
  - parent decides to give up some of its resources so that a child can use them
- parent shares some/all resources with the child

### Common parent-child execution scenarios

When child process is created, parent process usually does one of three things:

1. The parent waits until the child process **is finished**
    - often used when child executes another program, e.g. `fork()`/`exec()`, or `system()`
    ```python
    pid = fork()
    if pid > 0:
      wait()
    ```
2. The parent continues to execute concurrently and independently of the child process
    - e.g. autosave feature
    ```python
    pid = fork()
    if pid > 0:
      do_something()
      exit()
    ```
3. The parent continues to execute concurrently, but synchronizes with the child
    - can be complicated to synchronize
    ```python
    pid = fork()
    if pid > 0:
      do_something_1()
      synchronize()
      do_something_2()
      synchronize()
      # ...
    ```

## Process termination

Typical conditions which terminate a process:

- **voluntary**
  - *normal exit* - application decides it's done, or user closes the app
    - `exit()` call
  - *error exit* - application detects an error, optionally notify the user
    - `exit()` call
- **involuntary**:
  - *fatal error*
    - usually due to a bug in the program, detected by OS
    - e.g. accessing invalid memory, div by zero
  - *involuntary* - killed by another process
    - parent, or another process calls `kill()`
    - e.g. during shutdown, pressing `<ctrl-c>` in terminal, closing window

Parent may terminate its children for different reasons, for example:

- the child has exceeded its usage of some of the resources
- the task assigned to the child is no longer required
- the parent needs/wants to exit and wants to clean up first

In Unix, when a parent process is terminated, the child processes may be terminated, or assigned to the grandparent process, or to the `init` process. Process hierarchy is always maintained. Default behavior on Linux is to **reparent** the child process to the `init` process. This can be changed (e.g. to kill children, reparent to some other process). Using `prctl()` system call, the behavior can be changed.

When terminating a process, OS must free all related resources, e.g. free memory used by the process, delete PCB, delete process from process table, kill children or assign them to a new parent, close files, close open network connections.

## Process scheduling

Part of multitasking is deciding which process gets the CPU next. Typical objective is to maximize CPU utilization. **Process scheduler** is a kernel routine/algorithm that selects an available process to execute on the CPU. Process is selected from a *ready queue*. OS maintains different scheduling queues:

- job queue: all programs waiting to run, usually found in batch systems
  - e.g. priority queue
- ready queue: all processes that are ready to execute their next instruction
  - e.g. linked list, implemented via pointers
- device queue: processes waiting for a particular device
  - each device has its own queue

### Process states

There are 3 process states:

- **running** - actually running on the CPU
- **blocked** - waiting for some event to occur, e.g. I/O
- **ready** - the process is ready to execute on CPU

![Process states](lec6-process-fsm.png)

Only 4 transitions are possible:

- ready $\to$ running
- running $\to$ ready
- running $\to$ blocked
- blocked $\to$ ready

### Context switching

### Unix signals

A form of **interprocess communication** (IPC):

- It's a similar concept to interrupts on CPUs. Interrupts on the application level. If application sends a signal to another application, that process is interrupted.
- Asynchronous
- Very limited IPC - messages consist of only small set of predefined integers

A signal is used to notify a process that a particular event has occured. One process (or thread) sends a signal, another process (or thread) received it. It is possible for a process to signal itself. Signal lifetime:

- Signal is **generated/sent**, usually as a consequence of some event
- Signal is **delivered/pending** to a process
- Delivered signal is **handled** by the process via a **signal handler**.
- Some signals can be **ignored** - signal delivered to a process that ignores it, is lost
- Some signals can be **blocked** - signal stays pending until it is unblocked

#### Generating signals

