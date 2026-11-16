import React from 'react';
import { SchoolProfile } from '../types/document';
import { KopSurat, PageFooter, SignatureBlock } from './A4HeaderFooter';

interface Bagian2ViewProps {
  profile: SchoolProfile;
  startPage: number;
  totalPages: number;
  onNextSection?: () => void;
}

export const BAGIAN2_PAGE_COUNT = 5;

function getTopThreeRisks(primary: string) {
  const catalog: Record<string, { nama: string; tingkat: string; alasan: string; mitigasi: string }> = {
    'Gempa Bumi': {
      nama: 'Gempa Bumi',
      tingkat: 'Tinggi / Waspada',
      alasan: 'Wilayah Indonesia berada di zona aktif tektonik yang dapat memicu guncangan mendadak saat jam belajar.',
      mitigasi: 'Amankan lemari ke dinding, latih anak Drop-Cover-Hold On, dan pastikan jalur keluar bebas hambatan.',
    },
    Banjir: {
      nama: 'Banjir / Genangan Tinggi',
      tingkat: 'Tinggi / Musiman',
      alasan: 'Curah hujan lebat atau luapan drainase/sungai sekitar desa berisiko merendam halaman dan ruang kelas.',
      mitigasi: 'Simpan dokumen penting di rak tinggi, pantau prakiraan cuaca BMKG, dan siapkan titik jemput aman.',
    },
    Kebakaran: {
      nama: 'Kebakaran Gedung / Korsleting',
      tingkat: 'Sedang / Waspada',
      alasan: 'Penggunaan instalasi listrik, dapur sekolah, atau pembakaran sampah di sekitar lingkungan sekolah.',
      mitigasi: 'Periksa kabel listrik berkala, sediakan APAR aktif di koridor, dan matikan listrik saat sekolah tutup.',
    },
    'Tanah Longsor': {
      nama: 'Tanah Longsor / Pergerakan Tanah',
      tingkat: 'Tinggi / Musiman',
      alasan: 'Kontur tanah miring atau tebing di sekitar area sekolah berisiko bergerak saat hujan deras berkepanjangan.',
      mitigasi: 'Pantau retakan tanah di halaman, hindari bermain dekat tebing saat hujan, dan siapkan jalur evakuasi menjauhi lereng.',
    },
    'Angin Puting Beliung': {
      nama: 'Angin Kencang / Puting Beliung',
      tingkat: 'Sedang / Musiman',
      alasan: 'Peralihan musim dapat menyebabkan angin kencang yang berisiko menumbangkan pohon atau atap ringan.',
      mitigasi: 'Pangkas dahan pohon rapuh di halaman sekolah dan arahkan anak masuk kelas menjauhi kaca jendela.',
    },
  };

  if (primary === 'Tidak ada, tapi tetap siaga') {
    return [catalog['Gempa Bumi'], catalog['Kebakaran'], catalog['Banjir']];
  }

  const first = catalog[primary] || catalog['Gempa Bumi'];
  const others = Object.values(catalog).filter((item) => item.nama !== first.nama);
  return [first, others[0], others[1]];
}

