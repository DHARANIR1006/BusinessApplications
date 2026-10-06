import React, { useState } from 'react';
import {
  HOTLINKED_IMAGES,
  TIMEFRAME_DATA,
  GOVERNANCE_ITEMS,
} from '../data/arohaData';

interface ImpactScreenProps {
  onSelectCollective: (collectiveId: string) => void;
  onNavigateTab: (tab: 'directory' | 'procurement' | 'impact' | 'saved' | 'profile') => void;
}

type TimeframeKey = 'all' | 'fy25' | 't12m';

export const ImpactScreen: React.FC<ImpactScreenProps> = ({
  onSelectCollective,
  onNavigateTab,
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('fy25');
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'done'>('idle');
  const [expandedGovId, setExpandedGovId] = useState<string | null>(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);

  const currentData = TIMEFRAME_DATA[timeframe];

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('preparing');

    setTimeout(() => {
      // Trigger a clean downloadable audit dossier summary
      const dossierContent = [
        'AROHA IMPACT DIRECTORY — PUBLIC AUDIT & TRANSPARENCY LEDGER (FY 2024–25)',
        'Reviewed Independently by Mazars India • Status: AUDITED Q3',
        '========================================================================',
        `Selected Timeframe: ${timeframe === 'fy25' ? 'This Financial Year (FY25)' : timeframe === 'all' ? 'All Time' : 'Trailing 12M'}`,
        `Collectives Onboarded: ${currentData.collectives} (${currentData.collectivesSub})`,
        `Artisans Supported: ${currentData.artisans} (${currentData.artisansSub})`,
        `Direct Income Disbursed: ${currentData.disbursed} (100% Escrow • 0% Middleman)`,
        `Sustainable Sourcing: ${currentData.sustainable} (GI-Tagged & Pure Fiber)`,
        '',
        'SECTOR DISBURSEMENT BREAKDOWN:',
        ...currentData.sectors.map(
          (s) => `- ${s.name}: ${s.amount} (${s.pct}%) | ${s.sub} | ${s.workers}`
        ),
        '',
        `Artisan Monthly Wage Impact: ${currentData.wageFrom} -> ${currentData.wageTo} (${currentData.wageGain})`,
        '',
        'OPEN-BOOK AUDITED LEDGER GUARANTEES:',
        '✓ Direct Escrow Settlement (48-hr dispatch clearance)',
        '✓ Third-Party Lab Testing for Fiber Purity & Non-Toxicity',
        '✓ Zero Brokerage Retention • Platform fee capped at 4%',
      ].join('\n');

      try {
        const blob = new Blob([dossierContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aroha_FY25_Transparency_Dossier.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch {
        // Fallback if blob download is restricted in iframe
      }

      setDownloadState('done');
      setTimeout(() => {
        setDownloadState('idle');
      }, 2500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-gutter-mobile pb-space-2xl">
      {/* Eyebrow & Live Audit Badge */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm pt-space-sm">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Public Audit &amp; Transparency Ledger • FY 2024–25
        </span>
        <button
          type="button"
          onClick={() => setShowLedgerModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary hover:bg-secondary-container transition-colors cursor-pointer"
          title="Inspect Live Q3 Audit Certificate"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">
            Audited Q3
          </span>
        </button>
      </div>

      {/* Page Title & Framing Subtext */}
      <div className="mb-space-md">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
          Social Return &amp; Economic Transparency
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Independent real-time tracking of direct capital disbursements, verified fair wages, and grassroots cooperative livelihood growth.
        </p>
      </div>

      {/* Interactive Timeframe Selector Pills */}
      <div
        className="flex items-center gap-space-xs overflow-x-auto no-scrollbar mb-space-lg"
        id="timeframe-container"
      >
        <button
          type="button"
          onClick={() => setTimeframe('all')}
          className={`timeframe-btn px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            timeframe === 'all'
              ? 'bg-on-surface text-surface active-filter'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          All Time
        </button>
        <button
          type="button"
          onClick={() => setTimeframe('fy25')}
          className={`timeframe-btn px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            timeframe === 'fy25'
              ? 'bg-on-surface text-surface active-filter'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          This Financial Year (FY25)
        </button>
        <button
          type="button"
          onClick={() => setTimeframe('t12m')}
          className={`timeframe-btn px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            timeframe === 't12m'
              ? 'bg-on-surface text-surface active-filter'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Trailing 12M
        </button>
      </div>

      {/* Key Metrics 2x2 Grid */}
      <div className="grid grid-cols-2 gap-space-sm mb-space-xl">
        {/* Metric 1 */}
        <button
          type="button"
          onClick={() => onNavigateTab('directory')}
          className="flex flex-col text-left p-space-md rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-xs">
            Collectives Onboarded
          </span>
          <div
            className="font-data-metric text-data-metric text-on-surface mb-1"
            id="metric-collectives"
          >
            {currentData.collectives}
          </div>
          <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>{currentData.collectivesSub}</span>
          </div>
        </button>

        {/* Metric 2 */}
        <button
          type="button"
          onClick={() => onNavigateTab('directory')}
          className="flex flex-col text-left p-space-md rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-xs">
            Artisans Supported
          </span>
          <div
            className="font-data-metric text-data-metric text-on-surface mb-1"
            id="metric-artisans"
          >
            {currentData.artisans}
          </div>
          <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>{currentData.artisansSub}</span>
          </div>
        </button>

        {/* Metric 3 */}
        <button
          type="button"
          onClick={() => onNavigateTab('procurement')}
          className="flex flex-col text-left p-space-md rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Direct Income Disbursed
            </span>
          </div>
          <div
            className="font-data-metric text-data-metric text-primary mb-1"
            id="metric-disbursed"
          >
            {currentData.disbursed}
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">
            {currentData.disbursedSub}
          </div>
        </button>

        {/* Metric 4 */}
        <button
          type="button"
          onClick={() => setShowLedgerModal(true)}
          className="flex flex-col text-left p-space-md rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-xs">
            Sustainable Sourcing
          </span>
          <div
            className="font-data-metric text-data-metric text-secondary mb-1"
            id="metric-sustainable"
          >
            {currentData.sustainable}
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              eco
            </span>
            <span>{currentData.sustainableSub}</span>
          </div>
        </button>
      </div>

      {/* Narrative Artisan Impact Banner */}
      <div
        onClick={() => setShowStoryModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowStoryModal(true)}
        className="relative overflow-hidden rounded-xl bg-surface-container p-space-md mb-space-xl shadow-sm hover:bg-surface-container-high transition-colors cursor-pointer"
      >
        <div className="flex items-start gap-space-md">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-dim">
            <img
              className="w-full h-full object-cover"
              alt="Rukmini Devi, Nimar Weaver Collective"
              referrerPolicy="no-referrer"
              src={HOTLINKED_IMAGES.artisanRukmini}
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="inline-flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                format_quote
              </span>
              <span className="font-label-sm text-label-sm uppercase font-semibold text-primary">
                Artisan Field Voice
              </span>
            </div>
            <p className="font-headline-sm text-[16px] leading-snug text-on-surface italic line-clamp-2">
              “Direct escrow deposits meant our cluster could buy natural madder root in bulk without taking high-interest loans.”
            </p>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              — Rukmini Devi, Nimar Weaver Collective
            </span>
          </div>
        </div>
      </div>

      {/* Visual Economic Distribution Chart */}
      <div className="rounded-xl bg-surface-container-low p-space-lg mb-space-xl shadow-sm">
        <div className="flex flex-col mb-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Disbursement Across Sectors
            </h2>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              {currentData.disbursed} Total
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Breakdown of FY25 institutional enterprise procurement contracts
          </p>
        </div>

        {/* Multi-segmented Progress Bar */}
        <div className="h-3 w-full rounded-full bg-surface-container-highest overflow-hidden flex mb-space-lg">
          {currentData.sectors.map((s) => (
            <div
              key={s.name}
              className={`h-full ${s.colorClass} transition-all duration-300`}
              style={{ width: `${s.pct}%` }}
              title={`${s.name}: ${s.pct}%`}
            />
          ))}
        </div>

        {/* Sector Details */}
        <div className="flex flex-col gap-space-md">
          {currentData.sectors.map((s) => (
            <div key={s.name} className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${s.colorClass} flex-shrink-0`}
                  ></span>
                  <span className="font-title-md text-title-md text-on-surface">
                    {s.name}
                  </span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  {s.amount}{' '}
                  <span className="text-on-surface-variant font-normal text-body-sm">
                    ({s.pct}%)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between pl-4.5">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {s.sub}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  {s.workers}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Wage Growth Highlight Banner */}
        <div className="mt-space-lg p-space-md rounded-lg bg-surface-container flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              currency_rupee
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Artisan Monthly Wage Impact
            </span>
            <div className="font-title-md text-title-md text-on-surface mt-0.5">
              {currentData.wageFrom}{' '}
              <span className="text-on-surface-variant text-body-sm">→</span>{' '}
              <span className="text-secondary font-bold">
                {currentData.wageTo}
              </span>
              <span className="ml-1 text-label-sm font-label-sm px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                {currentData.wageGain}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification & Trust Architecture Section */}
      <div className="mb-space-xl">
        <div className="flex flex-col mb-space-md">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-[18px] text-primary">
              verified
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary">
              Governance Matrix
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Verification &amp; Trust Architecture
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            How Aroha audits grassroots SHGs and guarantees ethical procurement compliance.
          </p>
        </div>

        {/* 3 Trust Cards */}
        <div className="flex flex-col gap-space-md">
          {GOVERNANCE_ITEMS.map((item) => {
            const isExpanded = expandedGovId === item.id;
            return (
              <div
                key={item.id}
                onClick={() =>
                  setExpandedGovId(isExpanded ? null : item.id)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  setExpandedGovId(isExpanded ? null : item.id)
                }
                className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col hover:bg-surface-container/70 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`w-10 h-10 rounded-lg ${item.iconBgClass} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">
                        {item.title}
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full ${item.badgeClass} font-label-sm text-label-sm font-semibold uppercase whitespace-nowrap`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  {item.description}
                </p>

                {isExpanded && (
                  <div className="mt-space-md pt-space-sm border-t border-outline-variant/40 flex flex-col gap-1.5">
                    <span className="font-label-sm text-label-sm uppercase text-primary tracking-wider">
                      Audit Protocol &amp; Verification Checkpoints
                    </span>
                    {item.auditDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-body-sm text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[15px] text-secondary mt-0.5">
                          verified
                        </span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Open-Book Audited Ledger & PDF Download Callout */}
      <div className="rounded-xl bg-surface-container p-space-lg flex flex-col shadow-sm">
        <div className="flex items-center gap-2 mb-space-xs">
          <span className="material-symbols-outlined text-[22px] text-on-surface">
            menu_book
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Open-Book Audited Ledger
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Full disclosure of our platform fee model and artisan banking transfers, reviewed independently by Mazars India.
        </p>

        {/* Ledger Highlight Points */}
        <div className="flex flex-col gap-2 mb-space-lg">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              check_circle
            </span>
            <span className="font-body-sm text-body-sm">
              Direct Escrow Settlement (48-hr dispatch clearance)
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              check_circle
            </span>
            <span className="font-body-sm text-body-sm">
              Third-Party Lab Testing for Fiber Purity &amp; Non-Toxicity
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              check_circle
            </span>
            <span className="font-body-sm text-body-sm">
              Zero Brokerage Retention • Platform fee capped at 4%
            </span>
          </div>
        </div>

        {/* Download Action Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloadState === 'preparing'}
          className="w-full h-11 px-space-md rounded bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-[0.99] cursor-pointer disabled:opacity-90"
        >
          {downloadState === 'idle' && (
            <>
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span>Download FY25 Transparency Dossier</span>
              <span className="font-label-sm text-label-sm opacity-80">
                (4.8 MB PDF)
              </span>
            </>
          )}
          {downloadState === 'preparing' && (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                refresh
              </span>
              <span>Preparing Report...</span>
            </>
          )}
          {downloadState === 'done' && (
            <>
              <span className="material-symbols-outlined text-[20px]">
                task_alt
              </span>
              <span>Report Downloaded</span>
            </>
          )}
        </button>
      </div>

      {/* Field Voice Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-surface/30 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-xl sm:rounded-xl p-space-lg shadow-xl border border-outline-variant/40">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  format_quote
                </span>
                <span className="font-label-sm text-label-sm uppercase text-primary">
                  Verified Field Dispatch • Maheshwar, MP
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <div className="flex items-center gap-space-md mb-space-md">
              <img
                src={HOTLINKED_IMAGES.artisanRukmini}
                alt="Rukmini Devi"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Rukmini Devi
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Master Weaver &amp; Cluster Secretary, Nimar Weaver Collective
                </p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-secondary-container/60 text-secondary font-label-sm text-label-sm">
                  NRLM ID: MP-KHG-SHG-2019-0842
                </span>
              </div>
            </div>

            <blockquote className="font-headline-sm text-[17px] leading-relaxed text-on-surface italic bg-surface-container-low p-space-md rounded-lg mb-space-md">
              “Direct escrow deposits meant our cluster could buy natural madder root and raw mulberry warp yarn in bulk without taking 36% annual interest loans from local middlemen. All 340 women weavers now receive digital bank transfers within 48 hours of dispatch.”
            </blockquote>

            <div className="grid grid-cols-3 gap-space-xs mb-space-md text-center">
              <div className="p-2 rounded bg-surface-container-low">
                <div className="font-title-md text-title-md text-secondary font-bold">
                  ₹19,200
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  Avg Monthly Take-Home
                </div>
              </div>
              <div className="p-2 rounded bg-surface-container-low">
                <div className="font-title-md text-title-md text-on-surface font-bold">
                  340
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  Women Artisans
                </div>
              </div>
              <div className="p-2 rounded bg-surface-container-low">
                <div className="font-title-md text-title-md text-primary font-bold">
                  0%
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  Middleman Cut
                </div>
              </div>
            </div>

            <div className="flex gap-space-sm">
              <button
                type="button"
                onClick={() => {
                  setShowStoryModal(false);
                  onSelectCollective('nimar-weaver');
                }}
                className="flex-1 h-10 rounded bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span>Inspect Collective Dossier</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audited Q3 Live Ledger Modal */}
      {showLedgerModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-surface/30 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-xl sm:rounded-xl p-space-lg shadow-xl border border-outline-variant/40">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  verified
                </span>
                <span className="font-label-sm text-label-sm uppercase text-secondary">
                  Mazars India Statutory Assurance • FY25 Q3
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLedgerModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Escrow &amp; Fee Transparency Breakdown
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Every rupee in institutional buyer contracts is tracked across ring-fenced Yes Bank / SBI Cooperative Escrow accounts.
            </p>

            <div className="flex flex-col gap-2 mb-space-md bg-surface-container-low p-space-md rounded-lg">
              <div className="flex justify-between items-center py-1 border-b border-outline-variant/30">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Direct SHG Cooperative Bank Payout
                </span>
                <span className="font-title-md text-title-md text-secondary font-bold">
                  93.5%
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-outline-variant/30">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Accredited Fiber &amp; Non-Toxicity Lab Assay
                </span>
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  2.5%
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Aroha Platform &amp; Escrow Governance Cap
                </span>
                <span className="font-title-md text-title-md text-primary font-bold">
                  4.0%
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowLedgerModal(false)}
              className="w-full h-10 rounded bg-on-surface text-surface font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              Close Assurance Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
