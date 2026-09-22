// ========================================
// KONFIGURASI AWAL
// ========================================

let saldo = 1000000;
let totalAktivitas = 0;
let totalNominal = 0;

let totalMenang = 0;
let totalKalah = 0;

const saldoAwal = 1000000;


// ========================================
// DATA GRAFIK
// ========================================

let aktivitasLabels = ["Awal"];
let saldoData = [saldoAwal];

let saldoChart = null;


// ========================================
// MENGAMBIL ELEMEN HTML
// ========================================

const saldoElement =
    document.getElementById("saldo");

const totalAktivitasElement =
    document.getElementById("totalAktivitas");

const totalNominalElement =
    document.getElementById("totalNominal");

const statusElement =
    document.getElementById("status");

const nominalElement =
    document.getElementById("nominal");

const hasilSimulasi =
    document.getElementById("hasilSimulasi");

const totalMenangElement =
    document.getElementById("totalMenang");

const totalKalahElement =
    document.getElementById("totalKalah");

const rasioKalahElement =
    document.getElementById("rasioKalah");

const perubahanSaldoElement =
    document.getElementById("perubahanSaldo");

const tingkatRisikoElement =
    document.getElementById("tingkatRisiko");

const keteranganRisikoElement =
    document.getElementById("keteranganRisiko");

const saldoChartElement =
    document.getElementById("saldoChart");


// ========================================
// TOMBOL
// ========================================

const tombol1X =
    document.getElementById("btnSimulasi");

const tombol2X =
    document.getElementById("btnSimulasi2");

const tombol5X =
    document.getElementById("btnSimulasi5");

const tombol10X =
    document.getElementById("btnSimulasi10");

const tombol50X =
    document.getElementById("btnSimulasi50");

const tombol100X =
    document.getElementById("btnSimulasi100");

const tombolReset =
    document.getElementById("btnReset");


// ========================================
// FORMAT RUPIAH
// ========================================

function formatRupiah(angka) {

    return "Rp" +
        Math.round(angka).toLocaleString("id-ID");

}


// ========================================
// MEMBUAT GRAFIK
// ========================================

