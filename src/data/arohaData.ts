export interface Collective {
  id: string;
  name: string;
  craftItalic: string;
  sector: 'handloom' | 'handicrafts' | 'agri';
  sectorLabel: string;
  location: string;
  state: string;
  membersCount: number;
  womenPercentage: number;
  nrlmId: string;
  giTag?: string;
  certifications: ('Certified SHG' | 'Women-Led' | 'Fair Trade' | 'GI-Tagged')[];
  monthlyCapacity: string;
  leadTimeDays: number;
  minOrderValue: string;
  wageCompliance: string;
  avgMonthlyWage: string;
  baselineWage: string;
  leadArtisan: string;
  leadQuote: string;
  image: string;
  materials: string[];
  lastAuditDate: string;
  auditorPartner: string;
}

export interface ProcurementContract {
  id: string;
  rfpCode: string;
  title: string;
  collectiveId: string;
  collectiveName: string;
  state: string;
  sector: 'handloom' | 'handicrafts' | 'agri';
  totalValue: string;
  escrowStatus: 'Milestone 2 Active' | 'Dispatch Cleared' | 'Raw Material Funded';
  escrowProgress: number;
  artisansEngaged: number;
  deliveryDate: string;
  milestones: {
    label: string;
    share: string;
    amount: string;
    status: 'released' | 'in_escrow' | 'pending';
    date: string;
  }[];
  labCertId: string;
}

export const HOTLINKED_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1W9ubSvoFIizdXy9sUoijc1qE3jm8J6dxB_v__JIBFzhq6yC4pb3YHjnfaEs05jnsw0pwZoAONa_ZGBC5bLzKlfGPZtLaPceO5lfRIHTkDG8i50ZDLcUg2E_oBzP1vZG6f8Yenas1Uz1DSVhos9w380W214hrKXSrXlCYjKKGuALN_LfgqNuzMa-GwwmwjJWgbEa_hJ_cOleS7r080Bol2OGDeGPOcedrzmNtxq0i5zeb3T31LeBV6C57ns',
  profileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqZGbsuuYIVfzPbbrgM6TJV7XxPcGYGqoajdjNUcGEEMGomDvTaKHlFN3GHKl_OZ93ssJMBS0TE1iZ5la_8ywNSfy_O94NU-7U-d-J3xMpczCzr2sNhOelX65c5kzFs3ENsPYGov4CyUYR6wFRejWkSyvLM6UAKzUBPc7V8_NcR1kfEAKlfkNjf45jwujuOZ4UvNB1Xz8gNoc_g7sUHj26303CbTvQRvePqqXygNjOukf0QBXyTB3L3g',
  artisanRukmini: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZRNjngBqccrl9atL-mFTTLhRNSX8wax_ieh_GMplXmnS4Kf_UeNfrlvJLto--Ve6xyFjJOL8lkMWtcfnxuYdmC3rLyPKmb6MwAIAGkknYSN4aU_YDplhSlO6iDjYDGn68mll19VRDa0zeMv3a-UCjWfcHhWC6mr9Z4ezsdat03ATzSaHXS_ioErHq_6JqofNUBierIzzlhAl7WaAFi5KYrWCtNDehEHTQX-pfyo0yAc48D7GAR5ZhOg',
};

