/*****************************************************************
 * Koleksi Lirik Lagu
 * app.js
 * Versi : 1.0.0
 *****************************************************************/

"use strict";

/* ============================================================
   Konfigurasi
============================================================ */

const APP = {
    version: "1.0.0",
    nama: "Koleksi Lirik Lagu",
    api: "",
    data: [],
    favorit: [],
    history: []
};

/* ============================================================
   Inisialisasi
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    console.log(APP.nama + " v" + APP.version);

    inisialisasi();

});

/* ============================================================
   Fungsi Awal
============================================================ */

function inisialisasi() {

    tampilPesan(
        "Frontend GitHub Pages berhasil dijalankan."
    );

}

/* ============================================================
   Menampilkan Pesan
============================================================ */

function tampilPesan(teks) {

    const content = document.getElementById("content");

    if (!content) return;

    content.innerHTML = `
        <h2>Selamat Datang</h2>
        <p>${teks}</p>
    `;

}

/* ============================================================
   Placeholder
============================================================ */

function loadDaftarLagu() {

    console.log("Tahap API belum diaktifkan.");

}

function cariLagu() {

    console.log("Pencarian belum diaktifkan.");

}
