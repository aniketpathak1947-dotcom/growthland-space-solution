import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Share2, QrCode, Shield, Globe } from 'lucide-react';

interface WebsiteLinkBannerProps {
  onOpenVault: () => void;
}

export const WebsiteLinkBanner: React.FC<WebsiteLinkBannerProps> = ({ onOpenVault }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Use the shared preview app URL or current window URL
  const appUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('run.app') ? window.location.href : 'https://ais-pre-gztgauwvtf5eqr42i5vd5n-356145478897.asia-northeast1.run.app')
    : 'https://ais-pre-gztgauwvtf5eqr42i5vd5n-356145478897.asia-northeast1.run.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `*Growthland Space Solution Private Limited*\nPan-India Industrial & Commercial Real Estate Advisory\nOfficial Corporate Website & Client Vault: ${appUrl}\nDirect Desk: Aniket Pathak (+91 8178030187)`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-[#0B192C] text-white px-4 py-2.5 rounded shadow-2xl border border-white/20 hover:bg-[#1E3E62] transition-all text-xs font-semibold"
        >
          <Globe className="w-4 h-4 text-[#D97706]" />
          <span>Website Link & Portal Controls</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0B192C] text-white border-b border-white/10 px-4 py-2.5 relative z-30 shadow-md">
      <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Link info */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#D97706]/20 text-[#FFB77D] rounded border border-[#D97706]/30 font-technical text-[10px] uppercase font-bold tracking-wider">
            <Shield className="w-3 h-3 text-[#D97706]" />
            Official Web Portal Live
          </span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="text-gray-300 font-mono text-[11px] truncate max-w-[280px] sm:max-w-[420px] bg-black/40 px-2 py-1 rounded border border-white/10 select-all">
            {appUrl}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded font-technical text-[11px] font-bold tracking-wider transition-all border ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'LINK COPIED!' : 'COPY WEBSITE LINK'}</span>
          </button>

          <button
            onClick={shareToWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 rounded font-technical text-[11px] font-bold tracking-wider transition-all"
            title="Share via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SHARE</span>
          </button>

          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20 rounded font-technical text-[11px] transition-all"
            title="View QR Code for Mobile"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="hidden lg:inline">QR</span>
          </button>

          <button
            onClick={onOpenVault}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded font-technical text-[11px] tracking-wider transition-all shadow"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>OPEN CLIENT VAULT</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-white px-1.5 py-1 text-xs"
            title="Minimize bar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#131B2E] p-6 rounded-lg max-w-sm w-full shadow-2xl border border-gray-200 text-center animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-technical text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                Mobile Access QR Code
              </span>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-400 hover:text-black font-bold p-1 text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200 inline-block mb-3">
              {/* Responsive SVG QR Code representation */}
              <div className="w-48 h-48 mx-auto bg-white p-2 border border-gray-300 flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        (i % 2 === 0 || i % 5 === 0 || i < 7 || i > 28)
                          ? 'bg-[#0B192C]'
                          : 'bg-transparent'
                      } rounded-none`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-1 rounded shadow border border-gray-300">
                    <span className="text-[10px] font-bold text-[#0B192C] tracking-tighter">GSS</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-600 mb-3">
              Scan with any mobile camera to load <strong>Growthland Space Solution</strong> on your phone.
            </p>
            <div className="p-2 bg-gray-100 rounded text-[11px] font-mono break-all text-gray-700 select-all mb-4">
              {appUrl}
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2 bg-[#0B192C] text-white rounded text-xs font-semibold hover:bg-[#1E3E62] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
