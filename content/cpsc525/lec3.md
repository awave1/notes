---
title: 'Principles of Computer Security'
date: '2019-09-13'
description: ''
published: true
tags: ['cpsc571']
---

## Buffer overread

The following code illustrates how improperly written code can be exploited. `buffer` array can only accept 16 characters, therefore if passed more than 16, the code will print information from memory from outside of assigned stack frame. This is called **buffer overread** flaw.

```c
int main(int argc, char *argv[]) {
  char buffer[16];
  strncpy(buffer, argv[1], sizeof(buffer));
  printf("%s\n", buffer);
  return 0;
}
```

#### Heartbleed (April 2014)

"Heartbleed" was a fault in OpenSSL versions released from 2012-2014. TLS Heartbeat mechanism prevents SSL/TLS timeouts when no data is being transmitted. One peer sends **random data + payload length**; other peer responds with identical payload.

Code was missing a **bounds check**, therefore an attacker can request up to 64KB from server's private memory space.

<!--TODO: Finish heartbleed-->

---

#### Apple's `goto fail;` (February 2014)

Fault in code used by OSX 10.9, iOS 6.1, to check validity of the signature key used by a server in a TLS

<!--TODO: Finish apple goto-->

## Buffer Overflows

Buffer overflows is among most commonly exploited security flaws

```c
#define BUFF_LEN 1024
char buffer[BUFF_LEN];
strcpy(buffer, argv[1]);
// or gets(buffer)
```

The `strcpy` (or `gets`) don't check whether the string they're copying actually fits in buffer. Some languages (e.g. Java) would throw an exception and crash the program. Not C/C++ - these languages don't notice something bad happened.
