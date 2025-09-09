import CryptoJS from "crypto-js";

/* ---------------- CAESAR ---------------- */
export function caesarEncrypt(text) {
  let shift = text.length % 26;
  let result = "";
  for (let char of text) {
    if (/[A-Z]/.test(char)) {
      result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
    } else if (/[a-z]/.test(char)) {
      result += String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
    } else {
      result += char; // spasi, simbol, dll tidak diubah
    }
  }
  return result;
}

export function caesarDecrypt(text, length) {
  let shift = length % 26;
  let result = "";
  for (let char of text) {
    if (/[A-Z]/.test(char)) {
      result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
    } else if (/[a-z]/.test(char)) {
      result += String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
    } else {
      result += char;
    }
  }
  return result;
}

/* ---------------- RAIL FENCE ---------------- */
export function railFenceEncrypt(text, numRails) {
  if (numRails <= 1) return text;
  let rail = Array.from({ length: numRails }, () => []);
  let dirDown = false, row = 0;

  for (let char of text) {
    rail[row].push(char);
    if (row === 0 || row === numRails - 1) dirDown = !dirDown;
    row += dirDown ? 1 : -1;
  }
  return rail.map(r => r.join("")).join("");
}

export function railFenceDecrypt(cipher, numRails) {
  if (numRails <= 1) return cipher;
  let len = cipher.length;
  let rail = Array.from({ length: numRails }, () => Array(len).fill(null));
  let dirDown, row = 0, col = 0;

  for (let i = 0; i < len; i++) {
    if (row === 0) dirDown = true;
    if (row === numRails - 1) dirDown = false;
    rail[row][col++] = "*";
    row += dirDown ? 1 : -1;
  }

  let index = 0;
  for (let i = 0; i < numRails; i++) {
    for (let j = 0; j < len; j++) {
      if (rail[i][j] === "*" && index < len) {
        rail[i][j] = cipher[index++];
      }
    }
  }

  let result = "";
  row = 0; col = 0;
  for (let i = 0; i < len; i++) {
    if (row === 0) dirDown = true;
    if (row === numRails - 1) dirDown = false;
    result += rail[row][col++];
    row += dirDown ? 1 : -1;
  }
  return result;
}

/* ---------------- AES ---------------- */
export function aesEncrypt(text) {
  const key = CryptoJS.lib.WordArray.random(16); // 128 bit random
  const ciphertext = CryptoJS.AES.encrypt(text, key.toString()).toString();
  return { ciphertext, key: key.toString() };
}

export function aesDecrypt(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
