export type DocumentSection = 'bagian1' | 'bagian2' | 'bagian3' | 'bagian4' | 'bagian5';

export type PrintScope = 'active' | 'all';

export type DisasterRisk =
  | 'Banjir'
  | 'Gempa Bumi'
  | 'Kebakaran'
  | 'Tanah Longsor'
  | 'Angin Puting Beliung'
  | 'Tidak ada, tapi tetap siaga';

export interface SchoolProfile {
  namaTk: string;
  yayasan: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  telepon: string;
  tahunAjaran: string;
  jumlahMurid: string;
  jumlahGuru: string;
  jumlahRombel: string;
  kepalaSekolah: string;
  ketuaKomite: string;
  tanggalPengesahan: string;
  bencanaUtama: DisasterRisk;
}

export interface SopItem {
  id: string;
  nomor: number;
  kode: string;
  judul: string;
  prioritas?: boolean;
  lokasiTempel?: string;
  tujuan: string;
  ruangLingkup: string;
  penanggungJawab: string;
  alatDibutuhkan: string[];
  langkah: string[];
  langkahWaktu?: string[];
  formulirDilampirkan: string[];
}
