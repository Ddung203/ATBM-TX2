function xor(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return result.toString().replace(/,/g, "");
}

export default xor;

// console.log(
//   'xor("1100", "0000") :>> ',
//   xor(
//     "0000000000000000000000000000000000000000000000000000000000000001",
//     "0000000000000000000000001000000000000000000000000000000000000000"
//   )
// );
