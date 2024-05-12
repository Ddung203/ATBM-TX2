// ! 8.2 - DES, dùng thư viện crypto-js
import CryptoJS from "crypto-js";

// Define DES class
class DES {
  constructor(key) {
    // Initialize DES with key
    this.key = CryptoJS.enc.Hex.parse(key);
    // console.log("this.key :>> ", this.key);
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
// const key = "0123456789abcdef";
const key = "123";
const plaintext = "Hello, Dũng!";

// Thực hiện mã hõa DES
const des = new DES(key);
const ciphertext = des.encrypt(plaintext);
const decrypted = des.decrypt(ciphertext);

// KQ:
console.log("Plaintext: ", plaintext);
console.log("Ciphertext: ", ciphertext);
console.log("Decrypted: ", decrypted);
