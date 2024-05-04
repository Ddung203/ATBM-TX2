// ! 1 - Hàm tìm UCLN của 2 số
const gcd = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Tham số phải là số");
  }
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
};

//! 2 - Hàm kiểm tra 2 số có phải là số nguyên tố cùng nhau hay không
const kiemTra2soNTCungNhau = (a, b) => {
  return gcd(a, b) === 1;
};

//! 3 - Hàm tính a mũ -1 mod b (Tìm phần tử nghịch đảo)
const phanTuNghichDao = (a, b) => {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    !kiemTra2soNTCungNhau(a, b)
  ) {
    throw new Error(
      "Tham số đầu vào không hợp lệ, không thể tìm phần tử nghịch đảo"
    );
  }

  let r_i_tru_2 = b;
  let r_i_tru_1 = a;

  let x_i_tru_2 = 0;
  let x_i_tru_1 = 1;

  for (let i = 1; r_i_tru_1 !== 1; i++) {
    let q = Math.floor(r_i_tru_2 / r_i_tru_1);
    // console.log("r_i_tru_2 | r_i_tru_1 :: ", r_i_tru_2, r_i_tru_1);

    let tmp_r = r_i_tru_1;
    r_i_tru_1 = r_i_tru_2 - q * r_i_tru_1;
    r_i_tru_2 = tmp_r;

    let tmp_x = x_i_tru_1;
    x_i_tru_1 = x_i_tru_2 - q * x_i_tru_1;
    x_i_tru_2 = tmp_x;
  }

  return x_i_tru_1;
};

// console.log("phanTuNghichDao(18,23) = 9 =  ", phanTuNghichDao(18, 23));
// console.log("phanTuNghichDao(18,23) = 9 =  ", phanTuNghichDao(6, 8)); // Không thể tìm phần tử nghịch đảo vì không phải 2 số nguyên tố cùng nhau

//! 4 - Hàm tính a^b mod n

function he2sangHe10(number) {
  if (number === 0) {
    return "0";
  }

  let binary = "";

  while (number > 0) {
    binary = (number % 2) + binary;
    number = Math.floor(number / 2);
  }

  // return Number(binary);
  return binary;
}

const a_mu_b_mod_n = (a, b, n) => {
  if (typeof a !== "number" || typeof b !== "number" || typeof n !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }
  // console.log(`${a}^${b} mod ${n} = `);

  if (b === n) {
    return a % n;
  }

  const binaryArray = he2sangHe10(b).split("");

  let f = 1;
  for (let i = 0; i < binaryArray.length; i++) {
    f = (f * f) % n;

    if (binaryArray[i] === "1") {
      f = (f * a) % n;
    }
  }

  return f;
};

// console.log(a_mu_b_mod_n(5, 37, 23));
// console.log(a_mu_b_mod_n(7, 560, 561));
// console.log(a_mu_b_mod_n(3, 5, 5));

//! 5 - Hàm mã hóa và giải mã theo thuật toán Caesar

// Ma hoa: Ek (i) = (i + k) mod N
// Ma hoa: Dk (i) = (i - k) mod N

const VIETNAMESE_ALPHABET =
  "aAáÁạẠàÀảẢãÃăĂắẮặẶằẰẳẲẵẴâÂấẤậẬầẦẩẨẫẪbBcCdDđĐeEéÉẹẸèÈẻẺẽẼêÊếẾệỆềỀểỂễỄgGhHiIíÍịỊìÌỉỈĩĨkKlLmMnNoOóÓọỌòÒỏỎõÕôÔốỐộỘồỒổỔỗỖơƠớỚợỢờỜởỞỡỠpPqQrRsStTuUúÚụỤùÙủỦũŨưƯứỨựỰừỪửỬữỮvVxXyYýÝỵỴỳỲỷỶỹỸ"; // Z_178

const N = VIETNAMESE_ALPHABET.length;

const maHoa = (plaintext = "", key) => {
  if (typeof key !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }

  plaintext = plaintext.trim();

  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(plaintext[i]);
    if (index === -1) {
      ciphertext += plaintext[i];
    } else {
      const newIndex = (index + key) % N;
      ciphertext += VIETNAMESE_ALPHABET[newIndex];
    }
  }

  return ciphertext;
};

const giaMa = (ciphertext = "", key) => {
  if (typeof key !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }

  ciphertext = ciphertext.trim();

  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(ciphertext[i]);
    if (index === -1) {
      plaintext += ciphertext[i];
    } else {
      const newIndex = (index - key) % N;
      plaintext += VIETNAMESE_ALPHABET[newIndex];
    }
  }

  return plaintext;
};

const plaintext1 = "HANOI";
const plaintext2 = "Việt Nam";
const plaintext3 = "Dương Văn Dũng";

const ciphertext1 = maHoa(plaintext1, 3);
const ciphertext2 = maHoa(plaintext2, 5);
const ciphertext3 = maHoa(plaintext3, 7);

