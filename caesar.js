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

console.log("=== Mã hóa ===");
console.log(`maHoa(${plaintext1},  3) :>> `, ciphertext1);
console.log(`maHoa(${plaintext2},  5) :>> `, ciphertext2);
console.log(`maHoa(${plaintext3},  7) :>> `, ciphertext3);

console.log("=== Giải mã ===");
console.log(`giaMa(${ciphertext1}, 7); :>> `, plaintext_1);
console.log(`giaMa(${ciphertext2}, 7); :>> `, plaintext_2);
console.log(`giaMa(${ciphertext3}, 7); :>> `, plaintext_3);
