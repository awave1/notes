#include <stdio.h>

void foo() {
  int i;
  printf("%d%p%p%n\n", i);
  printf("%d", i);
}

int main(int argc, char const *argv[]) {
  foo();
  return 0;
}
