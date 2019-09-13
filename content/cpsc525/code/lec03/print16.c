// this is print16.c

#include <stdio.h>
#include <string.h>

void main(int argc, char *argv[]) {
  char buffer[16];
  strncpy(buffer, argv[1], sizeof(buffer));
  printf("%s\n", buffer);
}
