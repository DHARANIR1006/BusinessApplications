import React, { useState } from 'react';
import { HOTLINKED_IMAGES } from '../data/arohaData';

interface ProfileScreenProps {
  regionLocale: string;
  onChangeLocale: (next: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  regionLocale,
  onChangeLocale,
}) => {
  const [autoReleaseEscrow, setAutoReleaseEscrow] = useState(true);
  const [requireLabAssay, setRequireLabAssay] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  return (
    <div className="flex flex-col w-full px-gutter-mobile pb-space-2xl">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm pt-space-sm">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Institutional Buyer Desk • Tier 1 Verified
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary font-label-sm text-label-sm font-semibold uppercase">
          CSR &amp; ESG Compliant
        </span>
      </div>

      {/* Buyer Profile Header Card */}
      <div className="rounded-xl bg-surface-container-low p-space-lg mb-space-lg shadow-sm border border-outline-variant/30 flex items-center gap-space-md">
        <img
          src={HOTLINKED_IMAGES.profileAvatar}
          alt="Ananya Deshmukh Profile"
          referrerPolicy="no-referrer"
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-outline-variant"
        />
        <div className="min-w-0 flex-1">
          <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
            Ananya Deshmukh
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            VP, Ethical Sourcing &amp; Craft Procurement
          </p>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
              Dakshina Craft Retail Pvt. Ltd.
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container/15 font-label-sm text-label-sm text-primary">
              GSTIN Verified
            </span>
          </div>
        </div>
      </div>

      {/* Buyer FY25 Impact Ledger Summary */}
      <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
            Your FY25 Disbursed
          </span>
          <div className="font-data-metric text-[26px] text-primary">
            ₹30.50 L
          </div>
          <span className="font-label-sm text-label-sm text-secondary">
            3 Active SHG Contracts
          </span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
            Artisan Households
          </span>
          <div className="font-data-metric text-[26px] text-on-surface">
            246
          </div>
          <span className="font-label-sm text-label-sm text-secondary">
            100% Living Wage Met
          </span>
        </div>
      </div>

      {/* Governance & Escrow Preferences */}
      <div className="rounded-xl bg-surface-container-low p-space-lg mb-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Institutional Escrow &amp; Compliance Controls
        </h2>

        <div className="flex items-center justify-between gap-space-md py-1 border-b border-outline-variant/30">
          <div>
            <div className="font-title-md text-title-md text-on-surface">
              Region &amp; Reporting Locale
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Controls header locale indicator and currency display
            </div>
          </div>
          <select
            value={regionLocale}
            onChange={(e) => onChangeLocale(e.target.value)}
            className="h-9 px-2.5 rounded bg-surface-container font-label-md text-label-md text-on-surface border border-outline-variant"
          >
            <option value="IN · EN">IN · EN (₹ INR)</option>
            <option value="IN · HI">IN · HI (₹ हिंदी)</option>
            <option value="EU · EN">EU · EN (€ EUR)</option>
          </select>
        </div>

        <label className="flex items-start justify-between gap-space-md py-1 border-b border-outline-variant/30 cursor-pointer">
          <div>
            <div className="font-title-md text-title-md text-on-surface">
              48-Hour Automated Dispatch Settlement
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Automatically release M3 escrow tranche upon verified e-Way bill &amp; QC sign-off
            </div>
          </div>
          <input
            type="checkbox"
            checked={autoReleaseEscrow}
            onChange={(e) => setAutoReleaseEscrow(e.target.checked)}
            className="w-5 h-5 mt-1 accent-secondary rounded cursor-pointer"
          />
        </label>

        <label className="flex items-start justify-between gap-space-md py-1 cursor-pointer">
          <div>
            <div className="font-title-md text-title-md text-on-surface">
              Mandatory Azo-Free &amp; GI Fiber Lab Assay
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Require third-party lab certificate attachment prior to M2 loom inspection release
            </div>
          </div>
          <input
            type="checkbox"
            checked={requireLabAssay}
            onChange={(e) => setRequireLabAssay(e.target.checked)}
            className="w-5 h-5 mt-1 accent-secondary rounded cursor-pointer"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setSavedToast(true);
            setTimeout(() => setSavedToast(false), 2500);
          }}
          className="w-full h-10 rounded bg-on-surface text-surface font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer"
        >
          {savedToast ? '✓ Institutional Preferences Saved' : 'Save Compliance Settings'}
        </button>
      </div>
    </div>
  );
};
