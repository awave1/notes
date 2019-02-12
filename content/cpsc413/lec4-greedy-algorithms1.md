---
title: 'Greedy Algorithms I'
date: '2019-02-10'
description: ''
published: false
tags: ['cpsc413']
---

An algorithm is is *greedy* if it builds up a solution in small steps, choosing a decision at each step myopically to optimize some underlying criterion. One can often design many different greedy algorithms for the same problem, each one locally, incrementally optimizing some measure on its way to a solution.

## Coin Changing

**Goal**: Given US currency denominations $\{1, 5, 10, 25, 100\}$, devise a method to pay amount to customer using fewest coins.

**Algorithm**: At each iteration, add coin of the largest value that does not take us past the amount to be paid.

```
cashiers-algorithm(x, ...cn):
  sort n coin denominations so that 0 < c1 < c2 < .. < cn
  S = {} # multiset of coins selected

  while x > 0:
    k = largest coin denomination ck such that ck <= x
    if no such k:
      return "no solution"
    else:
      x = x - ck
      S = S + {k}

  return S
```

Cashier's algorithm is optimal for US coin denominations. And it also may even lead to a feasible solution:

- Consider if $c_1 > 1$: 7, 8, 9:
  - Cashier's algorithm: 15 = 9 + ?
  - Optimal: 15 = 7 + 8

## Interval Scheduling

Job $j$ starts at $s_j$ and finished at $f_j$.

The basic idea in a greedy algorithm for interval scheduling is to use a simple rule to select a first request $j_1$. Once a request $j_1$ is selected, we reject all requests that are not compatible with $j_1$. Then select the next request $j_2$ to be accepted, and again reject all requests that are not compatible with $j_2$. Two jobs are **compatible** if they don't overlap. The goal is to find maximum subset of mutually compatible jobs.

A greedy rule that leads to the optimal solution: accepts first the request that finishes first, that is, the request for which $f_j$ is as small as possible.

```
earlist-finish-time-first(n, ...sn, ...fn):
  sort jobs by finish times and renumber such that f1 <= f2 <= ... <= fn
  S = {}
  for j = 1 to n:
    if job j is compatible with S:
      S = S + { j }
  
  return S
```

**Proposition**. Can implement earliest-finish-time first in $O(n\log{n})$ time.

- keep track if job $j^*$ that was added last to $S$
- job $j$ is compatible with $S$ if and only if $s_j \geq f_{j^*}$
- sorting by finish times takes $O(n\log{n})$ time

## Interval Partitioning

Let's say that some lecture $j$ starts at $s_j$ and finishes at $f_j$. The goal is to find minimum number of classrooms to schedule all lectures so that no two lectures occur at the same time in the same room.

```
earlist-finish-time-first(n, ...sn, ...fn):
  sort lectures by their start time s1 <= s2 <= ... <= sn
  d = 0 # number of allocated classrooms
  for j = 1 to n:
    if lecture j is compatible with some classroom:
      schedule lecture j in any classroom k
    else:
      allocate new classroom d + 1
      schedule lecture j in classroom d + 1
      d = d + 1

  return schedule
```

**Proposition**: The earliest-start-time-first algorithm can be implemented in $O(n\log{n})$ time. **Proof**. Store classrooms in a **priority queue** (key = finish time of its last lecture):

- To determine whether lecture $j$ is compatible with some classroom, compare $s_j$ to key of min classroom $k$ in priority queue
- To add lecture $j$ to classroom $k$, increase key of classroom $k$ to $f_j$
- Total number of priority queue operations is $O(n)$
- Sorting by start times takes $O(n\log{n})$ time

Note that this implementation chooses a classroom $k$ whose finish time of its last lecture is **earliest**.

## Scheduling to Minimize Lateness

## Optimal Caching
