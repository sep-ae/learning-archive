import "./style.css";
import {
  caesarEncrypt,
  caesarDecrypt,
  aesEncrypt,
  aesDecrypt,
  railFenceEncrypt,
  railFenceDecrypt,
} from "./crypto.js";

// routing
async function loadPage(page) {
  try {
    const res = await fetch(`/pages/${page}.html`);
    if (!res.ok) throw new Error("Halaman tidak ditemukan");

    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    initPageEvents(page);
  } catch (err) {
    document.getElementById(
      "app"
    ).innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
  }
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
  });
});

// Default page
loadPage("beranda");

// handler buat enkripsi dekripsi
function initPageEvents(page) {
  if (page === "encrypt") {
    const encryptBtn = document.getElementById("encryptBtn");
    encryptBtn?.addEventListener("click", () => {
      const text = document.getElementById("plaintext").value.trim();
      if (!text) return;

      // 1. Caesar
      const caesar = caesarEncrypt(text);

      // 2. AES
      const { ciphertext, key } = aesEncrypt(caesar);

      // 3. Rail Fence 
      const numRails = (key.length % 7) + 2;
      const keyEnc = railFenceEncrypt(key, numRails);

      // Output
      document.getElementById("ciphertext").textContent = ciphertext;
      document.getElementById(
        "aesKeyEnc"
      ).textContent = `${keyEnc} (rails=${numRails}, len=${text.length})`;
    });
  }

  if (page === "decrypt") {
    const decryptBtn = document.getElementById("decryptBtn");
    decryptBtn?.addEventListener("click", () => {
      const ciphertext = document.getElementById("ciphertext").value.trim();
      const keyEncInput = document.getElementById("aesKeyEnc").value.trim();
      if (!ciphertext || !keyEncInput) return;

      try {
        // Extract metadata
        const [keyEnc, info] = keyEncInput.split(" (rails=");
        const rails = parseInt(info.split(",")[0]);
        const lengthPlain = parseInt(info.split("len=")[1]);

        // 1. Rail Fence dekripsi key
        const key = railFenceDecrypt(keyEnc, rails);

        // 2. AES dekripsi
        const caesarText = aesDecrypt(ciphertext, key);

        // 3. Caesar dekripsi
        const plain = caesarDecrypt(caesarText, lengthPlain);

        document.getElementById("plaintext").textContent = plain;
      } catch (err) {
        document.getElementById(
          "plaintext"
        ).textContent = `Error decrypt: ${err.message}`;
      }
    });
  }
}
