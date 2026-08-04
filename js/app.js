/*****************************************************************
 * Koleksi Lirik Lagu
 * app.js
 * Versi : 1.1.0
 *****************************************************************/

"use strict";

/*==============================================================
KONFIGURASI
==============================================================*/

const API_URL =
"https://script.google.com/macros/s/AKfycbzN0W89iePeErACIJaQZ0kHzsH1WR_s2QuzTBR-pfSotJwH1NhJkSIvRQLRUsRUoeNS/exec?page=api";

let daftarLagu = [];

/*==============================================================
START
==============================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadDaftarLagu();

});

/*==============================================================
LOAD DATA
==============================================================*/

async function loadDaftarLagu(){

    const daftar = document.getElementById("daftarLagu");
    const content = document.getElementById("content");

    daftar.innerHTML = "Mengambil data...";

    try{

        const response = await fetch(API_URL);

        const json = await response.json();

        daftarLagu = json.data || [];

        daftar.innerHTML = "";

        daftarLagu.forEach((lagu,index)=>{

            const item=document.createElement("div");

            item.className="item-lagu";

            item.textContent=lagu[0];

            item.onclick=()=>pilihLagu(index);

            daftar.appendChild(item);

        });

        content.innerHTML=`
            <h2>Selamat Datang</h2>
            <p>Total Lagu : <b>${daftarLagu.length}</b></p>
        `;

    }
    catch(err){

        console.error(err);

        daftar.innerHTML="Gagal mengambil data.";

        content.innerHTML=`
        <h2>Koneksi Gagal</h2>
        <p>Tidak dapat terhubung ke Apps Script.</p>
        `;

    }

}

/*==============================================================
PILIH LAGU
==============================================================*/

function pilihLagu(index){

    const lagu=daftarLagu[index];

    document.getElementById("content").innerHTML=`

        <h2>${lagu[0]}</h2>

        <pre>${lagu.join("\n")}</pre>

    `;

}

