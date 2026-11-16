import React from 'react';
import { SchoolProfile } from '../types/document';
import { KopSurat, PageFooter, SignatureBlock } from './A4HeaderFooter';

interface Bagian4ViewProps {
  profile: SchoolProfile;
  startPage: number;
  totalPages: number;
  onNextSection?: () => void;
}

export const BAGIAN4_PAGE_COUNT = 10;

export const Bagian4View: React.FC<Bagian4ViewProps> = ({
  profile,
  startPage,
  totalPages,
  onNextSection,
}) => {
  const emptyRows = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0">
      {/* LAMPIRAN 1: JADWAL PIKET GURU */}
      <article id="page-lampiran-1" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 1 (Siap Tempel Ruang Guru)
            </p>
            <h2 className="font-doc-serif text-[18px] font-bold text-stone-950">
              JADWAL PIKET HARIAN GURU {profile.namaTk.toUpperCase()}
            </h2>
            <p className="text-[10.5px] text-stone-600">Tahun Ajaran {profile.tahunAjaran} · Jam Piket: 07.00 – 11.30 WIB</p>
          </div>

          <table className="w-full text-[10.5px] border-collapse border border-stone-900 mb-4">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-900 text-left">
                <th className="px-3 py-2 border-r border-stone-400 w-24">Hari</th>
                <th className="px-3 py-2 border-r border-stone-400 w-44">Nama Guru Piket 1</th>
                <th className="px-3 py-2 border-r border-stone-400 w-44">Nama Guru Piket 2</th>
                <th className="px-3 py-2">Area Pengawasan Utama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((hari) => (
                <tr key={hari} className="h-11">
                  <td className="px-3 py-2 font-bold border-r border-stone-300 bg-stone-50">{hari}</td>
                  <td className="px-3 py-2 border-r border-stone-300 text-stone-400">...........................................</td>
                  <td className="px-3 py-2 border-r border-stone-300 text-stone-400">...........................................</td>
                  <td className="px-3 py-2 text-[9.5px] text-stone-700">Gerbang datang/pulang, buku tamu, halaman outdoor</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border border-stone-800 p-3 bg-stone-50 text-[10px] space-y-1">
            <p className="font-bold uppercase tracking-wider text-stone-900 mb-1">Tugas Pokok Guru Piket Harian:</p>
            <p>1. Hadir 15 menit lebih awal (pukul 07.00 WIB), membuka gerbang, dan memeriksa kebersihan serta keamanan halaman/APE.</p>
            <p>2. Menyambut kedatangan anak di gerbang, mengamati kondisi fisik/emosi anak, dan memastikan gerbang dikunci pukul 07.45 WIB.</p>
            <p>3. Melayani tamu sekolah sesuai SOP Tamu (mencatat di Buku Tamu dan mendampingi ke ruang Kepala Sekolah).</p>
            <p>4. Mengawasi waktu pulang, memeriksa Kartu Jemput Anak, dan memastikan kelas/toilet kosong sebelum sekolah ditutup.</p>
          </div>

          <SignatureBlock profile={profile} compact />
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 1: Jadwal Piket Guru" pageNumber={startPage} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 2: KARTU JEMPUT ANAK (4 KARTU SIAP GUNTING) */}
      <article id="page-lampiran-2" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-2">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 2 (Gunting Sesuai Garis Putus-Putus)
            </p>
            <h2 className="font-doc-serif text-[16px] font-bold text-stone-950">
              KARTU JEMPUT RESMI ANAK — {profile.namaTk.toUpperCase()}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3.5 flex-1">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="border-2 border-dashed border-stone-700 p-3 flex flex-col justify-between bg-white">
                <div>
                  <div className="border-b-2 border-stone-900 pb-1 mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500">Kartu Jemput Resmi</p>
                      <p className="font-doc-serif text-[12px] font-bold text-stone-950">{profile.namaTk}</p>
                    </div>
                    <span className="text-[9px] font-mono font-bold border border-stone-800 px-1.5 py-0.5">
                      TA {profile.tahunAjaran}
                    </span>
                  </div>

                  <div className="flex gap-2.5 mb-2">
                    <div className="w-16 h-20 border border-stone-400 flex items-center justify-center text-[8.5px] text-stone-400 text-center shrink-0">
                      Foto Anak<br />3x4
                    </div>
                    <div className="flex-1 text-[9.5px] space-y-1.5 pt-0.5">
                      <p>Nama Anak: ...................................</p>
                      <p>Kelompok/Rombel: ........................</p>
                      <p>No. HP Ortu: .................................</p>
                    </div>
                  </div>

                  <div className="border-t border-stone-300 pt-1.5 text-[9.2px] space-y-1">
                    <p className="font-bold text-stone-900">Daftar Penjemput yang Diizinkan:</p>
                    <p>1. Nama: ................................... (Ibu/Ayah)</p>
                    <p>2. Nama: ................................... (Hub: ..........)</p>
                    <p>3. Nama: ................................... (Hub: ..........)</p>
                  </div>
                </div>

                <div className="border-t border-stone-300 pt-1.5 mt-2 flex items-end justify-between text-[8.5px]">
                  <span className="text-stone-600 max-w-[55%] leading-tight">
                    *Wajib ditunjukkan saat menjemput. Tanpa kartu ini, guru akan menelepon orang tua.
                  </span>
                  <div className="text-center">
                    <p>Kepala Sekolah,</p>
                    <div className="h-6" />
                    <p className="font-bold underline">{profile.kepalaSekolah}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 2: Kartu Jemput Anak" pageNumber={startPage + 1} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 3: BUKU TAMU */}
      <article id="page-lampiran-3" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 3 (Formulir Pos Piket)
            </p>
            <h2 className="font-doc-serif text-[17px] font-bold text-stone-950">
              BUKU TAMU SEKOLAH — {profile.namaTk.toUpperCase()}
            </h2>
          </div>

          <table className="w-full text-[9.5px] border-collapse border border-stone-900 flex-1">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-900 text-center">
                <th className="p-1.5 border-r border-stone-400 w-8">No</th>
                <th className="p-1.5 border-r border-stone-400 w-24">Hari / Tanggal</th>
                <th className="p-1.5 border-r border-stone-400 w-36">Nama Lengkap Tamu</th>
                <th className="p-1.5 border-r border-stone-400 w-32">Instansi / Alamat &amp; No. HP</th>
                <th className="p-1.5 border-r border-stone-400">Keperluan / Bertemu Siapa</th>
                <th className="p-1.5 border-r border-stone-400 w-20">Jam Masuk / Keluar</th>
                <th className="p-1.5 w-20">Tanda Tangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {emptyRows(14).map((n) => (
                <tr key={n} className="h-11">
                  <td className="p-1.5 border-r border-stone-300 text-center tabular-nums">{n}</td>
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5" />
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] text-stone-600 mt-2">
            Catatan Guru Piket: Pastikan tamu menuliskan identitas sesuai KTP/Kartu Tugas dan memakai Kartu Tamu selama di sekolah.
          </p>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 3: Buku Tamu" pageNumber={startPage + 2} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 4: BUKU CATATAN ANAK SAKIT */}
      <article id="page-lampiran-4" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 4 (Formulir Ruang UKS)
            </p>
            <h2 className="font-doc-serif text-[17px] font-bold text-stone-950">
              BUKU CATATAN ANAK SAKIT &amp; PENANGANAN P3K
            </h2>
          </div>

          <table className="w-full text-[9.3px] border-collapse border border-stone-900 flex-1">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-900 text-center">
                <th className="p-1.5 border-r border-stone-400 w-7">No</th>
                <th className="p-1.5 border-r border-stone-400 w-20">Tanggal &amp; Jam</th>
                <th className="p-1.5 border-r border-stone-400 w-32">Nama Anak &amp; Rombel</th>
                <th className="p-1.5 border-r border-stone-400 w-32">Keluhan / Gejala / Suhu</th>
                <th className="p-1.5 border-r border-stone-400">Tindakan P3K Awal</th>
                <th className="p-1.5 border-r border-stone-400 w-24">Jam Kabari &amp; Jemput Ortu</th>
                <th className="p-1.5 w-20">Paraf Guru &amp; Ortu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {emptyRows(13).map((n) => (
                <tr key={n} className="h-12">
                  <td className="p-1.5 border-r border-stone-300 text-center tabular-nums">{n}</td>
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5 border-r border-stone-300" />
                  <td className="p-1.5" />
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] text-stone-600 mt-2">
            Ingat: Guru DILARANG memberikan obat minum apa pun tanpa izin langsung atau tertulis dari orang tua/wali murid.
          </p>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 4: Buku Catatan Anak Sakit" pageNumber={startPage + 3} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 5: DENAH JALUR EVAKUASI */}
      <article id="page-lampiran-5" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 5 (Siap Tempel di Dinding Kelas &amp; Teras)
            </p>
            <h2 className="font-doc-serif text-[17px] font-bold text-stone-950">
              DENAH JALUR EVAKUASI DARURAT {profile.namaTk.toUpperCase()}
            </h2>
          </div>

          {/* Skema Visual Denah Sederhana 4 Ruang Kelas */}
          <div className="border-2 border-stone-900 p-4 mb-3 bg-stone-50/40">
            <svg viewBox="0 0 640 270" className="w-full h-auto" aria-label="Skema Denah Jalur Evakuasi 4 Ruang Kelas TK">
              {/* 4 Ruang Kelas + R. Guru/UKS/Toilet */}
              <rect x="20" y="20" width="95" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="67" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1917">KELAS A1</text>
              <text x="67" y="78" textAnchor="middle" fontSize="9.5" fill="#57534E">(Usia 4–5 Th)</text>

              <rect x="125" y="20" width="95" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="172" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1917">KELAS A2</text>
              <text x="172" y="78" textAnchor="middle" fontSize="9.5" fill="#57534E">(Usia 4–5 Th)</text>

              <rect x="230" y="20" width="95" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="277" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1917">KELAS B1</text>
              <text x="277" y="78" textAnchor="middle" fontSize="9.5" fill="#57534E">(Usia 5–6 Th)</text>

              <rect x="335" y="20" width="95" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="382" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1917">KELAS B2</text>
              <text x="382" y="78" textAnchor="middle" fontSize="9.5" fill="#57534E">(Usia 5–6 Th)</text>

              <rect x="440" y="20" width="100" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="490" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1C1917">R. GURU/UKS</text>
              <text x="490" y="76" textAnchor="middle" fontSize="9" fill="#57534E">(P3K &amp; APAR)</text>

              <rect x="550" y="20" width="70" height="90" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="585" y="62" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1C1917">TOILET</text>

              {/* Teras / Koridor */}
              <rect x="20" y="110" width="600" height="36" fill="#F5F5F4" stroke="#78716C" strokeWidth="1" strokeDasharray="4 2" />
              <text x="320" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="#44403C">TERAS / KORIDOR EVAKUASI (BEBAS HAMBATAN)</text>

              {/* Jalur Panah Evakuasi dari 4 Kelas */}
              <path d="M67 110 L67 165 L260 165 L260 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />
              <path d="M172 110 L172 165 L285 165 L285 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />
              <path d="M277 110 L277 165 L310 165 L310 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />
              <path d="M382 110 L382 165 L335 165 L335 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />
              <path d="M490 110 L490 165 L360 165 L360 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />
              <path d="M585 110 L585 165 L385 165 L385 185" fill="none" stroke="#15803D" strokeWidth="3.5" strokeDasharray="8 4" />

              {/* Titik Kumpul */}
              <rect x="190" y="188" width="260" height="65" rx="4" fill="#ECFDF5" stroke="#15803D" strokeWidth="2.5" />
              <text x="320" y="216" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532D">TITIK KUMPUL HALAMAN</text>
              <text x="320" y="236" textAnchor="middle" fontSize="10.5" fill="#166534">Halaman Terbuka · Jauh dari Tiang Listrik &amp; Pohon</text>

              {/* Gerbang */}
              <rect x="20" y="205" width="120" height="36" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
              <text x="80" y="227" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1C1917">GERBANG UTAMA</text>
            </svg>
          </div>

          {/* Deskripsi Teks Arah Evakuasi */}
          <div className="border border-stone-800 p-3 text-[10px] space-y-1">
            <p className="font-bold uppercase tracking-wider text-stone-950">Panduan Arah Evakuasi dari 4 Ruang Kelas (Deskripsi Teks):</p>
            <p><strong>1. Dari Ruang Kelas A1 &amp; A2:</strong> Keluar pintu kelas menuju teras depan sisi kiri/tengah, ikuti panah hijau langsung ke Titik Kumpul di tengah halaman (± 12–15 m).</p>
            <p><strong>2. Dari Ruang Kelas B1 &amp; B2:</strong> Keluar pintu kelas ke koridor kanan/selasar samping, berjalan tertib menuju Titik Kumpul Halaman (± 18–22 m).</p>
            <p><strong>3. Dari Ruang Guru / UKS &amp; Toilet:</strong> Guru mengambil Tas Siaga &amp; Kotak P3K, menyisir toilet memastikan kosong, lalu menuju Titik Kumpul Halaman (± 10 m).</p>
            <p><strong>4. Titik Kumpul Cadangan (Jika Banjir):</strong> Apabila halaman tergenang air, seluruh barisan keluar Gerbang Utama menuju Balai Desa / tempat tinggi terdekat.</p>
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 5: Denah Jalur Evakuasi" pageNumber={startPage + 4} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 6: DAFTAR NOMOR DARURAT */}
      <article id="page-lampiran-6" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-4">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 6 (Tempel Dekat Telepon / Meja Piket)
            </p>
            <h2 className="font-doc-serif text-[19px] font-bold text-stone-950">
              DAFTAR NOMOR TELEPON DARURAT SEKOLAH
            </h2>
            <p className="text-[10.5px] text-stone-600">
              Wilayah Desa {profile.desa}, Kecamatan {profile.kecamatan}, Kabupaten {profile.kabupaten}
            </p>
          </div>

          <table className="w-full text-[11px] border-collapse border-2 border-stone-900 mb-5">
            <thead>
              <tr className="bg-stone-900 text-white text-left">
                <th className="px-3 py-2 w-10">No</th>
                <th className="px-3 py-2">Instansi / Pejabat Tujuan</th>
                <th className="px-3 py-2 w-48">Nomor Telepon / WhatsApp</th>
                <th className="px-3 py-2 w-48">Alamat / Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {[
                ['1', 'Puskesmas Kecamatan / UGD Terdekat', '( ........ ) .......................... / 119', `Kec. ${profile.kecamatan}`],
                ['2', 'Polsek / Bhabinkamtibmas Desa', '( ........ ) .......................... / 110', `Polsek ${profile.kecamatan}`],
                ['3', 'Pemadam Kebakaran (Damkar)', '( ........ ) .......................... / 113', `Kab. ${profile.kabupaten}`],
                ['4', `Kepala Desa ${profile.desa} / Ketua RT`, '08........................................', `Desa ${profile.desa}`],
                ['5', 'BPBD / Tim Reaksi Cepat Bencana', '( ........ ) .......................... / 117', `Kab. ${profile.kabupaten}`],
                ['6', 'UPTD PPA / Layanan Perlindungan Anak', '08........................................ / 129', 'SAPA 129 KemenPPPA'],
                ['7', `Kepala ${profile.namaTk}`, profile.telepon, profile.kepalaSekolah],
                ['8', 'Ketua Komite Sekolah', '08........................................', profile.ketuaKomite],
              ].map(([no, instansi, telp, ket]) => (
                <tr key={no} className="h-12">
                  <td className="px-3 py-2 font-bold tabular-nums border-r border-stone-300">{no}.</td>
                  <td className="px-3 py-2 font-semibold border-r border-stone-300">{instansi}</td>
                  <td className="px-3 py-2 font-mono font-bold border-r border-stone-300 text-stone-950">{telp}</td>
                  <td className="px-3 py-2 text-[10px] text-stone-700">{ket}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border border-stone-800 p-3.5 bg-stone-50 text-[10.5px] leading-relaxed">
            <p className="font-bold text-stone-950 mb-1">Cara Melapor Saat Keadaan Darurat:</p>
            <p>1. Sebutkan nama Anda dan jabatan (Guru {profile.namaTk}).</p>
            <p>2. Sebutkan alamat lengkap sekolah: Desa {profile.desa}, Kecamatan {profile.kecamatan}, Kabupaten {profile.kabupaten}.</p>
            <p>3. Jelaskan kejadian (kebakaran / anak sakit parah / orang mencurigakan / bencana) dan jumlah anak di lokasi.</p>
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 6: Daftar Nomor Darurat" pageNumber={startPage + 5} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 7: POSTER 5 ATURAN ANAK DI TK (GAMBAR + TEKS) */}
      <article id="page-lampiran-7" className="a4-page">
        <div className="flex-1 flex flex-col justify-between">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-2">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 7 (Poster Dinding Kelas)
            </p>
            <h2 className="font-doc-serif text-[22px] font-bold text-stone-950">
              5 ATURAN ANAK HEBAT DI {profile.namaTk.toUpperCase()}
            </h2>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {[
              {
                no: '1',
                judul: 'DATANG DENGAN SENYUM & SALAM',
                desc: 'Ucapkan salam kepada Ibu Guru dan teman-teman saat masuk sekolah.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="24" cy="24" r="18" />
                    <circle cx="18" cy="20" r="2" fill="currentColor" />
                    <circle cx="30" cy="20" r="2" fill="currentColor" />
                    <path d="M16 28c2 4 5 5 8 5s6-1 8-5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                no: '2',
                judul: 'SAYANGI TEMAN & BERBICARA LEMBUT',
                desc: 'Tidak memukul, tidak mendorong, dan tidak mengejek teman.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M24 39S9 29 9 18.5A8.5 8.5 0 0124 13a8.5 8.5 0 0115 5.5C39 29 24 39 24 39z" />
                  </svg>
                ),
              },
              {
                no: '3',
                judul: 'CUCI TANGAN PAKAI SABUN',
                desc: 'Cuci tangan sebelum makan, setelah bermain, dan setelah dari toilet.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M24 8c-5 8-10 13-10 20a10 10 0 0020 0c0-7-5-12-10-20z" />
                    <path d="M20 29a4 4 0 004 4" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                no: '4',
                judul: 'BERBAGI & ANTRE BERGILIRAN',
                desc: 'Bersabar menunggu giliran bermain ayunan, perosotan, dan alat main.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="16" cy="15" r="4" />
                    <path d="M10 34v-8a6 6 0 0112 0v8" />
                    <circle cx="32" cy="15" r="4" />
                    <path d="M26 34v-8a6 6 0 0112 0v8" />
                  </svg>
                ),
              },
              {
                no: '5',
                judul: 'BERESKAN MAINAN & BUANG SAMPAH DI TEMPATNYA',
                desc: 'Kembalikan mainan ke rak setelah selesai agar kelas rapi dan bersih.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="10" y="18" width="28" height="19" rx="2" />
                    <path d="M17 18v-5h14v5M18 27h12" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((rule) => (
              <div key={rule.no} className="border-2 border-stone-900 p-3 flex items-center gap-4 bg-stone-50/50">
                <div className="w-10 h-10 bg-stone-900 text-white font-bold text-lg flex items-center justify-center shrink-0 tabular-nums">
                  {rule.no}
                </div>
                {rule.svg}
                <div>
                  <h3 className="font-doc-serif text-[14.5px] font-bold text-stone-950">{rule.judul}</h3>
                  <p className="text-[11px] text-stone-700">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 7: Poster 5 Aturan Anak" pageNumber={startPage + 6} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 8: POSTER LARANGAN KEKERASAN */}
      <article id="page-lampiran-8" className="a4-page">
        <div className="flex-1 flex flex-col justify-between border-4 border-stone-900 p-5">
          <div className="text-center border-b-2 border-stone-900 pb-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600">
              Kawasan Sekolah Ramah Anak · {profile.namaTk}
            </p>
            <h2 className="font-doc-serif text-[26px] font-bold text-stone-950 mt-1 leading-tight">
              STOP KEKERASAN TERHADAP ANAK!
            </h2>
            <p className="text-[12px] font-semibold text-stone-800 mt-1">
              Sekolah Kami Zona Aman, Nyaman, dan Penuh Kasih Sayang
            </p>
          </div>

          <div className="my-4 space-y-3">
            <div className="border-2 border-stone-900 p-3.5 bg-stone-50">
              <p className="font-bold text-[13px] text-stone-950 mb-1">
                1. DILARANG KEKERASAN FISIK
              </p>
              <p className="text-[11px] text-stone-800">
                Tidak ada hukuman memukul, mencubit, menjewer, mendorong, atau menyakiti tubuh anak dalam kondisi apa pun.
              </p>
            </div>
            <div className="border-2 border-stone-900 p-3.5 bg-stone-50">
              <p className="font-bold text-[13px] text-stone-950 mb-1">
                2. DILARANG KEKERASAN VERBAL &amp; PSIKIS
              </p>
              <p className="text-[11px] text-stone-800">
                Tidak membentak, mengejek, mengancam, mempermalukan, mengisolasi, atau memberi cap buruk kepada anak.
              </p>
            </div>
            <div className="border-2 border-stone-900 p-3.5 bg-stone-50">
              <p className="font-bold text-[13px] text-stone-950 mb-1">
                3. DILARANG PERUNDUNGAN (BULLYING) &amp; DISKRIMINASI
              </p>
              <p className="text-[11px] text-stone-800">
                Semua anak diperlakukan setara, dihargai perbedaannya, dan dilindungi dari ejekan maupun pengucilan.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-stone-900 pt-3 text-center space-y-1">
            <p className="text-[11px] font-bold text-stone-950">
              SALURAN PENGADUAN RESMI SEKOLAH RAMAH ANAK
            </p>
            <p className="text-[11px] text-stone-800">
              Kepala Sekolah ({profile.kepalaSekolah}) · Telp/WA: <strong>{profile.telepon}</strong>
            </p>
            <p className="text-[10px] text-stone-600">
              Layanan Sahabat Perempuan dan Anak Nasional: SAPA 129 · Dasar Hukum: Permen PPPA No. 8 Tahun 2014
            </p>
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 8: Poster Larangan Kekerasan" pageNumber={startPage + 7} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 9: CEKLIS KEBERSIHAN HARIAN */}
      <article id="page-lampiran-9" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />
          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 9 (Tempel di Papan Kebersihan / Pintu Toilet)
            </p>
            <h2 className="font-doc-serif text-[17px] font-bold text-stone-950">
              CEKLIS KEBERSIHAN &amp; KESEHATAN LINGKUNGAN HARIAN
            </h2>
            <p className="text-[10px] text-stone-600">
              Minggu ke: ........ · Bulan: ............................ {profile.tahunAjaran.split('/')[0]}
            </p>
          </div>

          <table className="w-full text-[9.5px] border-collapse border border-stone-900 mb-3 flex-1">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-900 text-center">
                <th className="p-1.5 border-r border-stone-400 w-7">No</th>
                <th className="p-1.5 border-r border-stone-400 text-left">Bagian yang Dibersihkan &amp; Diperiksa</th>
                <th className="p-1.5 border-r border-stone-400 w-12">Sen</th>
                <th className="p-1.5 border-r border-stone-400 w-12">Sel</th>
                <th className="p-1.5 border-r border-stone-400 w-12">Rab</th>
                <th className="p-1.5 border-r border-stone-400 w-12">Kam</th>
                <th className="p-1.5 border-r border-stone-400 w-12">Jum</th>
                <th className="p-1.5 w-12">Sab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {[
                'Lantai seluruh ruang kelas disapu dan dipel bersih',
                'Meja, kursi, dan loker anak dilap bebas debu',
                'Toilet anak disikat, disiram bersih, lantai tidak licin',
                'Sabun cuci tangan, air mengalir, dan tisu wastafel terisi',
                'Tempat sampah kelas & halaman dikosongkan ke bak utama',
                'Mainan indoor (balok, puzzle) dirapikan dan dibersihkan',
                'Halaman & alat main outdoor bebas sampah, kaca, dan paku',
                'Bak air & pot tanaman dicek bebas jentik nyamuk',
                'Ventilasi udara dan pencahayaan kelas dibuka dengan baik',
                'Saklar listrik & keran air dipastikan mati saat pulang',
              ].map((item, idx) => (
                <tr key={item} className="h-9">
                  <td className="p-1.5 border-r border-stone-300 text-center tabular-nums">{idx + 1}.</td>
                  <td className="p-1.5 border-r border-stone-300">{item}</td>
                  <td className="p-1.5 border-r border-stone-300 text-center text-stone-400">[ ]</td>
                  <td className="p-1.5 border-r border-stone-300 text-center text-stone-400">[ ]</td>
                  <td className="p-1.5 border-r border-stone-300 text-center text-stone-400">[ ]</td>
                  <td className="p-1.5 border-r border-stone-300 text-center text-stone-400">[ ]</td>
                  <td className="p-1.5 border-r border-stone-300 text-center text-stone-400">[ ]</td>
                  <td className="p-1.5 text-center text-stone-400">[ ]</td>
                </tr>
              ))}
              <tr className="h-11 bg-stone-50 font-semibold">
                <td className="p-1.5 border-r border-stone-300" colSpan={2}>Paraf Petugas / Guru Piket</td>
                <td className="p-1.5 border-r border-stone-300" />
                <td className="p-1.5 border-r border-stone-300" />
                <td className="p-1.5 border-r border-stone-300" />
                <td className="p-1.5 border-r border-stone-300" />
                <td className="p-1.5 border-r border-stone-300" />
                <td className="p-1.5" />
              </tr>
            </tbody>
          </table>

          <SignatureBlock profile={profile} compact />
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 9: Ceklis Kebersihan Harian" pageNumber={startPage + 8} totalPages={totalPages} />
      </article>

      {/* LAMPIRAN 10: FORMULIR IZIN FOTO ANAK */}
      <article id="page-lampiran-10" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} />
          <div className="text-center mb-4">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 4 · Lampiran 10 (Diisi Orang Tua Saat Awal Tahun Ajaran)
            </p>
            <h2 className="font-doc-serif text-[18px] font-bold text-stone-950 underline underline-offset-4">
              FORMULIR PERSETUJUAN DOKUMENTASI &amp; PUBLIKASI FOTO ANAK
            </h2>
          </div>

          <div className="text-[11px] leading-[1.65] space-y-3">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            <div className="pl-4 space-y-1.5">
              <p>Nama Orang Tua / Wali : .........................................................................................</p>
              <p>Nomor HP / WhatsApp &nbsp;: .........................................................................................</p>
              <p>Orang Tua / Wali dari &nbsp;&nbsp;: ......................................................................................... (Kelompok: ........)</p>
            </div>

            <p>
              Sehubungan dengan kegiatan belajar dan bermain di <strong>{profile.namaTk}</strong> Tahun Ajaran {profile.tahunAjaran}, dengan ini saya menyatakan:
            </p>

            <div className="border border-stone-800 p-3.5 space-y-2.5 bg-stone-50/40 text-[10.5px]">
              <p className="font-bold">Beri tanda centang ( ✓ ) pada kotak pilihan Bapak/Ibu:</p>
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-sm">[ &nbsp; ]</span>
                <p>
                  <strong>MENGIZINKAN</strong> sekolah mendokumentasikan foto/video kegiatan belajar anak saya untuk keperluan <strong>laporan perkembangan ke orang tua DAN publikasi positif</strong> (brosur, papan pengumuman, atau media sosial resmi {profile.namaTk}) tanpa mencantumkan alamat rumah atau data pribadi sensitif.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-sm">[ &nbsp; ]</span>
                <p>
                  <strong>HANYA MENGIZINKAN UNTUK LAPORAN PRIBADI ORANG TUA</strong> (arsip guru &amp; grup kelas terbatas). Apabila ada foto bersama yang diunggah ke media sosial umum sekolah, wajah anak saya wajib diburamkan (<em>blur</em>).
                </p>
              </div>
            </div>

            <p>
              Persetujuan ini berlaku selama anak saya belajar di {profile.namaTk} dan sewaktu-waktu dapat saya ubah secara tertulis kepada Kepala Sekolah.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8 text-center text-[11px]">
            <div>
              <p>Mengetahui,</p>
              <p className="font-semibold">Kepala {profile.namaTk}</p>
              <div className="h-16" />
              <p className="font-bold underline">{profile.kepalaSekolah}</p>
            </div>
            <div>
              <p>{profile.kecamatan}, ....................... 20....</p>
              <p className="font-semibold">Orang Tua / Wali Murid</p>
              <div className="h-16" />
              <p className="font-bold">( ................................................ )</p>
            </div>
          </div>
        </div>
        <PageFooter profile={profile} sectionLabel="Bagian 4 · Lampiran 10: Formulir Izin Foto Anak" pageNumber={startPage + 9} totalPages={totalPages} />
      </article>

      {onNextSection && (
        <div className="no-print w-full max-w-[210mm] flex justify-end pt-2 pb-6">
          <button
            type="button"
            onClick={onNextSection}
            className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Lanjut ke Bagian 5: Sosialisasi Orang Tua →
          </button>
        </div>
      )}
    </div>
  );
};
