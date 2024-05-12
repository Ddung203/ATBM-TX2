// Hàm chuyển đổi hex sang nhị phân
function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(64, "0");
}

// Hàm chuyển đổi nhị phân sang hex
function bin2hex(bin) {
  return parseInt(bin, 2).toString(16).toUpperCase();
}

// Hàm thực hiện phép dịch vòng sang trái
function shift_left(key, shift_count) {
  const shifted_key = key.slice(shift_count) + key.slice(0, shift_count);
  return shifted_key;
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

// Hàm tạo khóa DES
function generateDESKey() {
  const initial_key = "133457799BBCDFF1"; // Khóa ban đầu 64 bit (hex)
  const key_bin = hex2bin(initial_key);

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
function encryptDES(plain_text, keys) {
  // TODO: Thực hiện mã hóa DES
}

// Hàm giải mã DES
function decryptDES(cipher_text, keys) {
  // TODO: Thực hiện giải mã DES
}

// Sử dụng
const keys = generateDESKey();
console.log("Keys: ", keys);
