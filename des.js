import shift_left from "./shift_left.js";
import taoChuoiHex from "./taoChuoiHex.js";
import { VIETNAMESE_ALPHABET } from "./helper.js";
import xor from "./xor.js";

// ! Hàm hỗ trợ
const VIETNAMESE_ALPHABET_FOR_DES = VIETNAMESE_ALPHABET + "_1234567890";

// Hàm chuyển đổi hex sang nhị phân
function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(64, "0");
}

// Hàm chuyển đổi nhị phân sang hex
function bin2hex(bin) {
  return parseInt(bin, 2).toString(16).toUpperCase();
}

// Hàm chuyển đổi thập phân sang nhị phân
function dec2bin(dec) {
  return parseInt(dec, 10).toString(2).padStart(64, "0");
}

function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

function binaryToDecimal(binaryNumber) {
  // string
  let decimalNumber = 0;
  let base = 1; // Base bắt đầu từ 2^0 = 1

  // Lặp qua từng bit của số nhị phân, bắt đầu từ phải sang trái
  for (let i = binaryNumber.length - 1; i >= 0; i--) {
    // Nếu bit là 1, thì cộng vào kết quả
    if (binaryNumber[i] === "1") {
      decimalNumber += base;
    }
    // Di chuyển sang bit tiếp theo bằng cách nhân cơ số lên 2
    base *= 2;
  }

  return decimalNumber; // number
}

// Hàm thực hiện phép hoán vị PC-1
function PC1(key) {
  const pc1_table = [
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
    27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46,
    38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
  ]; // 56

  let pc1_key = "";
  pc1_table.forEach((bit) => {
    pc1_key += key[bit - 1];
  });

  return pc1_key;
}

// Hàm thực hiện phép hoán vị PC-2
function PC2(key) {
  const pc2_table = [
    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
    20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56,
    34, 53, 46, 42, 50, 36, 29, 32,
  ]; //48

  let pc2_key = "";
  pc2_table.forEach((bit) => {
    pc2_key += key[bit - 1];
  });

  return pc2_key;
}

// Hàm thực hiện phép hoán vị IP
function IP(s64) {
  const ip_table = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
    38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 35, 17, 9,
    1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47,
    39, 31, 23, 15, 7,
  ]; //64

  let ip_s64 = "";
  ip_table.forEach((bit) => {
    ip_s64 += s64[bit - 1];
  });

  return ip_s64;
}

function IP_tru1(s64) {
  const IP_tru1_table = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
    54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60,
    28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41,
    9, 49, 17, 57, 25,
  ]; //64

  let IP_tru1_s64 = "";
  IP_tru1_table.forEach((bit) => {
    IP_tru1_s64 += s64[bit - 1];
  });

  return IP_tru1_s64;
}

// Hoan vi mo rong E
function E(s32) {
  const E_table = [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
    16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28,
    29, 28, 29, 30, 31, 32, 1,
  ]; //48

  let E_s48 = "";
  E_table.forEach((bit) => {
    E_s48 += s32[bit - 1];
  });

  return E_s48;
}

// Hoan vi mo rong E
function P(s48) {
  const E_table = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
    32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
  ];
  //32

  let P_s32 = "";
  E_table.forEach((bit) => {
    P_s32 += s48[bit - 1];
  });

  return P_s32;
}

//! Hàm tạo khóa DES
function generateDESKey() {
  // const initial_key = taoChuoiHex(16); // Khóa ban đầu 64 bit (hex)
  const initial_key = "4FC7EB652128DF2F"; // Khóa ban đầu 64 bit (hex)
  const key_bin = hex2bin(initial_key);

  console.log("Key gốc :>> ", initial_key);
  console.log("Key gốc dạng nhị phân :>> ", key_bin);

  // Phép hoán vị PC-1
  const pc1_key = PC1(key_bin); //56

  // Tạo danh sách các khóa con
  const keys = [];

  let Ci = pc1_key.slice(0, 28); // Nửa trái
  let Di = pc1_key.slice(28); // Nửa phải

  for (let i = 1; i <= 16; i++) {
    // Thực hiện dịch vòng sang trái
    Ci = shift_left(Ci, i === 1 || i === 2 || i === 9 || i === 16 ? 1 : 2);
    Di = shift_left(Di, i === 1 || i === 2 || i === 9 || i === 16 ? 1 : 2);

    // Ghép lại và thực hiện hoán vị PC-2
    const sub_key = PC2(Ci + Di);
    keys.push(sub_key);
  }

  return keys;
}

