// this is print16b.c

#include <stdio.h>
#include <string.h>

int main(int argc, char ** argv) {
   char buffer[16];
   char buffer2[] = "this buffer is not used";
   strncpy(buffer, argv[1], sizeof(buffer));
   printf("%s\n", buffer);
}
