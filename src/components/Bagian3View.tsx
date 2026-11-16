import React from 'react';
import { SchoolProfile } from '../types/document';
import { KopSurat, PageFooter, SignatureBlock } from './A4HeaderFooter';

interface Bagian3ViewProps {
  profile: SchoolProfile;
  startPage: number;
  totalPages: number;
  onNextSection?: () => void;
}

export const BAGIAN3_PAGE_COUNT = 4;

export const Bagian3View: React.FC<Bagian3ViewProps> = ({
  profile,
  startPage,
  totalPages,
  onNextSection,
}) => {
  const alamatLengkap = `Desa ${profile.desa}, Kecamatan ${profile.kecamatan}, Kabupaten ${profile.kabupaten}`;

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0">
      {/* HALAMAN 1 SRA: KEBIJAKAN DEKLARASI & 6 INDIKATOR SRA */}
      <article id="page-b3-1" className="a4-page">
        <div className="flex-1 flex flex-col gap-3">
          <KopSurat profile={profile} compact />

          <div className="text-center">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 3 · Mengacu Permen PPPA No. 8 Tahun 2014
            </p>
            <h2 className="font-doc-serif text-[17.5px] font-bold text-stone-950">
              SEKOLAH RAMAH ANAK (SRA)
            </h2>
          </div>

          {/* 1. Kebijakan / Deklarasi */}
          <div className="border border-stone-900 p-3 bg-stone-50/50">
            <h3 className="text-[10.5px] font-bold uppercase tracking-wider text-stone-950 mb-1.5">
              1. Deklarasi Kebijakan TK Ramah Anak
            </h3>
            <p className="text-[10px] leading-relaxed text-stone-800 mb-2">
              Kami seluruh warga <strong>{profile.namaTk}</strong> ({alamatLengkap}) menyatakan komitmen bersama untuk menyelenggarakan pendidikan yang aman, bersih, sehat, peduli, dan berbudaya lingkungan hidup, serta menjamin pemenuhan hak dan perlindungan anak tanpa diskriminasi maupun kekerasan dalam bentuk apa pun (fisik, verbal, maupun psikis) selama Tahun Ajaran {profile.tahunAjaran}.
            </p>
            <div className="grid grid-cols-3 gap-2 text-[9.5px] font-semibold text-stone-900 text-center">
              <div className="border border-stone-400 bg-white py-1">Bebas Kekerasan &amp; Perundungan</div>
              <div className="border border-stone-400 bg-white py-1">Bebas Asap Rokok &amp; Jajanan Berbahaya</div>
              <div className="border border-stone-400 bg-white py-1">Menghargai Suara &amp; Pilihan Anak</div>
            </div>
          </div>

          {/* 2. 6 Indikator SRA dan Bukti Fisik */}
          <div className="border border-stone-900 flex-1 flex flex-col">
            <div className="bg-stone-100 border-b border-stone-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              2. Enam (6) Indikator Sekolah Ramah Anak &amp; Bukti Pelaksanaan di {profile.namaTk}
            </div>
            <table className="w-full text-[9.8px] border-collapse flex-1">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-400 text-left">
                  <th className="px-2.5 py-1.5 w-8">No</th>
                  <th className="px-2.5 py-1.5 w-48">Indikator SRA</th>
                  <th className="px-2.5 py-1.5">Bukti Nyata di TK Kami</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">a.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Kebijakan SRA</td>
                  <td className="px-2.5 py-1.5">SK Tim SRA, Deklarasi Sekolah Ramah Anak tertempel di dinding, SOP Anti-Kekerasan, dan Kode Etik Guru.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">b.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Pendidik &amp; Tenaga Kependidikan Terlatih Hak Anak</td>
                  <td className="px-2.5 py-1.5">{profile.jumlahGuru} telah mengikuti sosialisasi/pelatihan Konvensi Hak Anak, disiplin positif, dan P3K dasar.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">c.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Proses Belajar Aman, Nyaman &amp; Tanpa Kekerasan</td>
                  <td className="px-2.5 py-1.5">Pembelajaran bermain tanpa memaksa calistung, guru menyapa ramah setinggi mata anak, dan bebas bentakan/hukuman.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">d.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Sarana Prasarana Ramah Anak</td>
                  <td className="px-2.5 py-1.5">Toilet khusus ukuran anak yang bersih, wastafel rendah dengan sabun, sudut meja tumpul, dan area bermain outdoor aman.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">e.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Partisipasi Anak</td>
                  <td className="px-2.5 py-1.5">Anak diajak menyepakati aturan main kelas, bebas memilih ragam main, dan didengarkan pendapatnya saat recalling.</td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 font-bold tabular-nums align-top">f.</td>
                  <td className="px-2.5 py-1.5 font-semibold align-top">Partisipasi Orang Tua &amp; Masyarakat</td>
                  <td className="px-2.5 py-1.5">Komite Sekolah aktif mendukung keamanan, pertemuan parenting rutin, dan kerja sama dengan Puskesmas serta Pemerintah Desa.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 3 · SRA (Kebijakan & 6 Indikator)"
          pageNumber={startPage}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 2 SRA: KODE ETIK GURU (10 POIN BOLEH & TIDAK BOLEH) + CARA MENANGANI ANAK */}
      <article id="page-b3-2" className="a4-page">
        <div className="flex-1 flex flex-col gap-2.5">
          <KopSurat profile={profile} compact />

          {/* 3. Kode Etik Guru Ramah Anak (10 Poin: Yang Boleh & Tidak Boleh, Bahasa Hangat) */}
          <div className="border border-stone-900">
            <div className="bg-stone-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              3. Kode Etik Guru Ramah Anak — 10 Pedoman Sikap Hangat di {profile.namaTk}
            </div>
            <table className="w-full text-[9px] leading-snug border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-400 text-left">
                  <th className="px-2 py-1 w-6 text-center">No</th>
                  <th className="px-2.5 py-1 w-1/2 font-bold text-stone-900">Yang Dianjurkan (Boleh &amp; Baik Dilakukan)</th>
                  <th className="px-2.5 py-1 w-1/2 font-bold text-stone-900">Yang Dihindari (Tidak Boleh Dilakukan)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {[
                  ['1', 'Menyapa hangat, tersenyum, dan menepuk bahu lembut sebagai tanda sayang.', 'Memukul, mencubit, menjewer, mendorong, atau menghukum fisik anak.'],
                  ['2', 'Berbicara dengan suara tenang, pelan, dan sejajar tinggi mata anak.', 'Membentak, berteriak kasar, atau memakai nada suara mengancam.'],
                  ['3', 'Menasihati anak berdua saja secara lembut jika ada kesalahan.', 'Mempermalukan atau memarahi anak di depan teman dan orang tua.'],
                  ['4', 'Menghargai keunikan dan langkah kecil kemajuan setiap anak.', 'Membanding-bandingkan kemampuan atau karya anak dengan teman lain.'],
                  ['5', 'Memanggil anak dengan nama baik dan kata positif (hebat, penyayang, berani).', 'Memberi label negatif seperti "nakal", "cengeng", "malas", atau "lamban".'],
                  ['6', 'Mendampingi anak di ruang tenang bersama guru saat emosi anak meluap.', 'Mengunci atau mengisolasi anak sendirian di ruang tertutup atau toilet.'],
                  ['7', 'Segera menghampiri dan mendengarkan saat anak menangis atau takut.', 'Mengabaikan anak yang menangis atau mengatakan "anak besar tidak boleh nangis".'],
                  ['8', 'Menjaga pintu sedikit terbuka/terpantau saat membantu anak di toilet.', 'Melakukan sentuhan tidak pantas atau melanggar privasi tubuh anak.'],
                  ['9', 'Mengajak anak belajar lewat bermain sesuai minat dan kesiapan usianya.', 'Memaksa anak menghabiskan bekal atau memaksa tes calistung berat.'],
                  ['10', 'Menjaga kerahasiaan kondisi anak dan keluarga sebagai amanah profesi.', 'Menyebarkan foto aib anak atau cerita masalah keluarga di media sosial.'],
                ].map(([no, boleh, tidak]) => (
                  <tr key={no}>
                    <td className="px-2 py-1 text-center font-bold tabular-nums">{no}.</td>
                    <td className="px-2.5 py-1 text-stone-900 border-r border-stone-200">{boleh}</td>
                    <td className="px-2.5 py-1 text-stone-700">{tidak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Cara Menangani Anak (Menangis, Dipukul di Rumah, ABK Tanpa Melabeli) */}
          <div className="border border-stone-900 flex-1 flex flex-col">
            <div className="bg-stone-100 border-b border-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900">
              4. Panduan Hangat Guru: Menangani Anak Menangis, Anak Dipukul di Rumah &amp; ABK (Tanpa Melabeli)
            </div>
            <div className="divide-y divide-stone-300 text-[9.3px] leading-snug flex-1">
              <div className="px-3 py-2">
                <p className="font-bold text-stone-950 mb-0.5">A. Cara Menangani Anak yang Menangis / Emosi Meluap</p>
                <p className="text-stone-800">
                  Guru tetap tenang karena guru juga manusia yang boleh menarik napas dalam sejenak. 1) Jongkok sejajar mata anak dan pastikan benda keras jauh darinya. 2) Peluk atau temani dengan lembut sambil berkata, <em>"Ibu di sini menemani kamu, tidak apa-apa merasa sedih."</em> 3) Setelah napas anak teratur, beri minum air putih dan ajak bicara pelan mencari solusi tanpa menyebut anak "cengeng".
                </p>
              </div>
              <div className="px-3 py-2">
                <p className="font-bold text-stone-950 mb-0.5">B. Cara Menangani Anak yang Diduga Dipukul / Mengalami Kekerasan di Rumah</p>
                <p className="text-stone-800">
                  1) Sambut anak dengan ekstra kasih sayang agar sekolah menjadi tempat paling aman baginya. 2) Jika terlihat memar atau anak bercerita dipukul, dengarkan tanpa menyela dan jangan menginterogasi beramai-ramai. 3) Catat cerita anak apa adanya dan sampaikan secara rahasia kepada Kepala Sekolah pada hari itu juga. 4) Kepala Sekolah mendampingi komunikasi lembut dengan keluarga atau berkoordinasi dengan Puskesmas / UPTD PPA setempat demi keselamatan anak.
                </p>
              </div>
              <div className="px-3 py-2">
                <p className="font-bold text-stone-950 mb-0.5">C. Cara Mendampingi Anak Berkebutuhan Khusus (ABK) Tanpa Melabeli Anak</p>
                <p className="text-stone-800">
                  1) Panggil anak dengan namanya dan lihat kekuatannya; hindari melabeli dengan sebutan kekurangan. 2) Beri instruksi singkat satu per satu disertai contoh gerakan atau kartu gambar. 3) Sesuaikan permainan dengan kenyamanannya serta beri waktu istirahat bila anak lelah. 4) Libatkan teman sekelas untuk saling menolong dan jalin komunikasi rutin yang hangat bersama orang tua.
                </p>
              </div>
            </div>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 3 · SRA (Kode Etik & Panduan Guru)"
          pageNumber={startPage + 1}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 3 SRA: TATA TERTIB RAMAH ANAK (VERSI ANAK USIA 4-6 TAHUN) & PIAGAM ANAK TK */}
      <article id="page-b3-3" className="a4-page">
        <div className="flex-1 flex flex-col gap-3">
          <KopSurat profile={profile} compact />

          {/* 5. Tata Tertib Ramah Anak (Versi Anak Usia 4-6 Tahun, Bahasa Sederhana + Gambar SVG) */}
          <div className="border-2 border-stone-900 p-3">
            <div className="text-center mb-2.5">
              <h3 className="font-doc-serif text-[15px] font-bold text-stone-950">
                5. TATA TERTIB ANAK HEBAT {profile.namaTk.toUpperCase()} (USIA 4–6 TAHUN)
              </h3>
              <p className="text-[9.5px] text-stone-600">Bahasa Sederhana &amp; Ramah Anak · Dibacakan Bersama Guru dengan Gembira</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-[10px]">
              {[
                {
                  no: '1',
                  judul: 'Aku Datang Tersenyum & Salam',
                  ket: 'Sampai di sekolah aku senyum, salim dengan Ibu Guru, dan menyapa teman.',
                  icon: (
                    <svg viewBox="0 0 40 40" className="w-9 h-9 text-stone-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="20" cy="20" r="14" />
                      <circle cx="15" cy="17" r="1.5" fill="currentColor" />
                      <circle cx="25" cy="17" r="1.5" fill="currentColor" />
                      <path d="M14 23c1.5 2.5 4 3.5 6 3.5s4.5-1 6-3.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  no: '2',
                  judul: 'Tanganku untuk Sayang Teman',
                  ket: 'Tanganku untuk bermain bersama dan membantu, bukan untuk memukul atau merebut.',
                  icon: (
                    <svg viewBox="0 0 40 40" className="w-9 h-9 text-stone-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 32s-11-7.2-11-15a6.5 6.5 0 0111-4.6A6.5 6.5 0 0131 17c0 7.8-11 15-11 15z" />
                    </svg>
                  ),
                },
                {
                  no: '3',
                  judul: 'Aku Sabar Menunggu Giliran',
                  ket: 'Saat main ayunan, perosotan, dan cuci tangan, aku antre bergantian dengan tertib.',
                  icon: (
                    <svg viewBox="0 0 40 40" className="w-9 h-9 text-stone-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="14" r="3" />
                      <path d="M8 29v-7a4 4 0 018 0v7" />
                      <circle cx="27" cy="14" r="3" />
                      <path d="M23 29v-7a4 4 0 018 0v7" />
                    </svg>
                  ),
                },
                {
                  no: '4',
                  judul: 'Aku Bereskan Mainan & Sampah',
                  ket: 'Selesai bermain aku kembalikan mainan ke rak dan buang sampah ke tempatnya.',
                  icon: (
                    <svg viewBox="0 0 40 40" className="w-9 h-9 text-stone-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="8" y="16" width="24" height="15" rx="2" />
                      <path d="M13 16v-4h14v4M16 23h8" strokeLinecap="round" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.no} className="border border-stone-300 p-2 flex items-center gap-2.5 bg-stone-50/40">
                  {item.icon}
                  <div>
                    <p className="font-bold text-stone-950">{item.no}. {item.judul}</p>
                    <p className="text-[9.2px] text-stone-700 leading-snug">{item.ket}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Piagam Anak TK */}
          <div className="border-2 border-stone-900 p-3.5 flex-1 flex flex-col justify-between bg-stone-50/30">
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500">
                Piagam Perlindungan Anak
              </p>
              <h3 className="font-doc-serif text-[16px] font-bold text-stone-950">
                6. PIAGAM HAK ANAK {profile.namaTk.toUpperCase()}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 my-2 text-[9.8px]">
              <div className="border border-stone-800 bg-white p-2.5">
                <p className="font-bold text-stone-950 mb-0.5">1. HAK BERMAIN</p>
                <p className="text-stone-700">Setiap anak berhak bermain dengan gembira, memilih permainan yang disukai, dan berkreasi sesuai imajinasinya.</p>
              </div>
              <div className="border border-stone-800 bg-white p-2.5">
                <p className="font-bold text-stone-950 mb-0.5">2. HAK DIDENGAR</p>
                <p className="text-stone-700">Setiap anak berhak bercerita, bertanya, menyampaikan perasaan, dan didengarkan pendapatnya dengan sabar oleh guru.</p>
              </div>
              <div className="border border-stone-800 bg-white p-2.5">
                <p className="font-bold text-stone-950 mb-0.5">3. HAK MERASA AMAN</p>
                <p className="text-stone-700">Setiap anak berhak belajar di lingkungan yang aman, bersih, sehat, bebas dari bentakan, ejekan, dan kekerasan.</p>
              </div>
              <div className="border border-stone-800 bg-white p-2.5">
                <p className="font-bold text-stone-950 mb-0.5">4. HAK DISAYANG</p>
                <p className="text-stone-700">Setiap anak berhak mendapat kasih sayang yang adil, perhatian tulus, dan perlindungan tanpa membeda-bedakan.</p>
              </div>
            </div>
            <p className="text-center text-[9.5px] italic text-stone-700">
              "Anak adalah amanah berharga. Melindungi dan membahagiakan mereka adalah tugas mulia kita bersama."
            </p>
          </div>
        </div>

        <PageFooter
          profile={profile}
          sectionLabel="Bagian 3 · SRA (Tata Tertib & Piagam Anak)"
          pageNumber={startPage + 2}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 4 SRA: LEMBAR PENGESAHAN SRA */}
      <article id="page-b3-4" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} />
          <div className="text-center mt-6 mb-6">
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-500">
              Lembar Pengesahan Resmi · Bagian 3
            </p>
            <h2 className="font-doc-serif text-[20px] font-bold text-stone-950 mt-1">
              PENGESAHAN KOMITMEN SEKOLAH RAMAH ANAK (SRA)
            </h2>
          </div>
          <div className="text-[11.5px] leading-[1.8] text-stone-900 space-y-4 text-justify mb-10">
            <p>
              Dokumen Kebijakan Sekolah Ramah Anak (SRA) {profile.namaTk} Tahun Ajaran {profile.tahunAjaran} ini disusun berpedoman pada Peraturan Menteri Pemberdayaan Perempuan dan Perlindungan Anak Nomor 8 Tahun 2014 tentang Kebijakan Sekolah Ramah Anak.
            </p>
            <p>
              Seluruh Pendidik dan Tenaga Kependidikan ({profile.jumlahGuru}) bersama Komite Sekolah dan orang tua dari {profile.jumlahMurid} menyatakan siap menaati Kode Etik Guru Ramah Anak serta menjunjung tinggi Piagam Hak Anak di {profile.namaTk}.
            </p>
          </div>
          <div className="border border-stone-300 bg-stone-50/50 px-6 py-5">
            <SignatureBlock profile={profile} />
          </div>
        </div>
        <PageFooter
          profile={profile}
          sectionLabel="Bagian 3 · Lembar Pengesahan SRA"
          pageNumber={startPage + 3}
          totalPages={totalPages}
        />
      </article>

      {onNextSection && (
        <div className="no-print w-full max-w-[210mm] flex items-center justify-between bg-white border border-stone-300 px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-stone-900">Bagian 3 (SRA) selesai.</p>
            <p className="text-xs text-stone-600">Lanjutkan ke Bagian 4 (10 Lampiran Langsung Siap Print).</p>
          </div>
          <button
            type="button"
            onClick={onNextSection}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lanjut ke Bagian 4 (10 Lampiran) →
          </button>
        </div>
      )}
    </div>
  );
};