export const TIMEFRAME_DATA = {
  all: {
    collectives: '2,890',
    collectivesSub: '+22% YoY • 26 States',
    artisans: '54,200+',
    artisansSub: '91% 1st-Time Invoicing',
    disbursed: '₹9.85 Cr',
    disbursedSub: '100% Escrow • 0% Middleman',
    sustainable: '91.8%',
    sustainableSub: 'GI-Tagged & Pure Fiber',
    sectors: [
      {
        name: 'Handloom & Fine Textiles',
        amount: '₹5.12 Cr',
        pct: 52,
        sub: 'Maheshwari, Khadi, Eri Silk',
        workers: '28,900 weavers',
        colorClass: 'bg-primary',
      },
      {
        name: 'Handicrafts & Pottery',
        amount: '₹2.76 Cr',
        pct: 28,
        sub: 'Terracotta, Channapatna Lacquer, Brass',
        workers: '14,800 artisans',
        colorClass: 'bg-secondary',
      },
      {
        name: 'Forest Spices & Organic Agri',
        amount: '₹1.97 Cr',
        pct: 20,
        sub: 'Wild Honey, Mahua, Essential Oils',
        workers: '10,500 tribal gatherers',
        colorClass: 'bg-primary-container',
      },
    ],
    wageFrom: '₹7,900',
    wageTo: '₹18,100',
    wageGain: '+129%',
  },
  fy25: {
    collectives: '1,420',
    collectivesSub: '+14% YoY • 24 States',
    artisans: '28,500+',
    artisansSub: '88% 1st-Time Invoicing',
    disbursed: '₹4.20 Cr',
    disbursedSub: '100% Escrow • 0% Middleman',
    sustainable: '94.2%',
    sustainableSub: 'GI-Tagged & Pure Fiber',
    sectors: [
      {
        name: 'Handloom & Fine Textiles',
        amount: '₹2.18 Cr',
        pct: 52,
        sub: 'Maheshwari, Khadi, Eri Silk',
        workers: '15,200 weavers',
        colorClass: 'bg-primary',
      },
      {
        name: 'Handicrafts & Pottery',
        amount: '₹1.18 Cr',
        pct: 28,
        sub: 'Terracotta, Channapatna Lacquer, Brass',
        workers: '7,800 artisans',
        colorClass: 'bg-secondary',
      },
      {
        name: 'Forest Spices & Organic Agri',
        amount: '₹0.84 Cr',
        pct: 20,
        sub: 'Wild Honey, Mahua, Essential Oils',
        workers: '5,500 tribal gatherers',
        colorClass: 'bg-primary-container',
      },
    ],
    wageFrom: '₹8,200',
    wageTo: '₹18,400',
    wageGain: '+124%',
  },
  t12m: {
    collectives: '1,780',
    collectivesSub: '+18% YoY • 25 States',
    artisans: '34,100+',
    artisansSub: '89% 1st-Time Invoicing',
    disbursed: '₹5.60 Cr',
    disbursedSub: '100% Escrow • 0% Middleman',
    sustainable: '93.6%',
    sustainableSub: 'GI-Tagged & Pure Fiber',
    sectors: [
      {
        name: 'Handloom & Fine Textiles',
        amount: '₹2.91 Cr',
        pct: 52,
        sub: 'Maheshwari, Khadi, Eri Silk',
        workers: '18,200 weavers',
        colorClass: 'bg-primary',
      },
      {
        name: 'Handicrafts & Pottery',
        amount: '₹1.57 Cr',
        pct: 28,
        sub: 'Terracotta, Channapatna Lacquer, Brass',
        workers: '9,400 artisans',
        colorClass: 'bg-secondary',
      },
      {
        name: 'Forest Spices & Organic Agri',
        amount: '₹1.12 Cr',
        pct: 20,
        sub: 'Wild Honey, Mahua, Essential Oils',
        workers: '6,500 tribal gatherers',
        colorClass: 'bg-primary-container',
      },
    ],
    wageFrom: '₹8,100',
    wageTo: '₹18,350',
    wageGain: '+126%',
  },
};