const plaintext_1 = giaMa(ciphertext1, 3);
const plaintext_2 = giaMa(ciphertext2, 5);
const plaintext_3 = giaMa(ciphertext3, 7);

// console.log("=== Mã hóa ===");
// console.log(`maHoa(${plaintext1},  3) :>> `, ciphertext1);
// console.log(`maHoa(${plaintext2},  5) :>> `, ciphertext2);
// console.log(`maHoa(${plaintext3},  7) :>> `, ciphertext3);

// console.log("=== Giải mã ===");
// console.log(`giaMa(${ciphertext1}, 7); :>> `, plaintext_1);
// console.log(`giaMa(${ciphertext2}, 7); :>> `, plaintext_2);
// console.log(`giaMa(${ciphertext3}, 7); :>> `, plaintext_3);

//! 6 - Hàm tạo ra 2 số nguyên tố khác nhau có 6 chữ số
const ktraSoNguyenTo = (number) => {
  if (typeof number !== "number" || number !== Math.floor(number)) {
    throw new Error("Tham số đầu vào không hợp lệ");
  }
  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) return false;
  }

  return number >= 2;
};

//! 6.1 - Hàm tạo số nguyên tố có 6 chữ số ngẫu nhiên
const sinhSoNguyenToNgauNhien = () => {
  let min = 100000;
  let max = 999999;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while (!ktraSoNguyenTo(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return randomNumber;
};

//! 7 - Hàm mã hóa và giải mã theo thuật toán Affine
const sinhKhoaK_Affine = () => {
  const b = sinhSoNguyenToNgauNhien();
  let a = sinhSoNguyenToNgauNhien();

  while (!kiemTra2soNTCungNhau(a, N)) {
    a = sinhSoNguyenToNgauNhien();
  }

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
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Tham số đầu vào không hợp lệ");
  }
  ciphertext = ciphertext.trim();
  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(ciphertext[i]);
    console.log("index :>> ", index);
    if (index === -1) {
      plaintext += ciphertext[i];
    } else {
      const newIndex = ((index - b) * phanTuNghichDao(a, N)) % N;
      // const newIndex = (((index - b) % N) * phanTuNghichDao(a, N)) % N;
      console.log("newIndex :>> ", newIndex);
      plaintext += VIETNAMESE_ALPHABET[newIndex];
    }
  }
  return plaintext;
};

console.log("=== Mã hóa ===");
const chuoiCanMaHoaAffine = "Dương Văn Dũng, Bắc Giang, Việt Nam";
const { a, b } = sinhKhoaK_Affine(); // Tạo khóa K = {a,b} thoa man gcd(a, N) = 1, N = 178

const c1 = maHoaAffine(chuoiCanMaHoaAffine, a, b);
console.log(`maHoaAffine(${chuoiCanMaHoaAffine}, ${a}, ${b}) :: `, c1);

console.log("\n=== Giải mã ===");
const p1 = giaMaAffine(c1, a, b);
console.log(`giaMaAffine(${c1}, ${a}, ${b}) :: `, p1);

//! 8 - Hàm mã hóa và giải mã theo thuật toán DES

const sinhKhoaK_DES = (a, b) => {};

const maHoaDES = (plaintext = "", key) => {
  if (typeof key !== "number") {
    throw new Error("Tham số đầu vào không h��p lệ");
  }
  plaintext = plaintext.trim();

  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i++) {
    const index = VIETNAMESE_ALPHABET.indexOf(plaintext[i]);
    if (index === -1) {
      ciphertext += plaintext[i];
    } else {
      const newIndex = (index + key) % N;
      ciphertext += VIETNAMESE_ALPHABET[newIndex];
    }
  }

  return ciphertext;
};

// ! 8.2 - DES, dùng thư viện crypto-js

import CryptoJS from "crypto-js";

// Define DES class
class DES {
  constructor(key) {
    // Initialize DES with key
    this.key = CryptoJS.enc.Hex.parse(key);
  }

  encrypt(plaintext) {
    // Perform DES encryption on plaintext
    const encrypted = CryptoJS.DES.encrypt(plaintext, this.key, {
      mode: CryptoJS.mode.ECB,
    });

    // Return ciphertext as hex string
    return encrypted.ciphertext.toString();
  }

  decrypt(ciphertext) {
    // Parse ciphertext from hex string
    const ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);

    // Perform DES decryption on ciphertext
    const decrypted = CryptoJS.DES.decrypt(
      { ciphertext: ciphertextHex },
      this.key,
      { mode: CryptoJS.mode.ECB }
    );

    // Return decrypted plaintext as UTF-8 string
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

// Định nghĩa khóa key DES và bản rõ plaintext
const key = "0123456789abcdef";
const plaintext = "Hello, Dũng!";

// Thực hiện mã hõa DES
const des = new DES(key);
const ciphertext = des.encrypt(plaintext);
const decrypted = des.decrypt(ciphertext);

// KQ:
// console.log("Plaintext: ", plaintext);
// console.log("Ciphertext: ", ciphertext);
// console.log("Decrypted: ", decrypted);
