---
title: 'CPU Scheduling'
date: '2019-03-05'
description: ''
published: false
tags: ['cpsc457']
---

Recall multiprogramming:

- Objective is to maximize CPU utilization by having a process running at all time
- Several processes are kept in memory at one time
- A process runs until it must wait
- Instead of having CPU sit idle, the OS takes the CPU away from the waiting and gives it to another process that is ready to run

The software that decides which process runs next is called a **scheduler**. Scheduler is usually a part of a kernel and it is an implementation of some **scheduling algorithm**.

## Process behaviour

Most processes alternate bursts of CPU activity with bursts of I/O activity. **CPU-bound** (or compute-bound) processes - have long CPU bursts and infrequent I/O waits. **I/O bound** processes - have short CPU burst and frequent I/O waits.

![CPU-bound vs I/O bound](lec12-bound.png)

As CPUs get faster, processes tent to get more I/O bound. It takes quite a few I/O bound processes to keep the CPU fully occupied.

## When to schedule

<!-- TODO -->

## Preemptive vs non-preemptive CPU scheduling

- <mark><b>Non-preemptive</b></mark> - Context switch happens only voluntarily
  - Multitasking is possible, but only through cooperation
  - Process runs until it does a blocking syscall (e.g. I/O), terminates, or voluntarily yields CPU
- <mark><b>Preemptive</b></mark> - Context switch can happen without cooperation
  - Usually as a direct or indirect result of some event, but not limited to clock interrupt, e.g. new job is added, existing process is unblocked
  - preemptive is often (mis)used to mean preemptive time-sharing
- <mark><b>Preemptive time-sharing</b></mark> - Special case of preemptive
  - TODO

## Categories of scheduling algorithms

<!-- TODO -->

### Scheduling metrics

- **Arrival time**: the time a process arrives
- **Start time**: the time process first gets to run on CPU
  - different from arrival time for batch systems, identical to arrival on interactive systems
- **Finish time**: when the process is done (time of the last instruction)
- **Response time**: how long before you get first feedback, often response = start - arrival
- **Turnaround time**: time from arrival to finish, runaround = finish - arrival
- **CPU time**: how much time the process spent on CPU
- **Waiting time**: total time spent in waiting queue, waiting = turnaround = CPU - I/O

Overall statistics:

- **average turnaround time, average wait time**...
- **throughput** - number of jobs finished per unit of time

**Goals of scheduling algorithms**:

- All systems
  - **fairness**: giving each process a fair share of the CPU
  - **policy/priority enforcement**:
  - **balance**:
- Batch systems
- Interactive systems
- Real systems

---

## First-come-first-served (FCFS) scheduling

<!-- TODO -->

**Gantt chart**: used to visualize scheduling of 5 processes

List of processes (for simplicity, assume no I/O activity):

| Process | Arrival | Burst |
| ------- | ------- | ----- |
| P1      | 0       | 6     |
| P2      | 0       | 6     |
| P3      | 1       | 3     |
| P4      | 2       | 8     |
| P5      | 3       | 2     |

Gantt chart:

```mermaid-svg
gantt
    title FCFS Scheduling
    dateFormat  DD-MM-YYYY
    section CPU
    P1: p1, 6d
    P2: p2, after p1, 6d
    P3: p3, after p2, 3d
    P4: p4, after p3, 8d
    P5: p5, after p4, 2d
```

**Simulating scheduling**:

<!-- TODO -->

**Calculating statistics**:

<!-- TODO -->

---

### Convoy Effect

Big disadvantage of FCFS is the **convoy effect**. Scenario: one CPU-bound process + many I/O bound processes. Result: the CPU-bound process will tie up the CPU, making the I/O bound processes run for much longer.

**Example**:

- Single CPU-bound process $A$, with 1s long CPU burst cycles
- Many I/O bound processes $B_i$, with each needing 1000 I/O operations, each $\frac{1}{1000}s$ long

<!-- TODO -->

## Round-robin scheduling (RR)

**Round robin** scheduler is a preemptive version of the FCFS scheduler, where each process is assigned a time interval, called a **time slice** or a **quantum**. If the process exceeds the quantum, the process is preempted (context switch), and CPU is given to the next process in ready queue. Preempted process goes at the back of the ready queue.

**Gantt chart**:

Using a quantum = 3msec

| Process | Arrival | Burst | Start | Finish | Turnaround | Waiting |
| ------- | ------- | ----- | ----- | ------ | ---------- | ------- |
| P1      | 0       | 6     |       |        |            |         |
| P2      | 0       | 6     |       |        |            |         |
| P3      | 1       | 3     |       |        |            |         |
| P4      | 2       | 8     |       |        |            |         |
| P5      | 3       | 2     |       |        |            |         |

```mermaid-svg

```
