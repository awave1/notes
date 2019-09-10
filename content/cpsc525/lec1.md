---
title: 'Principles of Computer Security'
date: '2019-09-09'
description: ''
published: true
tags: ['cpsc525']
---

## Security Triad

A computing system is secure only if it exhibits all three of these properties.

1. Confidentiality - access to systems or data should be limited to "authorized parties".
2. Integrity - Data should neither be intentionally tampered with nor accidentally corrupted.
3. Availability - The system or data should always be there when you need (or want) it.

### Security vs Reliability

Security has a lot to do with reliability. A secure system is one you can rely on to, e.g.,

- Keep your personal data confidential
- Allow only authorized access / modifications to resources.
- Give correct & meaningful results; and
- Give correct & meaningful results when you want them

## Privacy

**What is privacy?** Privacy is "infomational self-determination" (you get to control information about you). Control could mean many different things, e.g.,

- who gets to _see_ is;
- who gets to _use_ it;
- what they can use it for;
- who can they share it with...

### PIPEDA

PIPEDA is Canada's private-sector privacy law. PIPEDA - **P**ersonal **I**nformation **P**rotection and **E**lectronic **D**ocuments **A**ct. Ten "principles":

1. Identify purpose of data collection
2. Obtain consent
3. Limit collection
4. Limit use, disclosure and retention
5. Use appropriate safeguards
6. Give individual access
7. Be accurate
8. Be open
9. Be accountable
10. Provide recourse

#### Security vs Privacy

Treating security and privacy as opposites is **wrong**.

## How secure must it be?

Principle of **Easiest Penetration**:

- An attacker must be expected to use any available means of penetration.
- Attackers will go after the **weakest link**, not the **most obvious link** nor the most convinient link to fortify.

Given that the attacker won't attack the obvious things, we must learn how to **think like an attacker** and protect weak links.

Principle of **Adequate Protection**:

- Security $\subset$ Economics: Digital assets should be protected to a degree consistent with their value and only until they lose their value.