export const COLLECTIVES: Collective[] = [
  {
    id: 'nimar-weaver',
    name: 'Nimar Weaver Collective',
    craftItalic: 'Maheshwari Handloom & Natural Dyeing',
    sector: 'handloom',
    sectorLabel: 'Handloom & Fine Textiles',
    location: 'Maheshwar, Khargone District',
    state: 'Madhya Pradesh',
    membersCount: 340,
    womenPercentage: 92,
    nrlmId: 'MP-KHG-SHG-2019-0842',
    giTag: 'GI Registry #197 (Maheshwar Sarees & Fabrics)',
    certifications: ['Certified SHG', 'Women-Led', 'GI-Tagged', 'Fair Trade'],
    monthlyCapacity: '4,200 Meters',
    leadTimeDays: 35,
    minOrderValue: '₹1.50 Lakh',
    wageCompliance: '100% (2.3x Min. Wage)',
    avgMonthlyWage: '₹19,200',
    baselineWage: '₹8,400',
    leadArtisan: 'Rukmini Devi',
    leadQuote: 'Direct escrow deposits meant our cluster could buy natural madder root in bulk without taking high-interest loans.',
    image: HOTLINKED_IMAGES.artisanRukmini,
    materials: ['Organic Mulberry Silk', 'GOTS 60s Combed Cotton', 'Alizarin Madder Root', 'Natural Indigo'],
    lastAuditDate: '14 Nov 2024',
    auditorPartner: 'Vrutti Livelihood Resource Centre & Mazars India',
  },
  {
    id: 'kamrup-eri-muga',
    name: 'Brahmaputra Ahimsa Silk SHG',
    craftItalic: 'Peace Eri Spun Silk & Backstrap Looms',
    sector: 'handloom',
    sectorLabel: 'Handloom & Fine Textiles',
    location: 'Sualkuchi & Boko, Kamrup',
    state: 'Assam',
    membersCount: 485,
    womenPercentage: 96,
    nrlmId: 'AS-KMP-SHG-2020-1194',
    giTag: 'GI Registry #55 (Muga & Eri Silk of Assam)',
    certifications: ['Certified SHG', 'Women-Led', 'GI-Tagged'],
    monthlyCapacity: '2,800 Stoles / 3,100m',
    leadTimeDays: 42,
    minOrderValue: '₹2.10 Lakh',
    wageCompliance: '100% (2.2x Min. Wage)',
    avgMonthlyWage: '₹18,600',
    baselineWage: '₹8,100',
    leadArtisan: 'Bhanumati Boro',
    leadQuote: 'Our weavers now invoice corporate hospitality buyers directly with zero yarn-trader deductions.',
    image: HOTLINKED_IMAGES.artisanRukmini,
    materials: ['Non-Violent Eri Cocoon Fiber', 'Lac & Turmeric Botanical Dyes', 'Hand-Spun Takli Yarn'],
    lastAuditDate: '02 Dec 2024',
    auditorPartner: 'North East Rural Livelihood Mission (NERLM)',
  },
  {
    id: 'channapatna-lacquer',
    name: 'Cauvery Artisan Wood & Lac Guild',
    craftItalic: 'Channapatna Turned Ivory-Wood & Vegetable Lac',
    sector: 'handicrafts',
    sectorLabel: 'Handicrafts & Pottery',
    location: 'Channapatna, Ramanagara',
    state: 'Karnataka',
    membersCount: 215,
    womenPercentage: 68,
    nrlmId: 'KA-RMG-SHG-2018-0412',
    giTag: 'GI Registry #23 (Channapatna Toys & Dolls)',
    certifications: ['Certified SHG', 'GI-Tagged', 'Fair Trade'],
    monthlyCapacity: '8,500 Units',
    leadTimeDays: 28,
    minOrderValue: '₹1.20 Lakh',
    wageCompliance: '100% (2.4x Min. Wage)',
    avgMonthlyWage: '₹20,100',
    baselineWage: '₹8,500',
    leadArtisan: 'Savithramma Gowda',
    leadQuote: 'EN-71 non-toxic lab testing funded through Aroha opened European museum and Montessori school contracts.',
    image: HOTLINKED_IMAGES.profileAvatar,
    materials: ['FSC-Certified Wrightia Tinctoria (Aale Mara)', 'Natural Seed Lac', 'Kewda Leaf Polish', 'Indigo & Kumkum Pigments'],
    lastAuditDate: '21 Oct 2024',
    auditorPartner: 'Craftizen Foundation & TÜV Rheinland Lab',
  },
  {
    id: 'bastar-forest-coop',
    name: 'Indravati Van Dhan Producer Co-op',
    craftItalic: 'Wild Forest Apiary, Mahua & Dhokra Brass',
    sector: 'agri',
    sectorLabel: 'Forest Spices & Organic Agri',
    location: 'Jagdalpur, Bastar District',
    state: 'Chhattisgarh',
    membersCount: 620,
    womenPercentage: 89,
    nrlmId: 'CG-BST-VDVK-2021-0309',
    giTag: 'GI Registry #82 (Bastar Dhokra & Forest Produce)',
    certifications: ['Certified SHG', 'Women-Led', 'Fair Trade'],
    monthlyCapacity: '6.4 Metric Tons',
    leadTimeDays: 21,
    minOrderValue: '₹95,000',
    wageCompliance: '100% (2.1x Min. Wage)',
    avgMonthlyWage: '₹16,800',
    baselineWage: '₹7,400',
    leadArtisan: 'Phoolbati Netam',
    leadQuote: 'Cold-filtration and NMR purity certification at the cluster level tripled our wild multiflora honey realization.',
    image: HOTLINKED_IMAGES.artisanRukmini,
    materials: ['Raw Rock-Bee Forest Honey', 'Sun-Dried Mahua Corolla', 'Wild Black Pepper', 'Recycled Bell Metal'],
    lastAuditDate: '29 Nov 2024',
    auditorPartner: 'TRIFED & PRADAN Field Audit Cell',
  },
  {
    id: 'kutch-kala-terracotta',
    name: 'Banni Clay & Rogan Craft Collective',
    craftItalic: 'Painted Terracotta & Castor-Oil Paste Printing',
    sector: 'handicrafts',
    sectorLabel: 'Handicrafts & Pottery',
    location: 'Khavda & Nirona, Kutch',
    state: 'Gujarat',
    membersCount: 190,
    womenPercentage: 84,
    nrlmId: 'GJ-KTC-SHG-2019-0771',
    giTag: 'GI Registry #109 (Kutch Embroidery & Craft)',
    certifications: ['Certified SHG', 'Women-Led', 'GI-Tagged'],
    monthlyCapacity: '3,600 Vessels',
    leadTimeDays: 30,
    minOrderValue: '₹1.35 Lakh',
    wageCompliance: '100% (2.2x Min. Wage)',
    avgMonthlyWage: '₹18,900',
    baselineWage: '₹8,300',
    leadArtisan: 'Amina Khatri',
    leadQuote: 'Solar-assisted low-smoke kilns and milestone advances eliminated seasonal migration for 190 potter families.',
    image: HOTLINKED_IMAGES.profileAvatar,
    materials: ['Alluvial Banni Lake Clay', 'Natural White & Red Ochre Slip', 'Boiled Castor Oil Binder'],
    lastAuditDate: '08 Nov 2024',
    auditorPartner: 'Khamir Craft Resource Centre',
  },
];

