---
title: 'Stack Protection: Continued'
date: '2019-09-20'
description: ''
published: false
tags: ['cpsc525']
---

## `gcc` Stack Protection

`gcc` performs runtime tests for stack integrity. Embed canaries in stack frames and verify their integrity prior to function return

### Stack Ornithology: Canaries types

Three common species of stack canary:

- **Random canaries**: random string chosen at program launch
- **Terminator canaries**: a string terminator (e.g. `\0`)
- **Random XOR canaries**: random canary XORed with some function of the control data (return address, frame pointer, etc)

<!--
#TODO: Finish GS cookie stuff
-->
