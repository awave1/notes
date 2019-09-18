---
title: 'Principles of Computer Security'
date: '2019-09-16'
description: ''
published: true
tags: ['cpsc525']
---

## Manipulating execution flow

<!-- ```c
void foo(char *str) {
  char buffer[4];
  strcpy(buffer, str);
}
void main() {
  char str[128];
  int i;
  for (i = 0; i < 128; ++i)
    str[i] = 'a';
  foo(str);
}
``` -->

**Attacker's goal**: exploit a buffer overflow fault to overwrite return address on stack. When function call returns, **control will be directed to instruction of attacker's choosing**.

```c
// overflow2.c

void foo() {
  char buffer[8];
  int* ret = buffer + 24; // address of `buffer` on the stack + 24
  (*ret) += 1;            // pointer, follow the pointer
}

int main() {
  int x = 0;
  foo();
  x = 1;
  printf("%d\n", x);
}
```

## "Smashing the Stack"

The process of manipulating the flow of execution is sometimes called "stack smashing".

1. Find buffer overflow flaw
2. smash the stack
3. Spawn a shell == run arbitrary commands

```c
// Spawning a shell

#include <stdlib.h>
#include <unistd.h>

int main() {
  char *name[2];
  name[0] = "/bin/sh";
  name[1] = NULL;
  execve(name[0], name, NULL);
  return 0;
}
```