---
title: 'Disks, scheduling, RAID'
date: '2019-04-21'
description: ''
published: false
tags: ['cpsc457']
---

## Magnetic disks

Each disk **platter** has a flat circular shape. Platters rotate 5400 - 15000 RPMs, the **read-write heads** fly just above the surface of each platter. **Head crash**: the head makes contact with the disk surface, causing permanent damage to the disk. Each head is attached to a disk arm that moves all heads at the same time.

### Disk space

The surface of a platter is logically divided into **circular tracks**

- each track is further divided into **sectors**
- the set of tracks that are at the same arm position make up a **cylinder**

![lec18-sectors.png](Space)

### Mapping

A **logicak block** is the smallest unit of transfer between the disk and the memory, e.g. 512 bytes. Software accesses data on disks oly using `write(block #)` and `read(block #)`. **Mapping** is a process of convering a logical block number into physical address that consists of a cylinder number, a head number, and a sector number. The sectors on disk are mapped to large one-dimensional arrays of logical blocks, numbered consecutively. On modern disks this mapping is done by an embedded controller due to complicated geometry.

**Low level format**

**Low level format** or **physical format** writes low level information to the disk, dividing it into series of tracks, each containing some number of sectors, with small gaps between sectors.

![lec18-low-level-format.png](Low level format)

- Preamble: starts with a special bit sequence, cylinder number, sector number, etc.
- Data: depends on the format (e.g. 512 bytes)
- Error correction code: redundant information to detect read errors.

The formattet capacity is about 20% **lower** than the unformatted capacity.

## Disk management

In order to use a disk to hold files, the OS needs to record data structures on the disk. **Partition** the disk into one or more regions, each treated as a logical disk. **Logical formatting** or "making a file sysem" on a partition: abstracting blocks into files and directories.

OS can allow raw disk access for applications that want to do their own block management, and want to keep OS out of the way (e.g. databases). Methods such as **sector sparing** can be used to handle bad blocks, either at OS level, or at lower level.

## Disk scheduling

The time required for reading or writing a disk block is determined by several factors. The must important is **seek time** - the time to move the arm holding the heads to the correct cylinder.

The requests for disk I/O are appended to the **disk queue**. OS maintains separate queues of requests for **each disk**. OS can improve the overall I/O performance by reordering disk I/O requests, with the goal of **minimizing the total head movement**.

### FCFS Scheduling

**First come first serve** scheduling processes requests in the same order as they received. It is fair, but it does not provide fasted overall service.

![lec18-fcfs.png](FCFS Scheduling)

### SSTF Scheduling

**Shortest seek time first** selects the next request that would result in the shortest seek time from the current head position, i.e. picks the closest request next. Seek time = distance to move the heads. May cause starvation of some requests.

![lec18-sstf.png](SSTF Scheduling)

### Elevator Scheduling

**SCAN**

The head continuously scans back and forth across the disk and serves the requests as it reaches each cylinder. Head moves all the way to first/lst cylinder before turning back. Requests at either end tend to wait the longest.

![lec18-scan.png](SCAN)

**LOOK**

Nearly identical to SCAN, but head does not move al the way to first/last cylinder before turning back. Instead, it only goes as far as necessary. Results in same request order as SCAN, but less overall head movement. 

**C-SCAN**

Same as SCAN in one direction, but after reaching last cylinder head repositions to the first cylinder, and no requests are processed during this ime. Achieves more uniform wait time than SCAN.

**C-LOOK**

Small optimization of C-SCAN, head only goes as far as needed by the next request (same optimization as SCAN -> LOOK).

![lec18-elevator.png](Elevator scheduling methods)

---

The performance of a scheduling algorithm depends on:

- the number and types of requests
- the file allocation method
- the location of directories and index blocks

Either SSTF or LOOK is a reasonable choince for default algorithm, C-LOOK if we need more consistent wait times. Other scheduling algorithms also consider: rotational latency, priority of the task - requests belonging to higher priority process receive higher priority, prioritize read over write, sicnce read requests usually block processes.

---

## RAID

**RAID** - Redundant array of independent disks. Main concept of RAID is providing _reliability via redundancy_. It can also **improve performance** through parallelization or requests. RAID is accessed as one big disk, therefore there is **increased capacity**. It can be implemented via dedicated hardware, or in software, or a combination. RAID is opposite of partitioning, representing multiple disks as a single disk.

### RAID 0 - Striped volume

- Uses a group of disks as one unit.
- Purpose: highest performance for read & write.
- Consecutive logical blocks distributed across all disks, ideally contents of every file are evenly distributed across all disks.
- Offers no redundancy - a single disk failure leads to entire RAID failure, actually **reduces reliability**.
- With N disks, read & write performance can be up to N times higher than a single disk, because both read & write can be parallelized.
- Often used for high-performance temporary storage, where data loss is tolerable.

### RAID 1 - Mirrored disks

- Keeps 1 or more duplicates of a disk.
- Purpose: very high reliability & fast read performance.
- With N disks, it is tolerant to N - 1 simultaneous disk failures
  - RAID continues to work in **degraded mode**
  - RAID software usually notifies the operator
  - Failed disk can be removed & **rebuilt** from the surviving disks
- With N disks, read performance can be up to N times higher than with a single disk
- Write performance is that of a single disk
- With N disks, only 1 disk worth of space to store data

### RAID 4 - Striping with dedicated parity

![lec18-raid4.png](RAID4)

- One disk dedicated to contain **parity** information, computed e.g. using XOR
- Purpose: reliability & fast read performance
- Tolerant of a single disk failure
- With N disks, only N - 1 are used for data
- Not common:
  - Write is slow, since parity disk is a bottleneck
  - Parity disk also wears out faster than the other disks in the array

### RAID 5 - Striping with distributed parity

![lec18-raid5.png](RAID5)

- Similar to RAID 4 but parity is **distributed among all disks**.
- Purpose: Reliability, fast read and write performance, but not as fast as RAID 0
- Tolerant of a single disk failure
- WIth N disks, only N - 1 space is used for data
- Common when both performance and redundancy is needed

### RAID 6 - Striping with double distributed parity

![lec18-raid6.png](RAID6)

- Similar to RAID 5, but doubles the amount of partity (more complicated than XOR)
- Purpose: reliability, fast read/write performance
- Tolerant of 2 simultaneous disk failures
- With N disks, only N - 2 space is used for data
- Usage: same as RAID 5, but when data is very important

### RAID 1 + 0 - Striped mirrors

![lec18-raid10.png](RAID10)

- aka RAID 10 is an example of hybrid/nested RAID
  - Nests RAID 1 in RAID 0 configuration
  - Simplest form: 4 disks, 2 groups of 2
- Purpose: very fast & very reliable. Combines advantages of RAID 0 and RAID 1.
- In simplest form, it can survive a least 1 disk failure.
- Common for high-performance uses where data cannot be lost (databases)
- Cant tune redundancy to 3, 4, 5 simultaneous failures.

Consider RAID 10 that has N groups of RAID 1 and each group has M disks, i.e. total number of disks = M * N. It can survive at least M - 1 simultaneous disk failures, but potentially up to N(M - 1) failures. Read performance potentially up to N * M of a single disk, write performance is N times higher. Only N disks worth of space are used for data out of N * M, so it's very expensive RAID. Other nested RAIDs are possible: RAID 5+0, RAID 6+0, RAID 10+0.
