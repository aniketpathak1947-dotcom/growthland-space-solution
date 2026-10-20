import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Trash2, 
  Eye, 
  Lock, 
  ShieldCheck, 
  Activity, 
  Filter, 
  Building2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import { useAuth } from '../../context/AuthContext';
import { VaultDocument, DocumentCategory, ConfidentialityLevel } from '../../types';
import { DocumentViewerModal } from './DocumentViewerModal';
import { ShareLinkModal } from './ShareLinkModal';
import { FileUploadModal } from './FileUploadModal';

interface DocumentVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUserManagement: () => void;
}

export const DocumentVaultModal: React.FC<DocumentVaultModalProps> = ({
  isOpen,
  onClose,
  onOpenUserManagement,
}) => {
  const {
    filteredDocuments,
    auditLogs,
    downloadDocument,
    deleteDocument,
    activeFilterCategory,
    setActiveFilterCategory,
    activeFilterConfidentiality,
    setActiveFilterConfidentiality,
    searchQuery,
    setSearchQuery,
  } = useDocuments();

  const { currentUser, isSuperAdmin, canUpload } = useAuth();

  const [activeTab, setActiveTab] = useState<'documents' | 'audit_logs'>('documents');
  const [selectedDocForView, setSelectedDocForView] = useState<VaultDocument | null>(null);
  const [selectedDocForShare, setSelectedDocForShare] = useState<VaultDocument | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  if (!isOpen) return null;

  const categories: { label: string; value: DocumentCategory | 'all' }[] = [
    { label: 'All Files', value: 'all' },
    { label: 'Statutory Allotments', value: 'statutory_allotment' },
    { label: 'Corporate Leases', value: 'corporate_lease' },
    { label: 'Land Title Deeds', value: 'land_title_deed' },
    { label: 'Technical Due Diligence', value: 'technical_due_diligence' },
    { label: 'Financial Models', value: 'financial_model' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-gray-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Deal Room Header */}
        <div className="bg-[#0B192C] text-white p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D97706]/20 text-[#FFB77D] rounded border border-[#D97706]/30">
              <Lock className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Growthland Institutional Deal Room & Document Vault
                </h2>
                <span className="hidden sm:inline px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded font-technical text-[9px] uppercase font-bold">
                  AES-256 Encrypted
                </span>
              </div>
              <p className="text-xs text-gray-400 font-technical uppercase tracking-wider mt-0.5">
                Pan-India Real Estate Dossiers • 30-Yr Land Searches • State Allotment Deeds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded font-technical text-xs tracking-wider transition-all shadow"
            >
              <Upload className="w-4 h-4" />
              <span>UPLOAD DOSSIER</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="bg-[#F2F3FF] p-4 border-b border-[#DAE2FD] flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded font-technical text-xs font-bold transition-all ${
                activeTab === 'documents'
                  ? 'bg-[#0B192C] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#D97706]" />
              <span>DOCUMENTS REPOSITORY ({filteredDocuments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded font-technical text-xs font-bold transition-all ${
                activeTab === 'audit_logs'
                  ? 'bg-[#0B192C] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>AUDIT TRAIL ({auditLogs.length})</span>
            </button>
          </div>

          {/* Search Input & Confidentiality Filter */}
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, authority, corridor, or file name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-8 pr-3 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
              />
            </div>

            <select
              value={activeFilterConfidentiality}
              onChange={(e) => setActiveFilterConfidentiality(e.target.value as ConfidentialityLevel | 'all')}
              className="h-9 px-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="all">Security: All</option>
              <option value="client_confidential">Client Confidential</option>
              <option value="board_restricted">Board Restricted</option>
              <option value="sovereign_nda">Sovereign NDA</option>
            </select>
          </div>

        </div>

        {/* Category Pills (Visible when in documents tab) */}
        {activeTab === 'documents' && (
          <div className="px-4 py-2 bg-white border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilterCategory(cat.value)}
                className={`px-3 py-1 rounded font-technical text-[10px] font-bold uppercase whitespace-nowrap transition-all ${
                  activeFilterCategory === cat.value
                    ? 'bg-[#EAEDFF] text-[#0B192C] border border-[#BAC7E1]'
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {activeTab === 'documents' ? (
            filteredDocuments.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded border border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mb-2" />
                <h4 className="font-sans text-sm font-bold text-gray-800">
                  No documents found matching criteria
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1">
                  Adjust your search or category filters, or upload a new dossier into this corridor.
                </p>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="mt-3 px-4 py-2 bg-[#0B192C] text-white rounded font-technical text-xs font-bold"
                >
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white p-5 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Chips */}
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-[#EAEDFF] text-[#1E3E62] rounded font-technical text-[9px] uppercase font-bold border border-[#BAC7E1]">
                          {doc.corridorOrAuthority}
                        </span>

                        <span className={`px-2 py-0.5 rounded font-technical text-[9px] uppercase font-bold ${
                          doc.confidentiality === 'board_restricted'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : doc.confidentiality === 'sovereign_nda'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {doc.confidentiality.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-sm font-bold text-gray-900 group-hover:text-[#1E3E62] transition-colors line-clamp-2 leading-snug">
                        {doc.title}
                      </h3>

                      <p className="font-sans text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>

                      {/* Technical Meta strip */}
                      <div className="mt-3 p-2.5 bg-gray-50 rounded border border-gray-200 flex items-center justify-between text-[11px] font-technical text-gray-600">
                        <span className="font-mono text-gray-700">{doc.fileName}</span>
                        <span className="font-bold">{doc.fileSize}</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="text-[10px] text-gray-500 font-technical">
                        <span>By {doc.uploadedBy.name}</span>
                        <span className="block text-[9px] text-gray-400">{doc.uploadedAt}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedDocForView(doc)}
                          className="px-2.5 py-1.5 bg-gray-100 hover:bg-[#F2F3FF] text-[#0B192C] rounded font-technical text-[10px] font-bold flex items-center gap-1 border border-gray-200"
                          title="Preview Document with Watermark"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#1E3E62]" />
                          <span>Preview</span>
                        </button>

                        <button
                          onClick={() => setSelectedDocForShare(doc)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200"
                          title="Generate Share Link"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
                        </button>

                        <button
                          onClick={() => downloadDocument(doc.id)}
                          className="px-2.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-[10px] font-bold flex items-center gap-1 shadow-sm"
                          title="Download Document"
                        >
                          <Download className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>Download</span>
                        </button>

                        {isSuperAdmin && (
                          <button
                            onClick={() => {
                              if (confirm(`Purge "${doc.title}" from vault?`)) {
                                deleteDocument(doc.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Purge Document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Audit Log View */
            <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-xs font-bold text-gray-900 uppercase tracking-wider font-technical">
                    Cryptographic System Access & Compliance Logs
                  </h3>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                    Immutable event records tracking all vault logins, downloads, and transmissions.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-technical font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tamper-Evident Active Log</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white font-technical text-[9px] uppercase">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Event Type</th>
                      <th className="p-3">User & Organization</th>
                      <th className="p-3">Details</th>
                      <th className="p-3 text-right">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-sans">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="p-3 font-technical text-[10px] text-gray-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-technical text-[9px] font-bold uppercase ${
                            log.action === 'UPLOAD'
                              ? 'bg-amber-100 text-amber-900'
                              : log.action === 'DOWNLOAD'
                              ? 'bg-blue-100 text-blue-900'
                              : log.action === 'LOGIN'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-gray-900 whitespace-nowrap">
                          {log.userName}
                          <span className="block text-[10px] text-gray-500 font-technical">{log.userRole}</span>
                        </td>
                        <td className="p-3 text-gray-700 text-xs">
                          {log.details}
                        </td>
                        <td className="p-3 text-right font-mono text-[10px] text-gray-500 whitespace-nowrap">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#0B192C] text-gray-400 px-6 py-2.5 flex items-center justify-between text-xs font-technical border-t border-white/10">
          <div className="flex items-center gap-3">
            <span>Active Session: <strong>{currentUser?.name || 'Visitor'}</strong></span>
            <span>•</span>
            <span>Role: <strong className="text-[#FFB77D] uppercase">{currentUser?.role.replace('_', ' ') || 'Guest'}</strong></span>
          </div>

          <button
            onClick={onOpenUserManagement}
            className="text-xs text-white hover:text-[#FFB77D] font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>User Account Permissions & Security</span>
            <span>→</span>
          </button>
        </div>

      </div>

      {/* Sub-modals */}
      <DocumentViewerModal
        document={selectedDocForView}
        onClose={() => setSelectedDocForView(null)}
        onShare={(doc) => {
          setSelectedDocForView(null);
          setSelectedDocForShare(doc);
        }}
      />

      <ShareLinkModal
        document={selectedDocForShare}
        onClose={() => setSelectedDocForShare(null)}
      />

      <FileUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => {}}
      />

    </div>
  );
};
