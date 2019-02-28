---
title: 'Operating Systems: Introduction, History, Basic Concepts'
date: '2019-01-15'
description: ''
published: true
tags: ['cpsc457']
---

## Defining an OS

There's no 'precise' definition. It is a layer of software that provides application programs with a better, simpler, cleaner model of the computer. The OS is there to simplify interaction with the hardware. OS manages all resources.

It is the software that runs all the time (mostly in kernel mode). All other applications need it in order to run (*most* applications will need it).

We can look at an OS from two different perspectives:

- an **extended machine**
- as a **resource manager**

An OS presents an abstraction mechanism that lets you interact with the hardware.

### OS - an extended machine

Abstraction / generalization is key to managing complexity. First we define and implement the abstractions. For example, files - working with files is easier than dealing with raw disk space. Then, using these abstractions, we write applications and solve problems (e.g. file editor, image viewer). An OS doesn't care what's in the file, it is up to the applications to determine how to use the file.

The abstractions allow us to mask the ugly hardware and provide nice interfaces instead. Many OS concepts are abstractions, therefore there are some similarities to OOP.

### OS - a resource manager

OS acts as a resource allocator. It multiplexes available resources.

- Multiplexing resources in time
  - e.g. 3 programs trying to print to the same printer (spooling)
  - e.g. 2 programs trying to run at the same time (scheduling)
- Multiplexing resources in space
  - e.g. 2 programs allocating memory

OS manages conflicts among multiple programs or users.

<!--IMPORTANT: syscalls need to be checked-->

We can also think about OS as a control program. It decides when to run which application. OS monitors improper use and prevents errors. OS is responsible for handling all interrupts and traps.

## History of Operating Systems

OSes often developed by customers instead of HW manufacturers. IBM developed first OS in the 60's.

### First Generation (1945 - 1955): Vacuum Tubes and no OS

Programs were hardwired, later were made on punch cards. Programs were written in machine language. Hardware required complicated wiring. Only single user at a time. Such computers were only able to perform basic calculations. No OS since there was no need for one.

### Second Generation (1955 - 1965): Transistors and Batch Systems

Transistor based mainframe computers replaced old vacuum tube computers. Programs were made with FORTRAN & COBOL. OSes that were used: FMS (Fortran Monitor System) and IBSYS (IBM OS). Important concept was introduced: **batch systems**.

#### Batch Systems

The users of a batch operating system do not interact with the computer directly. Each user prepares his job on an off-line device like punch cards and submits it to the computer operator. To speed up processing, jobs with similar needs are batched together and run as a group. The programmers leave their programs with the operator and the operator then sorts the programs with similar requirements into batches.

### Third Generation (1965 - 1980): ICs and Multiprogramming

Transistors were replaces with Integrated Circuits (ICs). Lots of OSes came out: IBM OS/360, CTSS (by MIT), MULTICS (complicated, but influential), UNIX (inspired by MULTICS). Important concepts:

- **multiprogramming**: a different job in each memory partition, CPU execute other jobs, while waiting for the IO of some jobs. Multiple programs could sit in memory.
- **spooling** (Simultaneous Peripheral Operation On Line): read jobs from cards to disk, load jobs from disk automatically, no more tapes.
- **time-sharing**: multiple users using one computer simultaneously and interactively. Terminals were connected to a central server.

#### Multiprogramming

Refers to the idea, if you have more than one program in the memory, processor will switch between the programs when one program is idle.

#### Spooling

Spooling is typically used to deal with slow devices/peripherals, e.g. printer. Spooling can be used to deal (somewhat) with deadlocks in concurrent programming.

### Fourth Generation (1990 - Now): Personal Computers

Cheap, mass-produced computers, User friendly interfaces on top of OS.