export const PROCUREMENT_CONTRACTS: ProcurementContract[] = [
  {
    id: 'cnt-2501',
    rfpCode: 'ARH-FY25-ESC-089',
    title: '2,400m GI-Tagged Maheshwari Silk-Cotton Yardage',
    collectiveId: 'nimar-weaver',
    collectiveName: 'Nimar Weaver Collective',
    state: 'Madhya Pradesh',
    sector: 'handloom',
    totalValue: '₹14.80 Lakh',
    escrowStatus: 'Milestone 2 Active',
    escrowProgress: 60,
    artisansEngaged: 84,
    deliveryDate: '18 Nov 2026',
    labCertId: 'SRA-AZO-FREE-9941',
    milestones: [
      { label: 'M1 • Raw Yarn & Natural Dye Escrow (30%)', share: '30%', amount: '₹4.44L', status: 'released', date: 'Released 04 Sep' },
      { label: 'M2 • On-Loom 50% Yardage Inspection (30%)', share: '30%', amount: '₹4.44L', status: 'released', date: 'Released 28 Sep' },
      { label: 'M3 • Dispatch & Fiber Purity Clearance (40%)', share: '40%', amount: '₹5.92L', status: 'in_escrow', date: 'Locked in Smart Escrow' },
    ],
  },
  {
    id: 'cnt-2502',
    rfpCode: 'ARH-FY25-ESC-094',
    title: '4,500 Units Custom Lacquerware Corporate Gifting Suite',
    collectiveId: 'channapatna-lacquer',
    collectiveName: 'Cauvery Artisan Wood & Lac Guild',
    state: 'Karnataka',
    sector: 'handicrafts',
    totalValue: '₹9.20 Lakh',
    escrowStatus: 'Dispatch Cleared',
    escrowProgress: 100,
    artisansEngaged: 52,
    deliveryDate: 'Delivered 01 Oct 2026',
    labCertId: 'TUV-EN71-NONTOX-412',
    milestones: [
      { label: 'M1 • Seasoned Aale Wood & Lac Advance (30%)', share: '30%', amount: '₹2.76L', status: 'released', date: 'Released 12 Aug' },
      { label: 'M2 • Lathe Turning & Polish QC (30%)', share: '30%', amount: '₹2.76L', status: 'released', date: 'Released 09 Sep' },
      { label: 'M3 • 48-Hr Dispatch Escrow Settlement (40%)', share: '40%', amount: '₹3.68L', status: 'released', date: 'Settled 02 Oct' },
    ],
  },
  {
    id: 'cnt-2503',
    rfpCode: 'ARH-FY25-ESC-102',
    title: '1.8 MT NMR-Certified Wild Rock-Bee Forest Honey',
    collectiveId: 'bastar-forest-coop',
    collectiveName: 'Indravati Van Dhan Producer Co-op',
    state: 'Chhattisgarh',
    sector: 'agri',
    totalValue: '₹6.50 Lakh',
    escrowStatus: 'Raw Material Funded',
    escrowProgress: 30,
    artisansEngaged: 110,
    deliveryDate: '04 Dec 2026',
    labCertId: 'FSSAI-NMR-PURE-708',
    milestones: [
      { label: 'M1 • Harvest Crates & Glass Jar Escrow (30%)', share: '30%', amount: '₹1.95L', status: 'released', date: 'Released 01 Oct' },
      { label: 'M2 • Moisture Filtration & Batch Assay (30%)', share: '30%', amount: '₹1.95L', status: 'in_escrow', date: 'Due 24 Oct' },
      { label: 'M3 • Cold-Chain Dispatch Clearance (40%)', share: '40%', amount: '₹2.60L', status: 'pending', date: 'Scheduled Dec' },
    ],
  },
];