if (
    typeof Chart !== "undefined" &&
    saldoChartElement
) {

    saldoChart = new Chart(
        saldoChartElement,
        {

            type: "line",

            data: {

                labels: aktivitasLabels,

                datasets: [

                    {
                        label: "Saldo Virtual",

                        data: saldoData,

                        borderWidth: 2,

                        tension: 0.3,

                        fill: false
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    x: {

                        title: {

                            display: true,

                            text: "Aktivitas"
                        }

                    },

                    y: {

                        title: {

                            display: true,

                            text: "Saldo"
                        },

                        ticks: {

                            callback: function (value) {

                                return formatRupiah(value);

                            }

                        }

                    }

                }

            }

        }
    );

}


// ========================================
// FUNGSI MENJALANKAN SATU AKTIVITAS
// ========================================

function jalankanSatuAktivitas() {

    const nominal =
        Number(nominalElement.value);


    // ========================================
    // CEK SALDO
    // ========================================

    if (nominal > saldo) {

        return false;

    }


    // ========================================
    // TOTAL AKTIVITAS
    // ========================================

    totalAktivitas++;

    totalNominal += nominal;


    // ========================================
    // HASIL SIMULASI
    // ========================================

    const angkaAcak =
        Math.random();

    let hasil;


    // Peluang menang 40%
    if (angkaAcak < 0.4) {

        const keuntungan =
            nominal * 0.8;

        saldo += keuntungan;

        totalMenang++;

        hasil = "MENANG";

    } else {

        saldo -= nominal;

        totalKalah++;

        hasil = "KALAH";

    }


    // ========================================
    // DATA GRAFIK
    // ========================================

    aktivitasLabels.push(
        "Aktivitas " + totalAktivitas
    );

    saldoData.push(
        Math.round(saldo)
    );


    return hasil;

}


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard(hasilTerakhir) {

    // Saldo
    saldoElement.textContent =
        formatRupiah(saldo);


    // Total aktivitas
    totalAktivitasElement.textContent =
        totalAktivitas;


    // Total nominal
    totalNominalElement.textContent =
        formatRupiah(totalNominal);


    // Total menang
    totalMenangElement.textContent =
        totalMenang;


    // Total kalah
    totalKalahElement.textContent =
        totalKalah;


    // Rasio kalah
    let rasioKalah = 0;

    if (totalAktivitas > 0) {

        rasioKalah =
            (totalKalah / totalAktivitas) * 100;

    }

    rasioKalahElement.textContent =
        rasioKalah.toFixed(1) + "%";


    // Perubahan saldo
    const perubahanSaldo =
        saldo - saldoAwal;

    perubahanSaldoElement.textContent =
        formatRupiah(perubahanSaldo);


    // Status
    if (totalAktivitas > 0) {

        statusElement.textContent =
            "Sedang Berjalan";

    } else {

        statusElement.textContent =
            "Belum Dimulai";

    }


    // ========================================
    // HASIL SIMULASI
    // ========================================

    if (hasilTerakhir === "MENANG") {

        hasilSimulasi.textContent =
            "Hasil simulasi terakhir: MENANG. Saldo virtual bertambah.";

    } else if (hasilTerakhir === "KALAH") {

        hasilSimulasi.textContent =
            "Hasil simulasi terakhir: KALAH. Saldo virtual berkurang.";

    }


    // ========================================
    // UPDATE ANALISIS RISIKO
    // ========================================

    updateAnalisisRisiko();


    // ========================================
    // UPDATE GRAFIK
    // ========================================

    if (saldoChart) {

        saldoChart.data.labels =
            aktivitasLabels;

        saldoChart.data.datasets[0].data =
            saldoData;

        saldoChart.update();

    }

}


// ========================================
// ANALISIS RISIKO
// ========================================

function updateAnalisisRisiko() {

    if (totalAktivitas === 0) {

        tingkatRisikoElement.textContent =
            "Belum Dianalisis";

        keteranganRisikoElement.textContent =
            "Jalankan simulasi terlebih dahulu untuk melihat hasil analisis.";

        return;

    }


    const rasioKalah =
        (totalKalah / totalAktivitas) * 100;


    // Risiko berdasarkan frekuensi aktivitas
    // dan rasio kekalahan.

    if (
        totalAktivitas >= 50 ||
        rasioKalah >= 70
    ) {

        tingkatRisikoElement.textContent =
            "Tinggi";

        keteranganRisikoElement.textContent =
            "Frekuensi aktivitas atau rasio kekalahan menunjukkan kondisi risiko yang tinggi dalam simulasi.";

    } else if (
        totalAktivitas >= 10 ||
        rasioKalah >= 50
    ) {

        tingkatRisikoElement.textContent =
            "Sedang";

        keteranganRisikoElement.textContent =
            "Aktivitas simulasi mulai menunjukkan tingkat risiko yang perlu diperhatikan.";

    } else {

        tingkatRisikoElement.textContent =
            "Rendah";

        keteranganRisikoElement.textContent =
            "Jumlah aktivitas dan rasio kekalahan masih relatif rendah dalam simulasi.";

    }

}


// ========================================
// FUNGSI MENJALANKAN BEBERAPA AKTIVITAS
// ========================================

function jalankanSimulasi(jumlah) {

    let jumlahBerhasil =
        0;

    let hasilTerakhir =
        null;


    for (
        let i = 0;
        i < jumlah;
        i++
    ) {

        const hasil =
            jalankanSatuAktivitas();


        // Kalau saldo tidak cukup
        if (hasil === false) {

            break;

        }


        jumlahBerhasil++;

        hasilTerakhir =
            hasil;

    }


    // ========================================
    // UPDATE DASHBOARD
    // ========================================

    if (jumlahBerhasil > 0) {

        updateDashboard(
            hasilTerakhir
        );

    }


    // ========================================
    // JIKA SALDO HABIS
    // ========================================

    if (saldo < 5000) {

        hasilSimulasi.textContent =
            "Saldo virtual tidak mencukupi untuk melanjutkan aktivitas.";

    }

}


// ========================================
// EVENT TOMBOL 1X
// ========================================

tombol1X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(1);

    }
);


// ========================================
// EVENT TOMBOL 2X
// ========================================

tombol2X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(2);

    }
);


// ========================================
// EVENT TOMBOL 5X
// ========================================

tombol5X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(5);

    }
);


// ========================================
// EVENT TOMBOL 10X
// ========================================

tombol10X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(10);

    }
);


// ========================================
// EVENT TOMBOL 50X
// ========================================

tombol50X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(50);

    }
);


// ========================================
// EVENT TOMBOL 100X
// ========================================

tombol100X.addEventListener(
    "click",
    function () {

        jalankanSimulasi(100);

    }
);


// ========================================
// TOMBOL RESET
// ========================================

tombolReset.addEventListener(
    "click",
    function () {

        // Kembalikan data
        saldo = saldoAwal;

        totalAktivitas = 0;

        totalNominal = 0;

        totalMenang = 0;

        totalKalah = 0;


        // Reset grafik
        aktivitasLabels = ["Awal"];

        saldoData = [saldoAwal];


        // Update dashboard
        saldoElement.textContent =
            formatRupiah(saldo);

        totalAktivitasElement.textContent =
            "0";

        totalNominalElement.textContent =
            "Rp0";

        totalMenangElement.textContent =
            "0";

        totalKalahElement.textContent =
            "0";

        rasioKalahElement.textContent =
            "0%";

        perubahanSaldoElement.textContent =
            "Rp0";

        statusElement.textContent =
            "Belum Dimulai";


        // Reset hasil
        hasilSimulasi.textContent =
            "Belum ada aktivitas simulasi.";


        // Reset analisis
        tingkatRisikoElement.textContent =
            "Belum Dianalisis";

        keteranganRisikoElement.textContent =
            "Jalankan simulasi terlebih dahulu untuk melihat hasil analisis.";


        // Reset grafik
        if (saldoChart) {

            saldoChart.data.labels =
                aktivitasLabels;

            saldoChart.data.datasets[0].data =
                saldoData;

            saldoChart.update();

        }

    }
);