---
title: ''
date: '2019-09-23'
description: ''
published: false
tags: ['cpsc525']
---

## Format String Vulnerabilities

`printf` has no idea how many arguments was passed to it.

```c
#include <stdio.h>

int main() {
  printf("%s", "hello", "world");
}
```

```
Stackframe for the printf("%s", "hello", "world");

--------------
pointer to "world"
--------------
pointer to "hello"
--------------
pointer to "%s"
--------------
return address
--------------
frame pointer
--------------
local vars
--------------
```

Assume a stack frame for `main()`

```
--------------        main(argc, argv)
argv
--------------
argc
--------------
return address
--------------
frame pointer
--------------
random canary
--------------
terminator canary
--------------         printf(...)
int
--------------
pointer to "%d%p"      // will print the address of terminator canary
                       // changing it to "%d%p%p" will print random canary
--------------
```
