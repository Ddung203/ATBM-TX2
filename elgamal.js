import {
  VIETNAMESE_ALPHABET,
  sinhSoNgauNhien,
  sinhSoNguyenToNgauNhien,
} from "./helper.js";
import a_mu_b_mod_n from "./a_mu_b_mod_n.js";
import phanTuNghichDao from "./phanTuNghichDao.js";

const sinhKhoa = () => {
  const p = sinhSoNguyenToNgauNhien();
  const a = sinhSoNgauNhien();
  const x = sinhSoNgauNhien();

  const y = a_mu_b_mod_n(a, x, p);

  console.log("\n1. Khoa ca nhan :>> ", { p, a, x });
  console.log("2. Khoa cong khai :>> ", { p, a, y });

  return { privateKey: { p, a, x }, publicKey: { p, a, y } };
};

const maHoaEl = (M, { p, a, y }) => {
  if (typeof M === "string") {
    let C_array = [];

    for (let i = 0; i < M.length; i++) {
      let k = sinhSoNgauNhien();

      while (k < 1 || k > p - 1) {
        k = sinhSoNgauNhien();
      }
      const K = a_mu_b_mod_n(y, k, p);

      const C_1 = a_mu_b_mod_n(a, k, p);

      let M_index = VIETNAMESE_ALPHABET.indexOf(M[i]);

      let C_2 = ((K % p) * (M_index % p)) % p;
      if (C_2 < 0) C_2 = p + C_2;

      C_array.push({ C_1, C_2 });
    }

    return C_array;
  }

  let k = sinhSoNgauNhien();
  while (k < 1 || k > p - 1) {
    k = sinhSoNgauNhien();
  }

  // console.log("\nk :>> ", k);

  const K = a_mu_b_mod_n(y, k, p);

  const C_1 = a_mu_b_mod_n(a, k, p);

  let C_2 = ((K % p) * (M % p)) % p;

  return { C_1, C_2 };
};

const giaiMaEl = ({ C_1, C_2 }, { p, a, x }) => {
  const K = a_mu_b_mod_n(C_1, x, p);
  const tmp = phanTuNghichDao(K, p);

  const m = ((C_2 % p) * (tmp % p)) % p;

  return m;
};

const giaiMaElString = (C_array, { p, a, x }) => {
  let plaintext = "";

  for (let i = 0; i < C_array.length; i++) {
    const K = a_mu_b_mod_n(C_array[i].C_1, x, p);

    const tmp = phanTuNghichDao(K, p);

    const m = ((C_array[i].C_2 % p) * (tmp % p)) % p;

    if (!VIETNAMESE_ALPHABET[m]) {
      plaintext += " ";
      continue;
    }
    plaintext += VIETNAMESE_ALPHABET[m];
  }

  return plaintext;
};

const thongDiepM = 13;

const { privateKey, publicKey } = sinhKhoa();

const C = maHoaEl(thongDiepM, publicKey);

console.log("\n3. Thông điệp: ", thongDiepM);
console.log("\nBan ma:: ", C);
console.log("Ban giai ma:: ", giaiMaEl(C, privateKey));

//!
const thongDiepString = "Dương Văn Dũng";

// const { privateKey, publicKey } = sinhKhoa();

const C_string_encrypt = maHoaEl(thongDiepString, publicKey);

console.log("\n4. Thông điệp: ", thongDiepString);
console.log("\nBan ma:: ", C_string_encrypt);

console.log("Ban giai ma:: ", giaiMaElString(C_string_encrypt, privateKey));
