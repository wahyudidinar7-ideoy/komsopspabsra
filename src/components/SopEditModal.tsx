import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { SopItem } from '../types/document';

interface SopEditModalProps {
  sop: SopItem;
  onSave: (updated: SopItem) => void;
  onResetSingle: (sopId: string) => void;
  onClose: () => void;
}

export const SopEditModal: React.FC<SopEditModalProps> = ({
  sop,
  onSave,
  onResetSingle,
  onClose,
}) => {
  const [judul, setJudul] = useState(sop.judul);
  const [tujuan, setTujuan] = useState(sop.tujuan);
  const [ruangLingkup, setRuangLingkup] = useState(sop.ruangLingkup);
  const [penanggungJawab, setPenanggungJawab] = useState(sop.penanggungJawab);
  const [alatText, setAlatText] = useState(sop.alatDibutuhkan.join('\n'));
  const [langkahList, setLangkahList] = useState<string[]>([...sop.langkah]);
  const [formulirText, setFormulirText] = useState(sop.formulirDilampirkan.join('\n'));

  const handleStepChange = (index: number, value: string) => {
    setLangkahList((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...sop,
      judul: judul.trim() || sop.judul,
      tujuan: tujuan.trim() || sop.tujuan,
      ruangLingkup: ruangLingkup.trim() || sop.ruangLingkup,
      penanggungJawab: penanggungJawab.trim() || sop.penanggungJawab,
      alatDibutuhkan: alatText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      langkah: langkahList.map((s) => s.trim()).filter(Boolean),
      formulirDilampirkan: formulirText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-stone-950/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sop-edit-title"
    >
      <div className="bg-white border border-stone-300 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl">
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono text-stone-500">{sop.kode}</p>
            <h3 id="sop-edit-title" className="text-base font-bold text-stone-900">
              Ubah Isi {sop.judul}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Tutup jendela edit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Judul SOP
              </label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Penanggung Jawab
              </label>
              <input
                type="text"
                value={penanggungJawab}
                onChange={(e) => setPenanggungJawab(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Tujuan</label>
            <textarea
              rows={2}
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Ruang Lingkup
            </label>
            <textarea
              rows={2}
              value={ruangLingkup}
              onChange={(e) => setRuangLingkup(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Alat yang Dibutuhkan (1 baris = 1 item)
              </label>
              <textarea
                rows={4}
                value={alatText}
                onChange={(e) => setAlatText(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Formulir yang Dilampirkan (1 baris = 1 formulir)
              </label>
              <textarea
                rows={4}
                value={formulirText}
                onChange={(e) => setFormulirText(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Langkah-Langkah (1–8, kalimat perintah ringkas agar muat 1 halaman A4)
            </label>
            <div className="space-y-2">
              {langkahList.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="pt-2 text-xs font-bold tabular-nums text-stone-600 w-5">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                onResetSingle(sop.id);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan Standar</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
