function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function genKey(q) {
  let key = getRandomInt(Math.pow(10, 20), q);
  while (gcd(q, key) !== 1) {
    key = getRandomInt(Math.pow(10, 20), q);
  }
  return key;
}

function power(a, b, c) {
  let x = 1;
  let y = a % c;
  while (b > 0) {
    if (b % 2 !== 0) {
      x = (x * y) % c;
    }
    y = (y * y) % c;
    b = Math.floor(b / 2);
  }
  return x % c;
}

function encrypt(msg, q, h, g) {
  const enMsg = [];
  const k = genKey(q);
  const s = power(h, k, q);
  const p = power(g, k, q);
  for (let i = 0; i < msg.length; i++) {
    enMsg.push(msg.charCodeAt(i));
  }
  console.log("g^k used: ", p);
  console.log("g^ak used: ", s);
  for (let i = 0; i < enMsg.length; i++) {
    enMsg[i] = s * enMsg[i];
  }
  return { enMsg, p };
}

function decrypt(enMsg, p, key, q) {
  const drMsg = [];
  const h = power(p, key, q);
  for (let i = 0; i < enMsg.length; i++) {
    drMsg.push(String.fromCharCode(Math.floor(enMsg[i] / h)));
  }
  return drMsg.join("");
}

function main() {
  const msg = "encryption";
  console.log("Original Message:", msg);

  const q = getRandomInt(Math.pow(10, 20), Math.pow(10, 50));
  const g = getRandomInt(2, q);

  const key = genKey(q);
  const h = power(g, key, q);
  console.log("g used:", g);
  console.log("g^a used:", h);

  const { enMsg, p } = encrypt(msg, q, h, g);
  const drMsg = decrypt(enMsg, p, key, q);
  console.log("Decrypted Message:", drMsg);
}

main();
