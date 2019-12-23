#include <stdio.h>
#include <string.h>

int auth() {
  int r;
  char pwd[8 + 1] = "passw0rd";
  char buff[8 + 1];
  gets(buff);
  r = memcmp(pwd, buff, sizeof(pwd));
  return !r;
}

int main() {
  if (auth()) {
    printf("match\n");
  }
  return 0;
}