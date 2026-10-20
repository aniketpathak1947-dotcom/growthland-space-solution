import React, { useState } from 'react';
import { STATE_AUTHORITIES } from '../data/initialData';
import { StateAuthority } from '../types';
import { 
  Landmark, 
  CheckCircle, 
  Download, 
  FileCheck, 
  FileText, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface AuthorityMatrixProps {
  onOpenVault: () => void;
  onRequestAllotment: (authorityCode: string) => void;
}

export const AuthorityMatrix: React.FC<AuthorityMatrixProps> = ({ onOpenVault, onRequestAllotment }) => {
  const [selectedAuth, setSelectedAuth] = useState<StateAuthority | null>(null);

  const downloadSampleDPR = (auth: StateAuthority) => {
    const content = `========================================================================
GROWTHLAND SPACE SOLUTION PRIVATE LIMITED
STATUTORY AUTHORITY DETAILED PROJECT REPORT (DPR) GUIDELINE
========================================================================

AUTHORITY:      ${auth.fullName} (${auth.code})
STATE/CORRIDOR: ${auth.state} - ${auth.corridor}
KEY NODES:      ${auth.nodes.join(', ')}
STRATEGIC FOCUS:${auth.strategicFocus}
STATUS:         ${auth.schemeStatus.toUpperCase()}

LEAD REGULATORY ADVISOR:
Aniket Pathak | Founder & Managing Director
Growthland Space Solution Private Limited
Direct Helpline: +91 8178030187 | Email: pathak.aniket@growthlandspace.com

------------------------------------------------------------------------
STATUTORY DPR COMPILATION CHECKLIST:
${auth.dprChecklist.map((item, idx) => `${idx + 1}. [ ] ${item}`).join('\n')}

GROWTHLAND EXECUTION SCOPE:
${auth.growthlandScope.map((s, idx) => `- ${s}`).join('\n')}

ESTIMATED ALLOTMENT CADENCE:
- Preliminary Scrutiny: 15 Working Days
- Authority Screening Committee (ASC) Interview: 30 Working Days
- Provisional Allotment Letter (PAL) Issuance: 45 Working Days
- Physical Land Possession & Lease Deed: 60-90 Working Days

------------------------------------------------------------------------
CONFIDENTIAL & PRIVILEGED STATUTORY DOSSIER
Growthland Space Solution Private Limited | CIN Verified
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${auth.code}_State_Allotment_DPR_Guideline.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="statutory-matrix" className="w-full bg-[#FFFFFF] py-16 md:py-24 px-4 md:px-8 border-b border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#EAEDFF] rounded text-[#131B2E] border border-[#BAC7E1]/50">
            <Landmark className="w-4 h-4 text-[#D97706]" />
            <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
              GOVERNMENT ALLOTMENTS & STATUTORY ADVANTAGE
            </span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#131B2E] font-bold">
            Institutional State Development Allotment Matrix
          </h2>
          
          <p className="font-sans text-xs md:text-sm text-[#44474C] leading-relaxed">
            Direct bureaucratic and policy advisory for industrial plot acquisition via sovereign state corporations. We navigate single-window systems, policy incentives, and statutory possession across all key growth states.
          </p>
        </div>

        {/* Institutional Matrix Table */}
        <div className="overflow-x-auto rounded border border-[#CBD5E1] shadow-sm">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#0B192C] text-white font-technical text-[10px] md:text-[11px] uppercase tracking-wider">
                <th className="p-4">Authority Name</th>
                <th className="p-4">State & Corridor</th>
                <th className="p-4">Strategic Asset Focus</th>
                <th className="p-4">Growthland Advisory Scope</th>
                <th className="p-4 text-center">Mandate Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="font-sans text-xs text-[#131B2E] divide-y divide-[#E2E7FF] bg-white">
              {STATE_AUTHORITIES.map((auth) => (
                <tr key={auth.id} className="hover:bg-[#F2F3FF] transition-colors">
                  
                  {/* Authority Info */}
                  <td className="p-4 align-top">
                    <span className="font-bold text-sm text-[#0B192C] block font-sans">
                      {auth.code}
                    </span>
                    <span className="text-[#44474C] font-technical text-[10px] block leading-tight mt-0.5">
                      {auth.fullName}
                    </span>
                  </td>

                  {/* State & Corridor */}
                  <td className="p-4 align-top">
                    <strong className="block text-gray-900">{auth.state}</strong>
                    <span className="text-gray-500 text-[11px] block mt-0.5">
                      {auth.nodes.slice(0, 3).join(', ')}
                    </span>
                  </td>

                  {/* Strategic Asset Focus */}
                  <td className="p-4 align-top max-w-[220px]">
                    <span className="px-2 py-0.5 bg-[#EAEDFF] text-[#1E3E62] rounded font-technical text-[9px] uppercase font-bold inline-block mb-1">
                      {auth.focusCategory}
                    </span>
                    <span className="block text-gray-700 text-[11px] leading-tight">
                      {auth.strategicFocus}
                    </span>
                  </td>

                  {/* Growthland Scope */}
                  <td className="p-4 align-top max-w-[240px] text-gray-600 text-[11px]">
                    <p className="line-clamp-2 leading-relaxed">
                      {auth.growthlandScope.join(' • ')}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="p-4 align-top text-center">
                    <span className="inline-flex items-center gap-1 font-technical text-[10px] text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded font-bold uppercase border border-[#D97706]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
                      {auth.schemeStatus}
                    </span>
                    <span className="font-technical text-[9px] text-gray-400 block mt-1">
                      {auth.annualLandVolume.split(' ')[0]} acres/yr
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 align-top text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedAuth(auth)}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 text-[#0B192C] border border-gray-300 rounded font-technical text-[10px] font-bold"
                        title="View DPR Checklist"
                      >
                        Checklist
                      </button>
                      <button
                        onClick={() => downloadSampleDPR(auth)}
                        className="p-1.5 bg-[#EAEDFF] hover:bg-[#DAE2FD] text-[#0B192C] rounded border border-[#BAC7E1]"
                        title="Download Authority Dossier Guidelines"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statutory Callout Banner */}
        <div className="p-6 bg-[#EAEDFF] rounded border border-[#BAC7E1] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded shadow-sm text-[#0B192C]">
              <FileCheck className="w-7 h-7 text-[#D97706]" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-[#131B2E]">
                Single-Window Clearances & Statutory Land Possession
              </h4>
              <p className="font-sans text-xs text-[#44474C] mt-0.5">
                We safeguard corporate capital against land title disputes, delayed zoning clearances, and allotment cancellations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenVault}
              className="flex-1 md:flex-none px-4 py-2.5 bg-white hover:bg-gray-50 text-[#0B192C] border border-gray-300 rounded font-technical text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-[#D97706]" />
              <span>Browse Allotment Records in Vault</span>
            </button>

            <a
              href="#consultation-desk"
              className="flex-1 md:flex-none px-5 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold transition-all whitespace-nowrap shadow-md text-center"
            >
              Consult Statutory Team
            </a>
          </div>
        </div>

      </div>

      {/* DPR Checklist Modal */}
      {selectedAuth && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in duration-150">
            <div className="bg-[#0B192C] text-white p-5 flex items-start justify-between">
              <div>
                <span className="font-technical text-[10px] uppercase text-[#FFB77D] font-bold">
                  Statutory Submission Roadmap
                </span>
                <h3 className="font-display text-xl font-bold mt-0.5">
                  {selectedAuth.fullName} ({selectedAuth.code})
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuth(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="font-technical text-[10px] text-gray-500 uppercase font-bold block mb-1">
                  Active Corridors & Industrial Nodes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAuth.nodes.map((node) => (
                    <span key={node} className="px-2.5 py-1 bg-[#F2F3FF] text-[#1E3E62] rounded font-technical text-xs font-semibold border border-[#DAE2FD]">
                      {node}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-technical text-[10px] text-gray-500 uppercase font-bold block mb-2">
                  Mandatory Detailed Project Report (DPR) Checklist
                </span>
                <div className="space-y-2">
                  {selectedAuth.dprChecklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                      <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FEF3C7]/40 border border-[#D97706]/30 rounded text-xs text-gray-800">
                <strong>Statutory Advisory Guarantee:</strong> Growthland manages complete liaison from initial application submission to the High-Level Allotment Committee interview and deed registration.
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => downloadSampleDPR(selectedAuth)}
                  className="px-3.5 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Blueprint</span>
                </button>

                <a
                  href="#consultation-desk"
                  onClick={() => {
                    setSelectedAuth(null);
                    onRequestAllotment(selectedAuth.code);
                  }}
                  className="px-5 py-2 bg-[#0B192C] text-white rounded font-technical text-xs font-bold hover:bg-[#1E3E62] transition-colors"
                >
                  Initiate Allotment Mandate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
