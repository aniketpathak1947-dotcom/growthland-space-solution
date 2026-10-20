import React from 'react';
import { Building, Warehouse, Truck, Landmark, Compass, ShieldAlert, Award, FileCheck } from 'lucide-react';

export const StrategicAlliances: React.FC = () => {
  const alliances = [
    {
      name: 'INDOSPACE',
      icon: <Warehouse className="w-8 h-8 text-[#0B192C]" />,
      badge: 'Grade-A Logistics Parks',
      tagline: 'Pan-India Warehousing Alliance',
      scope: 'Strategic leasing & BTS acquisition for institutional tier-1 supply chain facilities.',
    },
    {
      name: 'GODREJ PROPERTIES',
      icon: <Building className="w-8 h-8 text-[#0B192C]" />,
      badge: 'Corporate Commercial',
      tagline: 'Prime Grade-A Tech Workspaces',
      scope: 'Large-scale enterprise headquarter acquisitions and high-density tech park spaces.',
    },
    {
      name: 'FREIGHT SYSTEM',
      icon: <Truck className="w-8 h-8 text-[#0B192C]" />,
      badge: 'Supply Chain Infrastructure',
      tagline: 'Multimodal Freight Alliances',
      scope: 'Intermodal freight corridor logistics, container yards, and dry port connectivity.',
    },
    {
      name: 'BHUMIKA REALTY',
      icon: <Landmark className="w-8 h-8 text-[#0B192C]" />,
      badge: 'Mixed-Use & Commercial',
      tagline: 'High-Yield Urban Assets',
      scope: 'Commercial retail hubs, corporate campuses, and strategic land consolidation.',
    },
  ];

  return (
    <div id="strategic-alliances" className="w-full">
      
      {/* Section 6: Why Partner With Growthland */}
      <section className="w-full bg-[#F2F3FF] py-16 md:py-24 px-4 md:px-8 border-b border-[#E2E7FF]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
            <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
              INSTITUTIONAL VALUE CREATION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#131B2E] font-bold">
              Why Sovereign Investors & Enterprises Partner With Growthland
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#44474C] leading-relaxed">
              Combining deep regulatory understanding with agile institutional commercial execution across India’s highest value economic arteries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-8 bg-white rounded border border-[#E2E7FF] flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#131B2E]">
                Pan-India Execution Network
              </h3>
              <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                Direct on-ground access to high-velocity off-market industrial acreage and enterprise commercial centers across Tier-1 metropolises and high-growth Tier-2 belts with rapid institutional mobilization.
              </p>
              <div className="pt-4 mt-auto border-t border-gray-100">
                <span className="font-technical text-[10px] text-[#0B192C] uppercase tracking-wider block font-bold">
                  Key Coverage
                </span>
                <span className="font-sans text-xs text-[#44474C] block mt-0.5">
                  Delhi NCR • Mumbai • Pune • Bengaluru • Bhiwadi • Neemrana • Chennai • Coimbatore • Kolkata
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-white rounded border border-[#E2E7FF] flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                <ShieldAlert className="w-6 h-6 text-[#D97706]" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#131B2E]">
                Regulatory & Policy Authority
              </h3>
              <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                In-depth mastery of state industrial policy frameworks, statutory zoning regulations, revenue record verifications, and comprehensive single-window clearance portals.
              </p>
              <div className="pt-4 mt-auto border-t border-gray-100">
                <span className="font-technical text-[10px] text-[#0B192C] uppercase tracking-wider block font-bold">
                  Statutory Bodies
                </span>
                <span className="font-sans text-xs text-[#44474C] block mt-0.5">
                  HSIIDC • RIICO • YEIDA • GNOIDA • KIADB • MIDC
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-white rounded border border-[#E2E7FF] flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded bg-[#EAEDFF] flex items-center justify-center text-[#1E3E62]">
                <FileCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#131B2E]">
                End-to-End Fiduciary Handholding
              </h3>
              <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                From preliminary technical site feasibility and legal due diligence through commercial negotiation, lease execution, and physical possession handovers.
              </p>
              <div className="pt-4 mt-auto border-t border-gray-100">
                <span className="font-technical text-[10px] text-[#0B192C] uppercase tracking-wider block font-bold">
                  Risk Governance
                </span>
                <span className="font-sans text-xs text-[#44474C] block mt-0.5">
                  30-Year Title Search • Environmental Due Diligence
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 7: Strategic Alliances & Developer Ecosystem */}
      <section className="w-full bg-[#FFFFFF] py-16 md:py-20 px-4 md:px-8 border-b border-[#E2E7FF]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                COLLABORATIVE POWERHOUSE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#131B2E] font-bold mt-1">
                Strategic Alliances & Developer Ecosystem
              </h2>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#44474C] max-w-sm">
              Partnering alongside India’s sovereign real estate development giants and institutional warehouse developers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alliances.map((partner) => (
              <div
                key={partner.name}
                className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1]/50 flex flex-col items-center justify-between text-center gap-3 hover:shadow-md transition-shadow group"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {partner.icon}
                </div>
                
                <div>
                  <h3 className="font-sans text-base font-bold text-[#131B2E] tracking-tight">
                    {partner.name}
                  </h3>
                  <span className="font-technical text-[9px] uppercase text-[#D97706] font-bold block mt-0.5">
                    {partner.badge}
                  </span>
                  <span className="font-sans text-[11px] text-gray-500 font-medium block mt-0.5">
                    {partner.tagline}
                  </span>
                </div>

                <p className="font-sans text-[11px] text-gray-600 line-clamp-2 mt-1">
                  {partner.scope}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