export const Bagian2View: React.FC<Bagian2ViewProps> = ({
  profile,
  startPage,
  totalPages,
  onNextSection,
}) => {
  const risks = getTopThreeRisks(profile.bencanaUtama);
  const alamatLengkap = `Desa ${profile.desa}, Kecamatan ${profile.kecamatan}, Kabupaten ${profile.kabupaten}`;

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0">
      {/* HALAMAN 1 SPAB: PROFIL RISIKO, PETA JALUR EVAKUASI, STRUKTUR TIM */}
      <article id="page-b2-1" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />

          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 2 · Mengacu Permendikbudristek No. 33 Tahun 2019
            </p>
            <h2 className="font-doc-serif text-[17.5px] font-bold text-stone-950">
              SATUAN PENDIDIKAN AMAN BENCANA (SPAB)
            </h2>
          </div>

          {/* 1. Profil Risiko Bencana */}
          <div className="border border-stone-800 mb-2.5">
            <div className="bg-stone-100 border-b border-stone-800 px-3 py-1 flex items-center justify-between text-[10px]">
              <span className="font-bold uppercase tracking-wider text-stone-900">
                1. Profil Risiko Bencana {profile.namaTk} (Daerah Rawan: {profile.bencanaUtama})
              </span>
              <span className="text-stone-600">
                Alamat: {alamatLengkap}
              </span>
            </div>
            <table className="w-full text-[9.3px] border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2 py-1 font-bold w-6">No</th>
                  <th className="px-2 py-1 font-bold w-32">Jenis Bencana</th>
                  <th className="px-2 py-1 font-bold w-24">Tingkat Risiko</th>
                  <th className="px-2 py-1 font-bold">Penyebab &amp; Upaya Pencegahan Sekolah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {risks.map((r, i) => (
                  <tr key={r.nama}>
                    <td className="px-2 py-1 tabular-nums font-semibold align-top">{i + 1}.</td>
                    <td className="px-2 py-1 font-bold text-stone-900 align-top">{r.nama}</td>
                    <td className="px-2 py-1 text-stone-700 align-top">{r.tingkat}</td>
                    <td className="px-2 py-1 text-stone-800 align-top">
                      <span className="font-medium">{r.alasan}</span>{' '}
                      <span className="text-stone-600">Mitigasi: {r.mitigasi}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Tabel Peta Jalur Evakuasi dari 4 Ruang Kelas ke Titik Kumpul di Halaman */}
          <div className="border border-stone-800 mb-2.5">
            <div className="bg-stone-100 border-b border-stone-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              2. Jalur Evakuasi dari 4 Ruang Kelas Menuju Titik Kumpul di Halaman
            </div>
            <table className="w-full text-[9.2px] border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2 py-1 font-bold w-28">Ruang Asal</th>
                  <th className="px-2 py-1 font-bold">Rute Jalur Evakuasi ke Halaman</th>
                  <th className="px-2 py-1 font-bold w-16">Jarak</th>
                  <th className="px-2 py-1 font-bold w-20">Waktu</th>
                  <th className="px-2 py-1 font-bold w-28">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="px-2 py-1 font-semibold">Ruang Kelas A1</td>
                  <td className="px-2 py-1">Pintu Kelas A1 → Teras depan kiri → Titik Kumpul Halaman</td>
                  <td className="px-2 py-1 tabular-nums">± 12 m</td>
                  <td className="px-2 py-1 tabular-nums">25–35 dtk</td>
                  <td className="px-2 py-1">Guru Kelas A1</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 font-semibold">Ruang Kelas A2</td>
                  <td className="px-2 py-1">Pintu Kelas A2 → Teras tengah → Titik Kumpul Halaman</td>
                  <td className="px-2 py-1 tabular-nums">± 15 m</td>
                  <td className="px-2 py-1 tabular-nums">30–45 dtk</td>
                  <td className="px-2 py-1">Guru Kelas A2</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 font-semibold">Ruang Kelas B1</td>
                  <td className="px-2 py-1">Pintu Kelas B1 → Koridor kanan → Titik Kumpul Halaman</td>
                  <td className="px-2 py-1 tabular-nums">± 18 m</td>
                  <td className="px-2 py-1 tabular-nums">35–50 dtk</td>
                  <td className="px-2 py-1">Guru Kelas B1</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 font-semibold">Ruang Kelas B2</td>
                  <td className="px-2 py-1">Pintu Kelas B2 → Selasar samping → Titik Kumpul Halaman</td>
                  <td className="px-2 py-1 tabular-nums">± 22 m</td>
                  <td className="px-2 py-1 tabular-nums">45–60 dtk</td>
                  <td className="px-2 py-1">Guru Kelas B2</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 font-semibold">R. Guru, UKS &amp; Toilet</td>
                  <td className="px-2 py-1">Pintu kantor / jalur pejalan kaki → Titik Kumpul Halaman</td>
                  <td className="px-2 py-1 tabular-nums">± 10 m</td>
                  <td className="px-2 py-1 tabular-nums">20–30 dtk</td>
                  <td className="px-2 py-1">Guru Piket / Kepsek</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. Struktur Tim Siaga Bencana TK Lengkap Nama Jabatan */}
          <div className="border border-stone-800 flex-1">
            <div className="bg-stone-100 border-b border-stone-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              3. Tim Siaga Bencana {profile.namaTk} (Lengkap Nama &amp; Jabatan)
            </div>
            <table className="w-full text-[9.2px] border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2.5 py-1 font-bold w-40">Jabatan di Tim Siaga</th>
                  <th className="px-2.5 py-1 font-bold w-48">Nama Petugas &amp; Jabatan Sekolah</th>
                  <th className="px-2.5 py-1 font-bold">Tugas Pokok Saat Keadaan Darurat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="px-2.5 py-1 font-bold bg-stone-50 border-r border-stone-300">
                    Ketua Tim Siaga Bencana
                  </td>
                  <td className="px-2.5 py-1 border-r border-stone-300">
                    <span className="font-semibold text-stone-950">{profile.kepalaSekolah}</span>
                    <span className="block text-[8.5px] text-stone-600">Jabatan: Kepala Sekolah</span>
                  </td>
                  <td className="px-2.5 py-1 text-stone-700">
                    Memimpin komando, membunyikan sinyal evakuasi, dan memutuskan pemulangan anak.
                  </td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1 font-bold bg-stone-50 border-r border-stone-300">
                    Koordinator Evakuasi Kelas
                  </td>
                  <td className="px-2.5 py-1 border-r border-stone-300">
                    <span className="font-semibold text-stone-950">1. .................................. (Guru A1/A2)</span>
                    <span className="block text-stone-950 font-semibold">2. .................................. (Guru B1/B2)</span>
                  </td>
                  <td className="px-2.5 py-1 text-stone-700">
                    Memandu barisan anak usia 4–6 tahun ke Titik Kumpul, cek toilet kosong, dan absen murid.
                  </td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1 font-bold bg-stone-50 border-r border-stone-300">
                    Koordinator Pertolongan (P3K)
                  </td>
                  <td className="px-2.5 py-1 border-r border-stone-300">
                    <span className="font-semibold text-stone-950">........................................</span>
                    <span className="block text-[8.5px] text-stone-600">Jabatan: Guru Pendamping / Petugas UKS</span>
                  </td>
                  <td className="px-2.5 py-1 text-stone-700">
                    Membawa kotak P3K &amp; tas siaga, menenangkan anak, serta merawat luka ringan di Titik Kumpul.
                  </td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1 font-bold bg-stone-50 border-r border-stone-300">
                    Koordinator Komunikasi Ortu
                  </td>
                  <td className="px-2.5 py-1 border-r border-stone-300">
                    <span className="font-semibold text-stone-950">........................................</span>
                    <span className="block text-[8.5px] text-stone-600">Jabatan: Guru Piket / Operator Sekolah</span>
                  </td>
                  <td className="px-2.5 py-1 text-stone-700">
                    Mengabari orang tua via grup WhatsApp/telepon dan menghubungi Puskesmas, Desa, atau Polsek.
                  </td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1 font-bold bg-stone-50 border-r border-stone-300">
                    Koordinator Logistik &amp; Sarana
                  </td>
                  <td className="px-2.5 py-1 border-r border-stone-300">
                    <span className="font-semibold text-stone-950">{profile.ketuaKomite} / Petugas Kebersihan</span>
                    <span className="block text-[8.5px] text-stone-600">Jabatan: Komite / Penjaga Sekolah</span>
                  </td>
                  <td className="px-2.5 py-1 text-stone-700">
                    Memastikan APAR siap, memutus listrik/gas saat darurat, menyiapkan air minum &amp; tikar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 2 · SPAB (Profil, Jalur & Tim)"
          pageNumber={startPage}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 2 SPAB: SOP EVAKUASI GEMPA, KEBAKARAN, BANJIR (DENGAN KOLOM WAKTU) */}
      <article id="page-b2-2" className="a4-page">
        <div className="flex-1 flex flex-col gap-2.5">
          <KopSurat profile={profile} compact />

          {/* 4A. SOP Evakuasi Gempa untuk Anak Usia 4-6 Tahun */}
          <div className="border border-stone-900">
            <div className="bg-stone-900 text-white px-3 py-1 text-[9.5px] font-bold uppercase tracking-wider">
              4A. SOP Evakuasi Gempa Bumi (Drop, Cover, Hold On) — Anak Dituntun Guru, Tidak Lari Sendiri
            </div>
            <table className="w-full text-[9.2px] leading-snug border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-400 text-left">
                  <th className="px-2 py-0.5 w-6 text-center">No</th>
                  <th className="px-2 py-0.5 w-20 border-x border-stone-300">Waktu</th>
                  <th className="px-2.5 py-0.5">Langkah Guru &amp; Anak Usia 4–6 Tahun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {[
                  ['1', 'Detik 0–5', 'Aba-Aba Tenang Guru: Guru langsung mendampingi anak dan berseru lembut, "Ayo jadi kura-kura masuk tempurung!"'],
                  ['2', 'Detik 5–10', 'DROP (Merunduk): Guru membimbing anak berlutut rendah di lantai agar tidak terjatuh saat lantai bergoyang.'],
                  ['3', 'Detik 10–40', 'COVER & HOLD ON: Guru menemani anak masuk kolong meja kokoh/melindungi kepala dengan tangan & tas, jauh dari kaca, sambil memeluk kaki meja.'],
                  ['4', 'Detik 40–60', 'Persiapan Keluar: Setelah guncangan berhenti total, guru mengecek keamanan pintu lalu memberi aba-aba keluar secara tenang.'],
                  ['5', 'Menit 1–2', 'Kereta Api Dituntun Guru: Guru depan menuntun barisan kereta api, guru pendamping menjaga barisan belakang menuju Titik Kumpul Halaman (tidak berlari).'],
                  ['6', 'Menit 2–5', 'Absen & Tenangkan: Guru menghitung seluruh anak, cek kondisi luka, bernyanyi pelan, dan menunggu kabar aman sebelum kembali/pulang.'],
                ].map(([no, waktu, teks]) => (
                  <tr key={no}>
                    <td className="px-2 py-1 text-center font-bold tabular-nums align-top">{no}.</td>
                    <td className="px-2 py-1 font-mono font-semibold text-stone-800 border-x border-stone-200 align-top whitespace-nowrap">{waktu}</td>
                    <td className="px-2.5 py-1 text-stone-900 align-top">{teks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4B. SOP Evakuasi Kebakaran untuk Anak Usia 4-6 Tahun */}
          <div className="border border-stone-900">
            <div className="bg-stone-900 text-white px-3 py-1 text-[9.5px] font-bold uppercase tracking-wider">
              4B. SOP Evakuasi Kebakaran — Anak Usia 4–6 Tahun
            </div>
            <table className="w-full text-[9.2px] leading-snug border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-400 text-left">
                  <th className="px-2 py-0.5 w-6 text-center">No</th>
                  <th className="px-2 py-0.5 w-20 border-x border-stone-300">Waktu</th>
                  <th className="px-2.5 py-0.5">Langkah Guru &amp; Anak Usia 4–6 Tahun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {[
                  ['1', 'Detik 0–15', 'Sinyal Peluit: Bunyikan peluit panjang; guru mengajak tenang, "Ayo tinggalkan mainan, pegang pundak teman, kita ke halaman!"'],
                  ['2', 'Detik 15–30', 'Tanpa Tas & Putus Listrik: Guru memastikan anak tidak mengambil tas/sepatu; petugas memutus saklar listrik utama bila aman dijangkau.'],
                  ['3', 'Detik 30–60', 'Merangkak Jika Berasap: Jika ruangan berasap, guru menuntun anak merangkak seperti "kucing kecil" sambil menutup hidung dengan kain/baju basah.'],
                  ['4', 'Menit 1–2', 'Kawalan Depan-Belakang: Guru kelas menuntun di paling depan, guru pendamping menyisir toilet/sudut kelas di belakang agar tidak ada yang tertinggal.'],
                  ['5', 'Menit 2–3', 'Titik Kumpul Halaman: Kumpulkan anak di halaman terbuka yang berlawanan dari arah asap/angin, lalu hitung anak satu per satu.'],
                  ['6', 'Menit 3+', 'APAR & Panggil Damkar: Gunakan APAR hanya jika api kecil; segera hubungi Pemadam Kebakaran (113) dan kabari orang tua murid.'],
                ].map(([no, waktu, teks]) => (
                  <tr key={no}>
                    <td className="px-2 py-1 text-center font-bold tabular-nums align-top">{no}.</td>
                    <td className="px-2 py-1 font-mono font-semibold text-stone-800 border-x border-stone-200 align-top whitespace-nowrap">{waktu}</td>
                    <td className="px-2.5 py-1 text-stone-900 align-top">{teks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4C. SOP Evakuasi Banjir untuk Anak Usia 4-6 Tahun */}
          <div className="border border-stone-900">
            <div className="bg-stone-900 text-white px-3 py-1 text-[9.5px] font-bold uppercase tracking-wider">
              4C. SOP Evakuasi Banjir — Anak Usia 4–6 Tahun
            </div>
            <table className="w-full text-[9.2px] leading-snug border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-400 text-left">
                  <th className="px-2 py-0.5 w-6 text-center">No</th>
                  <th className="px-2 py-0.5 w-20 border-x border-stone-300">Waktu</th>
                  <th className="px-2.5 py-0.5">Langkah Guru &amp; Anak Usia 4–6 Tahun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {[
                  ['1', 'Menit 0–10', 'Pantau Genangan Dini: Saat hujan deras > 1 jam, guru piket memantau ketinggian air di halaman dan saluran depan sekolah.'],
                  ['2', 'Menit 10–15', 'Pindah ke Ruang Tinggi: Jika air mulai masuk halaman, guru menuntun anak masuk ke ruang kelas yang lantainya lebih tinggi dengan tenang.'],
                  ['3', 'Menit 15–20', 'Amankan Listrik & Tas Siaga: Matikan stop kontak bawah, naikkan kabel/alat main ke atas meja, dan siapkan kotak P3K serta tas siaga.'],
                  ['4', 'Menit 20–25', 'Kabari Orang Tua Awal: Koordinator Komunikasi mengirim pesan WhatsApp resmi agar orang tua menjemput sebelum jalan tergenang dalam.'],
                  ['5', 'Menit 25–35', 'Barisan Tali Pemandu: Jika harus keluar gedung saat genangan semata kaki, guru menuntun barisan memakai tali pemandu (hindari air mengalir deras).'],
                  ['6', 'Menit 35+', 'Posko Tinggi Sementara: Jika jalan terputus, bawa anak ke Balai Desa/titik tinggi terdekat dan serahkan anak memakai Kartu Jemput.'],
                ].map(([no, waktu, teks]) => (
                  <tr key={no}>
                    <td className="px-2 py-1 text-center font-bold tabular-nums align-top">{no}.</td>
                    <td className="px-2 py-1 font-mono font-semibold text-stone-800 border-x border-stone-200 align-top whitespace-nowrap">{waktu}</td>
                    <td className="px-2.5 py-1 text-stone-900 align-top">{teks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 2 · SPAB (SOP Evakuasi)"
          pageNumber={startPage + 1}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 3 SPAB: SOP P3K ANAK & JADWAL SIMULASI 30 MENIT */}
      <article id="page-b2-3" className="a4-page">
        <div className="flex-1 flex flex-col gap-3">
          <KopSurat profile={profile} compact />

          {/* 7. SOP P3K Anak */}
          <div className="border border-stone-900">
            <div className="bg-stone-100 border-b border-stone-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              7. SOP Pertolongan Pertama pada Kecelakaan (P3K) untuk Anak
            </div>
            <div className="p-3 text-[10px] leading-relaxed space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-stone-300 p-2">
                  <p className="font-bold text-stone-900 mb-1">A. Luka Lecet / Tergores Ringan</p>
                  <p className="text-stone-800">Tenangkan anak, cuci tangan guru atau pakai sarung tangan, bersihkan luka dengan air mengalir / NaCl, oleskan cairan antiseptik non-perih, dan tutup dengan plester steril.</p>
                </div>
                <div className="border border-stone-300 p-2">
                  <p className="font-bold text-stone-900 mb-1">B. Benjol / Terbentur</p>
                  <p className="text-stone-800">Kompres bagian benjol dengan es yang dibungkus kain bersih selama 10–15 menit. Awasi anak; jika mengantuk berat, muntah, atau pusing, segera bawa ke Puskesmas.</p>
                </div>
                <div className="border border-stone-300 p-2">
                  <p className="font-bold text-stone-900 mb-1">C. Mimisan (Hidung Berdarah)</p>
                  <p className="text-stone-800">Dudukkan anak tegak dan condongkan kepala sedikit ke DEPAN (jangan menengadah). Pencet cuping hidung lembut selama 5–10 menit sambil bernapas lewat mulut.</p>
                </div>
                <div className="border border-stone-300 p-2">
                  <p className="font-bold text-stone-900 mb-1">D. Anak Pingsan / Patah Tulang / Luka Dalam</p>
                  <p className="text-stone-800">Jangan memindahkan bagian yang dicurigai patah tanpa penyangga. Baringkan anak di tempat teduh, longgarkan kerah baju, segera hubungi Puskesmas dan orang tua.</p>
                </div>
              </div>
              <p className="text-[9.5px] font-semibold text-stone-700 pt-1">
                Catatan Wajib: Catat setiap tindakan P3K di Buku Catatan Anak Sakit dan sampaikan kepada orang tua saat penjemputan.
              </p>
            </div>
          </div>

          {/* 5. Jadwal & Skenario Simulasi Bencana 30 Menit Tanpa Membuat Anak Takut */}
          <div className="border border-stone-900 flex-1 flex flex-col">
            <div className="bg-stone-100 border-b border-stone-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              5. Skenario Simulasi Bencana 30 Menit Ramah Anak (Tanpa Membuat Anak Takut)
            </div>
            <div className="px-3 py-1.5 text-[9.5px] border-b border-stone-300 bg-stone-50 space-y-0.5">
              <div className="flex justify-between">
                <span><strong>Jadwal Semester 1:</strong> Oktober {profile.tahunAjaran.split('/')[0]} (Simulasi Gempa)</span>
                <span><strong>Semester 2:</strong> April {profile.tahunAjaran.split('/')[1] || '2027'} (Simulasi {profile.bencanaUtama})</span>
              </div>
              <p className="text-stone-700 italic">
                Prinsip Guru: Kemas simulasi sebagai <strong>"Permainan Anak Siaga"</strong>, gunakan nada suara lembut/gembira, dilarang berteriak menakuti atau memakai efek suara menyeramkan.
              </p>
            </div>
            <table className="w-full text-[9.3px] border-collapse flex-1">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2.5 py-1 font-bold w-24">Waktu</th>
                  <th className="px-2.5 py-1 font-bold w-36">Tahap Bermain</th>
                  <th className="px-2.5 py-1 font-bold">Langkah Guru Agar Anak Merasa Aman &amp; Gembira</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="px-2.5 py-1.5 tabular-nums font-semibold">Menit 00–06</td>
                  <td className="px-2.5 py-1.5 font-bold">Cerita &amp; Kenal Suara</td>
                  <td className="px-2.5 py-1.5">Guru bercerita pendek tentang kura-kura penyelamat, lalu memperdengarkan bunyi peluit simulasi pelan-pelan supaya anak tidak kaget.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 tabular-nums font-semibold">Menit 06–10</td>
                  <td className="px-2.5 py-1.5 font-bold">Permainan Berlindung</td>
                  <td className="px-2.5 py-1.5">Ketua Tim membunyikan peluit 3x. Guru tersenyum memandu anak bermain <em>"Kura-kura masuk bawah meja"</em> (Drop-Cover-Hold On) selama 20 detik.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 tabular-nums font-semibold">Menit 10–17</td>
                  <td className="px-2.5 py-1.5 font-bold">Kereta Api ke Halaman</td>
                  <td className="px-2.5 py-1.5">Guru mengajak anak berbaris sambil bernyanyi pelan mengikuti panah hijau dari 4 kelas menuju Titik Kumpul di halaman terbuka.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 tabular-nums font-semibold">Menit 17–23</td>
                  <td className="px-2.5 py-1.5 font-bold">Hitung Teman &amp; P3K</td>
                  <td className="px-2.5 py-1.5">Guru mengajak anak menghitung jumlah teman bersama-sama ({profile.jumlahMurid}). Tim P3K menunjukkan cara menempel plester ramah anak.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 tabular-nums font-semibold">Menit 23–30</td>
                  <td className="px-2.5 py-1.5 font-bold">Tepuk Hebat &amp; Evaluasi</td>
                  <td className="px-2.5 py-1.5">Guru memberi pujian &amp; tepuk hebat agar anak bangga bisa menjaga diri. Setelah anak kembali bermain, guru mencatat waktu evakuasi.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 2 · SPAB (P3K & Simulasi)"
          pageNumber={startPage + 2}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 4 SPAB: DAFTAR PERIKSA SARANA & FORMAT SURAT ORANG TUA */}
      <article id="page-b2-4" className="a4-page">
        <div className="flex-1 flex flex-col gap-3">
          <KopSurat profile={profile} compact />

          {/* 6. Ceklis Sarana SPAB */}
          <div className="border border-stone-900">
            <div className="bg-stone-100 border-b border-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              6. Ceklis Sarana Prasarana SPAB (Pemeriksaan Rutin Setiap Bulan)
            </div>
            <table className="w-full text-[9.3px] border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2.5 py-1 w-8">No</th>
                  <th className="px-2.5 py-1">Sarana SPAB</th>
                  <th className="px-2.5 py-1">Standar Kelayakan Minimal</th>
                  <th className="px-2.5 py-1 w-20 text-center">Ada / Baik</th>
                  <th className="px-2.5 py-1 w-28">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {[
                  ['APAR (Alat Pemadam Api Ringan)', 'Terpasang di dinding mudah dijangkau, tekanan normal & aktif'],
                  ['Kotak P3K Lengkap & Obat Luar', 'Terisi perban, antiseptik non-perih, plester, termometer, gunting'],
                  ['Rambu / Panah Jalur Evakuasi', 'Tertempel jelas di 4 pintu kelas menuju halaman Titik Kumpul'],
                  ['Plang Titik Kumpul di Halaman', 'Terpasang di halaman terbuka jauh dari bangunan/tiang listrik'],
                  ['Peluit / Lonceng & Tali Pemandu', 'Tersedia di pos piket & 4 ruang kelas untuk barisan anak'],
                  ['Tas Siaga Bencana Sekolah', 'Berisi daftar absen, nomor HP orang tua, air mineral & senter'],
                  ['Daftar Nomor Darurat Sekolah', 'Tertempel di ruang guru (Puskesmas, Polsek, Damkar, Desa)'],
                ].map(([nama, ket], idx) => (
                  <tr key={nama}>
                    <td className="px-2.5 py-1 tabular-nums">{idx + 1}.</td>
                    <td className="px-2.5 py-1 font-semibold">{nama}</td>
                    <td className="px-2.5 py-1 text-stone-700">{ket}</td>
                    <td className="px-2.5 py-1 text-center font-mono">[  ] Ya</td>
                    <td className="px-2.5 py-1 text-stone-400">...................</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 10. Format Surat Pemberitahuan ke Orang Tua */}
          <div className="border border-stone-900 flex-1 flex flex-col">
            <div className="bg-stone-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              10. Format Surat Pemberitahuan Darurat ke Orang Tua Saat Terjadi Bencana
            </div>
            <div className="p-4 text-[10.2px] leading-[1.55] flex-1 flex flex-col justify-between bg-stone-50/40">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <div>
                    <p>Nomor : ....... /SPAB/{profile.tahunAjaran}</p>
                    <p>Hal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>Pemberitahuan Kondisi Darurat &amp; Penjemputan Anak</strong></p>
                  </div>
                  <p>{profile.kecamatan}, ....................... 20....</p>
                </div>
                <p>Kepada Yth. Bapak/Ibu Orang Tua/Wali Murid {profile.namaTk} di Tempat.</p>
                <p>Dengan hormat,</p>
                <p>
                  Bersama surat/pesan resmi ini kami informasikan bahwa pada hari ini, tanggal ...................... pukul ......... WIB telah terjadi musibah/kondisi darurat berupa <strong>[Gempa / Banjir / Kebakaran / lainnya: ..........................]</strong> di sekitar lingkungan {profile.namaTk} ({alamatLengkap}).
                </p>
                <p>
                  Saat ini seluruh anak dalam keadaan <strong>aman dan terkendali</strong> di bawah pengawasan tim guru di <strong>[Titik Kumpul Sekolah / Posko Aman: .......................................]</strong>. Demi keselamatan bersama, kami memohon Bapak/Ibu untuk segera menjemput putra/putri dengan membawa Kartu Jemput Anak atau menghubungi nomor darurat sekolah ({profile.telepon}).
                </p>
                <p>Demikian pemberitahuan ini disampaikan. Atas perhatian dan kerja sama Bapak/Ibu kami ucapkan terima kasih.</p>
              </div>
              <div className="flex justify-end pt-2">
                <div className="text-center w-52 text-[10px]">
                  <p>Ketua Tim Siaga / Kepala {profile.namaTk}</p>
                  <div className="h-10" />
                  <p className="font-bold underline">{profile.kepalaSekolah}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 2 · SPAB (Sarana & Surat Darurat)"
          pageNumber={startPage + 3}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 5 SPAB: LEMBAR PENGESAHAN SPAB */}
      <article id="page-b2-5" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} />
          <div className="text-center mt-6 mb-6">
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-500">
              Lembar Pengesahan Resmi · Bagian 2
            </p>
            <h2 className="font-doc-serif text-[20px] font-bold text-stone-950 mt-1">
              PENGESAHAN DOKUMEN SATUAN PENDIDIKAN AMAN BENCANA (SPAB)
            </h2>
          </div>
          <div className="text-[11.5px] leading-[1.8] text-stone-900 space-y-4 text-justify mb-10">
            <p>
              Dokumen Satuan Pendidikan Aman Bencana (SPAB) {profile.namaTk} Tahun Ajaran {profile.tahunAjaran} ini disusun berdasarkan Permendikbudristek Nomor 33 Tahun 2019 tentang Penyelenggaraan Program Satuan Pendidikan Aman Bencana, disesuaikan dengan profil risiko bencana utama di {alamatLengkap} ({profile.bencanaUtama}).
            </p>
            <p>
              Tim Siaga Bencana TK bersama seluruh guru ({profile.jumlahGuru}) dan Komite Sekolah berkomitmen melaksanakan simulasi keselamatan anak secara rutin 1 (satu) kali setiap semester serta memelihara seluruh sarana keselamatan sekolah.
            </p>
          </div>
          <div className="border border-stone-300 bg-stone-50/50 px-6 py-5">
            <SignatureBlock profile={profile} />
          </div>
        </div>
        <PageFooter
          profile={profile}
          sectionLabel="Bagian 2 · Lembar Pengesahan SPAB"
          pageNumber={startPage + 4}
          totalPages={totalPages}
        />
      </article>

      {onNextSection && (
        <div className="no-print w-full max-w-[210mm] flex items-center justify-between bg-white border border-stone-300 px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-stone-900">Bagian 2 (SPAB) selesai.</p>
            <p className="text-xs text-stone-600">Lanjutkan ke Bagian 3 (Sekolah Ramah Anak - SRA).</p>
          </div>
          <button
            type="button"
            onClick={onNextSection}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lanjut ke Bagian 3 (SRA) →
          </button>
        </div>
      )}
    </div>
  );
};
