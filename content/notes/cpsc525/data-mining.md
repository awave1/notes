---
title: ''
date: '2019-09-27'
description: ''
published: false
tags: ['cpsc525']
---

<!--
- `print &shellcode`
- valgrind
- objdump -t
- objdump -d // disassemble

- time of check to time of use tcttou
  - look at execvp
- env - env var attack
  - fool the sys using env vars
- overflow
  - read the first 8 bytes from the file, which is how long is the file
  - overflow buff, overwrite return addr, spawn shell
  - modify the shellcode (sh -> SH)
- format1
  - printf(buf) is target
  - goal is to pass some forbidden chars in the system(buf)
  - %n to overwrite
- format2
  - forbidden chars are on the stack
- format3
  - uses whitelist
  - put something into the whitelist
  - pipe into > /dev/null
-->
