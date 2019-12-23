int printcat(char *str1, char *str2, unsigned short size1, unsigned short size2) {
  char buffer[16];
  unsigned short lentotal = size1 + size2;
  if (lentotal > 16) {
    return -1;
  }
  strncpy(buffer, str1, size1);
  strncpy(buffer + size1, str2, size2);
  printf("%s\n", buffer);
  return 0;
}
void main(int argc, char *argv[]) { printcat(argv[1], argv[2], atoi(argv[3]), atoi(argv[4])); }
