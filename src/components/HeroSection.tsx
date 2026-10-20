import React from 'react';
import { 
  Building2, 
  Warehouse, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Lock, 
  ArrowRight, 
  Award, 
  Gavel, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

interface HeroSectionProps {
  onOpenVault: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVault, onOpenConsultation }) => {
  return (
    <section className="w-full bg-[#FFFFFF] py-12 md:py-20 px-4 md:px-8 border-b border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        
        {/* Hero Headline & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Headline & CTAs */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#EAEDFF] rounded text-[#131B2E] border border-[#BAC7E1]/50">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                PAN-INDIA INDUSTRIAL & COMMERCIAL REAL ESTATE ADVISORY
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#131B2E] font-bold tracking-tight leading-[1.12]">
              Accelerating Enterprise Expansion Across India’s Prime Industrial & Commercial Corridors
            </h1>

            <p className="font-sans text-base md:text-lg text-[#44474C] max-w-3xl leading-relaxed">
              Specializing in large-scale strategic asset acquisition, sovereign statutory land allotments, and Grade-A institutional leasing for global conglomerates, industrial manufacturers, and expanding corporate leaders.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#consultation-desk"
                className="h-12 px-6 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>CONSULT ANIKET PATHAK (LEAD ADVISORY)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#featured-assets-matrix"
                className="h-12 px-5 bg-[#EAEDFF] hover:bg-[#DAE2FD] text-[#0B192C] border border-[#BAC7E1] rounded font-technical text-xs font-bold tracking-wider transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#1E3E62]" />
                <span>EXPLORE ASSETS & ALLOTMENTS</span>
              </a>

              <button
                onClick={onOpenVault}
                className="h-12 px-5 bg-white hover:bg-gray-50 text-[#0B192C] border border-gray-300 rounded font-technical text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <Lock className="w-4 h-4 text-[#D97706]" />
                <span>SECURE CLIENT VAULT</span>
              </button>

              <a
                href="https://wa.me/918178030187"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#131B2E] border border-[#25D366]/40 rounded font-technical text-xs font-bold transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>+91 8178030187</span>
              </a>
            </div>
          </div>

          {/* Hero Verified Stats Panel */}
          <div className="lg:col-span-4 bg-[#F2F3FF] p-6 rounded border border-[#E2E7FF] flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E7FF]">
              <span className="font-technical text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                Institutional Deal Track
              </span>
              <Award className="w-5 h-5 text-[#D97706]" />
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded border border-[#DAE2FD]">
                <span className="font-technical text-[10px] text-[#44474C] uppercase tracking-wider block font-semibold">
                  Pipeline Evaluated
                </span>
                <div className="font-technical text-3xl font-bold text-[#131B2E] mt-1 tracking-tight">
                  ₹500Cr+
                </div>
                <span className="font-sans text-xs text-[#44474C] mt-1 block">
                  Active asset transactions & industrial portfolios under advisory
                </span>
              </div>

              <div className="p-4 bg-white rounded border border-[#DAE2FD]">
                <span className="font-technical text-[10px] text-[#44474C] uppercase tracking-wider block font-semibold">
                  Statutory Clearance Track
                </span>
                <div className="font-technical text-3xl font-bold text-[#131B2E] mt-1 tracking-tight">
                  100%
                </div>
                <span className="font-sans text-xs text-[#44474C] mt-1 block">
                  Compliant single-window state development allotments
                </span>
              </div>

              <div className="p-4 bg-white rounded border border-[#DAE2FD]">
                <span className="font-technical text-[10px] text-[#44474C] uppercase tracking-wider block font-semibold">
                  Geographic Footprint
                </span>
                <div className="font-technical text-2xl font-bold text-[#131B2E] mt-1 tracking-tight">
                  Tier 1 & 2 Metros
                </div>
                <span className="font-sans text-xs text-[#44474C] mt-1 block">
                  Delhi NCR, Mumbai, Pune, Bengaluru, Bhiwadi, Neemrana, Chennai, Coimbatore, Kolkata
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Sourcing Showcase: Dual Grade-A Montage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Grade A Corporate IT */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded shadow-md h-[360px] md:h-[440px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJD8HV0Dg9SHrl2TH_7gNqi9hHMm2obSuczh1qIl-CLfHEpwj-eiv26-CIb5yPDTz5Tj_Cb2U1DCM8liN2vFz7rTC3bjGftHL4pLfabJkPDsaqyB2uoLyr5iKKcoBTqedQhYKabFICW5O23HrkVPbTExZDp1n4xkwIfQVsFZ5DRScin3JcqDtJ8ZPy1WfRWbL1tD7fL2kmYC3e6in2m7SsvAHOmZKOldU6z7u6dJ39kKp7NDPXGCJ"
              alt="Grade-A Corporate IT Glass Monolith Center"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/40 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded font-technical text-[10px] uppercase tracking-widest text-white font-bold">
                  Commercial Grade-A
                </span>
                <span className="px-2.5 py-0.5 bg-[#D97706] text-[#0B192C] font-bold rounded font-technical text-[10px] uppercase tracking-widest">
                  CBD Gurugram & Bengaluru
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                Institutional Enterprise Tech Hubs & Corporate HQs
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-300 mt-1 max-w-xl line-clamp-2">
                High-efficiency floorplates, LEED Platinum specifications, executive boardrooms, and zero-downtime mission-critical power infrastructure.
              </p>
            </div>
          </div>

          {/* Card 2: Multimodal Logistics */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded shadow-md h-[360px] md:h-[440px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuj6xGaxNg_AnWZY3BVPx7jBVnt7HlgFfpP_34YCCf45ZaofOuscbIKRv46l67KYYudyZCYND-xUABizZlN7nGRKlI4uvstVC8Zz4bYEFmlXvBJYzu1Oa9bSrjaqrj94eNRDE8dItnpuUOHPxS-sa_vB1Yh1CoDarMCcUx0n8tuciL3nW6OAaBVsCnr6gG4cca2VOljDW2FfhIfkG2JGzH2mLksRcTMLjoqpTrLSRgahdbgsH0G2Eq"
              alt="High-spec Grade A Multimodal Warehousing and Logistics Park"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/40 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded font-technical text-[10px] uppercase tracking-widest text-white font-bold">
                  Industrial & Logistics
                </span>
                <span className="px-2.5 py-0.5 bg-[#D97706] text-[#0B192C] font-bold rounded font-technical text-[10px] uppercase tracking-widest">
                  Chakan, Bhiwadi, Dankuni
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                Multimodal Distribution & Mega Hubs
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-300 mt-1 line-clamp-2">
                12M clear heights, FM2 flooring, automated docking bays, and heavy vehicle turning aprons engineered for Fortune 500 supply chains.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Operational Pillars Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1]/50 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-white rounded text-[#0B192C] shadow-sm">
              <MapPin className="w-6 h-6 text-[#1E3E62]" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-[#131B2E]">Pan-India Footprint</h4>
              <p className="font-sans text-xs text-[#44474C] mt-1 leading-relaxed">
                Direct transaction network across NCR, Mumbai, Bengaluru, Chennai, Kolkata, and strategic tier-2 growth belts.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1]/50 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-white rounded text-[#0B192C] shadow-sm">
              <Gavel className="w-6 h-6 text-[#1E3E62]" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-[#131B2E]">Government Allotments</h4>
              <p className="font-sans text-xs text-[#44474C] mt-1 leading-relaxed">
                Deep statutory mastery in securing prime state parcels through HSIIDC, RIICO, YEIDA, GNOIDA, and KIADB.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1]/50 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-white rounded text-[#0B192C] shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#1E3E62]" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-[#131B2E]">End-to-End Execution</h4>
              <p className="font-sans text-xs text-[#44474C] mt-1 leading-relaxed">
                Fiduciary institutional representation from initial site evaluation and title diligence through commercial closing and keys handover.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