// Hàm mã hóa DES
const sbox = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],

  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],

  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],

  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],

  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],

  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],

  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],

  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];

const substitute = (input) => {
  let output = "";
  for (let i = 0; i < 48; i += 6) {
    const row = parseInt(input.substr(i, 1) + input.substr(i + 5, 1), 2);
    const col = parseInt(input.substr(i + 1, 4), 2);
    const val = sbox[i / 6][row][col];
    output += val.toString(2).padStart(4, "0");
  }
  return output;
};

const Feistel = (s32, s48) => {
  const s32_to48 = E(s32);
  // console.log('xor(s32_to48, s48) :>> ', xor(s32_to48, s48));
  return P(substitute(xor(s32_to48, s48)));
};

function encryptDES(plain_text, keys) {
  // TODO: Thực hiện mã hóa DES
  plain_text = plain_text.trim().replaceAll(" ", "_");
  let cipher_text = "";

  for (let i = 0; i < plain_text.length; i++) {
    const index = VIETNAMESE_ALPHABET_FOR_DES.indexOf(plain_text[i]);
    if (index === -1) {
      // console.log("plain_text[i] :>> ", plain_text[i]);
      throw new Error("Tham số đầu vào chứa kí tự không hợp lệ");
    } else {
      const index_bin = dec2bin(index);
      // ! Phép hoán vị IP
      const IPexec = IP(index_bin);
      let Li = IPexec.slice(0, 32); // Nửa trái
      let Ri = IPexec.slice(32); // Nửa phải

      //!
      for (let i = 1; i <= 16; i++) {
        const Ki = keys[i - 1];

        const tmp = Li;
        const tmp2 = Ri;
        Li = Ri;
        Ri = xor(tmp, Feistel(tmp2, Ki));
      }

      const R16L16 = Ri + Li;
      // console.log("R16L16 :>> ", R16L16);
      cipher_text += IP_tru1(R16L16);
    }
  }
  return cipher_text;
}

// Hàm giải mã DES
function findCharFromIndex(index) {
  const validChars = VIETNAMESE_ALPHABET_FOR_DES.split("");
  const validIndex = index % validChars.length; // Đảm bảo index luôn trong phạm vi của bảng chữ cái

  return validChars[validIndex];
}

function decryptDES(cipher_text, keys) {
  let plain_text = "";

  for (let i = 0; i < cipher_text.length; i += 64) {
    const block = cipher_text.substr(i, 64);
    // console.log("block :>> ", block);
    // Bước 1: Phép hoán vị IP
    let IP_result = IP(block);

    // Tách nửa trái và nửa phải của IP_result
    let Li = IP_result.slice(0, 32); // Nửa trái
    let Ri = IP_result.slice(32); // Nửa phải

    // Bước 2: Thực hiện vòng lặp DES ngược lại
    for (let round = 16; round >= 1; round--) {
      const Ki = keys[round - 1];

      const tmp = Li;
      const tmp2 = Ri;
      Li = Ri;
      Ri = xor(tmp, Feistel(tmp2, Ki));
    }

    // Ghép nửa trái và nửa phải và hoán vị IP ngược lại
    const decrypted_block = IP_tru1(Ri + Li);
    // console.log("decrypted_block :>> ", decrypted_block);
    const index = binaryToDecimal(decrypted_block);
    console.log("index :>> ", index);
    plain_text += findCharFromIndex(index);
    // plain_text += VIETNAMESE_ALPHABET_FOR_DES[index];
  }

  return plain_text;
}

//!
const keys = generateDESKey();

const C_text = encryptDES("HANOI", keys);

console.log("\nC_text :>> ", C_text);

console.log("\ndecryptDES() :>> ", decryptDES(C_text, keys));
