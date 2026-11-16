import React, { useState } from 'react';
import { Pencil, Printer } from 'lucide-react';
import { SchoolProfile, SopItem } from '../types/document';
import { KopSurat, PageFooter, SignatureBlock } from './A4HeaderFooter';

interface Bagian1ViewProps {
  profile: SchoolProfile;
  sops: SopItem[];
  startPage: number;
  totalPages: number;
  onEditSop: (sop: SopItem) => void;
  onNextSection?: () => void;
}

export const BAGIAN1_PAGE_COUNT = 17; // 1 Cover/TOC + 14 SOP Terpadu + 1 Ringkasan Dinding Guru Piket + 1 Pengesahan

export const Bagian1View: React.FC<Bagian1ViewProps> = ({
  profile,
  sops,
  startPage,
  totalPages,
  onEditSop,
  onNextSection,
}) => {
  const [sopFilter, setSopFilter] = useState<'all' | 'rawan' | 'piket'>('all');
  const [wallPosterMode, setWallPosterMode] = useState<boolean>(false);

  const alamatLengkap = `Desa ${profile.desa}, Kecamatan ${profile.kecamatan}, Kabupaten ${profile.kabupaten}`;
  const visibleSops =
    sopFilter === 'rawan'
      ? sops.filter((s) => s.prioritas)
      : sopFilter === 'piket'
      ? []
      : sops;

  const effectiveTotalPages =
    sopFilter === 'rawan'
      ? visibleSops.length
      : sopFilter === 'piket'
      ? 1
      : totalPages;

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0">
      {/* Toolbar Pengaturan Tampilan & Fokus (Hanya di layar) */}
      <div className="no-print w-full max-w-[210mm] bg-white border border-stone-300 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex border border-stone-300 bg-stone-50">
            <button
              type="button"
              onClick={() => setSopFilter('all')}
              className={`px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sopFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Semua (14 SOP + Ringkasan)
            </button>
            <button
              type="button"
              onClick={() => setSopFilter('rawan')}
              className={`px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sopFilter === 'rawan'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              5 SOP Rawan
            </button>
            <button
              type="button"
              onClick={() => setSopFilter('piket')}
              className={`px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sopFilter === 'piket'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Ringkas Guru Piket (1 Hal)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {sopFilter !== 'piket' && (
            <div className="flex border border-stone-300 bg-stone-50">
              <button
                type="button"
                onClick={() => setWallPosterMode(false)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !wallPosterMode
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                Format Dokumen
              </button>
              <button
                type="button"
                onClick={() => setWallPosterMode(true)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  wallPosterMode
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                Tempel Dinding
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>
              Cetak{' '}
              {sopFilter === 'rawan'
                ? '5 SOP Rawan'
                : sopFilter === 'piket'
                ? '1 Lembar Piket'
                : 'Bagian 1'}
            </span>
          </button>
        </div>
      </div>

      {/* HALAMAN 1: SAMPUL & DAFTAR ISI BAGIAN 1 */}
      {sopFilter === 'all' && (
        <article id="page-b1-cover" className="a4-page">
          <div className="flex-1 flex flex-col">
            <KopSurat profile={profile} />

            <div className="text-center mt-2 mb-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-500">
                Dokumen Kompilasi Resmi Sekolah · Bagian 1
              </p>
              <h1 className="font-doc-serif text-[22px] font-bold text-stone-950 mt-1 leading-tight">
                STANDAR OPERASIONAL PROSEDUR (SOP)
                <br />
                LAYANAN PENDIDIKAN ANAK USIA DINI
              </h1>
              <p className="text-[11px] text-stone-600 mt-1">
                Panduan Praktis Kerja Harian Pendidik &amp; Tenaga Kependidikan {profile.namaTk}
              </p>
            </div>

            {/* Identitas Satuan Pendidikan */}
            <div className="border border-stone-800 mb-4">
              <div className="bg-stone-100 border-b border-stone-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
                Identitas Satuan Pendidikan
              </div>
              <div className="grid grid-cols-2 text-[10px] divide-x divide-stone-300">
                <div className="divide-y divide-stone-200">
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Nama TK</span>
                    <span className="font-semibold text-stone-950 text-right">{profile.namaTk}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Alamat</span>
                    <span className="font-medium text-stone-900 text-right">{alamatLengkap}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Tahun Ajaran</span>
                    <span className="font-semibold tabular-nums text-stone-950">{profile.tahunAjaran}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Kepala Sekolah</span>
                    <span className="font-semibold text-stone-950 text-right">{profile.kepalaSekolah}</span>
                  </div>
                </div>
                <div className="divide-y divide-stone-200">
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Jumlah Murid</span>
                    <span className="font-semibold tabular-nums text-stone-950">{profile.jumlahMurid}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Jumlah Guru</span>
                    <span className="font-semibold tabular-nums text-stone-950">{profile.jumlahGuru}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Jumlah Rombel</span>
                    <span className="font-semibold tabular-nums text-stone-950 text-right">{profile.jumlahRombel}</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between gap-2">
                    <span className="text-stone-600">Potensi Bencana</span>
                    <span className="font-semibold text-stone-950 text-right">{profile.bencanaUtama}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daftar Isi 14 SOP Terpadu + Ringkasan Guru Piket */}
            <div className="border border-stone-800 flex-1 flex flex-col">
              <div className="bg-stone-100 border-b border-stone-800 px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900">
                  Daftar Isi Bagian 1 — 14 SOP Terpadu &amp; Ringkasan Guru Piket
                </span>
                <span className="text-[9px] text-stone-600">
                  (SOP Datang/Antar &amp; Pulang/Jemput digabung di SOP-02)
                </span>
              </div>
              <div className="divide-y divide-stone-200 text-[10px]">
                {sops.map((sop, idx) => (
                  <div
                    key={sop.id}
                    className="px-3 py-[4.2px] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="font-bold tabular-nums text-stone-700 w-5 shrink-0">
                        {String(sop.nomor).padStart(2, '0')}.
                      </span>
                      <span className="font-medium text-stone-900 truncate">
                        SOP {sop.judul}
                      </span>
                      {sop.prioritas && (
                        <span className="text-[9px] font-semibold text-stone-600 shrink-0">
                          · Prioritas Rawan
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 tabular-nums text-stone-600">
                      <span className="text-[9px] font-mono text-stone-500">{sop.kode}</span>
                      <span className="font-semibold text-stone-900 w-10 text-right">
                        Hal. {startPage + 1 + idx}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="px-3 py-[4.5px] flex items-center justify-between bg-stone-50">
                  <span className="font-semibold text-stone-900">
                    15. Versi Ringkas 1 Lembar Tempel Dinding (Panduan Guru Piket Hari Pertama)
                  </span>
                  <span className="font-bold tabular-nums text-stone-900 w-10 text-right">
                    Hal. {startPage + 15}
                  </span>
                </div>
                <div className="px-3 py-[4.5px] flex items-center justify-between bg-stone-50">
                  <span className="font-semibold text-stone-900">
                    16. Lembar Pengesahan Bagian 1 (Kepala Sekolah &amp; Ketua Komite)
                  </span>
                  <span className="font-bold tabular-nums text-stone-900 w-10 text-right">
                    Hal. {startPage + 16}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <PageFooter
            profile={profile}
            sectionLabel="Bagian 1 · Sampul & Daftar Isi SOP"
            pageNumber={startPage}
            totalPages={totalPages}
          />
        </article>
      )}

      {/* HALAMAN SOP (1 SOP = 1 HALAMAN A4) */}
      {visibleSops.map((sop, idx) => {
        const pageNum = sopFilter === 'rawan' ? idx + 1 : startPage + 1 + idx;
        const hasWaktu = Boolean(sop.langkahWaktu && sop.langkahWaktu.length === sop.langkah.length);

        if (wallPosterMode) {
          return (
            <article key={sop.id} id={`page-${sop.id}`} className="a4-page group">
              <button
                type="button"
                onClick={() => onEditSop(sop)}
                className="no-print absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-700 cursor-pointer z-10"
                title={`Ubah isi ${sop.judul}`}
              >
                <Pencil className="w-3 h-3" />
                <span>Edit SOP</span>
              </button>

              <div className="flex-1 flex flex-col border-2 border-stone-900 p-4">
                <div className="border-b-2 border-stone-900 pb-2 mb-2.5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-600">
                      {profile.namaTk} · Tahun Ajaran {profile.tahunAjaran}
                      {sop.prioritas ? ' · SOP PRIORITAS RAWAN' : ''}
                    </p>
                    <h3 className="font-doc-serif text-[19px] font-bold text-stone-950 leading-tight mt-0.5">
                      {String(sop.nomor).padStart(2, '0')}. SOP {sop.judul.toUpperCase()}
                    </h3>
                  </div>
                  <div className="text-right shrink-0 border border-stone-900 px-2.5 py-1 bg-stone-100">
                    <div className="text-[9px] uppercase text-stone-600 font-semibold">Kode SOP</div>
                    <div className="text-xs font-mono font-bold text-stone-950">{sop.kode}</div>
                  </div>
                </div>

                <div className="grid grid-cols-12 border border-stone-900 mb-2.5 text-[10.5px] leading-snug">
                  <div className="col-span-8 p-2 border-r border-stone-900 bg-stone-50/70">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-stone-600 mb-0.5">
                      Tujuan
                    </span>
                    <p className="font-medium text-stone-950">{sop.tujuan}</p>
                  </div>
                  <div className="col-span-4 p-2 bg-white">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-stone-600 mb-0.5">
                      Penanggung Jawab
                    </span>
                    <p className="font-bold text-stone-950">{sop.penanggungJawab}</p>
                  </div>
                </div>

                {/* Langkah 1-8 dengan opsional Kolom Waktu */}
                <div className="border-2 border-stone-900 flex-1 flex flex-col mb-2.5">
                  <div className="bg-stone-900 text-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Langkah-Langkah Wajib (Urutan 1–8)</span>
                    {hasWaktu && <span>Disertai Kolom Waktu</span>}
                  </div>
                  {hasWaktu ? (
                    <table className="w-full text-[10.8px] leading-[1.38] border-collapse flex-1">
                      <thead>
                        <tr className="bg-stone-100 border-b border-stone-400 text-left text-[9.5px]">
                          <th className="px-2.5 py-1 w-8 text-center">No</th>
                          <th className="px-2.5 py-1 w-24 border-x border-stone-300">Waktu</th>
                          <th className="px-2.5 py-1">Tindakan Guru</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-300">
                        {sop.langkah.map((step, sIdx) => (
                          <tr key={sIdx}>
                            <td className="px-2 py-1.5 text-center font-bold tabular-nums align-top">
                              {sIdx + 1}.
                            </td>
                            <td className="px-2 py-1.5 font-mono font-bold text-[10px] border-x border-stone-200 align-top whitespace-nowrap">
                              {sop.langkahWaktu?.[sIdx]}
                            </td>
                            <td className="px-2.5 py-1.5 font-medium text-stone-950 align-top">
                              {step}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <ol className="divide-y divide-stone-300 flex-1 flex flex-col justify-between text-[11px] leading-[1.4]">
                      {sop.langkah.map((step, sIdx) => (
                        <li key={sIdx} className="px-3 py-1.5 flex items-start gap-2.5">
                          <span className="w-6 h-6 bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="font-medium text-stone-950">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  <div className="border border-stone-800 p-2 bg-stone-50">
                    <span className="block text-[8.5px] font-bold uppercase tracking-wider text-stone-600">
                      Formulir / Catatan Terkait
                    </span>
                    <span className="font-semibold text-stone-950">
                      {sop.formulirDilampirkan.join(' · ')}
                    </span>
                  </div>
                  <div className="border border-stone-800 p-2 bg-stone-50">
                    <span className="block text-[8.5px] font-bold uppercase tracking-wider text-stone-600">
                      Lokasi Penempelan &amp; Pengesahan
                    </span>
                    <span className="font-semibold text-stone-950">
                      {sop.lokasiTempel || 'Tempel di Ruang Kelas / Ruang Guru'} · Kepsek: {profile.kepalaSekolah}
                    </span>
                  </div>
                </div>
              </div>

              <PageFooter
                profile={profile}
                sectionLabel={`Poster SOP Dinding · ${sop.kode}`}
                pageNumber={pageNum}
                totalPages={effectiveTotalPages}
              />
            </article>
          );
        }

        return (
          <article key={sop.id} id={`page-${sop.id}`} className="a4-page group">
            <button
              type="button"
              onClick={() => onEditSop(sop)}
              className="no-print absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-stone-900 text-white rounded hover:bg-stone-700 cursor-pointer z-10"
              title={`Ubah isi ${sop.judul}`}
            >
              <Pencil className="w-3 h-3" />
              <span>Edit SOP</span>
            </button>

            <div className="flex-1 flex flex-col">
              <KopSurat profile={profile} compact />

              <div className="border border-stone-900 mb-2.5">
                <div className="grid grid-cols-12 border-b border-stone-900 bg-stone-100">
                  <div className="col-span-8 px-3 py-1.5 border-r border-stone-900">
                    <div className="text-[8.5px] uppercase tracking-wider font-bold text-stone-600">
                      Standar Operasional Prosedur (SOP)
                      {sop.prioritas ? ' · Prioritas Rawan di TK' : ''}
                    </div>
                    <h3 className="font-doc-serif text-[14px] font-bold text-stone-950 leading-snug">
                      {String(sop.nomor).padStart(2, '0')}. SOP {sop.judul}
                    </h3>
                  </div>
                  <div className="col-span-4 px-3 py-1.5 text-[9.5px] flex flex-col justify-center divide-y divide-stone-300">
                    <div className="flex justify-between pb-0.5">
                      <span className="text-stone-600">Kode Dokumen</span>
                      <span className="font-bold font-mono text-stone-950">{sop.kode}</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-stone-600">Berlaku</span>
                      <span className="font-semibold tabular-nums text-stone-900">
                        TA {profile.tahunAjaran}
                      </span>
                    </div>
                  </div>
                </div>

                <table className="w-full text-[10px] leading-[1.35] border-collapse">
                  <tbody>
                    <tr className="border-b border-stone-300">
                      <td className="w-[140px] px-3 py-1.5 font-bold text-stone-900 bg-stone-50 border-r border-stone-300 align-top">
                        1. Tujuan
                      </td>
                      <td className="px-3 py-1.5 text-stone-900 align-top">{sop.tujuan}</td>
                    </tr>
                    <tr className="border-b border-stone-300">
                      <td className="px-3 py-1.5 font-bold text-stone-900 bg-stone-50 border-r border-stone-300 align-top">
                        2. Ruang Lingkup
                      </td>
                      <td className="px-3 py-1.5 text-stone-900 align-top">{sop.ruangLingkup}</td>
                    </tr>
                    <tr className="border-b border-stone-300">
                      <td className="px-3 py-1.5 font-bold text-stone-900 bg-stone-50 border-r border-stone-300 align-top">
                        3. Penanggung Jawab
                      </td>
                      <td className="px-3 py-1.5 font-semibold text-stone-950 align-top">
                        {sop.penanggungJawab}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold text-stone-900 bg-stone-50 border-r border-stone-300 align-top">
                        4. Alat yang Dibutuhkan
                      </td>
                      <td className="px-3 py-1.5 text-stone-900 align-top">
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 list-disc list-inside">
                          {sop.alatDibutuhkan.map((alat, aIdx) => (
                            <li key={aIdx} className="leading-snug">
                              {alat}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Langkah-langkah 1-8 (dengan Kolom Waktu untuk SOP Penjemputan) */}
              <div className="border border-stone-900 mb-2.5 flex-1 flex flex-col">
                <div className="bg-stone-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  5. Langkah-Langkah Pelaksanaan (Kalimat Perintah)
                </div>
                {hasWaktu ? (
                  <table className="w-full text-[9.8px] leading-[1.35] border-collapse flex-1">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-400 text-left">
                        <th className="px-2 py-1 w-7 text-center">No</th>
                        <th className="px-2 py-1 w-24 border-x border-stone-300">Waktu</th>
                        <th className="px-2.5 py-1">Langkah Pelaksanaan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {sop.langkah.map((step, sIdx) => (
                        <tr key={sIdx}>
                          <td className="px-2 py-1 text-center font-bold tabular-nums align-top">
                            {sIdx + 1}.
                          </td>
                          <td className="px-2 py-1 font-mono font-semibold text-stone-800 border-x border-stone-200 align-top whitespace-nowrap">
                            {sop.langkahWaktu?.[sIdx]}
                          </td>
                          <td className="px-2.5 py-1 text-stone-900 align-top">{step}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <ol className="divide-y divide-stone-200 text-[10.3px] leading-[1.4] flex-1">
                    {sop.langkah.map((step, sIdx) => (
                      <li key={sIdx} className="px-3 py-[6px] flex items-start gap-2.5">
                        <span className="font-bold tabular-nums text-stone-950 w-5 shrink-0">
                          {sIdx + 1}.
                        </span>
                        <span className="text-stone-900">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="border border-stone-800 bg-stone-50 px-3 py-1.5 mb-1">
                <div className="text-[9px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                  6. Formulir / Catatan yang Dilampirkan
                  {sop.lokasiTempel ? ` · ${sop.lokasiTempel}` : ''}
                </div>
                <p className="text-[10px] font-medium text-stone-900">
                  {sop.formulirDilampirkan.join('  ·  ')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-1 text-[9.5px] text-stone-700">
                <div className="flex items-end justify-between border-b border-stone-300 pb-0.5">
                  <span>Diperiksa Ketua Komite:</span>
                  <span className="font-semibold text-stone-900">{profile.ketuaKomite}</span>
                </div>
                <div className="flex items-end justify-between border-b border-stone-300 pb-0.5">
                  <span>Disahkan Kepala Sekolah:</span>
                  <span className="font-semibold text-stone-900">{profile.kepalaSekolah}</span>
                </div>
              </div>
            </div>

            <PageFooter
              profile={profile}
              sectionLabel={`Bagian 1 · ${sop.kode}`}
              pageNumber={pageNum}
              totalPages={effectiveTotalPages}
            />
          </article>
        );
      })}

      {/* HALAMAN RINGKAS 1 LEMBAR: PANDUAN DINDING GURU PIKET HARI PERTAMA */}
      {(sopFilter === 'all' || sopFilter === 'piket') && (
        <article id="page-b1-ringkas-piket" className="a4-page">
          <div className="flex-1 flex flex-col border-2 border-stone-900 p-3.5">
            <div className="border-b-2 border-stone-900 pb-2 mb-2.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-stone-600">
                  Versi Ringkas 1 Lembar · Tempel di Dinding Kelas &amp; Pos Piket
                </p>
                <h2 className="font-doc-serif text-[17.5px] font-bold text-stone-950 leading-tight">
                  PANDUAN CEPAT GURU PIKET HARI PERTAMA — {profile.namaTk.toUpperCase()}
                </h2>
              </div>
              <div className="text-right text-[9.5px] shrink-0">
                <p className="font-bold text-stone-900">TA {profile.tahunAjaran}</p>
                <p className="text-stone-600">Kepsek: {profile.kepalaSekolah}</p>
              </div>
            </div>

            {/* 1. Alur Jam Piket */}
            <div className="border border-stone-900 mb-2.5">
              <div className="bg-stone-900 text-white px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider">
                1. Apa yang Ibu/Bapak Guru Piket Lakukan Hari Ini? (Urutan Waktu)
              </div>
              <table className="w-full text-[9.5px] border-collapse">
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="px-2.5 py-1 font-mono font-bold w-24 bg-stone-50 border-r border-stone-300">06.45 WIB</td>
                    <td className="px-2.5 py-1">Buka gerbang, cek halaman bersih &amp; mainan aman, siapkan <strong>Buku Tamu</strong> dan <strong>Buku Antar-Jemput</strong>.</td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-1 font-mono font-bold bg-stone-50 border-r border-stone-300">07.00–07.45</td>
                    <td className="px-2.5 py-1">Sambut anak dengan senyum &amp; salam setinggi mata. Pengantar tanda tangan buku, anak cuci tangan masuk kelas.</td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-1 font-mono font-bold bg-stone-50 border-r border-stone-300">07.45–11.00</td>
                    <td className="px-2.5 py-1">Kunci selot gerbang. Jika ada <strong>Tamu Asing</strong>: catat di Buku Tamu, beri Kartu Tamu, dan dampingi ke ruang Kepala Sekolah.</td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-1 font-mono font-bold bg-stone-50 border-r border-stone-300">11.00–11.45</td>
                    <td className="px-2.5 py-1">Tuntun anak ke area tunggu. Cocokkan <strong>Kartu Jemput</strong> + tanda tangan penjemput. Cek kelas/toilet kosong sebelum pulang.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 2. Tanggap Cepat Situasi Rawan */}
            <div className="border border-stone-900 mb-2.5">
              <div className="bg-stone-100 border-b border-stone-900 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-stone-900">
                2. Cara Cepat Menghadapi 4 Kondisi Rawan (Tetap Tenang &amp; Lembut)
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-stone-300 text-[9.3px] leading-snug">
                <div className="p-2">
                  <p className="font-bold text-stone-950">A. Penjemput Lupa Kartu / Orang Baru</p>
                  <p className="text-stone-800">Tahan anak tetap di ruang tunggu aman. Telepon orang tua kandung untuk izin konfirmasi, lalu catat KTP penjemput.</p>
                </div>
                <div className="p-2">
                  <p className="font-bold text-stone-950">B. Anak Sakit / Terluka Ringan</p>
                  <p className="text-stone-800">Tuntun ke Ruang UKS, kompres/bersihkan luka, JANGAN beri obat minum tanpa izin orang tua. Kabari orang tua &amp; catat.</p>
                </div>
                <div className="p-2">
                  <p className="font-bold text-stone-950">C. Anak Tidak Terlihat di Kelas</p>
                  <p className="text-stone-800">1 guru jaga kelas, guru lain sisir toilet/gudang/halaman &amp; cek Buku Jemput. Jika &gt;10 menit belum ketemu, telepon Kepsek &amp; orang tua.</p>
                </div>
                <div className="p-2">
                  <p className="font-bold text-stone-950">D. Anak Menangis / Bertengkar</p>
                  <p className="text-stone-800">Jongkok sejajar mata anak, pisahkan lembut, dengarkan keduanya. Jangan membentak, memukul, atau melabeli "anak nakal".</p>
                </div>
              </div>
            </div>

            {/* 3. Langkah Evakuasi Singkat untuk Anak 4-6 Tahun */}
            <div className="border border-stone-900 mb-2.5 flex-1">
              <div className="bg-stone-100 border-b border-stone-900 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-stone-900">
                3. Jika Terjadi Bencana (Ingat: Anak Usia 4–6 Tahun WAJIB Dituntun Guru, Jangan Dibiarkan Lari Sendiri)
              </div>
              <div className="divide-y divide-stone-200 text-[9.3px] leading-snug">
                <div className="px-2.5 py-1.5 flex gap-2">
                  <span className="font-bold w-24 shrink-0 text-stone-950">GEMPA BUMI:</span>
                  <span>Guru berseru tenang <em>"Jadi kura-kura!"</em> → anak berlutut lindungi kepala di bawah meja (30 dtk) → guncangan reda, guru menuntun barisan kereta api ke Titik Kumpul Halaman (1–2 mnt).</span>
                </div>
                <div className="px-2.5 py-1.5 flex gap-2">
                  <span className="font-bold w-24 shrink-0 text-stone-950">KEBAKARAN:</span>
                  <span>Bunyikan peluit panjang → jangan ambil tas → jika berasap, guru menuntun anak merangkak menutup hidung ke halaman terbuka → hitung semua anak (1–2 mnt).</span>
                </div>
                <div className="px-2.5 py-1.5 flex gap-2">
                  <span className="font-bold w-24 shrink-0 text-stone-950">BANJIR:</span>
                  <span>Matikan listrik bawah → pindahkan anak ke ruang lebih tinggi → kabari orang tua jemput awal → jika keluar gedung, pegang tali pemandu bersama guru.</span>
                </div>
              </div>
            </div>

            {/* 4. Kontak Cepat */}
            <div className="border border-stone-800 bg-stone-50 px-3 py-1.5 flex items-center justify-between text-[9.5px]">
              <span><strong>Kontak Cepat:</strong> Kepala Sekolah ({profile.kepalaSekolah}) · Telp/WA: <strong>{profile.telepon}</strong></span>
              <span className="font-semibold text-stone-800">Darurat: 119 (Medis) · 113 (Damkar) · 110 (Polisi)</span>
            </div>
          </div>

          <PageFooter
            profile={profile}
            sectionLabel="Ringkasan Dinding 1 Lembar · Panduan Guru Piket"
            pageNumber={sopFilter === 'piket' ? 1 : startPage + 15}
            totalPages={effectiveTotalPages}
          />
        </article>
      )}

      {/* HALAMAN 17: LEMBAR PENGESAHAN BAGIAN 1 */}
      {sopFilter === 'all' && (
        <article id="page-b1-pengesahan" className="a4-page">
          <div className="flex-1 flex flex-col">
            <KopSurat profile={profile} />

            <div className="text-center mt-4 mb-5">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-500">
                Lembar Pengesahan Resmi
              </p>
              <h2 className="font-doc-serif text-[20px] font-bold text-stone-950 mt-1">
                PENGESAHAN STANDAR OPERASIONAL PROSEDUR (SOP)
                <br />
                {profile.namaTk.toUpperCase()}
              </h2>
              <p className="text-[11px] text-stone-600 mt-1">
                Nomor Dokumen: 001/SOP-TK/{profile.tahunAjaran}
              </p>
            </div>

            <div className="text-[11px] leading-[1.7] text-stone-900 space-y-3 text-justify mb-5">
              <p>
                Dengan memohon rahmat Tuhan Yang Maha Esa, seluruh dokumen{' '}
                <strong>Bagian 1 — 14 Standar Operasional Prosedur (SOP) Terpadu &amp; Panduan Ringkas Guru Piket</strong>{' '}
                pada <strong>{profile.namaTk}</strong> yang beralamat di {alamatLengkap} telah disusun,
                ditinjau keamanannya bagi anak usia 4–6 tahun, dan disepakati bersama oleh Kepala Sekolah,
                Dewan Guru ({profile.jumlahGuru}), serta Komite Sekolah ({profile.jumlahMurid}, {profile.jumlahRombel}).
              </p>
              <p>
                Seluruh guru, guru piket baru, dan tenaga kependidikan menjadikan dokumen ini sebagai
                pegangan kerja harian yang penuh kasih sayang sejak ditetapkan pada Tahun Ajaran{' '}
                <strong>{profile.tahunAjaran}</strong>, serta dievaluasi bersama secara berkala minimal 1 (satu) kali setiap semester.
              </p>
            </div>

            <div className="border border-stone-800 mb-6">
              <div className="bg-stone-100 border-b border-stone-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-900">
                Daftar 14 SOP Terpadu yang Disahkan
              </div>
              <div className="grid grid-cols-2 divide-x divide-stone-300 text-[9.5px]">
                <div className="divide-y divide-stone-200">
                  {sops.slice(0, 7).map((s) => (
                    <div key={s.id} className="px-2.5 py-1 flex gap-2">
                      <span className="font-mono font-semibold text-stone-600 shrink-0">{s.kode}</span>
                      <span className="text-stone-900 truncate">{s.judul}</span>
                    </div>
                  ))}
                </div>
                <div className="divide-y divide-stone-200">
                  {sops.slice(7, 14).map((s) => (
                    <div key={s.id} className="px-2.5 py-1 flex gap-2">
                      <span className="font-mono font-semibold text-stone-600 shrink-0">{s.kode}</span>
                      <span className="text-stone-900 truncate">{s.judul}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-stone-300 bg-stone-50/50 px-6 py-4">
              <p className="text-center text-[10.5px] font-semibold text-stone-700 mb-1">
                Ditetapkan dan disahkan di {profile.kecamatan}, Kabupaten {profile.kabupaten}
              </p>
              <SignatureBlock profile={profile} />
            </div>
          </div>

          <PageFooter
            profile={profile}
            sectionLabel="Bagian 1 · Lembar Pengesahan SOP"
            pageNumber={startPage + 16}
            totalPages={totalPages}
          />
        </article>
      )}

      {onNextSection && (
        <div className="no-print w-full max-w-[210mm] flex items-center justify-between bg-white border border-stone-300 px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Bagian 1 (14 SOP Terpadu &amp; Ringkasan Guru Piket) selesai disusun.
            </p>
            <p className="text-xs text-stone-600">
              Anda dapat mencetak Bagian 1 sekarang atau langsung melanjutkan ke Bagian 2 (SPAB).
            </p>
          </div>
          <button
            type="button"
            onClick={onNextSection}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lanjut ke Bagian 2 (SPAB) →
          </button>
        </div>
      )}
    </div>
  );
};
