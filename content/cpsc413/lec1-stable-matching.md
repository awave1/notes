---
title: 'Stable Matching'
date: '2019-01-10'
updated: '2019-01-16'
description: ''
published: true
tags: ['cpsc413']
---

> Theory is when one understands everything but nothing works. Practice is when everything works but nobody understands why.

## Stable Matching Problem

The Stable Matching Problem originated when David Gale and Lloyd Shapley, two mathematical economists decided to design a college admissions process, or a job recruiting process that was _self-enforcing_.

Given a set of preferences among employers and applicants, can we assign applicants to employers so that for every employer $E$, and every applicant $A$, who is not scheduled to work for $E$, at least one of the following two things is the case?

1. $E$ prefers every one of its accepted applicants to $A$; or
2. $A$ prefers her current situation over working for employer $E$.

If this holds, the outcome is stable: individual self-interest will prevent any applicant/employer deal from being made behind the scenes.

---

**Goal**. Given a set of preferences among hospitals and med-school students, design a _self-reinforcing_ admissions process.

**Unstable pair**. Hospital $h$ and student $s$ form an _unstable pair_ if both:

1. $h$ prefers $s$ to one of its admitted students.
2. $s$ prefers $h$ to assigned hospital.

**Stable assignment**. Assignment with no unstable pairs.

- Natural and desirable condition.
- Individual self-interest prevents any side deals.

Consider a set $H = \{h_1, \ldots, h_n\}$ of $n$ hospitals, and a set $S = \{s_1, \ldots,s_n\}$ of $n$ students. Let $H \times S$ denote the set of all possible ordered pairs of the form $(h, s)$, where $h \in H$ and $s \in S$.

### Matching & Perfect Matching

- A _matching_ set $M$ is a set of ordered pairs, each from $H \times S$, with the property that each member of $H$ and each members of $S$ appears in at most one pair in $M$.
- A <mark>_perfect matching_</mark> $M'$ is a matching with the property that each member of $H$ and each member of $S$ appears in _exactly_ one pair in $M'$. A matching $M$ is **perfect** if:

$$
|M| = |H| = |S| = n
$$

### Unstable Pair

Given a perfect matching $M$, hospital $h$ and student $s$ form an **unstable pair** if both:

1. $h$ prefers $s$ to matched student
2. $s$ prefers $h$ to matched student

---

Given all that information, we can describe <mark>stable matching</mark>:

A **stable matching** is a perfect matching with no unstable pairs. Stable matching problem can be described as:

> Given the preference list of $n$ hospitals and $n$ students, find a stable matching (if one exists).

It is not obvious a priori if stable matchings always exist.

## Gale-Shapley Algorithm

```
function stableMatching {
  // Initialize all m ∈ M and w ∈ W to free
  while ∃ hospital h is unmatched and still has a student s to propose to {
     s = first student on h’s list to whom h has not yet proposed
     if s is unmatched
       (h, s) added to M
     else some pair (h', s) already exists
       if s prefers h to h'
          s rejects h'
         (h, s) is added to M
       else
         (h', s) remain in M
  }
}
```

### Proof of correctness: Termination

- Hospitals propose to students in decreasing order of preference
- Once a student is matched, the student never becomes unmatched, only 'trades up'

**Claim**: Algorithm terminates after at most $n^2$ iterations of `while` loop.
**Proof**: Each time through the `while` loop, a hospital proposes to a new student. Thus, there are at most $n^2$ possible proposals.

<!--![n(n - 1) + 1 proposals](/content/cpsc413/img/lec1_1.png)-->

### Proof of correctness: Perfect matching

1. **Claim**: Gale-Shapley outputs a matching.
   **Proof**:

   - Hospitals proposes only if unmatched $\to$ matched to $\leq$ 1 student
   - Student keeps only best hospital $\to$ matched to $\leq$ 1 hospital

2. **Claim**: In Gale-Shapley matching, all hospitals get matched.
   **Proof** (by contradiction):

   - Suppose that some hospital $h \in H$ is unmatched upon termination of G-S algorithm
   - Then, some student $s \in S$ is unmatched upon termination
   - Therefore, $s$ was never proposed to
   - However, $h$ proposes to every student, since $h$ ends up unmatched.

3. **Claim**: In Gale-Shapley matching, all students get matched.
   **Proof** (by counting):

   - By previous claim, all $n$ hospitals het matched
   - Thus, all $n$ students get matched.

### Proof of correctness: Stability

**Claim**: In G-S matching $M^{*}$, there are no unstable pairs.
**Proof**: Consider any pair $(h, s)$ that is not in $M^{*}$:

1. Case 1: $h$ never proposed to $s$:
   - $h$ prefers its G-S partner to $s'$ <small>(hospitals propose in decreasing order of preference)</small>
   - $(h, s)$ is not unstable
2. Case 2: $h$ proposed to $s$
   - $s$ rejected $h$ (either right away or later)
   - $s$ prefers G-S partner $h'$ to $h$ <small>(students only trade up)</small>
   - $(h, s)$ is not unstable

In either case, the pair $(h, s)$ is not unstable.

---

The Gale-Shapley algorithm guarantees to find a stable matching for **any** problem instance.

## Hospital optimality

Student $s$ is a **valid partner** for hospital $h$ if there exists any stable matching in which $h$ and $s$ are matched. **Hospital optimal** assignment is when each hospital receives best valid partner. All executions of G-S yield **hospital-optimal** assignment. Hospital-optimal assignemtn **is** a stable matching.

**Claim**: G-S matching $M^{*}$ is hospital-optimal. **Proof** (by contradiction):

- Suppose a hospital is matchied with student other than best valid partner
- Hospitals propose in decreasing order of preference (some hospital is rejected by a valid partner during G-S)
- Let $h$ be first such hospital, and let $s$ be the first valid partner that rejects $h$
- Let $M$ be a stable matching where $h$ and $s$ are matched
- When $s$ rejects $h$ in Gale-Shapley, $s$ forms (of re-affirms) commintment to a $h'$ => $s$ prefers $h'$ to $h$
- Let $s'$ be partner of $h'$ in $M$
- $h'$ had not been rejected by any valid partner (including $s'$) at the point when $h$ is rejected by $s$.
- Thus, $h'$ had not yet proposed to $s'$ when $h'$ proposed to $s$ => $h$ prefers $s$ to $s'$
- Thus, $(h', s)$ is unstable in $M$, a contradiction.

**Student-pessimal assignment**: each student receives worst valid partner.

**Claim**: G-S finds _student-pessimal_ stable matching $M^{*}$. **Proof** (by contradiction):

- Suppose $(h, s)$ matched in $M^{*}$ but $h$ is not the worst valid partner for $s$
- There exists stable matching $M$ in which $s$ is paired with a hospital $h'$ whom $s$ prefers less than $h$ => $s$ prefers $h$ to $h'$
- Let $s'$ be the partner of $h$ in $M$
- By hospital-optimality, $s$ is the best valid partner for $h$ => $h$ prefers $s$ to $s'$
- Thus $(h, s)$ is an unstable pair in $M$, a contradiction.
