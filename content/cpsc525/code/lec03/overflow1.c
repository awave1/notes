// this is overflow1.c
#include <stdio.h>
#include <string.h>

void foo(char * str) {
    char buffer[4];
    strcpy(buffer, str);
}
void main() {
    char str[128];
    int i;
    for (i=0; i<128; ++i) str[i] = 'a';
    foo(str);
}

