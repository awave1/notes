---
title: 'Midterm overview'
date: '2019-02-10'
description: 'Jon Rokne send help pls'
published: true
tags: ['cpsc413']
---

## Gale-Shapley Algorithm & Stable Matching

- <mark>Perfect matching</mark> $M$ is a matching with the property that each member of $M$ and each member of $W$ appears in _exactly_ one pair in $M$. A matching $M$ is **perfect** if:

$$
|M| = |M| = |W| = n
$$

- Given a perfect matching $M$, $m$ and $w$ form an <mark>unstable pair</mark> if both:
  - $m$ prefers $w'$ to matched $w$
  - $w$ prefers $m'$ to matched $m$
- A <mark>stable matching</mark> is a perfect matching with no unstable pairs
  - stable matchings aren't obvious a priori
- Time complexity of Gale-Shapley is $O(n^2)$

## Algorithm Analysis

- An algorithm is **efficient** if it has a polynomial running time
- Upper bound: <mark>Big O</mark>
  - $0 \leq f(n) \leq c \cdot g(n)$ for all $n \geq n_0$
  - $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$ ($\in o(g(n)) \implies O(g(n))$, but not in $\Omega(g(n))$)
- Lower bound: <mark>Big $\Omega$</mark>
  - $f(n) \geq c \cdot g(n) \geq 0$ for all $n \geq n_0$
  - $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$ ($\in \omega(g(n)) \implies \Omega(g(n))$, but not in $O(g(n))$)
- Tight bound: <mark>Big $\Theta$</mark>
  - $0 \leq c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n)$
  - $\lim_{n \to \infty} \frac{f(n)}{g(n)} = c$
- In general: Factorial > Exponential > Polynomial > Log > Constant
- For any two functions

$$
f(n) \in \Theta(g(n)) \leftrightarrow f(n) \in O(g(n)) and g(n) \in \Omega(g(n))
$$

---

**Summation rules**:

$$
\Sigma^{n}_{i = 1}(ca) = c\Sigma^{n}_{i = 1}a
$$

$$
\Sigma^{n}_{i = 1}(a + b) = \Sigma^{n}_{i = 1}(a) + \Sigma^{n}_{i = 1}(b)
$$

$$
\Sigma^{n}_{i = 1}c = cn
$$

$$
\Sigma^{n}_{i = 1}i = \frac{n(n + 1)}{2}
$$

$$
\Sigma^{n}_{i = 1}i^2 = \frac{n(n + 1)(2n + 1)}{6}
$$

**Log rules**:

$$
\log{(mn)} = \log{m} + \log{n}
$$

$$
\log{(\frac{m}{n})} = \log{m} - \log{n}
$$

$$
\log{(m^n)} = n\log{m}
$$

$$
\log_{a}{(x)} = \frac{log_b{x}}{\log_b{a}}
$$

$$
\log_{a}{(a^x)} = x
$$

$$
a^{\log_a{x}} = x
$$

## Graphs

- <mark>Adjacency matrix</mark>
  - n by n matrix with $A_{uv} = 1$ if $(u, v)$ is an edge
  - Two representations of each edge
  - Space proportional to $n^2$
  - Checking if $(u, v)$ is an edge takes $\Theta(1)$
  - Identifying all edges takes $O(n^2)$
- <mark>Adjacency list</mark>, node indexed array of lists
  - Two representations of each edge
  - Space is $\Theta(m + n)$
  - Checking if $(u, v)$ is an edge takes $O(degree(u))$ time
  - Identifying all edges takes $\Theta(m + n)$
- <mark>Path</mark> in an undirected graph is a sequence of nodes with the property that each consecutive pair $v_{i - 1}, v_{i}$ is joined by an edge in $E$
  - a path is <mark>simple</mark> if all nodes are distinct
- an undirected graph is <mark>connected</mark> if for every pair of nodes there's a path between them
- a <mark>cycle</mark> is a path in which $v_1 = v_k, k > 2$ and the first $k - 1$ nodes are distinct
- an undirected graph is a <mark>tree</mark> if it is connected and does not contain a cycle

---
- <mark>Connected component</mark>: all nodes reachable from $s$
- <mark>BFS</mark>: explore outward from s in all possible directions adding nodes one "layer" at a time
  - Output of BFS results in a BFS tree with all the nodes in the graph that are connected to root $s$
  - BFS runs in $O(m + n)$ time if the graph is given by its adjacency representation

BFS pseudocode:

```python
bfs(G, s):
  Q = empty queue
  Q.enqueue(s)
  mark s as visited

  while Q is not empty:
    v = Q.dequeue()

    for all neighbours u of v in G:
      if u is not visited:
        Q.enqueue(u)
        mark u as visited
```