export const GOVERNANCE_ITEMS = [
  {
    id: 'gov-nrlm',
    icon: 'policy',
    iconBgClass: 'bg-secondary-container text-secondary',
    title: 'Government SHG & NRLM Registry',
    subtitle: 'Statutory Compliance',
    badge: 'Tier 1 Gov',
    badgeClass: 'bg-surface-container text-secondary',
    description:
      'Biometric Aadhaar-linked member directories, National Rural Livelihoods Mission registration, and verified cooperative bank account validation prior to contract allocation.',
    auditDetails: [
      'Direct API verification with Deendayal Antyodaya Yojana (DAY-NRLM) LokOS Registry',
      'Zero individual middleman accounts; 100% payouts routed to dual-signatory SHG Bank Accounts',
      'Mandatory PFMS & e-Shram occupational safety cross-verification every 6 months',
    ],
  },
  {
    id: 'gov-field',
    icon: 'travel_explore',
    iconBgClass: 'bg-primary-container/15 text-primary',
    title: 'Cluster Non-Profit Audits',
    subtitle: 'Physical Inspections',
    badge: 'Field Vetted',
    badgeClass: 'bg-primary-container/15 text-primary',
    description:
      'Quarterly unannounced on-site loom and kiln audits conducted by regional partner NGOs to guarantee ethical working conditions, fair working hours, and zero child labor.',
    auditDetails: [
      'Unannounced physical visits across 24 states by 18 accredited civil society audit partners',
      'Lux-meter workplace illumination, ventilation, and ergonomic pit-loom checks',
      'Direct confidential worker interviews in regional dialects without contractor presence',
    ],
  },
  {
    id: 'gov-wage',
    icon: 'balance',
    iconBgClass: 'bg-secondary-container text-secondary',
    title: 'Living Wage Index Standards',
    subtitle: 'Benchmark 2.2x Min. Wage',
    badge: 'Living Wage',
    badgeClass: 'bg-secondary-container/60 text-secondary',
    description:
      'Proprietary piece-rate calculators indexed to craft complexity and regional cost of living, released via milestone-driven smart escrow upon dispatch verification.',
    auditDetails: [
      'Piece-rate floor locked at ≥ 2.2x state notified unskilled agricultural minimum wage',
      'Automated smart-escrow rejects RFQs priced below verified craft hour benchmarks',
      '48-hour automated settlement to collective bank account upon e-Way bill & lab clearance',
    ],
  },
];
