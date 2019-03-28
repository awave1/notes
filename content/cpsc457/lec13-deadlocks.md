---
title: 'Deadlocks'
date: '2019-03-12'
description: ''
published: false
tags: ['cpsc457']
---

**Definitions**:

A set of processes is deadlocked if:

- Each process in the set is waiting for an event, _and_
- All such events can be caused by another process in the set

Such event could be anything: resource becoming available, mutex/semaphore/spinlock being unlocked, message arriving.

---

## System model

System consists of processes and resources:

- $n$ processes: $P_1, P_2, \ldots, P_n$
- $m$ resource types: $R_1, R_2, \ldots, R_m$ (e.g. CPU, memory space, I/O devices)
- Each resource type $R_i$ has $W_i$ instances (e.g. 1 CPU, 5 disks, 3 printers)

Each process utilizes a resource in the same manner:

1. Process **requests** the resource - OS may block process
2. Process **uses** the resource - for a finite amount of time
3. Process **releases** the resource - may result in unblocking of related process(es)

## Deadlock - necessary conditions

- <mark><b>mutual exclusion condition</b></mark> - the involved resources must be unshareable (max. one process per resource)
- <mark><b>hold and wait condition</b></mark> - a process holding at least one resource is waiting to acquire additional resources
- <mark><b>no preemption condition</b></mark> - a resource can be released only by the process holding it (voluntarily)
- <mark><b>circular wait condition</b></mark> - there is an ordering of processes $\{P_1, P_2, \ldots, P_n\}$, such that $P_1$ waits for $P_2$, $P_2$ waits for $P_3$, $P_n$ waits for $P_1$, therefore there is a cycle

Conditions are also called **Coffman conditions**.

## Deadlock with mutex locks

Deadlocks can occur in many different ways, e.g. due to locking. For example, deadlock with 2 mutexes:

```c
// Thread 1
lock(&mutex1);
lock(&mutex2);
// Critical section
unlock(&mutex2);
unlock(&mutex1);
```

```c
// Thread 2
lock(&mutex2);
lock(&mutex1);
// Critical section
unlock(&mutex1);
unlock(&mutex2);
```

![Deadlock with 2 mutexes](lec13-deadlock2-mutexes.png)

All 4 necessary conditions are present: _mutual exclusion_, _hold and wait_, _no preemption_, _circular wait_.

<!-- TODO -->

## Safe, Unsafe, Deadlock State

- If a system in a **safe state**, then deadlocks are not possible, because they will be avoided by the system.
- If a system is in an **unsafe state**, then deadlocks are possible, but not guaranteed.
- Avoidance algorithm ensures that a system never enters an unsafe state, by rejecting/blocking some requests even if resources are available.

### Deadlock avoidance algorithms

For single instance per resource type, we use **resource-allocation graph algorithm**. For multiple instances per resource, we use **banker's algorithm**.

**Resource-allocation graph algorithm**

- **Claim edge** $P_i \to R_j$ indicates that process $P_j$ _may_ request resource $R_j$.
  - Represented by a dashed line.
  - This is a priori knowledge.
- Claim edge converts to **request edge** when a process actually requests a resource.
  - Represented by a solid line.
- Request edge converts to an **assignment edge** when the resource is allocated to the process.
  - Represented by a solid line, reversed direction.
- When a resource is released by a process, assignment edge converts to a claim edge.
  - Reverse direction & becomes dashed.
- Resources must be claimed **a priori** in the system.

**Algorithm steps**:

- suppose that process requests a resource
- the request can be granted only if allowing such request will not violate **safe state**
- we make sure that converting the request edge to an assignment edge does not result in **formation of a cycle**
- complexity: same as cycle-detection algorithm in a directed i.e. $O(|V| + |E|)$

**Banker's algorithm**

Deadlock avoidance algorithm, more general than resource-allocation graph algorithm, but also a bit slower. It works with multiple instances per resource type. Requirements:

- Each process must declare maximum resources at the beginning
- When a process requests a resource, it may have to wait (even if resource available)
- When a process gets all its resources, it must return them in a finite amount of time

**Data structures for the Banker's algorithm**:

Let `n` = number of processes, and `m` = number of resource types

- **Available** - vector of length `m`
  - `Available[j] = k` means there are `k` instances of resource type $R_j$ available
- **Max** - matrix `n x m`
  - `Max[i][j] = k` means that process $P_i$ may request at most `k` instances of resource type $R_j$
  - `Max[i]` represents i-th row of `Max`
- **Allocation** - matrix `n x m`
  - `Allocation[i][j] = k` means that process $P_i$ is currently allocated `k` instances of $R_j$
- **Need** - matrix `n x m`
  - `Need[i][j] = k` means that $P_i$ may need `k` more instances of $R_j$ to complete its task
- Note: `Need[i][j] = Max[i][j] - Allocation[i][j]`. Only 2 of Need/Max/Allocation are needed, the 3rd can be computed on the fly

Banker's algorithm tries to find whether there is an execution sequence that would finish all running processes, assuming worst case scenario - that each process requests its maximum declared allocation as the next step.

```
; Step 1
Initialize temporary vecors:
Work = Available                        ; vector copy
Finish[i] = false for i = 0, 1, n-1

; Step 2
Find an i such that:
  Finish[i] = false and Need[i] <= Work ; vector comparison

If no such i exists:
  goto step 4

; Step 3
Update Work and Finish:
  Work = Work + Allocation[i]
  Finish[i] = true
goto step 2

; Step 4
If Finish[i] == true for all i, return true ; system is in a safe state
else return false                           ; system is not in a safe state
```

**Complexity**: $O(n^2 * m)$
