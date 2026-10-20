export type UserRole = 'super_admin' | 'corporate_client' | 'investor_pe' | 'legal_auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  organization: string;
  phone?: string;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  permissions: {
    canUpload: boolean;
    canDownload: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canAccessBoardDocs: boolean;
  };
}

export type DocumentCategory = 
  | 'statutory_allotment'
  | 'corporate_lease'
  | 'land_title_deed'
  | 'technical_due_diligence'
  | 'financial_model'
  | 'dpr_dossier'
  | 'environmental_noc';

export type ConfidentialityLevel = 
  | 'public' 
  | 'client_confidential' 
  | 'board_restricted' 
  | 'sovereign_nda';

export interface VaultDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string; // e.g., "4.8 MB"
  fileType: 'pdf' | 'dwg' | 'xlsx' | 'docx' | 'zip';
  category: DocumentCategory;
  confidentiality: ConfidentialityLevel;
  corridorOrAuthority: string; // e.g. "HSIIDC Manesar", "NCR Cyber City", "MIDC Chakan"
  uploadedBy: {
    name: string;
    role: string;
    id: string;
  };
  uploadedAt: string;
  version: string;
  sha256Checksum: string;
  downloadsCount: number;
  description: string;
  contentSnippet?: string;
  pageCount?: number;
}

export interface DocumentShareLink {
  id: string;
  documentId: string;
  documentTitle: string;
  token: string;
  expiresAt: string;
  requirePasscode: boolean;
  passcode?: string;
  accessCount: number;
  maxAccess?: number;
  createdAt: string;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  action: 'LOGIN' | 'LOGOUT' | 'UPLOAD' | 'DOWNLOAD' | 'SHARE_LINK_GEN' | 'DELETE' | 'USER_CREATE' | 'USER_UPDATE';
  userId: string;
  userName: string;
  userRole: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface RealEstateAsset {
  id: string;
  title: string;
  location: string;
  subLocation: string;
  corridor: string;
  type: 'commercial_grade_a' | 'multimodal_logistics' | 'manufacturing_land' | 'mega_aggregation';
  typeLabel: string;
  certification: string;
  imageUrl: string;
  specs: {
    floorPlateOrAcreage: string;
    clearHeight: string;
    powerOrLoading: string;
    dockApronOrDG: string;
  };
  authorityClearance: string;
  status: 'Ready to Lease' | 'Under Development' | 'Off-Market Sourcing' | 'Statutory Clearance In Progress';
  description: string;
  keyHighlights: string[];
}

export interface StateAuthority {
  id: string;
  code: string;
  fullName: string;
  state: string;
  corridor: string;
  nodes: string[];
  strategicFocus: string;
  focusCategory: string;
  growthlandScope: string[];
  schemeStatus: 'Open Schemes' | 'Priority Allotments' | 'High Velocity' | 'Strategic Intake';
  annualLandVolume: string;
  dprChecklist: string[];
}
