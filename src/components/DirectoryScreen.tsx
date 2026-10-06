import React, { useState } from 'react';
import { COLLECTIVES, Collective } from '../data/arohaData';

interface DirectoryScreenProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  selectedCollectiveId: string | null;
  onClearSelectedCollective: () => void;
  onInitiateRfp: (collective: Collective) => void;
}

export const DirectoryScreen: React.FC<DirectoryScreenProps> = ({
  savedIds,
  onToggleSave,
  selectedCollectiveId,
  onClearSelectedCollective,
  onInitiateRfp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'handloom' | 'handicrafts' | 'agri' | 'women'>('all');
  const [dossierCollective, setDossierCollective] = useState<Collective | null>(
    () => COLLECTIVES.find((c) => c.id === selectedCollectiveId) || null
  );

  React.useEffect(() => {
    if (selectedCollectiveId) {
      const found = COLLECTIVES.find((c) => c.id === selectedCollectiveId);
      if (found) setDossierCollective(found);
      onClearSelectedCollective();
    }
  }, [selectedCollectiveId, onClearSelectedCollective]);

  const filteredCollectives = COLLECTIVES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.craftItalic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'women') return c.womenPercentage >= 85;
    return c.sector === activeFilter;
  });

  return (
    <div className="flex flex-col w-full px-gutter-mobile pb-space-2xl">
      {/* Eyebrow & Status */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm pt-space-sm">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          NRLM &amp; GI-Verified Registry • 1,420 Clusters
        </span>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary">
          <span className="material-symbols-outlined text-[13px]">verified</span>
          <span className="font-label-sm text-label-sm font-semibold uppercase">
            100% Direct SHG
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-space-md">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
          Artisan Collectives &amp; SHG Directory
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Source directly from biometric-verified rural cooperatives and women-led enterprises with zero middlemen.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-space-md">
        <span className="material-symbols-outlined text-[20px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search craft, GI tag, state, or natural fiber..."
          className="w-full h-11 pl-10 pr-9 rounded bg-surface-container-low border border-outline-variant/60 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar mb-space-lg">
        {[
          { key: 'all', label: 'All Collectives (5)' },
          { key: 'handloom', label: 'Handloom & Textiles' },
          { key: 'handicrafts', label: 'Handicrafts & Pottery' },
          { key: 'agri', label: 'Forest & Agri' },
          { key: 'women', label: 'Women-Led (85%+)' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key as typeof activeFilter)}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
              activeFilter === tab.key
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Collective Cards */}
      <div className="flex flex-col gap-space-md">
        {filteredCollectives.map((collective) => {
          const isSaved = savedIds.includes(collective.id);
          return (
            <div
              key={collective.id}
              className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30 flex flex-col"
            >
              {/* Zone 1: Artisan Collective Header */}
              <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                <div className="flex items-center gap-space-sm min-w-0">
                  <img
                    src={collective.image}
                    alt={collective.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-surface-dim"
                  />
                  <div className="min-w-0">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {collective.name}
                    </h2>
                    <p className="font-headline-sm text-[14px] italic text-primary truncate">
                      {collective.craftItalic}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleSave(collective.id)}
                  aria-label={isSaved ? 'Remove from Saved' : 'Save Collective'}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-primary/15 text-primary'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isSaved ? "[font-variation-settings:'FILL'_1]" : ''
                    }`}
                  >
                    bookmark
                  </span>
                </button>
              </div>

              {/* Location & NRLM Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-on-surface-variant mb-space-sm">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    location_on
                  </span>
                  {collective.location}, {collective.state}
                </span>
                <span>•</span>
                <span>{collective.womenPercentage}% Women SHG</span>
              </div>

              {/* Verification Badges */}
              <div className="flex flex-wrap gap-1.5 mb-space-md">
                {collective.certifications.map((cert) => {
                  const isSHG = cert === 'Certified SHG';
                  const isWomen = cert === 'Women-Led';
                  return (
                    <span
                      key={cert}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm uppercase ${
                        isSHG
                          ? 'bg-secondary-container/70 text-secondary'
                          : isWomen
                          ? 'bg-primary-container/15 text-primary'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {isSHG && (
                        <span className="material-symbols-outlined text-[12px]">
                          verified
                        </span>
                      )}
                      {cert}
                    </span>
                  );
                })}
              </div>

              {/* Zone 2: Impact Metric Ribbon */}
              <div className="rounded-lg bg-surface-container p-space-md mb-space-md grid grid-cols-3 gap-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">
                    Livelihoods
                  </span>
                  <span className="font-title-lg text-title-lg text-on-surface font-bold">
                    {collective.membersCount}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary block">
                    Artisans
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">
                    Capacity / Mo
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">
                    {collective.monthlyCapacity}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Lead: {collective.leadTimeDays}d
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">
                    Avg Wage
                  </span>
                  <span className="font-title-md text-title-md text-secondary font-bold">
                    {collective.avgMonthlyWage}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary block">
                    2.2x+ Floor
                  </span>
                </div>
              </div>

              {/* Institutional Provenance Rows */}
              <div className="flex flex-col border-t border-outline-variant/40 pt-space-sm mb-space-md text-body-sm">
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Raw Materials</span>
                  <span className="text-on-surface font-medium truncate max-w-[60%] text-right">
                    {collective.materials.slice(0, 2).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-t border-outline-variant/25">
                  <span className="text-on-surface-variant">
                    Minimum Institutional Order
                  </span>
                  <span className="text-primary font-semibold">
                    {collective.minOrderValue} • {collective.nrlmId}
                  </span>
                </div>
              </div>

              {/* Zone 3: Action Footer */}
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={() => setDossierCollective(collective)}
                  className="flex-1 h-10 px-3 rounded border border-on-surface text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    description
                  </span>
                  <span>Audit Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => onInitiateRfp(collective)}
                  className="flex-1 h-10 px-3 rounded bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    handshake
                  </span>
                  <span>Initiate Bulk RFP</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Dossier Modal */}
      {dossierCollective && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-surface/30 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-xl sm:rounded-xl p-space-lg shadow-xl border border-outline-variant/40 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm uppercase text-secondary">
                NRLM Statutory Dossier • {dossierCollective.nrlmId}
              </span>
              <button
                type="button"
                onClick={() => setDossierCollective(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {dossierCollective.name}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              {dossierCollective.location}, {dossierCollective.state} •{' '}
              {dossierCollective.giTag}
            </p>

            <div className="p-space-md rounded-lg bg-surface-container-low mb-space-md">
              <div className="font-label-sm text-label-sm uppercase text-primary mb-1">
                Cluster Lead Voice — {dossierCollective.leadArtisan}
              </div>
              <p className="font-headline-sm text-[15px] italic text-on-surface">
                “{dossierCollective.leadQuote}”
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-space-md text-body-sm">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Field Audit Partner</span>
                <span className="text-on-surface font-medium text-right">
                  {dossierCollective.auditorPartner}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Last Unannounced Audit</span>
                <span className="text-secondary font-semibold">
                  {dossierCollective.lastAuditDate} (Passed)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Wage Growth</span>
                <span className="text-on-surface font-semibold">
                  {dossierCollective.baselineWage} →{' '}
                  <span className="text-secondary">
                    {dossierCollective.avgMonthlyWage}/mo
                  </span>
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-on-surface-variant">Verified Materials</span>
                <span className="text-on-surface text-right max-w-[60%]">
                  {dossierCollective.materials.join(' • ')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const target = dossierCollective;
                setDossierCollective(null);
                onInitiateRfp(target);
              }}
              className="w-full h-11 rounded bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                add_task
              </span>
              <span>Create Smart Escrow RFP with Cluster</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
