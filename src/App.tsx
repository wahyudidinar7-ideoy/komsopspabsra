import { useEffect, useMemo, useState } from 'react';
import { Printer } from 'lucide-react';
import {
  DEFAULT_SCHOOL_PROFILE,
  EXAMPLE_SCHOOL_PROFILE,
  createDefaultSops,
} from './data/bagian1Sops';
import { DocumentSection, PrintScope, SchoolProfile, SopItem } from './types/document';
import { SidebarEditor } from './components/SidebarEditor';
import { BAGIAN1_PAGE_COUNT, Bagian1View } from './components/Bagian1View';
import { BAGIAN2_PAGE_COUNT, Bagian2View } from './components/Bagian2View';
import { BAGIAN3_PAGE_COUNT, Bagian3View } from './components/Bagian3View';
import { BAGIAN4_PAGE_COUNT, Bagian4View } from './components/Bagian4View';
import { BAGIAN5_PAGE_COUNT, Bagian5View } from './components/Bagian5View';
import { SopEditModal } from './components/SopEditModal';

const STORAGE_PROFILE_KEY = 'tk_kompilasi_profile_v1';
const STORAGE_SOP_OVERRIDES_KEY = 'tk_kompilasi_sop_overrides_v1';

const TOTAL_ALL_PAGES =
  BAGIAN1_PAGE_COUNT +
  BAGIAN2_PAGE_COUNT +
  BAGIAN3_PAGE_COUNT +
  BAGIAN4_PAGE_COUNT +
  BAGIAN5_PAGE_COUNT;