- DFS
  - Builds a connected component containing $s$.
  - Visits the same set of nodes as BFS, but in different order $\to$ probes down

```python
# To apply dfs to s-t connectivity,
# declare all nodes initially to be not explored
# then invoke dfs(s)

dfs(u):
  mark u as explored

  for each (u, v) incident to u:
    if v is not explored:
      dfs(v)
```

---

- an undirected graph is <mark>bipartite</mark> if the nodes can be colored blue or white such that every edge has one white and one blue end.
  - if a graph is bipartite then it **cannot contain an odd cycle**
  - if a graph is bipartite no edge of $G$ joins two nodes of the same layer

---

- edge $(u, v)$ leaves node $u$ and enters node $v$
- BFS extends to directed graphs
- nodes $u$ and $v$ are **mutually reachable** if there is both a part from $u$ to $v$ and from $v$ to $u$
- a graph is **strongly connected** if every pair of nodes is mutually reachable
- a **strong component** is a maximal subset of mutually reachable nodes

---

- a <mark>Directed Acyclic Graph</mark> is a directed graph that contains no directed cycles
- a <mark>topological order</mark> of a directed graph is an ordering of its nodes as $v_1, v_2, ..., v_n$ for every edge $(v_i, v_j)$, $i < j$
- if G a graph has a topological order, then G is a **DAG** (and vice versa)
- if G is a **DAG**, then G has a node with no entering edges

## Greedy Algorithms

- an algorithm is <mark>greedy</mark> if it builds up a solution in small steps, choosing a decision at each step myopically to optimize some underlying criterion
- the challenge in designing a good greedy algorithm is in deciding which simple rule to use in selection.
- Interval scheduling
  - Basic idea:
    - select first request $i_1$
    - once $i_1$ is accepted, reject all requests no compatible with $i_1$
    - then select request $i_2$ to be accepted and reject all requests not compatible with $i_2$
    - repeat for all requests

```python
# textbook version
earliestFinishTimeFirst():
  R = set() # set of all requests
  A = []

  while R is not empty:
    i = R.getSmallest() # choose smallest finishing time
    A.add(i)
    R.deleteIncompatibleWith(i) # delete all that are incompatible with i

  return A # optimal set

# slides version
earliestFinishTimeFirst(n, jobs):
  jobs.sort() # sort jobs by finish times, f1 <= f2 <= ... <= fn
  S = set()

  for j in range(n):
    if j.compatibleWith(S):
      S.union(j)

  return S  
```

  - the earliest finish time first is optimal

---

- Interval partitioning
  - implemented via earliest start time first
  - in any instance of interval partitioning the number of resources needed is at least the depth of the set of intervals
  - The greedy algorithm schedules every interval on a resource, using a number of resources equal to the depth of the set of intervals. This is the optimal number of resources needed.

```python
# O(nlog(n))
earliestStartTimeFirst(n, startTimes, finishTimes):
  startTimes.sort() # sort by start times s1 <= s2 <= ... <= sn
  d = 0 # number of allocated classrooms

  for j in range(n):
    if j compatible with some classroom k:
      schedule j to k
    else:
      allocate new classroom d + 1
      schedule j in classroom d + 1
      d = d + 1

  return schedule
```

- Scheduling to minimize lateness
  - single resource processes one job at a time =
  - job $j$ requires $t_j$ units of processing time and is due at time $d_j$
  - if $j$ starts at time $s_j$ it finishes at time $f_j = s_j + t_j$
  - Lateness $l = max(0, f_j - d_j)$
  - Goal: schedule all jobs to minimize *maximum* lateness $L = max_jl_j$
  - there exist an optimal schedule with **no idle time**
  - the earliest deadline first schedule has no idle time

```python
earliestDeadlineFirst(n, times, deadlines):
  deadlines.sort() # sort by due time d1 <= d2 <= ... <= dn
  t = 0

  for j in range(n):
    assign job j to interval [t, t + tj]
    sj = t
    fj = t + tj
    t = t + tj
  
  return intervals [[s1, f1], ..., [sn, fn]]
```
- given a schedule $S$ an **inversion** is a pair of jobs $i$ and $j$ such that $i < j$ but $j$ is scheduled before $i$

---

Strategies for greedy analysis:

- **Greedy algorithm stays ahead**: show that after each stem of the greedy algorithm, its solution is at least as good as any other algorithm's
- **Structural**: discover a simple "structural" bound that every possible solution must have a certain value. Then show that your algorithm always achieves this bound
- **Exchange argument**: gradually transform any solution to the one found by the greedy algorithm without hurting its quality
