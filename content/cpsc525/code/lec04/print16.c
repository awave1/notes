// this is print16.c

#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
  char *temp_buff = "unused buffer";
  char buffer[16];
  strncpy(buffer, argv[1], sizeof(buffer));
  printf("%s\n", buffer);
}