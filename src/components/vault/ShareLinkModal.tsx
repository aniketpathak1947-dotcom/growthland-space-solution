import React, { useState } from 'react';
import { VaultDocument, DocumentShareLink } from '../../types';
import { useDocuments } from '../../context/DocumentContext';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  Key, 
  ShieldCheck, 
  MessageSquare,
  Lock 
} from 'lucide-react';

interface ShareLinkModalProps {
  document: VaultDocument | null;
  onClose: () => void;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ document: doc, onClose }) => {
  const { createShareLink } = useDocuments();

  const [expiryHours, setExpiryHours] = useState(168); // 7 days
  const [usePasscode, setUsePasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [generatedLink, setGeneratedLink] = useState<DocumentShareLink | null>(null);
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const link = createShareLink(doc.id, expiryHours, usePasscode ? passcode : undefined);
    setGeneratedLink(link);
  };

  const fullShareUrl = generatedLink
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/?vaultToken=${generatedLink.token}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*Growthland Space Solution - Confidential Document Share*\n` +
      `*Document:* ${doc.title}\n` +
      `*Corridor:* ${doc.corridorOrAuthority}\n` +
      `*Access Link:* ${fullShareUrl}\n` +
      (usePasscode && passcode ? `*Access Passcode:* ${passcode}\n` : '') +
      `_Expires: ${generatedLink?.expiresAt}_`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
              <Share2 className="w-4 h-4 text-[#D97706]" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold">
                Generate Secure Share Link
              </h3>
              <p className="text-[10px] text-gray-400 font-technical uppercase">
                Time-Expiring Access • Audit Tracked
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <span className="text-[10px] font-technical uppercase text-gray-500 font-bold block">
              Target Document
            </span>
            <p className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-2">
              {doc.title}
            </p>
            <span className="text-[10px] text-gray-500 font-technical">
              {doc.fileName} • {doc.fileSize}
            </span>
          </div>

          {!generatedLink ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                  Link Expiration Window
                </label>
                <select
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#0B192C]"
                >
                  <option value={24}>24 Operational Hours (Fast Review)</option>
                  <option value={72}>3 Business Days</option>
                  <option value={168}>7 Days (Recommended for Board Diligence)</option>
                  <option value={720}>30 Days (Institutional Mandate Lifecycle)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePasscode}
                    onChange={(e) => setUsePasscode(e.target.checked)}
                    className="rounded border-gray-300 text-[#0B192C] focus:ring-0"
                  />
                  <span className="font-sans text-xs text-gray-700 font-semibold">
                    Require Secure Passcode for Access
                  </span>
                </label>

                {usePasscode && (
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. GSS-2025-PASS"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-[#0B192C]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#D97706]" />
                <span>GENERATE ENCRYPTED LINK</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-[10px] font-technical uppercase text-emerald-800 font-bold block mb-1">
                  Protected Shareable URL
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fullShareUrl}
                    className="w-full h-9 px-2 bg-white border border-emerald-300 rounded text-[11px] font-mono text-gray-800 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-technical text-xs font-bold shrink-0 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-gray-600 font-sans space-y-1">
                <p>• <strong>Expires At:</strong> {generatedLink.expiresAt}</p>
                {generatedLink.requirePasscode && (
                  <p>• <strong>Passcode:</strong> <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1 py-0.5 rounded">{generatedLink.passcode}</span></p>
                )}
                <p className="text-gray-500">• Access downloads will be logged with client IP address in real time.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded text-xs font-bold font-sans flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
