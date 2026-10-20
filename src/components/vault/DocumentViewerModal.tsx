import React, { useState } from 'react';
import { VaultDocument } from '../../types';
import { 
  X, 
  Download, 
  Share2, 
  ShieldCheck, 
  Lock, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Clock 
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import { useAuth } from '../../context/AuthContext';

interface DocumentViewerModalProps {
  document: VaultDocument | null;
  onClose: () => void;
  onShare: (doc: VaultDocument) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document: doc,
  onClose,
  onShare,
}) => {
  const { downloadDocument } = useDocuments();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!doc) return null;

  const totalPages = doc.pageCount || 24;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#131B2E] text-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Viewer Control Bar */}
        <div className="bg-[#0B192C] px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <div className="p-1.5 bg-[#D97706]/20 text-[#FFB77D] rounded">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="text-xs font-bold text-white truncate max-w-md">
                {doc.title}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-technical">
                <span>{doc.fileName}</span>
                <span>•</span>
                <span className="text-[#FFB77D] font-bold uppercase">{doc.confidentiality.replace('_', ' ')}</span>
                <span>•</span>
                <span>{doc.fileSize}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShare(doc)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-technical transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => downloadDocument(doc.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded text-xs font-technical transition-all shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation & Zoom Toolbar */}
        <div className="bg-[#1E293B] px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs text-gray-300 font-technical">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(z => Math.max(70, z - 10))}
              className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] w-12 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(z => Math.min(150, z + 10))}
              className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SHA-256 Verified Clean</span>
          </div>
        </div>

        {/* Main Document Reader Canvas with Watermark */}
        <div className="flex-1 bg-[#0F172A] p-4 sm:p-8 overflow-y-auto flex items-center justify-center relative">
          
          {/* Simulated Printed Document Page */}
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[700px] min-h-[750px] bg-white text-[#131B2E] p-8 sm:p-12 shadow-2xl rounded relative transition-transform duration-200 select-text overflow-hidden"
          >
            {/* Watermark Diagonal Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
              <span className="font-display font-bold text-6xl text-gray-900 -rotate-45 whitespace-nowrap">
                GROWTHLAND CONFIDENTIAL
              </span>
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-[#0B192C] pb-4 mb-6 flex justify-between items-start">
              <div>
                <span className="font-technical text-[9px] uppercase tracking-widest text-gray-500 font-bold block">
                  GROWTHLAND SPACE SOLUTION PVT. LTD. • PAN-INDIA ADVISORY
                </span>
                <h1 className="font-display text-xl font-bold text-[#0B192C] mt-1">
                  {doc.title}
                </h1>
                <p className="font-technical text-[10px] text-gray-500 mt-0.5">
                  Reference: GSS-{doc.id.toUpperCase()} • Sector: {doc.corridorOrAuthority}
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-[#D97706]/15 text-[#B45309] border border-[#D97706]/30 rounded font-technical text-[9px] uppercase font-bold">
                  {doc.confidentiality.toUpperCase()}
                </span>
                <span className="font-technical text-[9px] text-gray-400 block mt-1">
                  {doc.version}
                </span>
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-4 text-xs font-sans text-gray-800 leading-relaxed">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-technical text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-1">
                  EXECUTIVE SUMMARY & STATUTORY CLASSIFICATION
                </span>
                <p>{doc.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-technical text-[10px] uppercase tracking-wider text-gray-900 font-bold">
                  Section {currentPage}.0 — Technical Asset Findings & Legal Audit
                </h4>
                <p className="text-justify">
                  {doc.contentSnippet || 'All title deeds, authority clearances, and structural architectural plans have been validated by Growthland Space Solution statutory desk under the lead supervision of Aniket Pathak.'}
                </p>
                <p className="text-justify text-gray-600">
                  Cadastral revenue records from the concerned District Magistrate and Sub-Registrar indicate unencumbered ownership rights without pending lis pendens or state land ceiling impediments.
                </p>
              </div>

              {/* Sample Spec Matrix Table inside document */}
              <div className="border border-gray-300 rounded overflow-hidden my-4">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#0B192C] text-white font-technical text-[9px] uppercase">
                    <tr>
                      <th className="p-2">Parameter</th>
                      <th className="p-2">Audited Value</th>
                      <th className="p-2">Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-2 font-semibold">Corridor / Zone</td>
                      <td className="p-2">{doc.corridorOrAuthority}</td>
                      <td className="p-2 text-emerald-700 font-bold">Verified Direct</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Integrity Hash</td>
                      <td className="p-2 font-mono text-[9px] truncate max-w-[200px]">{doc.sha256Checksum.substring(0, 24)}...</td>
                      <td className="p-2 text-emerald-700 font-bold">Authenticated</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Lead Consultant</td>
                      <td className="p-2">Aniket Pathak (Founder & MD)</td>
                      <td className="p-2 text-emerald-700 font-bold">Fiduciary Sign-off</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-8 mt-12 border-t border-gray-300 flex justify-between items-end text-[10px] text-gray-500 font-technical">
                <div>
                  <span className="block font-bold text-gray-800">Authorized Signatory</span>
                  <span>Aniket Pathak, Managing Director</span>
                </div>
                <div className="text-right">
                  <span>Digitally Sealed: {doc.uploadedAt}</span>
                  <span className="block text-[9px]">Growthland Space Solution Deal Room</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer info strip */}
        <div className="bg-[#0B192C] px-4 py-2 text-[10px] font-technical text-gray-400 flex items-center justify-between border-t border-white/10">
          <span>Viewing as: {currentUser?.name} ({currentUser?.roleTitle})</span>
          <span className="font-mono">Checksum: {doc.sha256Checksum.substring(0, 16)}...</span>
        </div>

      </div>
    </div>
  );
};
