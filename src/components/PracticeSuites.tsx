import React, { useState } from 'react';
import { 
  Building, 
  Warehouse, 
  Cog, 
  Trees, 
  Landmark, 
  Handshake, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  FileCheck 
} from 'lucide-react';

interface PracticeSuite {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  points: string[];
  ctaText: string;
  detailedScope: {
    overview: string;
    keyDeliverables: string[];
    typicalCorridors: string[];
    timeline: string;
  };
}

export const PracticeSuites: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const [selectedSuite, setSelectedSuite] = useState<PracticeSuite | null>(null);

  const suites: PracticeSuite[] = [
    {
      id: 'corporate_real_estate',
      number: 'Advisory I',
      title: 'Corporate Real Estate',
      icon: <Building className="w-7 h-7 text-[#0B192C]" />,
      summary: 'Office headquarters, high-density IT/technology parks, prime business towers, and commercial workspace acquisition across major business districts including Gurugram, Bengaluru, and BKC Mumbai.',
      points: [
        'Grade-A Workspace Sourcing',
        'Flexible Enterprise Lease Terms',
        'Financial Cost Optimization',
      ],
      ctaText: 'Initiate Workspace Mandate',
      detailedScope: {
        overview: 'Comprehensive tenant advisory for technology conglomerates, fintechs, and GCCs establishing multi-floor office HQs in Tier-1 commercial nodes.',
        keyDeliverables: [
          'Detailed RFP compilation & developer bidding management',
          'Rent escalation modeling & CAM audit covenants',
          'LEED/IGBC green building & fit-out handover oversight',
          'Expansion option rights and early surrender caps',
        ],
        typicalCorridors: ['Cyber City & Golf Course Ext. (Gurugram)', 'Outer Ring Road & Whitefield (Bengaluru)', 'BKC & Lower Parel (Mumbai)', 'Guindy & OMR (Chennai)'],
        timeline: '30 to 60 operational days from brief to key handover',
      },
    },
    {
      id: 'logistics_warehousing',
      number: 'Advisory II',
      title: 'Logistics & Warehousing',
      icon: <Warehouse className="w-7 h-7 text-[#0B192C]" />,
      summary: 'Strategic sourcing and institutional leasing for e-commerce, 3PL logistics giants, cold chain operators, and regional fulfillment hubs with cutting-edge architectural clearances.',
      points: [
        '12M+ Clear Height Specifications',
        'Built-to-Suit & Ready-to-Move',
        'Highway & Freight Corridor Proximity',
      ],
      ctaText: 'Source Logistics Space',
      detailedScope: {
        overview: 'Grade-A warehousing solutions tailored to high-throughput distribution, multi-tier racking, and cold chain logistics.',
        keyDeliverables: [
          'FM2 superflat industrial floor flatness validation',
          'Dock-to-floor ratio optimization (1 per 10,000 SF)',
          'Heavy axle vehicle turning aprons (40-45m concrete)',
          'Fire safety compliance (ESFR sprinkler heads & NBC part IV)',
        ],
        typicalCorridors: ['Bhiwadi & Taloja (MMR)', 'Chakan & Talegaon (Pune)', 'Tauru & Bilaspur (NCR)', 'Dankuni & Uluberia (Kolkata)'],
        timeline: 'Immediate ready inventory or 6-9 months BTS',
      },
    },
    {
      id: 'manufacturing_setup',
      number: 'Advisory III',
      title: 'Manufacturing Setup',
      icon: <Cog className="w-7 h-7 text-[#0B192C]" />,
      summary: 'Industrial land acquisition, factory structural setup, and custom facility leasing for electronics, automotive, engineering, and pharmaceutical production units.',
      points: [
        'Heavy Power Load Alignment (HT/LT)',
        'Environmental & Pollution Clearances',
        'Turnkey Built-to-Suit Execution',
      ],
      detailedScope: {
        overview: 'End-to-end industrial factory site selection and statutory commissioning for heavy manufacturing and export-oriented industrial units.',
        keyDeliverables: [
          'HT/EHT power feeder sanction (33kV/66kV line clearances)',
          'State Pollution Control Board CTE & CTO filings',
          'Industrial effluent management (ETP/STP zero discharge)',
          'Crane gantry structural foundations (10T to 50T loads)',
        ],
        typicalCorridors: ['IMT Manesar & Bawal (Haryana)', 'Neemrana Japanese Zone (Rajasthan)', 'Sriperumbudur & Oragadam (Tamil Nadu)', 'Sanand (Gujarat)'],
        timeline: 'Turnkey advisory across 90-180 days',
      },
      ctaText: 'Deploy Production Facility',
    },
    {
      id: 'large_parcel_sourcing',
      number: 'Advisory IV',
      title: 'Large-Parcel Land Sourcing',
      icon: <Trees className="w-7 h-7 text-[#0B192C]" />,
      summary: 'Strategic aggregation and statutory conversion of expansive land parcels for institutional developers, data centers, industrial townships, and mega parks.',
      points: [
        'Comprehensive 30-Year Title Searches',
        'CLU & Master Plan Conversion',
        'Boundary Demarcation & Direct Deeds',
      ],
      detailedScope: {
        overview: 'Aggregating contiguous multi-acre tracts (10 to 100+ acres) with unencumbered freehold titles for hyper-scale institutional capital.',
        keyDeliverables: [
          'Sub-Registrar 30-year non-encumbrance certificates',
          'Change of Land Use (CLU) state government sanctions',
          'DGPS digital boundary demarcation & physical fencing',
          'Land ceiling Act compliance and Khatoni genealogical tree audits',
        ],
        typicalCorridors: ['Yamuna Expressway Jewar Belt', 'Sohna KMP Expressway', 'Hosur-Bengaluru Border', 'Nagpur Multi-Modal Cargo Hub'],
        timeline: 'Direct execution across 3 to 6 months',
      },
      ctaText: 'Discuss Land Acquisition',
    },
    {
      id: 'government_allotments',
      number: 'Advisory V',
      title: 'Government Land Allotments',
      icon: <Landmark className="w-7 h-7 text-[#0B192C]" />,
      summary: 'Comprehensive advisory for state authority industrial plot applications, e-auction advisory, policy subsidy extraction, and physical site possession.',
      points: [
        'State Scheme Evaluation',
        'DPR Drafting & Authority Scrutiny',
        'Lease Deed Execution & Possession',
      ],
      detailedScope: {
        overview: 'Guiding corporate boards through bureaucratic allotment mechanisms across HSIIDC, RIICO, YEIDA, GNOIDA, and KIADB.',
        keyDeliverables: [
          'Detailed Project Report (DPR) preparation with financial solvency',
          'State High Level Clearance Committee representation',
          'State investment subsidies (capital, SGST, electricity)',
          'Physical possession handover certificate and building plan sanction',
        ],
        typicalCorridors: ['Haryana (HSIIDC)', 'Rajasthan (RIICO)', 'Uttar Pradesh (YEIDA/GNOIDA)', 'Karnataka (KIADB)'],
        timeline: 'Fast-tracked single-window approvals (45-75 days)',
      },
      ctaText: 'Review Authority Portfolios',
    },
    {
      id: 'transaction_management',
      number: 'Advisory VI',
      title: 'Transaction Management',
      icon: <Handshake className="w-7 h-7 text-[#0B192C]" />,
      summary: 'From site feasibility and title search documentation to RERA compliances and legal commercial term negotiation, we secure client capital through airtight advisory.',
      points: [
        'Market Comparable Valuations',
        'Escalation & Lock-in Negotiation',
        'Final Agreement & Key Possession',
      ],
      detailedScope: {
        overview: 'Fiduciary representation safeguarding corporate capital against hidden title defects, unapproved building plans, and unfavorable lease terms.',
        keyDeliverables: [
          'Micro-market rental index benchmarking',
          'Drafting legally robust Letter of Intent (LOI) & Term Sheet',
          'RERA compliance scrutiny and stamp duty optimization',
          'Final possession checklist and snag list verification',
        ],
        typicalCorridors: ['Pan-India Institutional Portfolio Coverage'],
        timeline: 'Active throughout the deal lifecycle',
      },
      ctaText: 'Engage Transaction Team',
    },
  ];

  return (
    <section id="core-expertise" className="w-full bg-[#FFFFFF] py-16 md:py-24 px-4 md:px-8 border-b border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
              PRACTICE SUITES & EXPERTISE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#131B2E] font-bold mt-1">
              Engineered Capabilities for Enterprise Real Estate
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-[#44474C] max-w-md leading-relaxed">
            Structured real estate advisory built to satisfy strict fiduciary standards, corporate ESG mandates, and tight industrial timelines.
          </p>
        </div>

        {/* 6-Grid Suite */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suites.map((suite) => (
            <div
              key={suite.id}
              className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1]/60 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white rounded shadow-sm group-hover:scale-105 transition-transform">
                    {suite.icon}
                  </div>
                  <span className="font-technical text-[10px] px-2 py-0.5 bg-white text-[#44474C] rounded font-bold uppercase border border-gray-200">
                    {suite.number}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-[#131B2E]">
                  {suite.title}
                </h3>

                <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                  {suite.summary}
                </p>

                <ul className="space-y-1.5 font-sans text-xs text-[#131B2E] pt-1">
                  {suite.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-white/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedSuite(suite)}
                  className="font-technical text-[11px] text-[#0B192C] font-bold flex items-center gap-1.5 hover:text-[#1E3E62] transition-colors"
                >
                  <span>{suite.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D97706]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Practice Detail Modal */}
      {selectedSuite && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0B192C] text-white p-6 flex items-start justify-between">
              <div>
                <span className="font-technical text-[10px] uppercase tracking-widest text-[#FFB77D] font-bold">
                  Growthland Practice Blueprint • {selectedSuite.number}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {selectedSuite.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSuite(null)}
                className="text-gray-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="font-technical text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                  Executive Practice Overview
                </h4>
                <p className="font-sans text-xs text-gray-700 leading-relaxed">
                  {selectedSuite.detailedScope.overview}
                </p>
              </div>

              <div>
                <h4 className="font-technical text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-2">
                  Institutional Scope & Key Deliverables
                </h4>
                <div className="space-y-1.5">
                  {selectedSuite.detailedScope.keyDeliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-800 bg-gray-50 p-2.5 rounded border border-gray-200">
                      <FileCheck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#F2F3FF] rounded border border-[#DAE2FD]">
                  <span className="font-technical text-[10px] uppercase text-[#44474C] block font-bold">
                    Primary Operational Corridors
                  </span>
                  <ul className="text-xs text-[#131B2E] mt-1 space-y-0.5">
                    {selectedSuite.detailedScope.typicalCorridors.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#F2F3FF] rounded border border-[#DAE2FD]">
                  <span className="font-technical text-[10px] uppercase text-[#44474C] block font-bold">
                    Standard Closing Timeline
                  </span>
                  <span className="text-xs font-semibold text-[#131B2E] mt-1 block">
                    {selectedSuite.detailedScope.timeline}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-technical text-[11px] text-gray-500">
                  Direct Mandate Lead: Aniket Pathak (+91 8178030187)
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href="#consultation-desk"
                    onClick={() => setSelectedSuite(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0B192C] text-white rounded font-technical text-xs font-bold text-center hover:bg-[#1E3E62] transition-colors"
                  >
                    Submit Confidential Brief
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
