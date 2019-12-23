// this is spawnshell4.c

#include <stdio.h>

int main() {
    char buf[64];
    FILE * fin = fopen("./attacker-controlled-file.txt", "r");
    int len;
    fread((void *)&len, sizeof(int), 1, fin);
    fread((void *)buf, len, 1, fin);
    //...do something with the output
}
