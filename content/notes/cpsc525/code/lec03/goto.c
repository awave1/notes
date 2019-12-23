// this is goto.c

#include <stdio.h>

void main() {
  printf("Hello, ");
  goto world;
  printf("cruel ");
world:
  printf("world!\n");
}
