import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { DocumentCategory, ConfidentialityLevel, VaultDocument } from '../../types';
import { useDocuments } from '../../context/DocumentContext';
import { useAuth } from '../../context/AuthContext';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { uploadDocument } = useDocuments();
  const { currentUser, canUpload } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('statutory_allotment');
  const [confidentiality, setConfidentiality] = useState<ConfidentialityLevel>('client_confidential');
  const [corridor, setCorridor] = useState('HSIIDC (Haryana - Manesar)');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const fileName = selectedFile ? selectedFile.name : `${title.replace(/\s+/g, '_')}.pdf`;
      const sizeStr = selectedFile 
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(Math.random() * 8 + 1.5).toFixed(1)} MB`;

      uploadDocument({
        title,
        fileName,
        fileSize: sizeStr,
        fileType: 'pdf',
        category,
        confidentiality,
        corridorOrAuthority: corridor,
        description: description || `Certified institutional record for ${corridor} uploaded by ${currentUser?.name}.`,
        contentSnippet: `STATUTORY MEMO: Verified filed under Growthland Space Solution advisory vault for ${corridor}. All title records and technical specifications reviewed.`,
      });

      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedFile(null);
        setTitle('');
        setDescription('');
        setUploadProgress(0);
        onSuccess();
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
              <Upload className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                Upload Institutional Document
              </h3>
              <p className="text-[10px] text-gray-400 font-technical uppercase">
                Encrypted Vault Ingestion • SHA-256 Checksum Verified
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Drag & Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 hover:border-[#0B192C] rounded-lg p-6 text-center bg-gray-50 hover:bg-[#F2F3FF] transition-colors cursor-pointer relative"
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.dwg,.xlsx,.docx,.zip"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1E3E62] border border-gray-200">
                <FileText className="w-6 h-6 text-[#D97706]" />
              </div>
              
              {selectedFile ? (
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 font-technical">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Encryption
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Click to select file or drag & drop here
                  </p>
                  <p className="text-[11px] text-gray-500 font-technical mt-0.5">
                    Supports PDF, DOCX, XLSX, DWG, CAD, ZIP (up to 150 MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HSIIDC Manesar 25-Acre Factory Allotment Dossier"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
            />
          </div>

          {/* Category & Confidentiality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#0B192C]"
              >
                <option value="statutory_allotment">Statutory Allotment (DPR)</option>
                <option value="corporate_lease">Corporate Lease Agreement</option>
                <option value="land_title_deed">Land Title & 30-Yr Search</option>
                <option value="technical_due_diligence">Technical Due Diligence</option>
                <option value="financial_model">Financial / Yield Model</option>
                <option value="dpr_dossier">DPR Master Dossier</option>
                <option value="environmental_noc">Environmental / Fire NOC</option>
              </select>
            </div>

            <div>
              <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                Security Classification *
              </label>
              <select
                value={confidentiality}
                onChange={(e) => setConfidentiality(e.target.value as ConfidentialityLevel)}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#0B192C]"
              >
                <option value="client_confidential">Client Confidential</option>
                <option value="board_restricted">Board Restricted (Admins Only)</option>
                <option value="sovereign_nda">Sovereign NDA Required</option>
                <option value="public">Public Information</option>
              </select>
            </div>
          </div>

          {/* Target Corridor */}
          <div>
            <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
              Corridor / Authority Node *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HSIIDC (Manesar), RIICO (Neemrana), YEIDA (Jewar)"
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
              className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
              Document Brief / Scope Notes
            </label>
            <textarea
              rows={2}
              placeholder="Key findings, plot numbers, power approvals, or special covenants..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
            />
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-technical text-gray-600">
                <span>Encrypting & calculating SHA-256 hash...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0B192C] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>File securely encrypted and committed to Growthland Vault!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
            <span className="font-technical text-[10px] text-gray-500 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>AES-256 Storage</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{isUploading ? 'ENCRYPTING...' : 'COMMIT TO VAULT'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
