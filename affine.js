import {
  sinhSoNguyenToNgauNhien,
  kiemTra2soNTCungNhau,
  VIETNAMESE_ALPHABET,
  N,
} from "./helper.js";
import phanTuNghichDao from "./phanTuNghichDao.js";

//! 7 - Hàm mã hóa và giải mã theo thuật toán Affine
const sinhKhoaK_Affine = () => {
  const b = sinhSoNguyenToNgauNhien();
  let a = sinhSoNguyenToNgauNhien();

  while (!kiemTra2soNTCungNhau(a, N)) {
    a = sinhSoNguyenToNgauNhien();
  }

  console.log("kiemTra2soNTCungNhau(a, N) :>> ", kiemTra2soNTCungNhau(a, N));

  console.log("sinhKhoaK_Affine: K = {a,b} = ", { a, b });

  return { a, b };
};

const maHoaAffine = (plaintext = "", a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }

  plaintext = plaintext.trim();

  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(plaintext[i]);
    if (index === -1) {
      ciphertext += plaintext[i];
    } else {
      const newIndex = (a * index + b) % N;
      ciphertext += VIETNAMESE_ALPHABET[newIndex];
    }
  }

  return ciphertext;
};

const giaMaAffine = (ciphertext = "", a, b) => {
  if (typeof a !== "number" || typeof b !== "number" || a === 0 || b === 0) {
    throw new Error("Tham số đầu vào không hợp lệ");
  }

  ciphertext = ciphertext.trim();
  let plaintext = "";

  const phanTuNghichDaoA = phanTuNghichDao(a, N);

  for (let i = 0; i < ciphertext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(ciphertext[i]);
    if (index === -1) {
      plaintext += ciphertext[i];
    } else {
      let newIndex = (index - b) * phanTuNghichDaoA;

      //
      while (newIndex < 0) {
        newIndex += N;
      }
      newIndex %= N;
      plaintext += VIETNAMESE_ALPHABET[newIndex];
    }
  }
  return plaintext;
};

console.log("=== Mã hóa ===");
const chuoiCanMaHoaAffine = "Dương Văn Dũng, Bắc Giang, Việt Nam";
const { a, b } = sinhKhoaK_Affine(); // Tạo khóa K = {a,b} thoa man gcd(a, N) = 1, với N = 178

const c1 = maHoaAffine(chuoiCanMaHoaAffine, a, b);
console.log(`maHoaAffine(${chuoiCanMaHoaAffine}, ${a}, ${b}) :: `, c1);

console.log("\n=== Giải mã ===");
const p1 = giaMaAffine(c1, a, b);
console.log(`giaMaAffine(${c1}, ${a}, ${b}) :: `, p1);
