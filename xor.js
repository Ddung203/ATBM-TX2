function xor(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return result.toString().replace(/,/g, "");
}

console.log('xor("1100", "0000") :>> ', xor("1101", "1100"));
