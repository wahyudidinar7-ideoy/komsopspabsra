import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SchoolProfile } from '../types/document';
import { KopSurat, PageFooter } from './A4HeaderFooter';

interface Bagian5ViewProps {
  profile: SchoolProfile;
  startPage: number;
  totalPages: number;
}

export const BAGIAN5_PAGE_COUNT = 3;

export const Bagian5View: React.FC<Bagian5ViewProps> = ({
  profile,
  startPage,
  totalPages,
}) => {
  const [copiedWa, setCopiedWa] = useState(false);

  const tahunAwal = profile.tahunAjaran.split('/')[0] || '2026';
  const alamatLengkap = `Desa ${profile.desa}, Kecamatan ${profile.kecamatan}, Kabupaten ${profile.kabupaten}`;

  const waMessageText = [
    `*PEMBERITAHUAN KEGIATAN ANAK — LATIHAN KESIAPSIAGAAN (SIMULASI)*`,
    `_${profile.namaTk} · Tahun Ajaran ${profile.tahunAjaran}_`,
    ``,
    `Assalamu'alaikum Wr. Wb. / Selamat sore Bapak dan Ibu Orang Tua/Wali Murid yang kami hormati,`,
    ``,
    `Melalui pesan ini kami ingin menginformasikan bahwa *besok pagi pukul 08.30 – 09.00 WIB*, anak-anak di ${profile.namaTk} akan mengikuti kegiatan *Latihan Rutin Kesiapsiagaan Anak (Simulasi SPAB)* untuk mengenalkan cara melindungi diri secara ceria dan aman (siaga ${profile.bencanaUtama.toLowerCase()} & gempa).`,
    ``,
    `*Mohon Bapak/Ibu tidak perlu khawatir atau panik* apabila besok mendengar atau melihat aktivitas latihan di halaman sekolah, karena:`,
    `1. *Ini murni kegiatan latihan/bermain peran*, bukan kejadian bencana yang sebenarnya.`,
    `2. *Tidak ada api asli, tidak ada asap sungguhan*, dan tidak ada suara sirine atau bunyi keras yang membuat anak takut.`,
    `3. *Seluruh anak didampingi penuh oleh Ibu Guru* kelas masing-masing melalui cerita dan permainan baris _"kereta api"_ yang tenang dan menyenangkan.`,
    `4. *Jadwal masuk dan pulang sekolah tetap berjalan normal* seperti biasa (seragam dan bekal sesuai jadwal harian).`,
    ``,
    `Setelah kegiatan selesai besok pagi, wali kelas akan menyampaikan kabar singkat di grup kelas agar Bapak/Ibu tetap merasa tenang di rumah atau tempat kerja.`,
    ``,
    `Apabila ada pertanyaan atau kondisi khusus anak yang perlu kami perhatikan, silakan menghubungi Ibu Guru kelas atau Kepala Sekolah (${profile.kepalaSekolah}) melalui nomor ${profile.telepon}.`,
    ``,
    `Terima kasih atas dukungan dan kerja sama Bapak/Ibu semua.`,
    `Salam hangat,`,
    `*Kepala ${profile.namaTk}*`,
    `${profile.kepalaSekolah}`,
  ].join('\n');

  const handleCopyWa = async () => {
    try {
      await navigator.clipboard.writeText(waMessageText);
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2500);
    } catch {
      // fallback jika clipboard diblokir browser
      const textarea = document.createElement('textarea');
      textarea.value = waMessageText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0">
      {/* HALAMAN 1: SURAT EDARAN SOP PENJEMPUTAN BARU */}
      <article id="page-sosialisasi-1" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} />

          <div className="flex items-start justify-between text-[10.5px] mb-4 gap-4">
            <table className="border-collapse">
              <tbody>
                <tr>
                  <td className="pr-3 py-0.5 font-semibold w-20">Nomor</td>
                  <td className="pr-2">:</td>
                  <td className="font-mono">015 / SE-SOP / TK / {tahunAwal}</td>
                </tr>
                <tr>
                  <td className="pr-3 py-0.5 font-semibold">Lampiran</td>
                  <td className="pr-2">:</td>
                  <td>1 (satu) lembar Kartu Jemput Anak</td>
                </tr>
                <tr>
                  <td className="pr-3 py-0.5 font-semibold">Perihal</td>
                  <td className="pr-2">:</td>
                  <td className="font-bold underline underline-offset-2">
                    Penerapan Prosedur Penjemputan Anak &amp; Kartu Jemput
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-right shrink-0">
              <p>{profile.kecamatan}, {profile.tanggalPengesahan}</p>
            </div>
          </div>

          <div className="text-[10.5px] mb-3.5 leading-relaxed">
            <p>Kepada Yth.</p>
            <p className="font-bold">Bapak/Ibu Orang Tua / Wali Murid {profile.namaTk}</p>
            <p>Di Tempat</p>
          </div>

          <div className="text-[10.5px] leading-[1.58] space-y-2.5 text-stone-900">
            <p>
              <em>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh / Salam Sejahtera,</em>
            </p>
            <p>
              Semoga Bapak/Ibu beserta keluarga senantiasa berada dalam keadaan sehat wal&apos;afiat. Dalam rangka meningkatkan kenyamanan dan keamanan seluruh peserta didik di lingkungan <strong>{profile.namaTk}</strong> pada Tahun Ajaran {profile.tahunAjaran}, bersama surat ini kami sampaikan pembaruan tata cara pengantaran dan penjemputan anak sebagai berikut:
            </p>

            <div className="border border-stone-900 p-3 bg-stone-50/60 space-y-2 text-[10.2px]">
              <p className="font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                Ketentuan Utama Penjemputan Anak:
              </p>
              <div className="flex gap-2">
                <span className="font-bold tabular-nums shrink-0">1.</span>
                <p>
                  <strong>Wajib Membawa Kartu Jemput Anak:</strong> Setiap orang tua atau wali yang menjemput anak wajib menunjukkan <strong>Kartu Jemput Resmi</strong> (fisik atau foto jelas di HP yang nomornya terdaftar) kepada Guru Piket di gerbang sebelum anak diserahkan.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold tabular-nums shrink-0">2.</span>
                <p>
                  <strong>Penjemputan oleh Ojek / Kurir / Pihak Lain:</strong> Demi menjaga keselamatan anak, sekolah <strong>tidak diperkenankan menitipkan atau menyerahkan anak kepada pengemudi ojek daring/pangkalan</strong> maupun orang yang tidak tercantum di Kartu Jemput tanpa <strong>Surat Kuasa Penjemputan / konfirmasi langsung orang tua</strong> (telepon atau pesan WA beserta foto penjemput) kepada guru kelas sebelum jam pulang.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold tabular-nums shrink-0">3.</span>
                <p>
                  <strong>Jam Pengantaran &amp; Penjemputan:</strong> Pengantaran pagi pukul <strong>07.15 – 07.45 WIB</strong> (gerbang ditutup untuk keamanan bermain pukul 07.45 WIB). Penjemputan pulang pukul <strong>11.00 – 11.30 WIB</strong>. Bila Bapak/Ibu berhalangan hadir tepat waktu, mohon berkenan mengabari guru kelas agar anak dapat kami temani dengan tenang dan nyaman di dalam sekolah.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold tabular-nums shrink-0">4.</span>
                <p>
                  <strong>Jika Kartu Jemput Tertinggal:</strong> Bapak/Ibu tidak perlu cemas. Guru Piket akan membantu memverifikasi lewat telepon singkat ke nomor orang tua yang terdaftar dan mencatatnya pada Buku Penjemputan.
                </p>
              </div>
            </div>

            <p>
              Aturan ini kami terapkan semata-mata sebagai wujud kasih sayang dan tanggung jawab bersama agar setiap anak selalu pulang dalam lindungan keluarga yang tepat. Apabila ada hal yang ingin didiskusikan atau penyesuaian daftar nama penjemput di kartu, Bapak/Ibu dapat langsung menghubungi kami melalui nomor <strong>{profile.telepon}</strong>.
            </p>
            <p>
              Atas perhatian, pengertian, dan kerja sama baik Bapak/Ibu, kami ucapkan terima kasih.
            </p>
            <p>
              <em>Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.</em>
            </p>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <div className="text-center text-[10.5px] w-64">
              <p>Hormat kami,</p>
              <p className="font-semibold">Kepala {profile.namaTk}</p>
              <div className="h-14" />
              <p className="font-bold underline underline-offset-2">{profile.kepalaSekolah}</p>
              <p className="text-[9.5px] text-stone-600">Telp/WA Sekolah: {profile.telepon}</p>
            </div>
          </div>
        </div>
        <PageFooter
          profile={profile}
          sectionLabel="Bagian 5 · Sosialisasi 1: Surat Edaran SOP Penjemputan"
          pageNumber={startPage}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 2: TEKS WA GRUP ORANG TUA SIMULASI SPAB */}
      <article id="page-sosialisasi-2" className="a4-page">
        <div className="flex-1 flex flex-col">
          <KopSurat profile={profile} compact />

          <div className="text-center mb-3">
            <p className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-stone-500">
              Bagian 5 · Sosialisasi 2 (Kirim H-1 ke Grup WhatsApp Orang Tua)
            </p>
            <h2 className="font-doc-serif text-[17.5px] font-bold text-stone-950">
              NASKAH PESAN WHATSAPP SIMULASI BENCANA (SPAB)
            </h2>
            <p className="text-[10px] text-stone-600">
              Disusun dengan nada tenang &amp; menenteramkan agar orang tua merasa aman dan percaya
            </p>
          </div>

          {/* Tombol Salin Khusus Layar (tidak ikut tercetak) */}
          <div className="no-print mb-3 border border-stone-300 bg-stone-50 px-3 py-2 flex items-center justify-between gap-3">
            <span className="text-[11px] text-stone-700">
              Salin teks di bawah lalu tempel langsung ke grup WhatsApp Wali Murid kelas A &amp; B:
            </span>
            <button
              type="button"
              onClick={handleCopyWa}
              className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                copiedWa
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {copiedWa ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedWa ? 'Teks WA Tersalin' : 'Salin Teks WA'}</span>
            </button>
          </div>

          {/* Kotak Naskah WhatsApp */}
          <div className="border-2 border-stone-900 bg-white p-4 text-[10.4px] leading-[1.58] space-y-2.5 flex-1">
            <div className="border-b border-stone-300 pb-1.5 flex items-center justify-between text-[9.5px] text-stone-600">
              <span className="font-bold uppercase tracking-wider text-stone-900">
                Format Pesan Siap Kirim (WhatsApp Grup Orang Tua)
              </span>
              <span>Waktu Kirim: H-1 Sore (Pukul 15.00 – 17.00 WIB)</span>
            </div>

            <p className="font-bold text-stone-950">
              PEMBERITAHUAN KEGIATAN ANAK — LATIHAN KESIAPSIAGAAN (SIMULASI)
            </p>
            <p className="italic text-stone-700">
              {profile.namaTk} · Tahun Ajaran {profile.tahunAjaran}
            </p>

            <p>
              Assalamu&apos;alaikum Wr. Wb. / Selamat sore Bapak dan Ibu Orang Tua/Wali Murid yang kami hormati,
            </p>
            <p>
              Melalui pesan ini kami ingin menginformasikan bahwa <strong>besok pagi pukul 08.30 – 09.00 WIB</strong>, anak-anak di <strong>{profile.namaTk}</strong> akan mengikuti kegiatan <strong>Latihan Rutin Kesiapsiagaan Anak (Simulasi SPAB)</strong> untuk mengenalkan cara melindungi diri secara ceria dan aman (siaga {profile.bencanaUtama.toLowerCase()} &amp; gempa).
            </p>
            <p>
              <strong>Mohon Bapak/Ibu tidak perlu khawatir atau panik</strong> apabila besok mendengar atau melihat aktivitas latihan di halaman sekolah, karena:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Ini murni kegiatan latihan/bermain peran</strong>, bukan kejadian bencana yang sebenarnya.
              </li>
              <li>
                <strong>Tidak ada api asli, tidak ada asap sungguhan</strong>, dan tidak ada suara sirine atau bunyi keras yang membuat anak takut.
              </li>
              <li>
                <strong>Seluruh anak didampingi penuh oleh Ibu Guru</strong> kelas masing-masing melalui cerita dan permainan baris <em>&ldquo;kereta api&rdquo;</em> yang tenang dan menyenangkan.
              </li>
              <li>
                <strong>Jadwal masuk dan pulang sekolah tetap berjalan normal</strong> seperti biasa (seragam dan bekal sesuai jadwal harian).
              </li>
            </ol>
            <p>
              Setelah kegiatan selesai besok pagi, wali kelas akan menyampaikan kabar singkat di grup kelas agar Bapak/Ibu tetap merasa tenang di rumah atau tempat kerja.
            </p>
            <p>
              Apabila ada pertanyaan atau kondisi khusus anak yang perlu kami perhatikan, silakan menghubungi Ibu Guru kelas atau Kepala Sekolah ({profile.kepalaSekolah}) melalui nomor <strong>{profile.telepon}</strong>.
            </p>
            <p>
              Terima kasih atas dukungan dan kerja sama Bapak/Ibu semua.<br />
              Salam hangat,<br />
              <strong>Kepala {profile.namaTk} — {profile.kepalaSekolah}</strong>
            </p>
          </div>

          {/* Catatan Ringkas Guru */}
          <div className="mt-3 border border-stone-800 bg-stone-50 p-2.5 text-[9.5px] leading-relaxed">
            <p className="font-bold text-stone-950 uppercase tracking-wider mb-0.5">
              Catatan Pendampingan Guru Sebelum &amp; Sesudah Mengirim Pesan:
            </p>
            <p>
              • Jawab setiap pertanyaan orang tua di grup dengan ramah dan jelas. • Besok setelah simulasi selesai pukul 09.00 WIB, segera kirim pesan pembaruan singkat: <em>&ldquo;Alhamdulillah latihan bermain kereta api siaga hari ini berjalan lancar, tertib, dan anak-anak tetap ceria.&rdquo;</em>
            </p>
          </div>
        </div>
        <PageFooter
          profile={profile}
          sectionLabel="Bagian 5 · Sosialisasi 2: Teks WA Grup Simulasi SPAB"
          pageNumber={startPage + 1}
          totalPages={totalPages}
        />
      </article>

      {/* HALAMAN 3: POSTER SRA UNTUK DITEMPEL DI GERBANG */}
      <article id="page-sosialisasi-3" className="a4-page">
        <div className="flex-1 flex flex-col justify-between border-4 border-stone-900 p-5 bg-white">
          {/* Header Poster Gerbang */}
          <div className="text-center border-b-2 border-stone-900 pb-3">
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-stone-600">
              {profile.namaTk} · {alamatLengkap}
            </p>
            <h2 className="font-doc-serif text-[25px] font-bold text-stone-950 mt-1 leading-tight">
              TK KAMI RAMAH ANAK
            </h2>
            <p className="font-doc-serif text-[14.5px] font-semibold text-stone-900 mt-1">
              &ldquo;Di Sini Anak Didengar, Disayang, Dilindungi&rdquo;
            </p>
            <p className="text-[10.5px] text-stone-600 mt-1">
              5 Aturan Singkat untuk Semua yang Memasuki Area Sekolah (Orang Tua, Pengantar, Tamu &amp; Guru)
            </p>
          </div>

          {/* 5 Aturan Singkat Gerbang */}
          <div className="space-y-2.5 my-3 flex-1 flex flex-col justify-center">
            {[
              {
                no: '1',
                judul: 'SAPA ANAK DENGAN SENYUM & KATA LEMBUT',
                desc: 'Gunakan suara ramah saat berbicara di sekolah. Dilarang membentak, memukul, mencubit, atau membandingkan anak.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="24" cy="24" r="18" />
                    <circle cx="18" cy="20" r="2" fill="currentColor" />
                    <circle cx="30" cy="20" r="2" fill="currentColor" />
                    <path d="M16 28c2.2 3.8 5 5 8 5s5.8-1.2 8-5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                no: '2',
                judul: 'BAWA KARTU JEMPUT & LAPOR DI POS PIKET',
                desc: 'Tamu wajib melapor dan mengisi Buku Tamu. Penjemput anak wajib menunjukkan Kartu Jemput resmi di gerbang.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="8" y="13" width="32" height="22" rx="2" />
                    <circle cx="17" cy="24" r="3.5" />
                    <path d="M25 21h10M25 27h8" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                no: '3',
                judul: 'KAWASAN BEBAS ASAP ROKOK & KENDARAAN TERTIB',
                desc: 'Tidak merokok atau vape di gerbang dan halaman TK. Matikan mesin kendaraan dan parkir rapi di luar area bermain.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="24" cy="24" r="17" />
                    <path d="M14 27h16v4H14zM33 27h3v4h-3z" />
                    <path d="M12 12l24 24" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                no: '4',
                judul: 'HORMATI PRIVASI & FOTO ANAK KAMI',
                desc: 'Tidak memotret atau mengunggah foto/video anak lain ke media sosial tanpa seizin orang tua dan pihak sekolah.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="9" y="15" width="30" height="21" rx="3" />
                    <path d="M18 15l2.5-4h7L30 15" />
                    <circle cx="24" cy="25.5" r="5" />
                  </svg>
                ),
              },
              {
                no: '5',
                judul: 'JAGA KESEHATAN & KEAMANAN BERSAMA',
                desc: 'Istirahatkan anak di rumah bila sedang demam/sakit menular, dan segera beritahu guru bila melihat hal berbahaya.',
                svg: (
                  <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M24 8l14 6v10c0 9-6 14.5-14 17-8-2.5-14-8-14-17V14l14-6z" />
                    <path d="M24 19v10M19 24h10" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.no}
                className="border-2 border-stone-900 px-3.5 py-2.5 flex items-center gap-3.5 bg-stone-50/50"
              >
                <div className="w-10 h-10 bg-stone-900 text-white font-bold text-lg flex items-center justify-center shrink-0 tabular-nums">
                  {item.no}
                </div>
                {item.svg}
                <div>
                  <h3 className="font-doc-serif text-[14px] font-bold text-stone-950 leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-[10.8px] text-stone-800 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Poster */}
          <div className="border-t-2 border-stone-900 pt-2.5 text-center space-y-1">
            <p className="text-[11.5px] font-bold text-stone-950">
              TERIMA KASIH TELAH BERSAMA-SAMA MELINDUNGI SENYUM &amp; TUMBUH KEMBANG ANAK KITA
            </p>
            <p className="text-[10.5px] text-stone-800">
              Pengaduan &amp; Komunikasi Sekolah: Kepala Sekolah ({profile.kepalaSekolah}) · Telp/WA: <strong>{profile.telepon}</strong>
            </p>
            <p className="text-[9.5px] text-stone-600">
              Komitmen Sekolah Ramah Anak (Permen PPPA No. 8 Tahun 2014) · Tahun Ajaran {profile.tahunAjaran}
            </p>
          </div>
        </div>
        <PageFooter
          profile={profile}
          sectionLabel="Bagian 5 · Sosialisasi 3: Poster Gerbang TK Ramah Anak"
          pageNumber={startPage + 2}
          totalPages={totalPages}
        />
      </article>
    </div>
  );
};
