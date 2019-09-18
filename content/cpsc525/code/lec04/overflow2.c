#include <stdio.h>

void foo() {
  char buffer[8];
  int *ret = buffer + 24; // address of `buffer` on the stack + 24
  (*ret) += 1;            // pointer, follow the pointer
}

int main() {
  int x = 0;
  foo();
  x = 1;
  printf("%d\n", x);
}