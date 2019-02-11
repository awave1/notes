---
title: 'Algorithm Analysis'
date: '2019-01-31'
description: ''
published: true
tags: ['cpsc413']
---

An algorithm is **efficient** if it has a *polynomial running time*. An algorithm is **poly-time** if when the input size doubles, the algorithm should slow down by at most some constant $C$.

## Asymptotic order of growth

The growth rate of running times and other function should be expressed in a way that it is insensitive to constant factors and low-order terms.

### Asymptotic Upper Bounds - Big $O$

Let $f(n)$ be a function - the worst running case on an input of size $n$. Given function $g(n)$, we can say that $f(n) \in O(g(n))$ - for sufficiently large $n$, $f(n)$ is bounded above by a constant multiple of $g(n)$. In other words, $f(n)$ is $O(g(n))$ if there exist constants $c > 0$ and $n_0 \geq 0$ such that:

$$
0 \leq f(n) \leq c \cdot g(n) \text{ for all } n \geq n_0
$$

Note that $O(\cdot)$ expresses only an *upper bound*, not the exact growth rate of the function.

### Asymptotic Lower Bounds - Big $\Omega$

$f(n)$ is $\Omega(g(n))$ if there exist constants $c > 0$and $n_0 \geq 0$ such that:

$$
f(n) \geq c \cdot g(n) \geq 0 \text{ for all } n \geq n_0
$$

Typical usage: any compare based sorting algorithm requires $\Omega(n \log{n})$ compares in the worst case.

### Asymptotic Tight Bounds - Big $\Theta$

$f(n)$ is $\Theta(g(n))$ if there exist constants $c_1 > 0$, $c_2 > 0$ and $n_0 \geq 0$ such that:

$$
0 \leq c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n) \text{ for all } n\geq n_0
$$

Typical usage: mergesort makes $\Theta(n\log{n})$ compares to sort $n$ elements.

An asymptotically tight bound can also be obtained by computing a limit as $n$ goes to infinity. Let $f(n)$ and $g(n)$, such that:

$$
\lim_{n \to \infty} \frac{f(n)}{g(n)} = c
$$

Therefore $f(n) = \Omega(g(n))$.

Other propositions include:

- if $\lim_{n\to\infty} \frac{f(n)}{g(n)} = 0$, then $f(n) \in O(g(n))$ but not in $\Omega(g(n))$
- if $\lim_{n\to\infty} \frac{f(n)}{g(n)} = \infty$, then $f(n) \in \Omega(g(n))$ but not in $O(g(n))$


### Properties of Asymptotic Growth Rates

- **Reflexivity**: $f \in O(f)$
- **Constants**: if $f$ is $O(g_1)$ and $c > 0$, then $cf \in O(g)$.
- **Products**: if $f_1$ is $O(g_1)$ and $f_2$ is $O(g_2)$ then $f_1f_2 \in O(g_1g_2)$
  - *Proof*:
    $$
    \exists c_1 > 0 \text{ and } n_1 \geq 0 \text{ such that } 0 \leq f_1(n) \leq c_1 \cdot g_1(n) \forall n \geq n_1 \\
    \exists c_2 > 0 \text{ and } n2 \geq 0 \text{ such that } 0 \leq f_2(n) \leq c_2 \cdot g_2(n) \forall n \geq n_2 \\
    0 \leq f_1(n) \cdot f_2(n) \leq c_1 \cdot c_2 \cdot g_1(n) \cdot g_2(n) \forall n \geq max\{n_1, n_2\}.
    $$
- **Sums**: if $f_1$ is $O(g_1)$ and $f_2$ is $O(g_2)$, then $f_1 + f_2$ is $O(max\{g_1, g_2\})$
- **Transitivity**: if $f$ is $O(g)$ and $g$ is $O(h)$, then $f \in O(h)$

### Asymptotic Bounds for Some Common Functions

Let's consider properties of the most basic and common functions: polynomials, logarithms, and exponentials.

#### Polynomials

Asymptotic rate of growth of polynomial functions is determined by their **high order term**. Therefore, let $f$ be a polynomial of a degree $d$ in which a coefficient $a_d$ is positive, then $f = O(n^d)$.

#### Logarithms

Logarithms are very slowly growing functions. For every base $b$, the function $\log_b{n}$ is asymptotically bounded to every function of the form $n^x$. For every $b > 1$ and every $x > 0$, $\log_b{n} = O(n^x)$. $\log_a{n}$ is $\Theta(\log_b{n})$ for every $a > 1$ and every $b > 1$.

#### Exponential

Exponential function grow faster than polynomials. For every $r > 1$ and every $d > 0$, we have $n^d = O(r^n)$ and $\lim_{n\to\infty} \frac{n^d}{r^n} = 0$

#### Factorials

$$
n! \text{ is } 2^{\Theta(n\log{n})}
$$

### Big O Notation with Multiple Variables

$f(m, n)$ is $O(g(m, n))$ if there exist constant $c > 0$, $m_0 \geq 0$, and $n_0 \geq 0$ such that:

$$
f(m, n) \leq c \cdot g(m, n) \text{ for all } n \geq n_0 \text{ and } m \geq m_0
$$

Breadth first search takes $O(m + n)$ time to find a shortest path from $s$ to $t$ in a digraph with $n$ nodes and $m$ edges.
