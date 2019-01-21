---
title: 'Hardware, Cache, Booting, Kernel'
date: '2019-01-17'
description: ''
published: true
tags: ['cpsc457']
---

## Hardware Review

A typical computer contains of several components that are interconnected through a bus.

### CPU

CPU is the "brain" of the computer. It contains different types of registers (registers - very fast memory):

- On-board registers for faster computation.
  - Instead of accessing memory for every instruction
  - Accessing information in registers is faster than memory
- General purpose registers
  - Data & address

<!--TODO: Finish-->

A simple CPU cycle:

1. **Fetch** an instruction
2. **Decode** it to determine its type and operands
3. **Execute** it

Steps are repeated for the next instruction, until program finishes.

However, there is a performance issue: fetching from memory takes longer than executing an instruction. A solution would be to **pipeline** the opertaions:

#### CPU Pipelining

- while executing instruction `N`,
- the CPU could be simultaneously decoding instruction `N + 1`,
- and at the same time also fetch instruction `N + 2`

Therefore fetch-execute cycle can be done in parallel. Three stage pipeline:

```mermaid-svg
graph LR
  A[Fetch Unit]-->B[Decode Unit]
  B-->C[Execute Unit]
```

<!--TODO: Finish-->

<!--parallelized app will be as fast as slowest link of the pipeline-->

### Memory

Ideally, memory should be (i) fast, (ii) large and (iii) cheap. In practice, we can get 2 out of 3, but not all three.

Main memory is RAM (Random Access Memory). Memory is a accessible big array of bytes. Memory operations:

- **load**: moves a word from memory to a CPU register
- **store**: moves a content of a register to memory

Both load and store operations are slow compared to the speed of CPU.

## Caching

CPU caching is the process of most heavily used data from memory is kept in a high-speed cache inside or very close to the CPU. When CPU needs to get data from memory, it first checks the cache:

- **cache hit**: the data needed by the CPU is in the cache
      <!--or-->
- **cache miss**: CPU needs to fetch the data from main memory

CPU consists of multiple levels of caches:

- L1 cache (16kB): inside the CPU, usually feeds decoded instructions into CPU execution engine
- L2 cache (xMB): stores recently used memory words, slower than L1
- L3 and L4 are becoming common

<!--core is like a mini cpu-->

### Caching on multicore CPUs

<!-- TODO: image -->
<!--1. can process bigger chunks, bigger parts of the memory because L2 will be bigger-->
Caches can be shared and there are multiple ways of sharing cache.

---

The goal of caching is to increase performance of slower memory/device by adding a small amount of fast memory (cache). Ways of improving read performance:

- keep copy of information obtained from slow storage in cache
- check cache on next read

Improving write performance:

- write info to fast storage, and eventually write to slow storage

Caching is a very useful concept. There are many uses: disk cache, DNS, databases.

Cache storage is fast but expensive, so it's usually much smaller than the slow storage. Some general caching issues:

- when to put a new item into the cache
- which cache line to put the new item in
- which item to remove from the cache when it's full
- where to put a newly evicted item in the larger memory
- multiple cache synchronization
- how long is the data in cache valid

### Memoization

It's a similar concept to caching. It can be used to speed up function that are slow to compute. Optimization technique used to speed up programs, by storing results of expensive computations.

Unoptimized function:

```python
def fib_slow(n):
  if n < 2:
    return n
  else:
    return fib_slow(n - 1) + fib_slow(n - 2)
```

Optimized function:

```python
cache = {}
def fib_fast(n):
  if n not in cache.keys():
    if n < 2:
      cache[n] = n
    else:
      cache[n] = fib_fast(n - 1) + fib_fast(n - 2)

  return cache[n]
```

## Hardware I/O

I/O devices usually implemented in two parts: device controller and the device.

A **device controller** is a chip or a set of chips that physically control the device. Controlling the device is complicated, and CPU could be doing other things, so the controller presents a simpler interface to the OS. A controller presents a unified interface of devices that it can support to the OS.

A **device** connects to the computer through the controller. It follows some agreed standards for communication.

A **device driver** is the software abstraction of the controller, the software that talks to a controller, issues commands and accepts responses. Usually is written by the manufacturer. Driver is needed so the OS knows how to communicate with the device.

## Buses

**Bus** is a communication system for transferring data between different computer components.

## Booting Process

When the computer is booted, the BIOS is started. BIOS (Basic Input Output Program) is a program stored on motherboard.

## Kernel

The central part, or the heart of the OS. Kernel is running at all times on the computer. It is located and started by a bootstrap program (bootloader). Kernel provides services to applications via system calls and handles all interrupts. Much of kernel is a set of routines, some invoked in response to interrupts, others because of application using system calls, etc.

### Kernel mode

<!--not all kernel runs in kernel mode-->

When CPU is in kernel mode, every instruction are executed.

### User mode

<!--true-->
<!--true-->
<!--most run in kernel, but some are in user mode-->
