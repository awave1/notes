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

## Exploiting a real program

It's trivial to execute the above attack if we control the source code. However, if we don't control the source code, how do we find the return address on the stack? (which is dependent and based on CPU, OS, compiler flags, etc.)

- Where do we locate code to spawn a shell?
  - write it into a buffer we're overflowing
  - exploit it to an environment variable
  - pass it to the program via `argv`
- How do we find the return address on the stack?
  - trial and error
  - debugger / disassembler
  - repeat return address many times, hope for the best

### NOPs

```c
int i = 0;
i + 1; // add 1 to i; discard result
; // NULL statement
{} // empty block
for (int i = 0; i < 100; i++) { } // NOP 100 times
for (int i = 0; i < 100; i++); // NOP 100 times
(void) 0; // cannonical NOP in C
char *nop = "\x90"; // x86 NOP
```

If we don't know the exact address of shellcode, we can use **NOP sled**; that is, pad the start of the shellcode with a bunch of NOPs. If we return to _any_ address in the sequesce of NOPs, execution flow will slide into the shellcode.

```c
#include <stdio.h>
#include <string.h>

int auth() {
  int r;
  char pwd[8 + 1] = "passw0rd";
  char buff[8 + 1];
  gets(buff);
  r = memcmp(pwd, buff, sizeof(pwd));
  return !r;
}

int main() {
  if (auth()) {
    printf("match\n");
  }
  return 0;
}
```

## Off-by-one faults

```c
v
```

The frame pointer overwrite (paper)

## Exploiting buffer overflows in the wild

How do you find buffer overflows? Only if it's available, examine the source code. Otherwise, disassemble binary, perform fuzz testing. When fuzz testing:

- send malformed inputs (e.g. ending in unexpected characters, like `"$$$$"`)
- wait for program to crash
- search core dump for input characters (`"$$$$"`).
