import { hex2bin } from "./helper.js";

const x = "0123456789ABCDEF";
const K = "13345799BBCDDFF1"; // hex

const K_bin = hex2bin(K);

console.log("K_bin :>> ", K_bin);

const left_shift = (bin, number) => {
  let result = bin.toString();
  // console.log("result :>> ");
};

console.log(left_shift(K_bin, 1));
