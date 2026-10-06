import React, { useState } from 'react';
import {
  PROCUREMENT_CONTRACTS,
  ProcurementContract,
  COLLECTIVES,
  Collective,
} from '../data/arohaData';

interface ProcurementScreenProps {
  preselectedCollective: Collective | null;
  onClearPreselected: () => void;
}

export const ProcurementScreen: React.FC<ProcurementScreenProps> = ({
  preselectedCollective,
  onClearPreselected,
}) => {
  const [contracts, setContracts] = useState<ProcurementContract[]>(PROCUREMENT_CONTRACTS);
  const [subTab, setSubTab] = useState<'contracts' | 'calculator' | 'new_rfp'>(
    preselectedCollective ? 'new_rfp' : 'contracts'
  );

  // Living Wage Calculator State
  const [craftSector, setCraftSector] = useState<'handloom' | 'handicrafts' | 'agri'>('handloom');
  const [orderUnits, setOrderUnits] = useState<number>(1200);
  const [complexityMultiplier, setComplexityMultiplier] = useState<number>(2.3);

  // New RFP Form State
  const [rfpCollectiveId, setRfpCollectiveId] = useState<string>(
    preselectedCollective?.id || COLLECTIVES[0].id
  );
  const [rfpTitle, setRfpTitle] = useState<string>(
    preselectedCollective
      ? `Institutional Batch — ${preselectedCollective.craftItalic}`
      : '1,500m GI-Tagged Handloom Yardage & Natural Dye Batch'
  );
  const [rfpBudgetLakhs, setRfpBudgetLakhs] = useState<string>('8.40');
  const [rfpSubmittedNotice, setRfpSubmittedNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (preselectedCollective) {
      setSubTab('new_rfp');
      setRfpCollectiveId(preselectedCollective.id);
      setRfpTitle(`Institutional Batch — ${preselectedCollective.craftItalic}`);
      onClearPreselected();
    }
  }, [preselectedCollective, onClearPreselected]);

  const handleReleaseNextMilestone = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.status === 'in_escrow'
            ? { ...m, status: 'released' as const, date: 'Released Just Now' }
            : m
        );
        const releasedCount = updatedMilestones.filter(
          (m) => m.status === 'released'
        ).length;
        const progress = releasedCount === 3 ? 100 : releasedCount === 2 ? 60 : 30;
        return {
          ...c,
          escrowProgress: progress,
          escrowStatus:
            progress === 100 ? 'Dispatch Cleared' : 'Milestone 2 Active',
          milestones: updatedMilestones,
        };
      })
    );
  };

  const handleCreateRfp = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCollective =
      COLLECTIVES.find((c) => c.id === rfpCollectiveId) || COLLECTIVES[0];
    const totalNum = parseFloat(rfpBudgetLakhs) || 5.0;
    const m1 = (totalNum * 0.3).toFixed(2);
    const m2 = (totalNum * 0.3).toFixed(2);
    const m3 = (totalNum * 0.4).toFixed(2);

    const newContract: ProcurementContract = {
      id: `cnt-${Date.now()}`,
      rfpCode: `ARH-FY25-ESC-${105 + contracts.length}`,
      title: rfpTitle,
      collectiveId: targetCollective.id,
      collectiveName: targetCollective.name,
      state: targetCollective.state,
      sector: targetCollective.sector,
      totalValue: `₹${totalNum.toFixed(2)} Lakh`,
      escrowStatus: 'Raw Material Funded',
      escrowProgress: 30,
      artisansEngaged: Math.min(targetCollective.membersCount, Math.round(totalNum * 12)),
      deliveryDate: '15 Dec 2026',
      labCertId: 'SRA-PEND-LAB-882',
      milestones: [
        {
          label: 'M1 • Raw Material & Yarn Advance (30%)',
          share: '30%',
          amount: `₹${m1}L`,
          status: 'released',
          date: 'Funded Today',
        },
        {
          label: 'M2 • Mid-Production Field Audit (30%)',
          share: '30%',
          amount: `₹${m2}L`,
          status: 'in_escrow',
          date: 'Locked in Escrow',
        },
        {
          label: 'M3 • 48-Hr Dispatch Clearance (40%)',
          share: '40%',
          amount: `₹${m3}L`,
          status: 'pending',
          date: 'Upon Dispatch',
        },
      ],
    };

    setContracts([newContract, ...contracts]);
    setRfpSubmittedNotice(
      `Smart Escrow Contract ${newContract.rfpCode} allocated with ${targetCollective.name}.`
    );
    setSubTab('contracts');
    setTimeout(() => setRfpSubmittedNotice(null), 4000);
  };

  // Living Wage Calculation
  const basePieceRate =
    craftSector === 'handloom' ? 280 : craftSector === 'handicrafts' ? 190 : 145;
  const verifiedPieceRate = Math.round(basePieceRate * (complexityMultiplier / 2.0));
  const directArtisanPool = orderUnits * verifiedPieceRate;
  const labTestingFee = Math.round(directArtisanPool * 0.025);
  const platformFee = Math.round(directArtisanPool * 0.04);
  const totalContractInr = directArtisanPool + labTestingFee + platformFee;

  return (
    <div className="flex flex-col w-full px-gutter-mobile pb-space-2xl">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm pt-space-sm">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Institutional B2B Desk • Zero-Middleman Escrow
        </span>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary">
          <span className="material-symbols-outlined text-[13px]">lock</span>
          <span className="font-label-sm text-label-sm font-semibold uppercase">
            4% Fee Cap
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-space-md">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
          Enterprise Procurement &amp; Smart Escrow
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Milestone-governed cooperative contracts with automated 48-hour dispatch settlement and living-wage floor verification.
        </p>
      </div>

      {rfpSubmittedNotice && (
        <div className="mb-space-md p-space-md rounded-lg bg-secondary-container/80 text-on-secondary-fixed flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">
            check_circle
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            {rfpSubmittedNotice}
          </span>
        </div>
      )}

      {/* Sub-navigation Pills */}
      <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar mb-space-lg">
        <button
          type="button"
          onClick={() => setSubTab('contracts')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'contracts'
              ? 'bg-on-surface text-surface'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Active Escrow Contracts ({contracts.length})
        </button>
        <button
          type="button"
          onClick={() => setSubTab('calculator')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'calculator'
              ? 'bg-on-surface text-surface'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Living Wage Calculator
        </button>
        <button
          type="button"
          onClick={() => setSubTab('new_rfp')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'new_rfp'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container text-primary hover:bg-surface-container-high'
          }`}
        >
          + Allocate New RFP
        </button>
      </div>

      {/* View 1: Active Contracts */}
      {subTab === 'contracts' && (
        <div className="flex flex-col gap-space-md">
          {contracts.map((contract) => {
            const hasPendingEscrow = contract.milestones.some(
              (m) => m.status === 'in_escrow'
            );
            return (
              <div
                key={contract.id}
                className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">
                    {contract.rfpCode} • {contract.state}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase font-semibold ${
                      contract.escrowProgress === 100
                        ? 'bg-secondary-container/70 text-secondary'
                        : 'bg-primary-container/15 text-primary'
                    }`}
                  >
                    {contract.escrowStatus}
                  </span>
                </div>

                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                  {contract.title}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Collective: <strong className="text-on-surface">{contract.collectiveName}</strong> •{' '}
                  {contract.artisansEngaged} Artisans • Lab ID: {contract.labCertId}
                </p>

                {/* Escrow Progress Bar */}
                <div className="mb-space-md">
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-on-surface-variant uppercase">
                      Smart Escrow Disbursement Progress
                    </span>
                    <span className="text-on-surface font-bold">
                      {contract.totalValue} ({contract.escrowProgress}% Released)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-300"
                      style={{ width: `${contract.escrowProgress}%` }}
                    />
                  </div>
                </div>

                {/* Milestones List */}
                <div className="flex flex-col gap-2 bg-surface-container p-space-md rounded-lg mb-space-md">
                  {contract.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-body-sm gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            m.status === 'released'
                              ? 'text-secondary'
                              : m.status === 'in_escrow'
                              ? 'text-primary'
                              : 'text-outline'
                          }`}
                        >
                          {m.status === 'released'
                            ? 'check_circle'
                            : m.status === 'in_escrow'
                            ? 'schedule'
                            : 'radio_button_unchecked'}
                        </span>
                        <span className="text-on-surface truncate">{m.label}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-semibold text-on-surface">
                          {m.amount}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ({m.date})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-space-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Schedule: {contract.deliveryDate}
                  </span>
                  {hasPendingEscrow ? (
                    <button
                      type="button"
                      onClick={() => handleReleaseNextMilestone(contract.id)}
                      className="h-9 px-3 rounded bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      <span>Verify QC &amp; Release Next Tranche</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
                      <span className="material-symbols-outlined text-[16px]">
                        task_alt
                      </span>
                      100% Settled to SHG Bank Account
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Living Wage Piece-Rate Calculator */}
      {subTab === 'calculator' && (
        <div className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              balance
            </span>
            <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">
              Benchmark 2.2x Minimum Wage Engine
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
            Piece-Rate Living Wage Calculator
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
            Estimate transparent institutional contract budgets indexed to regional cost of living and craft complexity.
          </p>

          {/* Craft Selector */}
          <label className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1.5">
            1. Select Craft Sector
          </label>
          <div className="grid grid-cols-3 gap-space-xs mb-space-md">
            {[
              { id: 'handloom', label: 'Handloom' },
              { id: 'handicrafts', label: 'Pottery & Lac' },
              { id: 'agri', label: 'Forest Agri' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCraftSector(s.id as typeof craftSector)}
                className={`h-10 rounded font-label-md text-label-md transition-colors cursor-pointer ${
                  craftSector === s.id
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Order Volume Slider */}
          <div className="mb-space-md">
            <div className="flex justify-between mb-1">
              <label className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                2. Institutional Order Volume
              </label>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                {orderUnits.toLocaleString()} Units / Meters
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={100}
              value={orderUnits}
              onChange={(e) => setOrderUnits(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Wage Multiplier */}
          <div className="mb-space-lg">
            <div className="flex justify-between mb-1">
              <label className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                3. Craft Complexity &amp; Wage Index
              </label>
              <span className="font-title-md text-title-md text-secondary font-bold">
                {complexityMultiplier.toFixed(1)}x State Min. Wage
              </span>
            </div>
            <input
              type="range"
              min={2.2}
              max={3.0}
              step={0.1}
              value={complexityMultiplier}
              onChange={(e) => setComplexityMultiplier(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          {/* Output Breakdown */}
          <div className="rounded-lg bg-surface-container p-space-md flex flex-col gap-2 mb-space-md">
            <div className="flex justify-between text-body-sm">
              <span className="text-on-surface-variant">
                Direct SHG Artisan Piece-Rate Pool (93.5%)
              </span>
              <span className="font-semibold text-secondary">
                ₹{directArtisanPool.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-on-surface-variant">
                Accredited Fiber &amp; Non-Toxicity Assay (2.5%)
              </span>
              <span className="font-medium text-on-surface">
                ₹{labTestingFee.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-body-sm border-b border-outline-variant/40 pb-2">
              <span className="text-on-surface-variant">
                Aroha Escrow Governance Fee (Capped at 4%)
              </span>
              <span className="font-medium text-on-surface">
                ₹{platformFee.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-title-md text-title-md text-on-surface">
                Total Audited Escrow Value
              </span>
              <span className="font-data-metric text-[24px] text-primary">
                ₹{totalContractInr.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setRfpBudgetLakhs((totalContractInr / 100000).toFixed(2));
              setSubTab('new_rfp');
            }}
            className="w-full h-11 rounded bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
            <span>Convert Estimate to Smart Escrow RFP</span>
          </button>
        </div>
      )}

      {/* View 3: New RFP Form */}
      {subTab === 'new_rfp' && (
        <form
          onSubmit={handleCreateRfp}
          className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md"
        >
          <div>
            <span className="font-label-sm text-label-sm uppercase text-primary font-semibold">
              Direct Cooperative Allocation
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Initiate Smart Escrow RFP
            </h2>
          </div>

          <div>
            <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block mb-1">
              Verified SHG / Artisan Collective
            </label>
            <select
              value={rfpCollectiveId}
              onChange={(e) => setRfpCollectiveId(e.target.value)}
              className="w-full h-11 px-3 rounded bg-surface border border-outline-variant font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
            >
              {COLLECTIVES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state} • {c.nrlmId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block mb-1">
              Procurement Specification Title
            </label>
            <input
              type="text"
              required
              value={rfpTitle}
              onChange={(e) => setRfpTitle(e.target.value)}
              className="w-full h-11 px-3 rounded bg-surface border border-outline-variant font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block mb-1">
              Total Escrow Contract Value (in ₹ Lakhs)
            </label>
            <input
              type="number"
              step="0.05"
              min="0.95"
              required
              value={rfpBudgetLakhs}
              onChange={(e) => setRfpBudgetLakhs(e.target.value)}
              className="w-full h-11 px-3 rounded bg-surface border border-outline-variant font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
            <span className="font-label-sm text-label-sm text-secondary mt-1 block">
              ✓ Complies with 2.2x Living Wage Index • 30/30/40 Milestone Split
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
            <span>Lock M1 Advance &amp; Issue Contract</span>
          </button>
        </form>
      )}
    </div>
  );
};
