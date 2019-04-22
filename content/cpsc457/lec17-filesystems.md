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
- character special files: for I/O on character devices, `/dev/random`
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

### Open files

OS needs to manage open files, and allow fast access to data in these files. To do this, OS keeps several data structures in memory.

- **Open-file table**: Tracks open files, per-process tables, and a system-wide table.
  - **file pointer**: pointer to last read/write location, per process.
  - **file-open count**: number of times a file is open - to allow removal of data from open-file table when last process closes it, system wide.
  - permissions, pointer to file contents, system wide.

OS keeps various information related to filesystems in various data structures (in memory), to make FS management possible as well as to improve performance. Examples:

- system-wide open-file table: entry for each open file, e.g. starting block number
- per-process open-file table: pointers into system-wide open-file table + file pointer
- mount table: information about each monted volume
- buffer cache: caches FS blocks, to reduce the number of raw reads/write to files, to speed up access to frequently accessed directories, etc.

### Sequential and random file access

There are two general types of accessing files: **sequential & random**. It applies for both reading and writing.

**Sequential access**

Bytes in the file are accessed sequentially, from beginning to end; no skipping, no out-of-order access, although files usually can be rewound.

**Random access**

Bytes can be accessed in any order. Usually implemented via `seek` API.

### Directories

A filesystem is a _collection of files_, where files are the basic units in a filesystem. **Directories** are used to organize files hierarchically.

- Root node of the tree is the **root directory**.
- Internal nodes = directories, leaf nodes = files.
- Path in a tree = filepath.

Directory is usually implemented as a special file. Directory file contains **directory entries**. Entry contains file attributes, filename, size, etc. Entries can represent a file or a directory (_subdirectory_). If subdirectories not allowed, then it is a **single-level directory** system. If subdirectories are allowed, then it is a **hierarchical directory** system.

## Disk partitions

A physical disk can be subdivided into separate regions, called _partitions_. Partition is an abstraction, creaating illusion that there are more disks. OS can manage partitions independently, as if they were separate disks. Information about partitions is stored in a _partition table_.

### Partition and mounting

Partition can be formatted to contain a filesystem, it must be mounted to access. Or it can stay raw (unformatted). **Root partition** with a filesystem contains the OS, mounted at a boot time as root directory `/`.

### Filesystem blocks

Filesystems split files up into fixed-sized blocks. File sizes are sized up to the nearest multiple. Most filesystems suffer from internal fragmentation. **Filesystem block** size is usually a multiple $2^n$ of the underlying _disk block_ size. FS blocks of one file not necessarily adjacent. That results in **fragmented file**, seek time performance issues. Performance and space utilization are inherently in conflict.

## Virtual file systems

**Virtual file systems** provide an 'object-oriented' way of implementing file systems. VFS allows the same system call interface (the API) to be used for different file systems. It separates generic file-system operations from implementation details. VFS implementation can be disk filesystem, RAM FS, archive FS, or even network based FS.

OS accesses all filesystems throught the same VFS interface. 

![lec17-vfs.png](VFS Structure)

### VFS Implementation

Linux implements VFS through four object types: `inode`, `file`, `superblock`, `dentry`. VFS defines set of operations on the objects that must be implemented:

- Every object has a pointer to a function table
- Function table contains addresses of routines that implement that function on that object
- example:
  - `int open(...)`: open a file
  - `int close(...)`: close an already-open file
  - `ssize_t read(...)`: read from a file
  - `ssize_t write(...)`: write to a file
  - `int mmap(...)`: memory map a file

A developer of a new FS only needs to implement VFS API. Then the FS can be mounted by Linux.

### Directory implementation

**Linear list** of file names with pointer to the file blocks:

- simple to implement
- O(n) search time
- could be maintaned in sorted order

**Hash table** - linear list with _hash_ data structure

- potentially O(1) search time
- needs good hash function to limit collisions, and the right size table
- big table -> a lot of wasted space, small table -> too many collisions
- dynamically resizable hash table could be used to solve this

Linux (ext3/ext4) uses special data structures called `htrees`.

## File allocation methods

File allocation method refers of how disk blocks are allocated to files.

### Contiguous allocation

