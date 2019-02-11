#include <stdio.h>
#include <unistd.h>

int main() {
  printf("Hello\n");

  // Create & run child process - duplicate of parent
  fork();

  // Both parent and child will execute the next line
  printf("world.\n");
}
