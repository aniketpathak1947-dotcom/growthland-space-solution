import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentContext';
import { 
  Phone, 
  ShieldCheck, 
  FileText, 
  UserCircle, 
  Menu, 
  X, 
  Upload, 
  Users, 
  ChevronDown, 
  LogOut, 
  Key, 
  CheckCircle2,
  Building2,
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenVault: () => void;
  onOpenAuth: () => void;
  onOpenUserManagement: () => void;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVault,
  onOpenAuth,
  onOpenUserManagement,
  onOpenUpload,
}) => {
  const { currentUser, isAuthenticated, logout, isSuperAdmin } = useAuth();
  const { documents } = useDocuments();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'About Us', href: '#about-us' },
    { label: 'Core Expertise', href: '#core-expertise' },
    { label: 'Statutory Allotments', href: '#statutory-matrix' },
    { label: 'Featured Assets', href: '#featured-assets-matrix' },
    { label: 'Strategic Alliances', href: '#strategic-alliances' },
    { label: 'Founder & Leadership', href: '#leadership-and-journey-section' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#FAF8FF]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#E2E7FF]">
      
      {/* Top Institutional Ticker */}
      <div className="bg-[#0B192C] text-white py-1.5 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2 text-[11px] font-technical">
          <div className="flex items-center gap-2 tracking-wider uppercase text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#FFB77D] animate-pulse"></span>
            <span>Pan-India Advisory: Strategic Real Estate Acquisition • Corporate Leasing • Government Land Allotments</span>
          </div>
          
          <div className="flex items-center gap-4 text-gray-300">
            <a 
              href="tel:+918178030187" 
              className="flex items-center gap-1.5 text-white hover:text-[#FFB77D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Direct Helpline: +91 8178030187</span>
            </a>
            <span className="hidden lg:inline-block text-[#FFB77D] uppercase font-bold text-[10px] tracking-widest bg-white/10 px-2 py-0.5 rounded">
              Tier-1 Institutional Desk
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Brand / Logo (Clean spacing, zero overlap for Pvt. Ltd.) */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <img
            src="/assets/aistudio/Image_1_d809fc0f.png"
            alt="Growthland Space Solution Logo"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              // Graceful fallback if image path needs local fallback
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://lh3.googleusercontent.com/aida/AEtjO1WR0tWYuipYo3wSUBYy0nm_BH8pfwN2ZXIkl8pSsKoRwGFe1e1XaZjNGSGmq5WCoh774H8nNtWsp54_6qXlOCkyReood9O9VSXpibHDNEL-ajvL9qWbgXup9uHHFtdTEaXKcUPKK2lob4AgsTcmFWHPHs9t66HiiEuFopvZ_ww7WfDf2ts67FzIYMTsgDQR7KlZoohQdD26NnSflB-pAUJJg_lfi4SFVU_KLHlSpGf3poUH9OdiEyM_ehg';
            }}
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg uppercase tracking-tight text-[#131B2E] font-bold leading-none group-hover:text-[#1E3E62] transition-colors">
                GROWTHLAND
              </span>
              <span className="bg-[#D97706]/15 text-[#B45309] text-[10px] font-bold font-technical px-2 py-0.5 rounded border border-[#D97706]/30 uppercase tracking-wider whitespace-nowrap">
                Pvt. Ltd.
              </span>
            </div>
            <span className="font-technical text-[9px] tracking-widest uppercase text-[#44474C] leading-tight mt-1 whitespace-nowrap">
              Pan-India Industrial & Commercial Advisory
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-sans font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#44474C] hover:text-[#0B192C] transition-colors py-2 border-b-2 border-transparent hover:border-[#D97706]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Vault, Account, Consult */}
        <div className="flex items-center gap-2.5">
          
          {/* Document Vault Button */}
          <button
            onClick={onOpenVault}
            className="flex items-center gap-1.5 h-10 px-3.5 bg-white hover:bg-[#F2F3FF] text-[#0B192C] border border-[#CBD5E1] rounded font-technical text-[11px] font-bold tracking-wider transition-all shadow-sm group"
            title="Access Secure Client Document Vault"
          >
            <Lock className="w-3.5 h-3.5 text-[#D97706] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">SECURE VAULT</span>
            <span className="px-1.5 py-0.2 bg-[#0B192C] text-white text-[10px] rounded-full">
              {documents.length}
            </span>
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="hidden lg:flex items-center gap-1.5 h-10 px-3 bg-[#EAEDFF] hover:bg-[#DAE2FD] text-[#0B192C] border border-[#BAC7E1] rounded font-technical text-[11px] font-semibold transition-all"
            title="Upload Institutional Document"
          >
            <Upload className="w-3.5 h-3.5 text-[#1E3E62]" />
            <span>UPLOAD</span>
          </button>

          {/* User Account Menu / Switcher */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 h-10 px-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded text-left transition-all shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#0B192C] text-[#FFB77D] flex items-center justify-center font-bold text-xs uppercase border border-[#D97706]/40">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[12px] font-bold text-[#131B2E] leading-tight line-clamp-1 max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-technical uppercase text-[#D97706] leading-none font-bold">
                    {isSuperAdmin ? 'SUPER ADMIN' : currentUser.role.replace('_', ' ')}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-500 font-technical uppercase">Signed In Account</p>
                    <p className="text-sm font-bold text-[#131B2E] mt-0.5">{currentUser.name}</p>
                    <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] text-gray-500 font-technical uppercase font-bold">
                        {currentUser.organization}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenVault();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-[#F2F3FF] flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#1E3E62]" />
                      <span>My Vault Files ({documents.length})</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenUpload();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-[#F2F3FF] flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-[#D97706]" />
                      <span>Upload New Document</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenUserManagement();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-[#F2F3FF] flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-[#1E3E62]" />
                      <span>User Account Management</span>
                      {isSuperAdmin && (
                        <span className="ml-auto text-[9px] bg-[#0B192C] text-white px-1.5 py-0.5 rounded font-technical">
                          Admin
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-[#F2F3FF] flex items-center gap-2"
                    >
                      <Key className="w-4 h-4 text-emerald-600" />
                      <span>Switch Account / Fast Login</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 h-10 px-3 bg-white hover:bg-gray-100 text-[#0B192C] border border-gray-300 rounded font-technical text-[11px] font-bold tracking-wider transition-all"
            >
              <UserCircle className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">SIGN IN</span>
            </button>
          )}

          {/* Request Call Back CTA */}
          <a
            href="#call-back-enquiry"
            className="hidden lg:inline-flex items-center gap-1.5 h-10 px-3 bg-[#EAEDFF] hover:bg-[#DAE2FD] text-[#0B192C] border border-[#BAC7E1] rounded font-technical text-[11px] font-bold tracking-wider transition-all"
            title="Request Instant Callback from Advisor"
          >
            <Phone className="w-3.5 h-3.5 text-[#D97706]" />
            <span>CALL BACK</span>
          </a>

          {/* Primary Consultation CTA */}
          <a
            href="#consultation-desk"
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-[11px] font-bold tracking-wider transition-all shadow-md"
          >
            CONSULT ANIKET PATHAK
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#0B192C] hover:bg-gray-100 rounded"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-6 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 font-sans text-sm pb-4 border-b border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-gray-700 hover:text-[#0B192C] font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 flex flex-col gap-2.5">
            <a
              href="#call-back-enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FEF3C7] text-[#0B192C] border border-[#D97706]/30 rounded font-technical text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-[#D97706]" />
              <span>REQUEST INSTANT CALL BACK</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVault();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#EAEDFF] text-[#0B192C] rounded font-technical text-xs font-bold"
            >
              <Lock className="w-4 h-4 text-[#D97706]" />
              <span>ACCESS DOCUMENT VAULT ({documents.length})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUpload();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 text-gray-800 rounded font-technical text-xs font-bold"
            >
              <Upload className="w-4 h-4 text-[#1E3E62]" />
              <span>UPLOAD FILES</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUserManagement();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 text-gray-800 rounded font-technical text-xs font-bold"
            >
              <Users className="w-4 h-4 text-[#1E3E62]" />
              <span>MANAGE USER ACCOUNTS</span>
            </button>

            <a
              href="tel:+918178030187"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-[#0B192C] text-white text-center rounded font-technical text-xs font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>DIRECT HELPLINE: +91 8178030187</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
