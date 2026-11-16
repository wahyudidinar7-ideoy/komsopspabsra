import React from 'react';
import { Printer, RotateCcw, FileText, Building2 } from 'lucide-react';
import {
  DisasterRisk,
  DocumentSection,
  PrintScope,
  SchoolProfile,
  SopItem,
} from '../types/document';

interface SidebarEditorProps {
  profile: SchoolProfile;
  onChangeProfile: (next: SchoolProfile) => void;
  onLoadExample: () => void;
  onResetBlank: () => void;
  activeSection: DocumentSection;
  sops: SopItem[];
  printScope: PrintScope;
  onChangePrintScope: (scope: PrintScope) => void;
  totalAllPages: number;
  onPrint: () => void;
}

const DISASTER_OPTIONS: DisasterRisk[] = [
  'Banjir',
  'Gempa Bumi',
  'Kebakaran',
  'Tanah Longsor',
  'Angin Puting Beliung',
  'Tidak ada, tapi tetap siaga',
];

export const SidebarEditor: React.FC<SidebarEditorProps> = ({
  profile,
  onChangeProfile,
  onLoadExample,
  onResetBlank,
  activeSection,
  sops,
  printScope,
  onChangePrintScope,
  totalAllPages,
  onPrint,
}) => {
  const updateField = <K extends keyof SchoolProfile>(key: K, value: SchoolProfile[K]) => {
    onChangeProfile({ ...profile, [key]: value });
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="no-print w-full lg:w-[340px] xl:w-[360px] shrink-0 bg-white border-r border-stone-300 flex flex-col lg:h-[calc(100vh-61px)] lg:sticky lg:top-[61px]">
      <div className="p-4 border-b border-stone-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Building2 className="w-4 h-4 text-stone-700 shrink-0" />
          <h2 className="text-sm font-bold text-stone-900 truncate">Identitas Sekolah</h2>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onLoadExample}
            className="px-2.5 py-1 text-[11px] font-medium border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Isi dengan contoh data TK"
          >
            Contoh Data
          </button>
          <button
            type="button"
            onClick={onResetBlank}
            className="p-1.5 text-stone-500 hover:text-stone-900 border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Kembalikan ke format isian kosong [...]"
            aria-label="Reset ke format kosong"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Form Input Identitas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Nama TK</label>
            <input
              type="text"
              value={profile.namaTk}
              onChange={(e) => updateField('namaTk', e.target.value)}
              placeholder="Contoh: TK Harapan Bangsa"
              className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Yayasan / Penyelenggara
            </label>
            <input
              type="text"
              value={profile.yayasan}
              onChange={(e) => updateField('yayasan', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Desa / Kelurahan</label>
              <input
                type="text"
                value={profile.desa}
                onChange={(e) => updateField('desa', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kecamatan</label>
              <input
                type="text"
                value={profile.kecamatan}
                onChange={(e) => updateField('kecamatan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={profile.kabupaten}
                onChange={(e) => updateField('kabupaten', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Telepon / WA</label>
              <input
                type="text"
                value={profile.telepon}
                onChange={(e) => updateField('telepon', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={profile.tahunAjaran}
                onChange={(e) => updateField('tahunAjaran', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 tabular-nums focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Jml Murid</label>
              <input
                type="text"
                value={profile.jumlahMurid}
                onChange={(e) => updateField('jumlahMurid', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Jml Guru</label>
              <input
                type="text"
                value={profile.jumlahGuru}
                onChange={(e) => updateField('jumlahGuru', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Jumlah &amp; Nama Rombel</label>
            <input
              type="text"
              value={profile.jumlahRombel}
              onChange={(e) => updateField('jumlahRombel', e.target.value)}
              placeholder="Contoh: 4 rombel (A1, A2, B1, B2)"
              className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kepala Sekolah</label>
              <input
                type="text"
                value={profile.kepalaSekolah}
                onChange={(e) => updateField('kepalaSekolah', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Ketua Komite</label>
              <input
                type="text"
                value={profile.ketuaKomite}
                onChange={(e) => updateField('ketuaKomite', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Tanggal Pengesahan</label>
              <input
                type="text"
                value={profile.tanggalPengesahan}
                onChange={(e) => updateField('tanggalPengesahan', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Bencana Utama</label>
              <select
                value={profile.bencanaUtama}
                onChange={(e) => updateField('bencanaUtama', e.target.value as DisasterRisk)}
                className="w-full px-2 py-1.5 border border-stone-300 text-stone-900 bg-white focus:outline-none focus:border-stone-900"
              >
                {DISASTER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigasi Cepat Halaman */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-3.5 h-3.5 text-stone-600" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Loncat ke Halaman
            </h3>
          </div>

          {activeSection === 'bagian1' && (
            <div className="space-y-0.5 text-xs max-h-52 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => scrollToElement('page-b1-cover')}
                className="w-full text-left px-2 py-1 text-stone-700 hover:bg-stone-100 hover:text-stone-950 truncate cursor-pointer"
              >
                00. Sampul &amp; Daftar Isi Bagian 1
              </button>
              {sops.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToElement(`page-${s.id}`)}
                  className={`w-full text-left px-2 py-1 hover:bg-stone-100 hover:text-stone-950 truncate tabular-nums cursor-pointer flex items-center justify-between gap-1 ${
                    s.prioritas ? 'font-semibold text-stone-900' : 'text-stone-700'
                  }`}
                >
                  <span className="truncate">
                    {String(s.nomor).padStart(2, '0')}. {s.judul}
                  </span>
                  {s.prioritas && (
                    <span className="text-[10px] text-stone-500 shrink-0">Rawan</span>
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToElement('page-b1-ringkas-piket')}
                className="w-full text-left px-2 py-1 font-semibold text-stone-900 hover:bg-stone-100 truncate cursor-pointer"
              >
                15. Ringkas Guru Piket (1 Hal Dinding)
              </button>
              <button
                type="button"
                onClick={() => scrollToElement('page-b1-pengesahan')}
                className="w-full text-left px-2 py-1 font-medium text-stone-800 hover:bg-stone-100 truncate cursor-pointer"
              >
                16. Lembar Pengesahan Bagian 1
              </button>
            </div>
          )}

          {activeSection === 'bagian2' && (
            <div className="space-y-0.5 text-xs">
              {[
                ['page-b2-1', '1. Profil Risiko, Jalur Evakuasi & Tim'],
                ['page-b2-2', '2. SOP Evakuasi Gempa, Kebakaran, Banjir'],
                ['page-b2-3', '3. SOP P3K & Skenario Simulasi 30 Menit'],
                ['page-b2-4', '4. Ceklis Sarana & Surat Darurat Ortu'],
                ['page-b2-5', '5. Lembar Pengesahan SPAB'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToElement(id)}
                  className="w-full text-left px-2 py-1 text-stone-700 hover:bg-stone-100 truncate cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {activeSection === 'bagian3' && (
            <div className="space-y-0.5 text-xs">
              {[
                ['page-b3-1', '1. Deklarasi & 6 Indikator SRA'],
                ['page-b3-2', '2. Kode Etik Guru & SOP Penanganan Khusus'],
                ['page-b3-3', '3. Tata Tertib Anak & Piagam Hak Anak'],
                ['page-b3-4', '4. Lembar Pengesahan SRA'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToElement(id)}
                  className="w-full text-left px-2 py-1 text-stone-700 hover:bg-stone-100 truncate cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {activeSection === 'bagian4' && (
            <div className="space-y-0.5 text-xs max-h-52 overflow-y-auto pr-1">
              {[
                ['page-lampiran-1', '01. Jadwal Piket Guru'],
                ['page-lampiran-2', '02. Kartu Jemput Anak'],
                ['page-lampiran-3', '03. Buku Tamu Sekolah'],
                ['page-lampiran-4', '04. Buku Catatan Anak Sakit'],
                ['page-lampiran-5', '05. Denah Jalur Evakuasi'],
                ['page-lampiran-6', '06. Daftar Nomor Darurat'],
                ['page-lampiran-7', '07. Poster 5 Aturan Anak'],
                ['page-lampiran-8', '08. Poster Larangan Kekerasan'],
                ['page-lampiran-9', '09. Ceklis Kebersihan Harian'],
                ['page-lampiran-10', '10. Formulir Izin Foto Anak'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToElement(id)}
                  className="w-full text-left px-2 py-1 text-stone-700 hover:bg-stone-100 truncate cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {activeSection === 'bagian5' && (
            <div className="space-y-0.5 text-xs">
              {[
                ['page-sosialisasi-1', '1. Surat Edaran SOP Penjemputan Baru'],
                ['page-sosialisasi-2', '2. Teks WA Grup Simulasi Bencana SPAB'],
                ['page-sosialisasi-3', '3. Poster Gerbang TK Ramah Anak'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToElement(id)}
                  className="w-full text-left px-2 py-1 text-stone-700 hover:bg-stone-100 truncate cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Kontrol Cetak */}
      <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-700">Cakupan Cetak:</span>
          <div className="flex border border-stone-300 bg-white">
            <button
              type="button"
              onClick={() => onChangePrintScope('active')}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                printScope === 'active'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Bagian Aktif
            </button>
            <button
              type="button"
              onClick={() => onChangePrintScope('all')}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                printScope === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Semua ({totalAllPages} Hal)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onPrint}
          className="w-full py-2.5 px-4 bg-stone-900 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>
            {printScope === 'all'
              ? `Cetak / Simpan PDF Semua Bagian (${totalAllPages} Hal)`
              : 'Cetak / Simpan PDF Bagian Ini (A4)'}
          </span>
        </button>
      </div>
    </aside>
  );
};
