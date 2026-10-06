import React, { useState } from 'react';
import { COLLECTIVES, Collective } from '../data/arohaData';

interface SavedScreenProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onInitiateRfp: (collective: Collective) => void;
  onNavigateDirectory: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedIds,
  onToggleSave,
  onInitiateRfp,
  onNavigateDirectory,
}) => {
  const [batchSuccess, setBatchSuccess] = useState(false);

  const savedCollectives = COLLECTIVES.filter((c) => savedIds.includes(c.id));

  const totalArtisans = savedCollectives.reduce(
    (sum, c) => sum + c.membersCount,
    0
  );

  return (
    <div className="flex flex-col w-full px-gutter-mobile pb-space-2xl">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm pt-space-sm">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Procurement Shortlist • FY 2024–25
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold uppercase">
          {savedCollectives.length} Saved Clusters
        </span>
      </div>

      {/* Title */}
      <div className="mb-space-md">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
          Shortlisted SHG Collectives
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Compare production lead times, GI provenance, and living-wage compliance across your saved cooperative partners.
        </p>
      </div>

      {savedCollectives.length === 0 ? (
        <div className="rounded-xl bg-surface-container-low p-space-xl text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center mb-space-sm">
            <span className="material-symbols-outlined text-[24px]">
              bookmark_border
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
            No Collectives Shortlisted Yet
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-xs">
            Explore the verified SHG Directory to bookmark weaver, pottery, and forest producer clusters for bulk RFPs.
          </p>
          <button
            type="button"
            onClick={onNavigateDirectory}
            className="h-10 px-4 rounded bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              explore
            </span>
            <span>Browse SHG Directory</span>
          </button>
        </div>
      ) : (
        <>
          {/* Summary Comparison Banner */}
          <div className="rounded-xl bg-surface-container p-space-md mb-space-lg flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
                Combined Shortlist Reach
              </span>
              <span className="font-title-lg text-title-lg text-on-surface font-bold">
                {totalArtisans.toLocaleString()} Verified Artisans
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setBatchSuccess(true);
                setTimeout(() => setBatchSuccess(false), 3000);
              }}
              className="h-9 px-3 rounded bg-on-surface text-surface font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              {batchSuccess ? '✓ Dossier Exported' : 'Export Shortlist CSV'}
            </button>
          </div>

          <div className="flex flex-col gap-space-md">
            {savedCollectives.map((c) => (
              <div
                key={c.id}
                className="rounded-xl bg-surface-container-low p-space-md shadow-sm border border-outline-variant/30 flex flex-col"
              >
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">
                      {c.state} • {c.nrlmId}
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      {c.name}
                    </h2>
                    <p className="font-headline-sm text-[14px] italic text-primary">
                      {c.craftItalic}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleSave(c.id)}
                    className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center cursor-pointer"
                    title="Remove from Saved"
                  >
                    <span className="material-symbols-outlined text-[20px] [font-variation-settings:'FILL'_1]">
                      bookmark
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-space-xs my-space-sm p-space-sm rounded bg-surface-container text-body-sm">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      Min Order
                    </span>
                    <span className="font-semibold text-on-surface">
                      {c.minOrderValue}
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      Lead Time
                    </span>
                    <span className="font-semibold text-on-surface">
                      {c.leadTimeDays} Days
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      Wage Floor
                    </span>
                    <span className="font-semibold text-secondary">
                      {c.avgMonthlyWage}/mo
                    </span>
                  </div>
                </div>

                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    onClick={() => onInitiateRfp(c)}
                    className="h-9 px-3 rounded bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      handshake
                    </span>
                    <span>Allocate Smart Escrow RFP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
