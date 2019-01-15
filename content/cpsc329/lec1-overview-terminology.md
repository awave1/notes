---
title: 'Overview & Terminology'
date: '2019-01-14'
description: 'Explorations in Information Security & Privacy'
published: false
tags: ['cpsc329']
---

Computer security focuses on three fundamental questions:

- What assets are we protecting?
- How are those assets threatened?
- What can we do to counter those threats?

## Security for Individuals

Information security we want/expect from our personal computers and devices

- Our private data is not seen by others, and we want to define what 'others' means.
- Our data remains unchanged
- We can access our data when we want
  - Access is important

Therefore, we want **c**onfidentiality + **i**ntegrity + **a**vialability = CIA (lol).

### Example

Given a company, what will require protection? From what/whom?

**Confidentiality**:

- Stored data
- Communication (data in-flight)

**Integrity**:

- All stored data, all communication

## Computer Security Overview

The NIST defines the term **Computer Security** as

> The protection afforded to an automated information system in order to attain the applicable objectives of preserving the integrity, availability and confidentiality of information system resources.

That includes hardware, software, firmware, information/data, and telecommunications.

### Key Security Concepts

**Confidentiality**:

- Preserving authorized restriction on information access and disclose, including means for protecting personal privacy and proprietary information.

**Integrity**:

- Guarding against improper information modification or destruction, including ensuring information nonrepudiation and authenticity.

**Availability**:

- Ensuring timely and reliable access to, and use of, information.

Computer security is both fascinating and complex. Requirements seem straightforward, but the mechanisms used to meet those requirements can be complex and subtle. When developing a security mechanisms, one must always consider potential attacks (often unexpected) on such mechanism. Procedures used to provide particular services are often counter-intuitive. It is necessary to decide where to use which security mechanisms (both logical & physical). Security mechanisms typically involve more than a particular algorithm or protocol, but also require participants to have secret information, leading to issues of creation, distribution, and protection of that secret information.

Computer security is essentially a battle between perpetrator who tries to find weaknesses and the designer or administrator who tries to close them. Attackers only need to find a single weakness, whereas the developer needs to find all the weaknesses. Many users percieve little benefit from security investment until a failure occurs.

Security requires regular monitoring which is difficult in today's short term environment. Unfortunately, security is still too often an afterthought - incorpotated after the design is complete. **Security is a process, never a finished product**.

### Terminology

- **adversary** or **threat agent** - an entity that attacks, or threats to, a system
- **attack** - an assault on system security that derives from an intelligent threat; a deliberate attempt to evade security services and violate security policy of a system
- **countermeasure** - 
- **risk**: an expectation of loss expressed as the probability that a particular threat will exploit a particular vulnerability with a particular harmful result
- **security policy** - a set of rules and practices that specifies how a system or organization provides security services to protect sensitive and critical system resources
- **system resource** or **asset** - 
- **threat** - a potential for violation of security, which exists when there is a circumstance, capability, or action that could breach security and cause harm.
- **vulnerability** - 

#### Concepts and their relationships

<!--todo: image-->

### Vulnerability, Threats and Attacks

General vulnerability categories:

- Corrupted - e.g. does the wrong thing, stores the wrong data (loss of integrity)
- Leaky - revealing partial information (loss of confidentiality)
- Unavailable or very slow - system gets slow & overwhelmed (loss of availability)

Threats:

- Represent potential security harm

Attacks

- Attacks are threats carried out
- Passive or active attempts to alter/affect system resources

### Countermeasures

Countermeasures are actions taken to mitigate or deal with an attack.

- prevention
- detection/response
- recovery
- residual vulnerabilities - countermeasures can introduce new vulnerability (e.g. Spectre vulnerability)
  - Goal is to minimize residuals

### Outside and Inside Attacks

Who carries out attack?

**Insider**:

- Someone authorized to use the system
- Disgruntled employee?

**Outsider**:

- Someone not authorized to use the system

