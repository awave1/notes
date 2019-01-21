---
title: 'Passwords & Authentication'
date: '2019-01-18'
description: ''
published: false
tags: ['cpsc329']
---

## Password

A password is a **shared secret** between a user and a computer system (often a server). It should be hard to guess but easy to remember. Purpose of a password is to prove one's identity.

### Password Authentication

1. User supplies (id, pass) (id is typically username or email)
2. System compares the pair against the stored information. (id, pass) must match a password table on the system.

Error messages can reveal information:

- **bad**: "no such user found", an attacker could use this to figure out username
- **good**: "you entered an invalid username *or* password", an attacker learns nothing

## Entropy

**Entropy** is a measure of unpredictability of information content.

- from information theory: entropy is a measure of unpredictability of information content
- if a set $S$ has $N$ elements, the entropy of finding an element is $log_2(N)$

For example, set of all 3 digit numbers $\{000, 001, 002, \ldots, 999\}$, 1000 elements in this set. Therefore, entropy is $log_2(1000) \approx 9.96 \approx 10 \text{bits}$.

### Password Entropy
