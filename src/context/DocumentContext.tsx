import React, { createContext, useContext, useState, useEffect } from 'react';
import { VaultDocument, DocumentShareLink, AuditLog, DocumentCategory, ConfidentialityLevel } from '../types';
import { INITIAL_DOCUMENTS, INITIAL_AUDIT_LOGS } from '../data/initialData';
import { useAuth } from './AuthContext';

interface DocumentContextType {
  documents: VaultDocument[];
  auditLogs: AuditLog[];
  shareLinks: DocumentShareLink[];
  uploadDocument: (fileData: {
    title: string;
    fileName: string;
    fileSize: string;
    fileType: VaultDocument['fileType'];
    category: DocumentCategory;
    confidentiality: ConfidentialityLevel;
    corridorOrAuthority: string;
    description: string;
    contentSnippet?: string;
  }) => VaultDocument;
  downloadDocument: (docId: string) => void;
  deleteDocument: (docId: string) => boolean;
  createShareLink: (docId: string, expiryHours: number, passcode?: string) => DocumentShareLink;
  getShareLink: (token: string) => DocumentShareLink | undefined;
  activeFilterCategory: DocumentCategory | 'all';
  setActiveFilterCategory: (cat: DocumentCategory | 'all') => void;
  activeFilterConfidentiality: ConfidentialityLevel | 'all';
  setActiveFilterConfidentiality: (lvl: ConfidentialityLevel | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredDocuments: VaultDocument[];
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isSuperAdmin } = useAuth();

  const [documents, setDocuments] = useState<VaultDocument[]>(() => {
    const saved = localStorage.getItem('growthland_vault_docs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DOCUMENTS;
      }
    }
    return INITIAL_DOCUMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('growthland_audit_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_AUDIT_LOGS;
      }
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [shareLinks, setShareLinks] = useState<DocumentShareLink[]>(() => {
    const saved = localStorage.getItem('growthland_share_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeFilterCategory, setActiveFilterCategory] = useState<DocumentCategory | 'all'>('all');
  const [activeFilterConfidentiality, setActiveFilterConfidentiality] = useState<ConfidentialityLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('growthland_vault_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('growthland_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('growthland_share_links', JSON.stringify(shareLinks));
  }, [shareLinks]);

  const addAuditLog = (action: AuditLog['action'], details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      userId: currentUser?.id || 'anonymous',
      userName: currentUser?.name || 'Anonymous Visitor',
      userRole: currentUser?.roleTitle || 'Visitor',
      details,
      ipAddress: '103.24.188.' + Math.floor(Math.random() * 200 + 10),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const uploadDocument = (fileData: {
    title: string;
    fileName: string;
    fileSize: string;
    fileType: VaultDocument['fileType'];
    category: DocumentCategory;
    confidentiality: ConfidentialityLevel;
    corridorOrAuthority: string;
    description: string;
    contentSnippet?: string;
  }): VaultDocument => {
    // Generate pseudo-SHA256
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      title: fileData.title,
      fileName: fileData.fileName,
      fileSize: fileData.fileSize,
      fileType: fileData.fileType,
      category: fileData.category,
      confidentiality: fileData.confidentiality,
      corridorOrAuthority: fileData.corridorOrAuthority,
      uploadedBy: {
        name: currentUser?.name || 'Authorized Consultant',
        role: currentUser?.roleTitle || 'Institutional Desk',
        id: currentUser?.id || 'sys',
      },
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
      version: 'v1.0 Registered',
      sha256Checksum: randomHex,
      downloadsCount: 0,
      description: fileData.description,
      contentSnippet: fileData.contentSnippet || `INSTITUTIONAL DOSSIER: Certified filed under Growthland Space Solution advisory vault for ${fileData.corridorOrAuthority}. Validated unencumbered status and statutory compliance.`,
      pageCount: Math.floor(Math.random() * 40) + 12,
    };

    setDocuments(prev => [newDoc, ...prev]);
    addAuditLog('UPLOAD', `Uploaded document: "${newDoc.title}" (${newDoc.fileSize}) [Security: ${newDoc.confidentiality}]`);
    return newDoc;
  };

  const downloadDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    // Increment downloads count
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, downloadsCount: d.downloadsCount + 1 } : d));
    addAuditLog('DOWNLOAD', `Downloaded file: "${doc.fileName}" (${doc.fileSize})`);

