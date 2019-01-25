---
title: 'System calls'
date: '2019-01-24'
description: ''
published: false
tags: ['cpsc457']
---

OS provides services to application, e.g. access to hardware, via higher level abstractions, resource management. These OS services are accessible through **system calls**, aka kernel calls, usually handled via **traps** (software interrupts).

## System Calls

When an application wants to access a service/resource of the system, the application must make an appropriate **system call**, call a routine by the OS. It is done using **traps**.

Trap is a special CPU instruction that switches from user mode to kernel mode. A trap invokes a pre-defined trap handler, registered by kernel.

Inside trap handler:

- OS saves application state
- OS does the requested operation
- OS switches back to user mode and restores application state

From application perspective, making a system call is just like calling any other routine.

System calls provide an interface to the services made available by OS:

- API provided by the OS
- Interface for system calls varies from OS to OS

### Libraries and system calls

System calls are minimalistic and not easy to use. Usually they are implimented in assembly, optimized for performance. System call number and parameters usually passed in registers.

```asm
mov eax, 4   ; system call # (sys_write)
mov ebx, 1   ; fd = stdout
mov edx, 4   ; message length
mov ecx, msg ; pointer to message
int 0x80     ; trap
```

Quite inconvenient to use from higher level languages. Preferred way to make system calls through higher-level wrappers, e.g. `libc`, `libstdc++`, `libc++`.

A library can provide a set of functions (API). APIs hide implementation details of system calls, making system calls via wrappers is more convenient.

#### Example: `printf()`

- `write()` prepares arguments in registers
- `write()` calls the `write` system call
- `write()` takes the value returned by `write` and passes back to the caller

`printf()` does some formatting and then system calls `write`

![`printf()`](lec4-printf.png)

#### Syscalls in C

| call                                   | description                               |
|----------------------------------------|-------------------------------------------|
| `fd = open(file, how, ...)`            | open a file for reading, writing, or both |
| `s = close(fd)`                        | close an open file                        |
| `n = read(fd, buffer, nbytes)`         | read data from a file into a buffer       |
| `n = write(fd, buffer, nbytes)`        | write data from a buffer into a file      |
| `position = lseek(fd, offset, whence)` | move the file pointer                     |
| `s = stat(name, &buf)`                 | get file metainfo                         |

System calls can be traced using `strace` (linux) or `dtruss` (macos).

<!-- why open a file and then read it? -->
<!--- open is more expensive, read reuses whatever open has done.-->
<!--- convenience. Always read from the beginning of the file-->
