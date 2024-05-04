//! 4 - Hàm tính a^b mod n

import { he10sang2 } from "./helper.js";

const a_mu_b_mod_n = (a, b, n) => {
  if (typeof a !== "number" || typeof b !== "number" || typeof n !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }
  // console.log(`${a}^${b} mod ${n} = `);

  if (b === n) {
    return a % n;
  }

  // console.log("he10sang2(b) :>> ", he10sang2(b));
  const binaryArray = he10sang2(b).split("");

  let f = 1;
  for (let i = 0; i < binaryArray.length; i++) {
    f = (f * f) % n;

    if (binaryArray[i] === "1") {
      f = (f * a) % n;
    }
  }

  // console.log("typeof f :>> ", typeof f);
  return f;
};

// console.log(a_mu_b_mod_n(5, 37, 23));
// console.log(a_mu_b_mod_n(7, 560, 561));
// console.log(a_mu_b_mod_n(3, 5, 5));

export default a_mu_b_mod_n;