export default function App() {
  const [activeSection, setActiveSection] = useState<DocumentSection>('bagian5');
  const [printScope, setPrintScope] = useState<PrintScope>('active');
  const [editingSopId, setEditingSopId] = useState<string | null>(null);

  const [profile, setProfile] = useState<SchoolProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (saved) return { ...DEFAULT_SCHOOL_PROFILE, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return DEFAULT_SCHOOL_PROFILE;
  });

  const [sopOverrides, setSopOverrides] = useState<Record<string, Partial<SopItem>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SOP_OVERRIDES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SOP_OVERRIDES_KEY, JSON.stringify(sopOverrides));
    } catch {
      // ignore storage errors
    }
  }, [sopOverrides]);

  const sops = useMemo(() => {
    const base = createDefaultSops(profile);
    return base.map((item) => ({
      ...item,
      ...(sopOverrides[item.id] || {}),
    }));
  }, [profile, sopOverrides]);

  const editingSop = useMemo(
    () => sops.find((s) => s.id === editingSopId) || null,
    [sops, editingSopId]
  );

  const handleSaveSop = (updated: SopItem) => {
    setSopOverrides((prev) => ({
      ...prev,
      [updated.id]: {
        judul: updated.judul,
        tujuan: updated.tujuan,
        ruangLingkup: updated.ruangLingkup,
        penanggungJawab: updated.penanggungJawab,
        alatDibutuhkan: updated.alatDibutuhkan,
        langkah: updated.langkah,
        formulirDilampirkan: updated.formulirDilampirkan,
      },
    }));
    setEditingSopId(null);
  };

  const handleResetSingleSop = (sopId: string) => {
    setSopOverrides((prev) => {
      const copy = { ...prev };
      delete copy[sopId];
      return copy;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSwitchSection = (section: DocumentSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionPagination = (section: DocumentSection) => {
    if (printScope === 'all') {
      switch (section) {
        case 'bagian1':
          return { startPage: 1, totalPages: TOTAL_ALL_PAGES };
        case 'bagian2':
          return { startPage: 1 + BAGIAN1_PAGE_COUNT, totalPages: TOTAL_ALL_PAGES };
        case 'bagian3':
          return {
            startPage: 1 + BAGIAN1_PAGE_COUNT + BAGIAN2_PAGE_COUNT,
            totalPages: TOTAL_ALL_PAGES,
          };
        case 'bagian4':
          return {
            startPage: 1 + BAGIAN1_PAGE_COUNT + BAGIAN2_PAGE_COUNT + BAGIAN3_PAGE_COUNT,
            totalPages: TOTAL_ALL_PAGES,
          };
        case 'bagian5':
          return {
            startPage:
              1 +
              BAGIAN1_PAGE_COUNT +
              BAGIAN2_PAGE_COUNT +
              BAGIAN3_PAGE_COUNT +
              BAGIAN4_PAGE_COUNT,
            totalPages: TOTAL_ALL_PAGES,
          };
      }
    }

    switch (section) {
      case 'bagian1':
        return { startPage: 1, totalPages: BAGIAN1_PAGE_COUNT };
      case 'bagian2':
        return { startPage: 1, totalPages: BAGIAN2_PAGE_COUNT };
      case 'bagian3':
        return { startPage: 1, totalPages: BAGIAN3_PAGE_COUNT };
      case 'bagian4':
        return { startPage: 1, totalPages: BAGIAN4_PAGE_COUNT };
      case 'bagian5':
        return { startPage: 1, totalPages: BAGIAN5_PAGE_COUNT };
    }
  };

  const b1Pages = getSectionPagination('bagian1');
  const b2Pages = getSectionPagination('bagian2');
  const b3Pages = getSectionPagination('bagian3');
  const b4Pages = getSectionPagination('bagian4');
  const b5Pages = getSectionPagination('bagian5');

  const navItems: { id: DocumentSection; label: string }[] = [
    { id: 'bagian1', label: 'Bagian 1: 14 SOP' },
    { id: 'bagian2', label: 'Bagian 2: SPAB' },
    { id: 'bagian3', label: 'Bagian 3: SRA' },
    { id: 'bagian4', label: 'Bagian 4: Lampiran' },
    { id: 'bagian5', label: 'Bagian 5: Sosialisasi' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#EFECE6]">
      {/* Top Navigation Bar (Strict 3-Zone Contract, hidden in print) */}
      <header className="no-print sticky top-0 z-30 bg-white border-b border-stone-300 px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <span className="font-doc-serif text-lg font-bold tracking-tight text-stone-950 whitespace-nowrap shrink-0">
          Kompilasi Dokumen TK
        </span>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSwitchSection(item.id)}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'border-stone-950 text-stone-950 font-semibold'
                    : 'border-transparent text-stone-600 hover:text-stone-950 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF A4</span>
          </button>
        </div>
      </header>

      {/* Mobile Section Switcher (visible on < md screens only, hidden in print) */}
      <div className="no-print md:hidden bg-white border-b border-stone-300 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSwitchSection(item.id)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 border cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <SidebarEditor
          profile={profile}
          onChangeProfile={setProfile}
          onLoadExample={() => setProfile(EXAMPLE_SCHOOL_PROFILE)}
          onResetBlank={() => setProfile(DEFAULT_SCHOOL_PROFILE)}
          activeSection={activeSection}
          sops={sops}
          printScope={printScope}
          onChangePrintScope={setPrintScope}
          totalAllPages={TOTAL_ALL_PAGES}
          onPrint={handlePrint}
        />

        {/* A4 Print Preview Canvas */}
        <main className="print-container flex-1 py-8 px-4 md:px-8 overflow-x-auto">
          {(activeSection === 'bagian1' || printScope === 'all') && (
            <div className={activeSection === 'bagian1' ? 'block' : 'hidden print:block'}>
              <Bagian1View
                profile={profile}
                sops={sops}
                startPage={b1Pages.startPage}
                totalPages={b1Pages.totalPages}
                onEditSop={(sop) => setEditingSopId(sop.id)}
                onNextSection={() => handleSwitchSection('bagian2')}
              />
            </div>
          )}

          {(activeSection === 'bagian2' || printScope === 'all') && (
            <div className={activeSection === 'bagian2' ? 'block' : 'hidden print:block'}>
              <Bagian2View
                profile={profile}
                startPage={b2Pages.startPage}
                totalPages={b2Pages.totalPages}
                onNextSection={() => handleSwitchSection('bagian3')}
              />
            </div>
          )}

          {(activeSection === 'bagian3' || printScope === 'all') && (
            <div className={activeSection === 'bagian3' ? 'block' : 'hidden print:block'}>
              <Bagian3View
                profile={profile}
                startPage={b3Pages.startPage}
                totalPages={b3Pages.totalPages}
                onNextSection={() => handleSwitchSection('bagian4')}
              />
            </div>
          )}

          {(activeSection === 'bagian4' || printScope === 'all') && (
            <div className={activeSection === 'bagian4' ? 'block' : 'hidden print:block'}>
              <Bagian4View
                profile={profile}
                startPage={b4Pages.startPage}
                totalPages={b4Pages.totalPages}
                onNextSection={() => handleSwitchSection('bagian5')}
              />
            </div>
          )}

          {(activeSection === 'bagian5' || printScope === 'all') && (
            <div className={activeSection === 'bagian5' ? 'block' : 'hidden print:block'}>
              <Bagian5View
                profile={profile}
                startPage={b5Pages.startPage}
                totalPages={b5Pages.totalPages}
              />
            </div>
          )}
        </main>
      </div>

      {/* Modal Edit SOP */}
      {editingSop && (
        <SopEditModal
          sop={editingSop}
          onSave={handleSaveSop}
          onResetSingle={handleResetSingleSop}
          onClose={() => setEditingSopId(null)}
        />
      )}
    </div>
  );
}