    // Create a real text file download for the user
    const content = `========================================================================
GROWTHLAND SPACE SOLUTION PRIVATE LIMITED
PAN-INDIA INDUSTRIAL & COMMERCIAL REAL ESTATE ADVISORY
CONFIDENTIAL CLIENT & INVESTOR DEAL ROOM
========================================================================

DOCUMENT TITLE: ${doc.title}
FILE NAME:      ${doc.fileName}
SECURITY LEVEL: ${doc.confidentiality.toUpperCase()}
CATEGORY:       ${doc.category.toUpperCase()}
CORRIDOR:       ${doc.corridorOrAuthority}
VERSION:        ${doc.version}
CHECKSUM SHA256:${doc.sha256Checksum}
UPLOADED BY:    ${doc.uploadedBy.name} (${doc.uploadedBy.role})
UPLOAD DATE:    ${doc.uploadedAt}

LEAD ADVISORY DESK:
Aniket Pathak | Founder & Managing Director
Direct Helpline: +91 8178030187
Email: pathak.aniket@growthlandspace.com
Corporate Portal: www.growthland.in

------------------------------------------------------------------------
EXECUTIVE BRIEF & STATUTORY SUMMARY:
${doc.description}

SNIPPET CONTENT:
${doc.contentSnippet}

------------------------------------------------------------------------
NOTICE OF CONFIDENTIALITY:
The information contained in this dossier is legally privileged and strictly
confidential under Non-Disclosure Agreement (NDA) with Growthland Space
Solution Private Limited. Unauthorized reproduction, transmission, or
dissemination without express written authorization of Aniket Pathak is
prohibited.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.fileName.endsWith('.pdf') ? doc.fileName.replace('.pdf', '_MEMO.txt') : `${doc.fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const deleteDocument = (docId: string): boolean => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return false;

    if (!isSuperAdmin && currentUser?.id !== doc.uploadedBy.id) {
      alert('Only the Lead Administrator or the document uploader can delete this record.');
      return false;
    }

    setDocuments(prev => prev.filter(d => d.id !== docId));
    addAuditLog('DELETE', `Purged document: "${doc.title}" (ID: ${docId})`);
    return true;
  };

  const createShareLink = (docId: string, expiryHours: number, passcode?: string): DocumentShareLink => {
    const doc = documents.find(d => d.id === docId);
    const token = `gss-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`;
    const expiresAt = new Date(Date.now() + expiryHours * 3600 * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    const newLink: DocumentShareLink = {
      id: `link-${Date.now()}`,
      documentId: docId,
      documentTitle: doc?.title || 'Confidential Document',
      token,
      expiresAt,
      requirePasscode: !!passcode,
      passcode,
      accessCount: 0,
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      createdBy: currentUser?.name || 'Aniket Pathak',
    };

    setShareLinks(prev => [newLink, ...prev]);
    addAuditLog('SHARE_LINK_GEN', `Generated secure share link for "${doc?.fileName}" expiring in ${expiryHours}h.`);
    return newLink;
  };

  const getShareLink = (token: string) => {
    return shareLinks.find(l => l.token === token);
  };

  // Filtered documents
  const filteredDocuments = documents.filter(doc => {
    // Role based access restrictions
    if (doc.confidentiality === 'board_restricted' && !currentUser?.permissions.canAccessBoardDocs && !isSuperAdmin) {
      return false;
    }
    if (doc.confidentiality === 'sovereign_nda' && !isSuperAdmin && currentUser?.role !== 'legal_auditor') {
      return false;
    }

    // Category filter
    if (activeFilterCategory !== 'all' && doc.category !== activeFilterCategory) {
      return false;
    }

    // Confidentiality filter
    if (activeFilterConfidentiality !== 'all' && doc.confidentiality !== activeFilterConfidentiality) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchCorridor = doc.corridorOrAuthority.toLowerCase().includes(q);
      const matchFile = doc.fileName.toLowerCase().includes(q);
      const matchDesc = doc.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCorridor && !matchFile && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  return (
    <DocumentContext.Provider
      value={{
        documents,
        auditLogs,
        shareLinks,
        uploadDocument,
        downloadDocument,
        deleteDocument,
        createShareLink,
        getShareLink,
        activeFilterCategory,
        setActiveFilterCategory,
        activeFilterConfidentiality,
        setActiveFilterConfidentiality,
        searchQuery,
        setSearchQuery,
        filteredDocuments,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
