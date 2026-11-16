import React from 'react';
import { SchoolProfile } from '../types/document';

interface KopSuratProps {
  profile: SchoolProfile;
  compact?: boolean;
}

export const KopSurat: React.FC<KopSuratProps> = ({ profile, compact = false }) => {
  const alamatLengkap = `Desa ${profile.desa}, Kecamatan ${profile.kecamatan}, Kabupaten ${profile.kabupaten}`;

  return (
    <header className={`${compact ? 'pb-2 mb-3' : 'pb-2.5 mb-4'} border-b-[2.5px] border-stone-900 relative`}>
      <div className="flex items-center justify-between gap-4 pb-1 border-b border-stone-400">
        {/* Emblem / Logo Placeholder */}
        <div className="w-12 h-12 shrink-0 border border-stone-800 flex items-center justify-center bg-stone-50 text-stone-800">
          <svg
            viewBox="0 0 36 36"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M18 4L6 10v9c0 7.2 5.1 12.6 12 14 6.9-1.4 12-6.8 12-14v-9L18 4z" />
            <path d="M12.5 18.5L16.5 22.5L24 14.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex-1 text-center">
          <p className="text-[9.5px] tracking-[0.12em] uppercase font-semibold text-stone-600 leading-tight">
            {profile.yayasan}
          </p>
          <h2 className="font-doc-serif text-[17px] font-bold tracking-tight text-stone-950 leading-snug mt-0.5">
            {profile.namaTk}
          </h2>
          <p className="text-[10px] text-stone-700 leading-tight mt-0.5">
            Alamat: {alamatLengkap} · Telp/WA: {profile.telepon}
          </p>
        </div>

        <div className="w-12 shrink-0 text-right">
          <div className="text-[8.5px] uppercase tracking-wider text-stone-500 font-semibold">TA</div>
          <div className="text-[10.5px] font-bold tabular-nums text-stone-900">
            {profile.tahunAjaran}
          </div>
        </div>
      </div>
    </header>
  );
};

interface PageFooterProps {
  profile: SchoolProfile;
  sectionLabel: string;
  pageNumber: number;
  totalPages?: number;
}

export const PageFooter: React.FC<PageFooterProps> = ({
  profile,
  sectionLabel,
  pageNumber,
  totalPages,
}) => {
  return (
    <footer className="pt-2 mt-auto border-t border-stone-300 flex items-center justify-between text-[9.5px] text-stone-600">
      <div className="truncate max-w-[65%]">
        <span className="font-semibold text-stone-800">{profile.namaTk}</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <span>{sectionLabel}</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <span>TA {profile.tahunAjaran}</span>
      </div>
      <div className="font-semibold tabular-nums text-stone-800 shrink-0">
        Halaman {pageNumber}
        {totalPages ? ` dari ${totalPages}` : ''}
      </div>
    </footer>
  );
};

interface SignatureBlockProps {
  profile: SchoolProfile;
  compact?: boolean;
}

export const SignatureBlock: React.FC<SignatureBlockProps> = ({ profile, compact = false }) => {
  const lokasi = profile.desa && !profile.desa.startsWith('[')
    ? `${profile.desa}, ${profile.tanggalPengesahan}`
    : `${profile.kecamatan}, ${profile.tanggalPengesahan}`;

  return (
    <div className={`grid grid-cols-2 gap-8 ${compact ? 'mt-3 pt-2' : 'mt-6 pt-4'}`}>
      <div className="text-center text-[11px] leading-snug">
        <p className="text-stone-700">Mengetahui,</p>
        <p className="font-semibold text-stone-900">Ketua Komite Sekolah</p>
        <div className={compact ? 'h-12' : 'h-20'} />
        <p className="font-bold text-stone-950 underline underline-offset-4">
          {profile.ketuaKomite}
        </p>
      </div>

      <div className="text-center text-[11px] leading-snug">
        <p className="text-stone-700">{lokasi}</p>
        <p className="font-semibold text-stone-900">Kepala {profile.namaTk}</p>
        <div className={compact ? 'h-12' : 'h-20'} />
        <p className="font-bold text-stone-950 underline underline-offset-4">
          {profile.kepalaSekolah}
        </p>
      </div>
    </div>
  );
};
