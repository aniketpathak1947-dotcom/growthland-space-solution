import React from 'react';
import { Phone, Mail, Shield, CheckCircle2, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F2F3FF] text-[#131B2E] border-t border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 pt-16 pb-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand & Executive Leadership */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/aistudio/Image_1_d809fc0f.png"
                  alt="Growthland Space Solution Logo"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://lh3.googleusercontent.com/aida/AEtjO1WR0tWYuipYo3wSUBYy0nm_BH8pfwN2ZXIkl8pSsKoRwGFe1e1XaZjNGSGmq5WCoh774H8nNtWsp54_6qXlOCkyReood9O9VSXpibHDNEL-ajvL9qWbgXup9uHHFtdTEaXKcUPKK2lob4AgsTcmFWHPHs9t66HiiEuFopvZ_ww7WfDf2ts67FzIYMTsgDQR7KlZoohQdD26NnSflB-pAUJJg_lfi4SFVU_KLHlSpGf3poUH9OdiEyM_ehg';
                  }}
                />
                <span className="font-sans text-base font-bold uppercase tracking-tight text-[#0B192C]">
                  GROWTHLAND SPACE SOLUTION
                </span>
              </div>

              <p className="font-technical text-[10px] uppercase tracking-widest text-[#44474C] font-semibold">
                Private Limited • Institutional Real Estate Advisory
              </p>

              <p className="font-sans text-xs text-[#44474C] leading-relaxed">
                Premier sovereign & enterprise advisory handling multi-million sq. ft. Grade-A industrial logistics parks, high-capacity commercial hubs, and strategic statutory state allotments across Pan-India economic corridors.
              </p>
            </div>

            {/* Leadership box */}
            <div className="mt-6 p-4 bg-white rounded border border-[#DAE2FD] shadow-sm">
              <span className="font-technical text-[9px] uppercase tracking-widest text-gray-500 block mb-1 font-bold">
                Executive Leadership
              </span>
              <span className="font-sans text-sm font-bold text-[#131B2E] block">
                Aniket Pathak
              </span>
              <span className="font-sans text-xs text-gray-500 block">
                Founder & Managing Director
              </span>

              <div className="mt-3 flex flex-col gap-1.5 font-sans text-xs text-gray-700">
                <a 
                  href="mailto:pathak.aniket@growthlandspace.com" 
                  className="hover:text-[#1E3E62] flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>pathak.aniket@growthlandspace.com</span>
                </a>
                <a 
                  href="tel:+918178030187" 
                  className="hover:text-[#1E3E62] flex items-center gap-2 transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>+91 8178030187</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Pan-India Corridors */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-gray-200 pb-2">
              Pan-India Corridors
            </h4>
            <ol className="space-y-1.5 font-technical text-xs text-[#44474C] font-semibold uppercase">
              <li>1. DELHI NCR</li>
              <li>2. MUMBAI</li>
              <li>3. PUNE</li>
              <li>4. BENGALURU</li>
              <li>5. BHIWADI</li>
              <li>6. NEEMRANA</li>
              <li>7. CHENNAI</li>
              <li>8. COIMBATORE</li>
              <li>9. KOLKATA</li>
            </ol>
          </div>

          {/* Column 3: Statutory Allotments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-gray-200 pb-2">
              Statutory Allotments
            </h4>
            <ul className="space-y-1.5 font-sans text-xs text-[#44474C]">
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • HSIIDC (Haryana State Industrial Infrastructure)
                </a>
              </li>
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • RIICO (Rajasthan State Industrial Development)
                </a>
              </li>
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • YEIDA (Yamuna Expressway Industrial Dev. Authority)
                </a>
              </li>
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • GNOIDA (Greater Noida Industrial Development)
                </a>
              </li>
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • KIADB (Karnataka Industrial Areas Development)
                </a>
              </li>
              <li>
                <a href="#statutory-matrix" className="hover:text-[#0B192C]">
                  • MIDC (Maharashtra Industrial Development Corporation)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory Practice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-gray-200 pb-2">
              Advisory Practice
            </h4>
            <ul className="space-y-1.5 font-sans text-xs text-[#44474C]">
              <li><a href="#core-expertise" className="hover:text-[#0B192C]">• Corporate Leasing</a></li>
              <li><a href="#core-expertise" className="hover:text-[#0B192C]">• Industrial Land Acquisition</a></li>
              <li><a href="#core-expertise" className="hover:text-[#0B192C]">• Warehouse Structuring</a></li>
              <li><a href="#featured-assets-matrix" className="hover:text-[#0B192C]">• Grade-A Tech Parks</a></li>
              <li><a href="#strategic-alliances" className="hover:text-[#0B192C]">• Strategic Alliances & PE</a></li>
              <li><a href="#consultation-desk" className="hover:text-[#0B192C]">• Technical Due Diligence</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 font-technical text-[10px] md:text-[11px] text-[#44474C] uppercase tracking-wider">
          <p>© 2025 Growthland Space Solution Private Limited. All institutional rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>RERA Advisory Registered</span>
            <span>•</span>
            <span>Corporate CIN Verified</span>
            <span>•</span>
            <span className="text-[#0B192C] font-bold">Statutory Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
