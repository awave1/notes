#include <stdio.h>
#include <unistd.h>

int main() {
  // create & run child process - a duplicate of parent and remember the return value
  pid_t pid = fork();

  // both parent and child will execute the next line, but will have different value for pid
  // 0 for child
  // non-zero for parent
  printf("PID: %d\n", pid);
}