**Contiguous allocation** - each file occupies a set of **contiguous** blocks. Results in best performance in most cases. Simple - only starting location (block #) and length (number of blocks) are required. Problems include:

- finding space for files
- either knowing file size at creation, or complications with growing a file
- external fragmentation after file deletion
- need for **compaction** offline (downtime) or online (reduced performance), aka **defragmentation**.

Contiguous allocation is not very common. Useful for tapes & read-only devices, such as CD-ROMs.

**Allocation process**

![lec17-cont-alloc.png](Contiguous allocation process)

Mapping from logical to physical address: assuming block size is a power of 2. Logical address: `[    q  |  r ]`, where `q` upper bits, `r` lower bits. Physical address computation:

$$
block = q + \text{ address of first block} \\
\text{displacement within block } = r
$$

### Linked allocation

In **linked allocation** each file is stored in a linked list of blocks. Each block contains file content plus a pointer to the next block. File ends at a block with `NULL` pointer. No external fragmentation -> no compaction needed. Separate free space management needed, e.g. linked list of free blocks. Reliability can be a problem, can lost blocks due to disk failures. **Major problem**: location a block can take many I/Os and disk sees: 1. logical address to physical address mapping requires traversing the list; 2. we could cache the next pointers, but would still need to read entire file first. We could improve efficiency by clustering blocks into larger groups, but that **increases internal fragmentation**.

**Allocation process**

[lec17-linked-alloc.png](Linked allocation process)

Example directory entry:

| filename   | start block | size |
|:----------:|:-----------:|:----:|
| `test.txt` | 10          | 2100 |

Contents of `test.txt` spread over blocks: 10, 11, 14, 5, 17. File size entry is needed, because blocks * block size != filesize.

## File Allocation Table (FAT)

FAT (File Allocation Table) is a variation of linked allocation: all next pointers are stored in a separate table (FAT). FAT can be location e.g. at the beginning or end of the FS volume. FAT is indexed by block number, you can think of it as an array: `fat[N]` contains next pointer to block `N`, where `-1` could denote `NULL` pointer. One FAT table for the entire disk. Directory entry contains index into FAT.

FAT is much like a linked list, but because all pointers stored together, FAT is faster and cache-able. Easier random acces compare to linked allocation. Issues with FAT:

- the entire table must be in memory at all times to achieve efficient random access
- table can be quite big for large disks

### Index Allocation (inodes)

Basic idea behind **index allocation** is to store a per-file FAT-like structure, then we don't need to cache pointers for all files, only the open files. Each file has its own index block(s) called `inode`s. An `inode` block contains:

- direct pointers to blocks with file contents, or more indirect pointers to even more `inode`s.
- optionally, `inode` can contain various file attributes:
  - file size in bytes, device ID, owner, permissions, timestamps, link count
  - `inode` **does not** contain a filename

`dentry` is used to associate filename with `inode`. `dentry = filename + inode*`. Possible to have different filenames associated with the same `inode`, called **hard links** (`ln <src> <target>`).

**inodes in Linux (ext2)**

Example: block size 1KB, block address 4 bytes. Single inode with 12 direct entries, max file size 12KB. If we add a single indirect pointer to inode: 1KB block can have 1KB/4B = 256 entries =. max file sisze 256 + 12 blocks = 268KB. Adding double indirect pointer as well: or 256 blocks each with 256 addresses -> max file size: $2^{16}$ blocks ~= 64MB. Adding triple indirect pointer -> max file size: $2^{24}$ blocks ~= 16GB. ext3 max file size = 2TB. ext4 max file size = 16TB (using 48 bit addresses).

---

**Advantages**:

- random access is reasonable: only need to keep the inodes for opened files in memory
- file size is not limited (practically)
- file can have holes

**Disadvantages**:

- at least one additional block is required for each file

### Hard link vs. soft link

1. create `file.txt`: `echo "yo" > file.txt`
2. create **hard link**: `ln file.txt file_hard_link.txt`. A hard link points to the same `inode`, if we delete `file.txt`, `file_hard_link.txt` will still work.
3. create **soft link**: `ln -s file.txt file_soft_link.txt`. Deleting `file.txt` breaks `file_soft_link.txt`.

Hard links can be created only to regular files; can't hard-link directories, it **could lead to cycles in FS**. Symbolic links can link to anything, can lead to cycles and broken links too (`ln -s file.txt file.txt`).

### Performance

CPU still outperforms I/O operations, whether done via HDDs or SSDs. Important to try to minimize the number of I/O operations: try to group and combine reads//writes.

## Free space management - bimaps

File systems maintain free-space list to track available blocks. Can be implemented as a bit vector or **bitmap**. OS can reserve some blocks for the bitmap. Example:

- block size = 4KiB = $2^{12}$ bytes
- disk size = 1TiB = $2^{40}$ bytes
- total number of blocks = $2^{40}/2^{12}$ = $2^{28}$ blocks
- we need $2^{28}$ bits in bitmap = $2^{25}$ bytes = 32MiB bitmap or $2^{13}$ reserved blocks
- if using clusters of 4 blocks instead -> only $2^{11}$ reserved blocks

**Cons**: requires searching the bitmap to find free space, wastes some blocks. **Pros**: fairly straightforward to obtain contiguous blocks.

---

![lec17-free.png](Free space linked list)

**Linked free space list**: free list, all free blocks are linked together, pointers stored inside the blocks. Pros: no waste of space, cons: cannot get contiguous space easily.

---

- **Grouping**
  - instead of storing just one pointer, utilize the space of the entire free block
  - store address of next n - 1 free blocks in first free block, plus a pointer to next blok that contains more free-block-pointer
- **Counting**
  - takes advantage of the fact that space is frequently contiguously used and freed
  - keep address of first free block plus the count of following free blocks
  - free list then has entries containing addresses and counts
- **Space maps**
  - divides device space into metaslab units, each representing a chunk of manageable size
  - within each metaslab, a counting algorithm is used to keep track of free space

## File locking

Provided by some operating systems and/or filesystems. Similar to reader-writer locks. **Shared lock** similar to reader lock - several processes can acquire concurrently. **Exclusive lock** similar to writer lock. Mediates access to a file to multiple processes during `open()`. Types: 1. **mandatory** - access is denied, depending on locks held and requested. 2. **advisory** - preocesses can find status of locks and decide what to do.
