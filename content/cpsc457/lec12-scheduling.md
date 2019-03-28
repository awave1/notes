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

<!-- TODO -->

```mermaid-svg

```

(Context switches happen when number changes)

**Time Slice**

Performance of RR depends on the size of the time quantum $Q$ and the time required for a context switch $S$. For example, if $S = 1ms$, $Q = 4ms$, then CPU will spend $1/(4 + 1) = 20\%$ of its time on useless tasks. Very small $Q$ implies heavy overhead, but highly responsive system. Very large $Q$ implies minimum overhead, but a non-responsive system. So $Q$ should be large compared to $S$, but not too large:

- Good rule of thumb is that 80% of the CPU bursts should be shorter than the time quantum.
- Quantum of around 20-100ms is often a reasonable compromise.

## Shortest-job-first scheduling (SJF)

**Shortest-job-first scheduler** is non-preemptive scheduling algorithm. It's applicable to batch systems, where job length (expected execution time) is known in advance. It could also be modified to be preemptive (e.g. preemption when new job arrives, or existing one unblocks).

When the CPU is available, it is assigned to the shortest job. Shortest job - shortest _execution time_. Ties are resolved using FCFS. SJF is similar to FCFS, but ready queue is sorted based on submitted estimate of execution time.

**SJF scheduling**

<!-- TODO -->

| Process | Arrival | Burst | Start | Finish | Turnaround | Waiting |
| ------- | ------- | ----- | ----- | ------ | ---------- | ------- |
| P1      | 0       | 6     | 0     | 6      | 6          | 0       |
| P2      | 0       | 6     | 11    | 17     | 17         | 11      |
| P3      | 1       | 3     | 8     | 11     | 10         | 7       |
| P4      | 2       | 8     | 17    | 25     | 23         | 15      |
| P5      | 3       | 2     | 6     | 8      | 5          | 3       |

```mermaid-svg
gantt
    title SJF Scheduling
    dateFormat  DD-MM-YYYY
    section CPU
```

---

**Advantages**

- minimum number of context switches
- optimal turnaround time if all jobs arrive simultaneously
  - minimizes average waiting time

**Disadvantages**

- requires advance knowledge of how long a job will execute
- has a potential for job starvation
  - long programs will never get to run if short programs are continuously added
  - can be solved by **aging** (increasing a job priority based on how long it has waited) and then sorting ready queue based on priority

## Shortest-remaining-time-next scheduling (SRTN)

**Shortest-remaining-time-next** is _preemptive_ version of SJF. Next job is picked based on remaining time: `remaining = (expected execution) - (time spent on CPU)`. **SRTN** is similar to RR, but ready queue is a priority queue, sorted based on remaining time. Preemption happens as a result of adding a job.

**Scheduling**

<!-- TODO -->

| Process | Arrival | Burst | Start | Finish | Turnaround | Waiting |
| ------- | ------- | ----- | ----- | ------ | ---------- | ------- |
| P1      | 0       | 6     | 0     | 6      | 6          | 0       |
| P2      | 0       | 6     | 11    | 17     | 17         | 11      |
| P3      | 1       | 3     | 8     | 11     | 10         | 7       |
| P4      | 2       | 8     | 17    | 25     | 23         | 15      |
| P5      | 3       | 2     | 6     | 8      | 5          | 3       |

```mermaid-svg
gantt
    title SJF Scheduling
    dateFormat  DD-MM-YYYY
    section CPU
```

---

**Advantages**

- **optimal turnaround time** even if jobs don't arrive at the same time

**Disadvantages**

- requires knowledge of how long a job will execute
- has a potential for job starvation
- needs to consider cost of context switch

## Multilevel queues

Preemptive time-sharing scheduling algorithm that supports process priorities.

<!-- TODO -->
