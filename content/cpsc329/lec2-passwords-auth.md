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

## Finding Password Strength

Online tools try to estimate password strength. The result depends on the underlying dataset and algorithm.

What type of attacks exists?

- guess verify attacks: Use some leaked information about passwords
- keyloggers
- phishing
- other social engineering

Attacker goals:

- target specific user; or
- target any user

It is important to evaluate security against any-user attack.

Generally you keep trying passwords until you succeed (or fail) i.e. the guess and check approach

**Online guessing**: Sending a guess and receive the response in real time. 

**Offline guessing**: obtain a password file/table, try guesses against the file.

## Hash Functions

Worst case scenario if an attacker knows hash function and hash. You want hash function to be slow to reduce amount of requests per second.

A general hash function:

- Maps arbitrary-sized data to fixed-length data (hash)
- General properties: quick, deterministic, evenly distributed hash
- Can require other properties, depending on uses (e.g. hash table)

## Offline Dictionary Attack


