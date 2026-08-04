/*****************************************************************
 * Koleksi Lirik Lagu
 * app.js
 * Versi : 2.0.0
 *****************************************************************/

"use strict";

//======================================================
// KONFIGURASI API
//======================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzN0W89iePeErACIJaQZ0kHzsH1WR_s2QuzTBR-pfSotJwH1NhJkSIvRQLRUsRUoeNS/exec?page=api";

let daftarLagu = [];

//======================================================
// START
//======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadDaftarLagu();

    document
        .getElementById("cari")
        .addEventListener("input", cariLagu);

});

//======================================================
// LOAD DATA
//======================================================

async function loadDaftarLagu() {

    const daftar = document.getElementById("daftarLagu");

    daftar.innerHTML = "Memuat daftar lagu...";

    try {

        const response = await fetch(API_URL);

        daftarLagu = await response.json();

        tampilkanDaftar(daftarLagu);

        document.getElementById("content").innerHTML = `
            <h2>Selamat Datang</h2>
            <p>Total Lagu : <b>${daftarLagu.length}</b></p>
            <p>Silakan pilih lagu di sebelah kiri.</p>
        `;

    }

    catch(err){

        daftar.innerHTML = "Gagal mengambil data.";

        console.error(err);

    }

}

//======================================================
// DAFTAR LAGU
//======================================================

function tampilkanDaftar(data){

    const daftar = document.getElementById("daftarLagu");

    daftar.innerHTML = "";

    if(data.length===0){

        daftar.innerHTML = "<p>Tidak ada lagu.</p>";

        return;

    }

    data.forEach((lagu,index)=>{

        const item=document.createElement("div");

        item.className="item-lagu";

        item.innerHTML="🎵 "+lagu[2];

        item.onclick=()=>tampilkanLirik(index);

        daftar.appendChild(item);

    });

}

//======================================================
// TAMPILKAN LIRIK
//======================================================

function tampilkanLirik(index){

    const lagu=daftarLagu[index];

    const judul=lagu[2] || "-";

    const kelompok=lagu[3] || "-";

    const album=lagu[4] || "-";

    const pencipta=lagu[5] || "-";

    const lirik=(lagu[6] || "")
        .replace(/\n/g,"<br>");

    const youtube=lagu[7] || "";

    let tombolYoutube="";

    if(youtube!=""){

        tombolYoutube=`
        <br><br>
        <a
            href="${youtube}"
            target="_blank"
            class="youtubeButton">
            ▶ Buka di YouTube
        </a>
        `;

    }

    document.getElementById("content").innerHTML=`

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
// PENCARIAN
//======================================================

function cariLagu(){

    const keyword=document
        .getElementById("cari")
        .value
        .toLowerCase();

    const hasil=daftarLagu.filter(lagu=>{

        return(

            String(lagu[2]).toLowerCase().includes(keyword)

        );

    });

    tampilkanDaftar(hasil);

}
