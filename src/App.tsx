import React, { useState } from 'react';
import { HOTLINKED_IMAGES, Collective } from './data/arohaData';
import { ImpactScreen } from './components/ImpactScreen';
import { DirectoryScreen } from './components/DirectoryScreen';
import { ProcurementScreen } from './components/ProcurementScreen';
import { SavedScreen } from './components/SavedScreen';
import { ProfileScreen } from './components/ProfileScreen';

type TabKey = 'directory' | 'procurement' | 'impact' | 'saved' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('impact');
  const [savedIds, setSavedIds] = useState<string[]>([
    'nimar-weaver',
    'channapatna-lacquer',
    'bastar-forest-coop',
  ]);
  const [selectedCollectiveId, setSelectedCollectiveId] = useState<string | null>(null);
  const [rfpTargetCollective, setRfpTargetCollective] = useState<Collective | null>(null);
  const [regionLocale, setRegionLocale] = useState<string>('IN · EN');
  const [showLocaleModal, setShowLocaleModal] = useState<boolean>(false);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectTab = (tab: TabKey) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectCollectiveFromImpact = (collectiveId: string) => {
    setSelectedCollectiveId(collectiveId);
    setActiveTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateRfp = (collective: Collective) => {
    setRfpTargetCollective(collective);
    setActiveTab('procurement');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* Top App Bar matching exact HTML & Image 1 */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-xl mx-auto h-16 px-gutter-mobile flex items-center justify-between gap-space-sm">
          <button
            type="button"
            onClick={() => handleSelectTab('impact')}
            className="flex items-center gap-space-sm min-w-0 flex-1 text-left cursor-pointer"
          >
            <img
              alt="Aroha Impact Logo"
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={HOTLINKED_IMAGES.logo}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">
                  Aroha
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary font-label-sm text-label-sm uppercase">
                  <span className="material-symbols-outlined text-[12px]">
                    verified
                  </span>
                  <span className="hidden sm:inline">SHG</span>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                Directory
              </span>
            </div>
          </button>

          <div className="flex items-center gap-space-xs flex-shrink-0">
            <button
              aria-label="Location and Language"
              type="button"
              onClick={() => setShowLocaleModal(true)}
              className="min-w-[44px] min-h-[44px] px-2 flex items-center justify-center gap-1 rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                location_on
              </span>
              <span className="font-label-md text-label-md">{regionLocale}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('profile')}
              aria-label="Open Buyer Profile"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              <img
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover"
                src={HOTLINKED_IMAGES.profileAvatar}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex flex-col relative w-full max-w-xl mx-auto pt-16 pb-24 bg-surface min-h-screen">
        {activeTab === 'impact' && (
          <ImpactScreen
            onSelectCollective={handleInspectCollectiveFromImpact}
            onNavigateTab={handleSelectTab}
          />
        )}
        {activeTab === 'directory' && (
          <DirectoryScreen
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            selectedCollectiveId={selectedCollectiveId}
            onClearSelectedCollective={() => setSelectedCollectiveId(null)}
            onInitiateRfp={handleInitiateRfp}
          />
        )}
        {activeTab === 'procurement' && (
          <ProcurementScreen
            preselectedCollective={rfpTargetCollective}
            onClearPreselected={() => setRfpTargetCollective(null)}
          />
        )}
        {activeTab === 'saved' && (
          <SavedScreen
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onInitiateRfp={handleInitiateRfp}
            onNavigateDirectory={() => handleSelectTab('directory')}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen
            regionLocale={regionLocale}
            onChangeLocale={setRegionLocale}
          />
        )}
      </main>

      {/* Bottom Navigation Bar matching exact HTML & Image 1 */}
      <nav
        className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
        data-active-classes="text-primary font-semibold"
      >
        <div className="max-w-xl mx-auto flex justify-around items-center h-16 px-space-xs">
          <button
            type="button"
            onClick={() => handleSelectTab('directory')}
            aria-current={activeTab === 'directory' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 py-1 transition-colors cursor-pointer ${
              activeTab === 'directory'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'directory'
                  ? "[font-variation-settings:'FILL'_1]"
                  : ''
              }`}
            >
              explore
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">
              Directory
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('procurement')}
            aria-current={activeTab === 'procurement' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 py-1 transition-colors cursor-pointer ${
              activeTab === 'procurement'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'procurement'
                  ? "[font-variation-settings:'FILL'_1]"
                  : ''
              }`}
            >
              inventory_2
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">
              Procurement
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('impact')}
            aria-current={activeTab === 'impact' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 py-1 transition-colors cursor-pointer ${
              activeTab === 'impact'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'impact'
                  ? "[font-variation-settings:'FILL'_1]"
                  : ''
              }`}
            >
              eco
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Impact</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('saved')}
            aria-current={activeTab === 'saved' ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 py-1 transition-colors cursor-pointer ${
              activeTab === 'saved'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'saved'
                  ? "[font-variation-settings:'FILL'_1]"
                  : ''
              }`}
            >
              bookmark
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Saved</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab('profile')}
            aria-current={activeTab === 'profile' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 py-1 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'profile'
                  ? "[font-variation-settings:'FILL'_1]"
                  : ''
              }`}
            >
              account_circle
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Profile</span>
          </button>
        </div>
      </nav>

      {/* Quick Locale & Audit Jurisdiction Modal */}
      {showLocaleModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-surface/30 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-sm bg-surface rounded-t-xl sm:rounded-xl p-space-lg shadow-xl border border-outline-variant/40">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-label-sm text-label-sm uppercase text-secondary">
                Jurisdiction &amp; Language
              </span>
              <button
                type="button"
                onClick={() => setShowLocaleModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-space-xs">
              {[
                { code: 'IN · EN', desc: 'India • English (₹ INR / NRLM Registry)' },
                { code: 'IN · HI', desc: 'भारत • हिंदी (₹ INR / राष्ट्रीय आजीविका मिशन)' },
                { code: 'EU · EN', desc: 'European Union • English (CSDDD Audit Export)' },
              ].map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setRegionLocale(opt.code);
                    setShowLocaleModal(false);
                  }}
                  className={`p-space-md rounded-lg text-left flex items-center justify-between transition-colors cursor-pointer ${
                    regionLocale === opt.code
                      ? 'bg-secondary-container/70 text-on-secondary-fixed'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div>
                    <div className="font-title-md text-title-md">{opt.code}</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {opt.desc}
                    </div>
                  </div>
                  {regionLocale === opt.code && (
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      check_circle
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
