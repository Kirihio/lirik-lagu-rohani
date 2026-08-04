/*****************************************************************
 * KOLEKSI LIRIK LAGU
 * File      : js/app.js
 * Versi     : 2.1 Final
 * Developer : Selsires Kirihio
 *****************************************************************/

"use strict";

//======================================================
// KONFIGURASI
//======================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzN0W89iePeErACIJaQZ0kHzsH1WR_s2QuzTBR-pfSotJwH1NhJkSIvRQLRUsRUoeNS/exec?page=api";

let daftarLagu = [];
let daftarTampil = [];

//======================================================
// MULAI
//======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    const txtCari = document.getElementById("cari");

    if (txtCari) {
        txtCari.addEventListener("input", cariLagu);
    }

});

//======================================================
// LOAD DATA
//======================================================

async function loadData() {

    const daftar = document.getElementById("daftarLagu");

    daftar.innerHTML = "⏳ Mengambil data...";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const json = await response.json();

        if (!json.status) {
            throw new Error("Status API FALSE");
        }

        daftarLagu = json.data || [];
        daftarTampil = [...daftarLagu];

        tampilDaftar();

        document.getElementById("content").innerHTML = `
            <h2>Selamat Datang</h2>

            <p><b>Total Lagu :</b> ${json.jumlah}</p>

            <p>Silakan pilih lagu pada panel kiri.</p>
        `;

    }
    catch (err) {

        console.error(err);

        daftar.innerHTML = `
            <p style="color:red">
            Gagal mengambil data.
            </p>
        `;

        document.getElementById("content").innerHTML = `
            <h2>Koneksi Gagal</h2>

            <p>${err.message}</p>
        `;

    }

}

//======================================================
// TAMPILKAN DAFTAR
//======================================================

function tampilDaftar() {

    const daftar = document.getElementById("daftarLagu");

    daftar.innerHTML = "";

    if (daftarTampil.length === 0) {

        daftar.innerHTML = "<p>Tidak ada lagu.</p>";

        return;

    }

    daftarTampil.forEach((lagu) => {

        const item = document.createElement("div");

        item.className = "item-lagu";

        item.innerHTML = "🎵 " + lagu[2];

        item.onclick = function () {

            tampilLagu(lagu);

        };

        daftar.appendChild(item);

    });

}

//======================================================
// TAMPILKAN LAGU
//======================================================

function tampilLagu(lagu) {

    const judul = lagu[2] || "-";
    const kelompok = lagu[3] || "-";
    const album = lagu[4] || "-";
    const pencipta = lagu[5] || "-";
    const lirik = (lagu[6] || "").replace(/\n/g, "<br>");
    const youtube = lagu[7] || "";

    let tombolYoutube = "";

    if (youtube.trim() !== "") {

        tombolYoutube = `
            <br><br>

            <a
                href="${youtube}"
                target="_blank">

                ▶ Buka di YouTube

            </a>
        `;

    }

    document.getElementById("content").innerHTML = `

        <h2>${judul}</h2>

        <p><b>Kelompok :</b> ${kelompok}</p>

        <p><b>Album :</b> ${album}</p>

        <p><b>Pencipta :</b> ${pencipta}</p>

        <hr>

        <div class="lirik">

            ${lirik}

        </div>

        ${tombolYoutube}

    `;

}

//======================================================
// CARI LAGU
//======================================================

function cariLagu() {

    const keyword =
        document
        .getElementById("cari")
        .value
        .toLowerCase()
        .trim();

    if (keyword === "") {

        daftarTampil = [...daftarLagu];

    } else {

        daftarTampil = daftarLagu.filter(function (lagu) {

            return (

                String(lagu[2]).toLowerCase().includes(keyword) ||
                String(lagu[3]).toLowerCase().includes(keyword) ||
                String(lagu[4]).toLowerCase().includes(keyword)

            );

        });

    }

    tampilDaftar();

}
