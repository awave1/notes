---
title: 'Filesystems'
date: '2019-03-27'
description: ''
published: false
tags: ['cpsc457']
---

## Long term storage

Long term storage must store a very large amount of information. Information must survive termination of a process using it. Multiple processes must be able to access information concurrently. Easy way to search and manage stored information should be implemented.

## Disks _without_ filesystems

Think of a disk as a linear sequence of **fixed-sized blocks** that support two operations:

- `read-block i`
- `write-block i`

Similar to memory, however it's **block addressable**, **persistent**, and **much slower**.

In order to access information, we need a **filesystem** as an abstraction on `read-block` and `write-block`.

## Files

File is an **abstraction** of long term storage, implemented by OS. OS allows processes to see a file through contiguous logical address space. File contains a sequence of bytes, which can be individually addressed. OS maps files onto physical devices and OS (generally) does not care about the content of files.

File's creator decides on the contents of the file (its format/internal structure). We can construct higher abstractions, e.g. treat files as a sequence of bits, numbers, etc.

### File attributes

Files have contents, but also attributes. **File attributes** vary from one OS to another, but typically consist of these:

- Filename: the symbolic file name is the only information kept in human readable form
- Identifier: unique tag that identifies the file within the FS
- Special type: needed for systems that support different file types (e.g. block device)
- Location: a pointer to the location of the file contents on the device
- Size of the file
- Time/date: time of creation/last modification/last access, used for usage monitoring
- User ID, group ID: identifies owner(s) of the file
- Protection information: access control information (e.g. read/write/execute)

Many variations, including extended file attributes, such as file checksum. This information is usually kept separate from file contents, for example in the directory structure. This metadata is not stored in the same block as the file data.

### File naming

Names are given to files at creation time, but usually can be changed later as well. Different file-naming rules on different systems:

- maximum filename length
- allowed/restricted characters
- capitalization
- filename extensions, enforced vs conventions

### Special file types

Most systems have **special file types**:

- regular files: both text or binary
- directory: special files for maintaining FS structure
- ## character special files: for I/O on character devices, `/dev/random`
- block special files: for I/O on block devices `/dev/sda`
- links: pointers to other files
- sockets, pipes

### File format (file type)

Regular files can have custom types as well, aka **file format** or **file type**. It is determined by the file creator. If OS recognizes the file format, it can operate on the file in reasonable ways, e.g. automatically using an appropriate program to open a file.

Windows uses file extension to determine a file format. UNIX uses **magic number** technique to determine file format, extension, is only a convention. Format inferred by inspecting the contents of the file, often first few bytes. (e.g. `#!/usr/bin/env bash`).

### File operations

Most systems allow the following operations on regular files:

- `create`
- `delete` - (operation could be on directory)
- `open`
- `close`
- `read`
- `write`
- `append`
- `seek`
- `get attributes` - (operation could be on directory)
- `set attributes` - (operation could be on directory)
- `rename` - (operation could be on directory)

<!-- TOOD -->

### 
