import React from 'react';
import { 
  Map, 
  Landmark, 
  CheckSquare, 
  TrendingUp, 
  ArrowRight, 
  Briefcase, 
  Users,
  Building2,
  ExternalLink
} from 'lucide-react';

export const CorporateNarrative: React.FC = () => {
  return (
    <section id="about-us" className="w-full bg-[#F2F3FF] py-16 md:py-24 px-4 md:px-8 border-b border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
        
        {/* Top Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAEDFF] rounded-md text-[#131B2E] border border-[#BAC7E1]/60 shadow-xs">
                <Briefcase className="w-4 h-4 text-[#D97706] shrink-0" />
                <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                  WHO WE ARE & WHAT WE DO
                </span>
              </div>
              
              {/* Separate, Non-overlapping Corporate Entity Badge with clear spacing */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-md border border-[#CBD5E1] shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-[#1E3E62] shrink-0" />
                <span className="font-technical text-[11px] text-[#0B192C] font-bold uppercase tracking-wider">
                  Incorporated Pvt. Ltd. Entity
                </span>
              </div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#131B2E] font-bold leading-tight">
              The Decisive Bridge Between Growing Enterprises & Institutional Scale
            </h2>

            {/* Clear, dedicated statutory identity card with zero overlap */}
            <div className="p-4 bg-white rounded-lg border border-[#BAC7E1] shadow-sm flex flex-col gap-1">
              <span className="text-[#D97706] font-bold uppercase font-technical text-[10px] tracking-wider">
                OFFICIAL STATUTORY CORPORATE REGISTRY
              </span>
              <span className="font-sans text-base sm:text-lg font-bold text-[#0B192C] tracking-wide break-words">
                GROWTHLAND SPACE SOLUTION PVT. LTD.
              </span>
              <span className="font-technical text-[11px] text-gray-500">
                (Growthland Space Solution Private Limited • CIN Registered Institutional Advisory)
              </span>
            </div>

            <p className="font-sans text-sm md:text-base text-[#44474C] leading-relaxed">
              Growthland Space Solution Private Limited operates at the nexus of high-capital commercial leasing, multi-acre manufacturing acquisitions, and sovereign regulatory approvals. We eliminate bureaucratic friction, mitigate real estate risk, and structure complex transactions tailored to long-term enterprise value.
            </p>

            <p className="font-sans text-xs md:text-sm text-[#44474C] leading-relaxed">
              Under the executive leadership of Aniket Pathak, our advisory deploys rigorous market intelligence, statutory single-window navigation, and master-planned asset matching to empower corporations, MNCs, and private equity developers across India.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded border border-[#DAE2FD] shadow-sm">
                <span className="font-technical text-3xl font-bold text-[#131B2E]">15+</span>
                <span className="font-sans text-xs text-[#44474C] block mt-1 font-medium">
                  Years Combined Execution Expertise
                </span>
              </div>

              <div className="p-4 bg-white rounded border border-[#DAE2FD] shadow-sm">
                <span className="font-technical text-3xl font-bold text-[#131B2E]">50+</span>
                <span className="font-sans text-xs text-[#44474C] block mt-1 font-medium">
                  Corporate & Industrial Mandates Closed
                </span>
              </div>
            </div>

            {/* Quick Link to open Leadership Team & Our Journey in Founder Desk */}
            <div className="pt-2">
              <a
                href="#consultation-desk"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-[#0B192C] border border-[#CBD5E1] rounded font-technical text-xs font-bold transition-all shadow-xs group"
              >
                <Users className="w-4 h-4 text-[#D97706]" />
                <span>View Leadership Team & Our Journey (Founder Desk)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Strategic Capability Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded border border-[#E2E7FF] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-[#131B2E]">
                  Pan-India Execution Network
                </h3>
                <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                  Seamless operational reach encompassing tier-1 financial capitals and strategic secondary corridors. We connect corporate strategies with on-the-ground assets with institutional speed.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#0B192C] font-technical text-[11px] font-bold tracking-wider">
                <span>DIRECT DESK COVERAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded border border-[#E2E7FF] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-[#131B2E]">
                  Statutory Allotment Mastery
                </h3>
                <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                  In-depth statutory competency across state development bodies. We handle industrial allotment applications, land zoning, DPR compilation, and direct authority negotiations.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#0B192C] font-technical text-[11px] font-bold tracking-wider">
                <span>PROCEDURAL PURITY</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded border border-[#E2E7FF] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-[#131B2E]">
                  Complete Transaction Lifecycle
                </h3>
                <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                  From site feasibility and title search documentation to RERA compliances and legal commercial term negotiation, we secure client capital through airtight advisory.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#0B192C] font-technical text-[11px] font-bold tracking-wider">
                <span>ZERO FIDUCIARY COMPROMISE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded border border-[#E2E7FF] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-[#131B2E]">
                  Corporate Land Aggregation
                </h3>
                <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                  Aggregating mega-acre tracts for greenfield industrial parks, hyper-scale data centers, mega logistics hubs, and commercial campus developments across high-density belts.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#0B192C] font-technical text-[11px] font-bold tracking-wider">
                <span>ASSET STRUCTURING</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
