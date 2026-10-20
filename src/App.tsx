/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import { WebsiteLinkBanner } from './components/WebsiteLinkBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CorporateNarrative } from './components/CorporateNarrative';
import { PracticeSuites } from './components/PracticeSuites';
import { FeaturedAssets } from './components/FeaturedAssets';
import { AuthorityMatrix } from './components/AuthorityMatrix';
import { StrategicAlliances } from './components/StrategicAlliances';
import { ConsultationDesk } from './components/ConsultationDesk';
import { Footer } from './components/Footer';
import { DocumentVaultModal } from './components/vault/DocumentVaultModal';
import { FileUploadModal } from './components/vault/FileUploadModal';
import { AuthModal } from './components/auth/AuthModal';
import { UserManagementModal } from './components/auth/UserManagementModal';
import { CallBackFloatingButton } from './components/CallBackFloatingButton';

export default function App() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  
  // Prefill state for Consultation Desk when triggered from asset or authority
  const [consultationPreload, setConsultationPreload] = useState<{
    mandateType?: string;
    corridor?: string;
  }>({});

  const handleRequestDueDiligence = (assetTitle: string) => {
    // Open the vault directly where the due diligence memo is ready, or prefill consultation desk
    setIsVaultOpen(true);
  };

  const handleRequestAllotment = (authorityCode: string) => {
    setConsultationPreload({
      mandateType: `Government Industrial Land Allotment (${authorityCode})`,
    });
    const el = document.getElementById('consultation-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <DocumentProvider>
        <div className="min-h-screen bg-[#FAF8FF] text-[#131B2E] flex flex-col font-sans selection:bg-[#BAC7E1] selection:text-[#0B192C]">
          
          {/* Official Website Shareable Link Utility Bar */}
          <WebsiteLinkBanner onOpenVault={() => setIsVaultOpen(true)} />

          {/* Institutional Header & Navigation */}
          <Header
            onOpenVault={() => setIsVaultOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenUserManagement={() => setIsUserManagementOpen(true)}
            onOpenUpload={() => setIsUploadOpen(true)}
          />

          {/* Main Architectural Sections */}
          <main className="flex-1 flex flex-col w-full">
            
            {/* Section 1: Hero Section */}
            <HeroSection
              onOpenVault={() => setIsVaultOpen(true)}
              onOpenConsultation={() => {
                const el = document.getElementById('consultation-desk');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 2: Corporate Narrative & Sovereign Precision */}
            <CorporateNarrative />

            {/* Section 3: Core Capabilities & Practice Suites (6-Grid Suite) */}
            <PracticeSuites
              onOpenConsultation={() => {
                const el = document.getElementById('consultation-desk');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 4: Featured Assets & Strategic Corridors */}
            <FeaturedAssets
              onOpenVault={() => setIsVaultOpen(true)}
              onRequestDueDiligence={handleRequestDueDiligence}
            />

            {/* Section 5: Regulatory & State Industrial Authority Allotment Matrix */}
            <AuthorityMatrix
              onOpenVault={() => setIsVaultOpen(true)}
              onRequestAllotment={handleRequestAllotment}
            />

            {/* Section 6 & 7: Why Partner & Strategic Alliances */}
            <StrategicAlliances />

            {/* Section 8: Founder Aniket Pathak & Executive Consultation Desk */}
            <ConsultationDesk
              initialMandateType={consultationPreload.mandateType}
              initialCorridor={consultationPreload.corridor}
            />

          </main>

          {/* Institutional Footer */}
          <Footer />

          {/* Deal Room Modals */}
          <DocumentVaultModal
            isOpen={isVaultOpen}
            onClose={() => setIsVaultOpen(false)}
            onOpenUserManagement={() => {
              setIsVaultOpen(false);
              setIsUserManagementOpen(true);
            }}
          />

          <FileUploadModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onSuccess={() => setIsVaultOpen(true)}
          />

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />

          <UserManagementModal
            isOpen={isUserManagementOpen}
            onClose={() => setIsUserManagementOpen(false)}
          />

          {/* Quick Floating Call Back Button for Instant Enquiry */}
          <CallBackFloatingButton />

        </div>
      </DocumentProvider>
    </AuthProvider>
  );
}
