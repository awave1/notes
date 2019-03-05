---
title: 'Interrupts, traps, kernel design, VMs'
date: '2019-01-22'
description: ''
published: true
tags: ['cpsc457']
---

## Interrupts

Interrupt can happen at any time. When interrupt happens, CPU switches to kernel mode and interrupt handler executes the interrupt. CPU state is saved by the interrupt handler before executing code in interrupt handler. After executing interrupt, CPU restores state and switches back to user mode. Source of the interrupts is usually devices.

### Software interrupts (exception/traps)

Similar to hardware interrupts but the source of the interrupt is the CPU itself. Software interrupts are handled similarly to hardware interrupts.

There are two types of software interrupts: _intentional_ and _unintentional_.

#### Unintentional interrupts

Also called **exceptions**. Occurs when CPU executes invalid instruction (e.g. accessing non-existent memory, write to ROM, division by zero). Unintentional interrupts used by OS to detect when an application attempts an illegal operation.

#### Intentional interrupts (trap)

Trap usually occurs via special instruction, e.g. `INT`. The purpose of a trap is to execute predefined routine in _kernel mode_. OS can use traps to implement system calls.

### Hardware interrupts vs Software interrupts

- **Hardware Interrupts**:
  - External event delivered to the CPU
  - Origins: I/O, timer, user input
  - Asynchronous with the current activity of the CPU
  - The time of the event is not known and not predictable
- **Software Interrupts**:
  - Internal events, e.g. system calls, exceptions
  - Synchronous with the current activity of the CPU
  - Occurs as a result of execution of a machine instruction
- Both hardware and software interrupts:
  - Invoke a kernel routine, defined by the OS
  - Put the CPU in a kernel mode
  - Save the current state of the CPU
  - Eventually resume the original operations when done

### I/O

How does the kernel handle I/O? There are two options.

- _Option 1_: busy waiting/spinning/busy looping (aka polling).
  ```
  cpu -> disk: read a file
  loop:
    cpu -> disk: u done?
    break if done
  cpu -> disk: give result
  ```
  - There are problems with is:
    - the CPU is tied up while slow I/O completes the operation $\implies$ CPU could be doing other operations
    - Power is wasted
- _Option 2_: busy wait with sleep
  ```
  cpu -> disk: read a file
  loop:
    sleep
    cpu -> disk: u done?
    break if done
  cpu -> disk: give result
  ```
  - Sleep could be detected by OS and the CPU could then run another program
  - Problems:
    - Hard to estimate the right amount of sleep
    - Program might end up running longer than necessary
- _Option 3_: Hardware interrupts
  ```
  cpu -> disk: read a file
  cpu -> disk: update when done
  cpu: sleep until interrupted
  disk -> cpu: interrupt
  cpu -> disk: give result
  ```
  - When the I/O device finishes the operation, it generates an interrupt, letting the OS know it's done, or there was an error
  - This approach assumes the I/O device supports interrupts

#### Using interrupts to do I/O

Kernel talks to the device driver to request an operation. The device driver tells the controller what to do by writing into device registers. The controller starts the device and monitors its progress. When the device is done its job, the device controller signals the interrupt controller. The interrupt controller informs the CPU and puts the device information on the bus. The CPU suspends current process and handles the interrupt by executing the appropriate interrupt handler (in kernel mode). The CPU then resumes its original process.

### Limits of interrupts

- CPU can run other programs while waiting for I/O
- CPU could be interrupted for every single byte of I/O
  - many devices/controllers have limited memory
  - these devices could generate an interrupt for every single input byte
  - interrupts take many CPU cycles to save/restore CPU state
  - useful work often a single instruction - to store the data in memory

To solve these problems, introduce a dedicated hardware to deal with interrupts - DMA chip

- DMA absorbs most interrupts
- DMA can save data directly into memory, without CPU knowing
- result is less interrupts for the CPU

#### Direct memory access (DMA)

It is a special piece of hardware on most modern systems. DMA used for bulk data movement such as disk I/O. It is usually used with slow devices so that CPU can do other things, but also could be used with extremely fast devices that could overwhelm CPU.

Device controller transfers an entire block of data directly to the main memory without CPU intervention. Only one interrupt is generated per block - to tell the device driver that the operation has completed. Used for device $\to$ memory, memory $\to$ device, and memory $\to$ memory transfers.

![DMA](lec3-dma.png)

---

## Kernel Designs

What goes into a kernel and what does not? There are trade-offs to consider:

- code in kernel runs faster, but
- big kernels have more bugs $\implies$ higher system instability

There are three main kernel designs: **monolithic kernel**(MS-DOS, Linux), **microkernels**(Mach, QNX), **hybrid kernels**.

#### Monolithic kernel

The entire OS runs as a single program in kernel mode. It is faster but more prone to bugs, harder to port, and potentially less stable.

#### Microkernel

Only essential components in kernel - running in kernel mode (essential = code that must run in kernel mode). The rest is implemented in user mode. Most likely will be less bugs, easier to port and extend, more stable, but slower.

#### Hybrid kernel

Trying to balance the cons/pros of monolithic kernels and microkernels

---

![Kernel designs](lec3-kernel-designs.png)

### Kernel modules

![Kernel modules](lec3-kernel-module.png)

Modular kernels are type of hybrid kernels, usually consist of smaller kernel with only essential components plus non-essential, dynamically loadable kernel parts - **kernel modules**. Drivers are often implemented as modules.

Modules are often loaded on demand, when needed or requested. It could be at boot time or later. Modules usually run in kernel mode.

- OS can come with many drivers but only those that needed are loaded which results in faster boot time
- No kernel recompile/reboot necessary to activate a module

### Layered approach

![Kernel layers](lec3-kernel-layers.png)

Each layer only talk to layer below or above. Layer design is slow.

## Virtual Machines

Virtual machines emulate computer systems either in software or in specialized hardware, or both. Host machine creates illusion that each guest machine has its own processor and its own hardware. **Hypervisor** - software or hardware that manages VMs. There are several types of hypervisors:

- Bare metal - runs directly on hardware
  - usually runs on big servers
  - XEN, VMWare ESX
- Hosted - runs on top of another OS. Slower that bare metal, has to communicate with hardware through OS.
  - Usually on desktops, slower
  - VMWare Player, VirtualBox
- Hybrid - using kernel itself as a hypervisor through a KVM module.

Virtual machines can save money for companies, time for developers. VMs are isolated from each other, that means a user can run different versions of same program, or run unsafe programs. VMs are perfect solution for sys admins: there's no need to setup multiple servers, instead one big server can be setup with multiple VMs. That makes it easier to maintain.

<!--Containers do not virtualize the machine, containers virtualize the OS. "each user app has it's own os"-->
