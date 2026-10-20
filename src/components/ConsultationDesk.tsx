import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Send, 
  CheckCircle2, 
  UserCheck, 
  Building2, 
  Calendar,
  Linkedin,
  Clock,
  PhoneCall,
  ExternalLink,
  MessageSquare,
  Users,
  Camera,
  UploadCloud,
  Milestone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';

interface ConsultationDeskProps {
  initialMandateType?: string;
  initialCorridor?: string;
}

export const ConsultationDesk: React.FC<ConsultationDeskProps> = ({
  initialMandateType,
  initialCorridor,
}) => {
  const { uploadDocument } = useDocuments();

  // Full mandate form state
  const [formData, setFormData] = useState({
    corporateName: '',
    repName: '',
    email: '',
    phone: '',
    mandateType: initialMandateType || 'Government Land Allotment (State Authorities)',
    targetCorridor: initialCorridor || 'Delhi NCR',
    scope: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Quick Call Back Column State
  const [callBackData, setCallBackData] = useState({
    name: '',
    phone: '',
    timeSlot: 'Within 15 Minutes (Immediate)',
    corridor: 'Delhi NCR',
    enquiryTopic: 'Warehouse Leasing',
  });
  const [callBackSubmitted, setCallBackSubmitted] = useState(false);

  // Interactive Leadership Team & Our Journey toggle state
  const [showLeadershipAndJourney, setShowLeadershipAndJourney] = useState(false);
  const [aniketPhoto, setAniketPhoto] = useState<string | null>(null);
  const [jagdishPhoto, setJagdishPhoto] = useState<string | null>(null);

  // Check URL hash on load or hash change to auto-open if #leadership-team, #our-journey, or #leadership-and-journey-section is targeted
  useEffect(() => {
    const handleHashCheck = () => {
      if (
        window.location.hash === '#leadership-team' || 
        window.location.hash === '#our-journey' ||
        window.location.hash === '#leadership-and-journey-section'
      ) {
        setShowLeadershipAndJourney(true);
        const el = document.getElementById('leadership-and-journey-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, leader: 'aniket' | 'jagdish') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (leader === 'aniket') setAniketPhoto(event.target.result as string);
          else setJagdishPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp Direct Advisory Payload
    const message = 
      `*NEW INSTITUTIONAL MANDATE - GROWTHLAND SPACE SOLUTION*\n\n` +
      `*Entity:* ${formData.corporateName}\n` +
      `*Representative:* ${formData.repName}\n` +
      `*Official Email:* ${formData.email}\n` +
      `*Direct Phone:* ${formData.phone}\n` +
      `*Mandate:* ${formData.mandateType}\n` +
      `*Target Corridor:* ${formData.targetCorridor}\n` +
      `*Scope Details:* ${formData.scope || 'Direct Briefing Requested'}\n\n` +
      `_Transmitted to Lead Desk Aniket Pathak (+91 8178030187)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918178030187?text=${encodedMessage}`;

    uploadDocument({
      title: `Mandate Brief: ${formData.corporateName} - ${formData.targetCorridor}`,
      fileName: `Mandate_${formData.corporateName.replace(/\s+/g, '_')}_${Date.now().toString(36)}.pdf`,
      fileSize: '1.2 MB',
      fileType: 'pdf',
      category: 'corporate_lease',
      confidentiality: 'client_confidential',
      corridorOrAuthority: formData.targetCorridor,
      description: `Institutional mandate submission from ${formData.repName} (${formData.corporateName}). Classification: ${formData.mandateType}. Scope: ${formData.scope || 'Full Advisory Representation requested.'}`,
      contentSnippet: `CLIENT MANDATE RECORD: Organization: ${formData.corporateName}. Authorized Officer: ${formData.repName}. Official Email: ${formData.email}. Phone: ${formData.phone}. Advisory Mandate: ${formData.mandateType}. Status: Active in Intake Queue.`,
    });

    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const handleCallBackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callBackData.phone) return;

    const message = 
      `*URGENT CALL BACK REQUEST - GROWTHLAND SPACE SOLUTION*\n\n` +
      `*Caller Name:* ${callBackData.name || 'Executive Enquirer'}\n` +
      `*Contact Phone:* ${callBackData.phone}\n` +
      `*Preferred Slot:* ${callBackData.timeSlot}\n` +
      `*Corridor:* ${callBackData.corridor}\n` +
      `*Enquiry Type:* ${callBackData.enquiryTopic}\n\n` +
      `_Dispatched to Aniket Pathak Helpline (+91 8178030187)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918178030187?text=${encodedMessage}`;

    uploadDocument({
      title: `Call Back Request: ${callBackData.name || 'Enquiry'} (${callBackData.corridor})`,
      fileName: `CallBack_${callBackData.phone.replace(/[^0-9]/g, '')}_${Date.now().toString(36)}.pdf`,
      fileSize: '0.4 MB',
      fileType: 'pdf',
      category: 'corporate_lease',
      confidentiality: 'client_confidential',
      corridorOrAuthority: callBackData.corridor,
      description: `Call back request for ${callBackData.enquiryTopic} in ${callBackData.corridor}. Contact: ${callBackData.phone}. Slot: ${callBackData.timeSlot}.`,
      contentSnippet: `CALL BACK LOG: Phone: ${callBackData.phone}. Caller: ${callBackData.name}. Requested Time: ${callBackData.timeSlot}. Topic: ${callBackData.enquiryTopic}. Route to Aniket Pathak desk.`,
    });

    setCallBackSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <section id="consultation-desk" className="w-full bg-[#0B192C] text-white py-16 md:py-24 px-4 md:px-8 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        
        {/* Main Grid: Founder Profile & Mandate Briefing Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Founder & Managing Director Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6 pr-0 lg:pr-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded text-[#FFB77D] border border-white/10">
                <UserCheck className="w-4 h-4 text-[#D97706]" />
                <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest font-bold">
                  FOUNDER & LEAD CONSULTANT DESK
                </span>
              </div>

              {/* Instant Link Button to Open Leadership Team & Our Journey */}
              <button
                onClick={() => {
                  setShowLeadershipAndJourney(!showLeadershipAndJourney);
                  if (!showLeadershipAndJourney) {
                    setTimeout(() => {
                      document.getElementById('leadership-and-journey-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D97706]/20 hover:bg-[#D97706]/30 text-[#FFB77D] border border-[#D97706]/40 rounded font-technical text-[10px] uppercase font-bold tracking-wider transition-all"
                title="Click to open Leadership Team & Our Journey"
              >
                <Users className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{showLeadershipAndJourney ? 'Hide Leadership Team' : 'Open Leadership & Journey'}</span>
                {showLeadershipAndJourney ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Aniket Pathak
              </h2>
              <span className="font-sans text-lg text-[#FFB77D] font-bold block">
                Founder & Managing Director
              </span>
              <span className="font-sans text-xs sm:text-sm text-gray-300 block">
                Industrial Real Estate Specialist & Government Statutory Allotment Expert
              </span>
            </div>

            <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
              Guiding sovereign enterprises, global 3PL operators, and multinational manufacturers through high-stake capital acquisitions, strategic leasing mandates, and statutory authority allotments across Pan-India economic corridors.
            </p>

            {/* Direct Verified Contact Points */}
            <div className="space-y-3 pt-1">
              
              {/* Phone with 8178030187 */}
              <a
                href="tel:+918178030187"
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors group"
              >
                <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-technical text-[9px] uppercase text-gray-400 font-bold">
                    Direct Advisory Line / WhatsApp
                  </span>
                  <span className="font-sans text-sm font-bold text-white group-hover:text-[#FFB77D]">
                    +91 8178030187
                  </span>
                </div>
              </a>

              {/* Direct Executive Mail */}
              <a
                href="mailto:info@growthlandspace.com"
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors group"
              >
                <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-technical text-[9px] uppercase text-gray-400 font-bold">
                    Direct Executive Mail
                  </span>
                  <span className="font-sans text-sm font-bold text-white group-hover:text-[#FFB77D]">
                    info@growthlandspace.com
                  </span>
                </div>
              </a>

              {/* Official Corporate Portal */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/10">
                <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-technical text-[9px] uppercase text-gray-400 font-bold">
                    Official Corporate Portal
                  </span>
                  <span className="font-sans text-sm font-bold text-white">
                    www.growthland.in
                  </span>
                </div>
              </div>

            </div>

            {/* Connect With Us: LinkedIn and Gmail */}
            <div className="p-4 bg-white/5 rounded-lg border border-[#D97706]/30 space-y-3">
              <span className="font-technical text-[10px] uppercase text-[#FFB77D] font-bold tracking-wider block">
                CONNECT WITH US ON LINKEDIN AND GMAIL
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Updated LinkedIn Button with requested profile www.linkedin.com/in/aniket-pathak-3b2bb0228 */}
                <a
                  href="https://www.linkedin.com/in/aniket-pathak-3b2bb0228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0077B5] hover:bg-[#006097] text-white rounded font-technical text-xs font-bold transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
                </a>

                {/* Direct Gmail Connect without compose form column */}
                <a
                  href="mailto:info@growthlandspace.com?cc=pathak.aniket@growthlandspace.com&subject=Real%20Estate%20Advisory%20Mandate%20-%20Growthland"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#EA4335] hover:bg-[#D93025] text-white rounded font-technical text-xs font-bold transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Connect via Gmail</span>
                  <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
                </a>
              </div>
            </div>

            {/* Compliance & Fiduciary Privacy Banner */}
            <div className="p-4 bg-white/5 rounded border border-white/10 text-gray-300 font-technical text-xs space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <Lock className="w-4 h-4 text-[#D97706]" />
                <span>NDA Protected & Board Level Confidentiality</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-normal">
                Institutional real estate briefs and state allotment filings are handled under strict non-disclosure obligations.
              </p>
            </div>

          </div>

          {/* Right Column: Confidential Mandate Intake Form */}
          <div className="lg:col-span-7 bg-white text-[#131B2E] p-6 sm:p-8 rounded shadow-2xl border border-gray-200">
            <div className="mb-6">
              <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                CONFIDENTIAL BRIEFING DESK
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#131B2E] mt-1">
                Submit Real Estate Mandate or Due Diligence Request
              </h3>
              <p className="font-sans text-xs text-[#44474C] mt-1">
                Connect directly with Aniket Pathak and our strategic desk. Expect formal response within 4 operational hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Enterprise / Corporate Entity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Logistics Ltd."
                    value={formData.corporateName}
                    onChange={(e) => setFormData({ ...formData, corporateName: e.target.value })}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-300 text-sm rounded focus:bg-white focus:outline-none focus:border-[#0B192C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Executive Representative *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name & Designation"
                    value={formData.repName}
                    onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-300 text-sm rounded focus:bg-white focus:outline-none focus:border-[#0B192C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Official Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-300 text-sm rounded focus:bg-white focus:outline-none focus:border-[#0B192C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 81780 30187"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-300 text-sm rounded focus:bg-white focus:outline-none focus:border-[#0B192C] transition-colors"
                  />
                </div>
              </div>

              {/* Mandate Classification & Target Geographic Corridor strictly according to prompt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Mandate Classification *
                  </label>
                  <select
                    value={formData.mandateType}
                    onChange={(e) => setFormData({ ...formData, mandateType: e.target.value })}
                    className="w-full h-11 px-3 bg-gray-50 border border-gray-300 text-xs font-semibold rounded focus:bg-white focus:outline-none focus:border-[#0B192C]"
                  >
                    <option value="Government Land Allotment (State Authorities)">
                      Government Land Allotment (State Authorities)
                    </option>
                    <option value="Grade-A Corporate Workspace / Headquarter Leasing">
                      Grade-A Corporate Workspace / IT Park
                    </option>
                    <option value="Warehouse Leasing">
                      Warehouse Leasing
                    </option>
                    <option value="Large Parcel Strategic Land Aggregation">
                      Large Parcel Land Aggregation (10-100+ Acres)
                    </option>
                    <option value="Industrial Setup">
                      Industrial Setup
                    </option>
                  </select>
                </div>

                {/* Exclusively the 9 requested corridors */}
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Target Geographic Corridor *
                  </label>
                  <select
                    value={formData.targetCorridor}
                    onChange={(e) => setFormData({ ...formData, targetCorridor: e.target.value })}
                    className="w-full h-11 px-3 bg-gray-50 border border-gray-300 text-xs font-semibold rounded focus:bg-white focus:outline-none focus:border-[#0B192C]"
                  >
                    <option value="Delhi NCR">1. Delhi NCR</option>
                    <option value="Mumbai">2. Mumbai</option>
                    <option value="Pune">3. Pune</option>
                    <option value="Bengaluru">4. Bengaluru</option>
                    <option value="Bhiwadi">5. Bhiwadi</option>
                    <option value="Neemrana">6. Neemrana</option>
                    <option value="Chennai">7. Chennai</option>
                    <option value="Coimbatore">8. Coimbatore</option>
                    <option value="Kolkata">9. Kolkata</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                  Brief Requirement Scope & Scale (Sq. Ft. / Acreage / Power Requirement)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify required square footage, ceiling clearances, power load (kVA), expected possession date, or state authority preference..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-xs rounded focus:bg-white focus:outline-none focus:border-[#0B192C]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="font-technical text-[10px] text-gray-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Direct Routing to Aniket Pathak (+91 8178030187)</span>
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-6 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>DISPATCH MANDATE BRIEF</span>
                  <Send className="w-3.5 h-3.5 text-[#D97706]" />
                </button>
              </div>

            </form>

            {/* Success Notification Alert */}
            {submitted && (
              <div className="mt-4 p-4 bg-[#EAEDFF] text-[#131B2E] rounded border border-[#BAC7E1] flex items-start justify-between animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#0B192C]">
                      Mandate Transmitted Successfully & Saved to Deal Room
                    </h4>
                    <p className="font-sans text-[11px] text-[#44474C] mt-0.5">
                      Your brief for <strong>{formData.corporateName}</strong> has been transmitted to Aniket Pathak (+91 8178030187) and registered in the Secure Client Vault.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gray-500 hover:text-black font-bold p-1"
                >
                  ✕
                </button>
              </div>
            )}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* DEDICATED CALL BACK COLUMN FOR ENQUIRY PURPOSE */}
        {/* ========================================================================= */}
        <div id="call-back-enquiry" className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 sm:p-8 rounded-lg border border-white/15 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Call back column info */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D97706]/20 text-[#FFB77D] rounded border border-[#D97706]/30 font-technical text-[10px] uppercase font-bold tracking-wider">
                <PhoneCall className="w-3.5 h-3.5 text-[#D97706]" />
                <span>INSTANT ENQUIRY RESPONSE</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Request an Instant Call Back
              </h3>

              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                Need immediate advisory on warehouse leasing, industrial setup, or land allotments across our 9 Pan-India corridors? Drop your number below and Aniket Pathak’s advisory desk will ring you back.
              </p>

              <div className="flex items-center gap-4 text-xs font-technical text-gray-400 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Direct Advisor Call</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#FFB77D]">
                  <Clock className="w-4 h-4" />
                  <span>Guaranteed Call Window</span>
                </span>
              </div>
            </div>

            {/* Call back quick form */}
            <div className="lg:col-span-7 bg-white text-[#131B2E] p-6 rounded-md shadow-lg border border-gray-200">
              <form onSubmit={handleCallBackSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Chandra"
                      value={callBackData.name}
                      onChange={(e) => setCallBackData({ ...callBackData, name: e.target.value })}
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81780 30187"
                      value={callBackData.phone}
                      onChange={(e) => setCallBackData({ ...callBackData, phone: e.target.value })}
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Preferred Call Time
                    </label>
                    <select
                      value={callBackData.timeSlot}
                      onChange={(e) => setCallBackData({ ...callBackData, timeSlot: e.target.value })}
                      className="w-full h-10 px-2.5 bg-gray-50 border border-gray-300 rounded text-[11px] font-semibold focus:bg-white"
                    >
                      <option value="Within 15 Minutes (Immediate)">Immediate (Next 15 Min)</option>
                      <option value="Morning 10:00 AM - 1:00 PM">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon 2:00 PM - 5:00 PM">Afternoon (2 PM - 5 PM)</option>
                      <option value="Evening 5:00 PM - 8:00 PM">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Target Corridor
                    </label>
                    <select
                      value={callBackData.corridor}
                      onChange={(e) => setCallBackData({ ...callBackData, corridor: e.target.value })}
                      className="w-full h-10 px-2.5 bg-gray-50 border border-gray-300 rounded text-[11px] font-semibold focus:bg-white"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Bhiwadi">Bhiwadi</option>
                      <option value="Neemrana">Neemrana</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Enquiry Purpose
                    </label>
                    <select
                      value={callBackData.enquiryTopic}
                      onChange={(e) => setCallBackData({ ...callBackData, enquiryTopic: e.target.value })}
                      className="w-full h-10 px-2.5 bg-gray-50 border border-gray-300 rounded text-[11px] font-semibold focus:bg-white"
                    >
                      <option value="Warehouse Leasing">Warehouse Leasing</option>
                      <option value="Industrial Setup">Industrial Setup</option>
                      <option value="Government Land Allotment">Govt Allotment</option>
                      <option value="Corporate Space Leasing">Corporate Office</option>
                      <option value="Large Land Sourcing">Land Sourcing</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] font-technical text-gray-500">
                    Routing to Desk: Aniket Pathak (+91 8178030187)
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 h-10 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded font-technical text-xs tracking-wider transition-all shadow flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>REQUEST CALL BACK NOW</span>
                  </button>
                </div>
              </form>

              {callBackSubmitted && (
                <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Call back enquiry queued successfully. Aniket Pathak will connect with you shortly!</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* LEADERSHIP TEAM AND OUR JOURNEY SECTION (EXCLUSIVELY IN FOUNDER DESK) */}
        {/* ========================================================================= */}
        <div id="leadership-and-journey-section" className="pt-6">
          
          {/* Section Expansion Bar / Link Trigger */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#D97706]/20 text-[#FFB77D] rounded border border-[#D97706]/30">
                <Users className="w-5 h-5 text-[#D97706]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Executive Leadership Team & Our Journey
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  Exclusive board governance profile for Aniket Pathak, Jagdish Prasad Gaur, and milestone heritage.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowLeadershipAndJourney(!showLeadershipAndJourney)}
              className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded font-technical text-xs tracking-wider transition-all shadow flex items-center gap-2 whitespace-nowrap"
            >
              <span>{showLeadershipAndJourney ? 'COLLAPSE SECTION' : 'OPEN LEADERSHIP & JOURNEY'}</span>
              {showLeadershipAndJourney ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Conditional View: Expanded when clicked or when targeted via link */}
          {showLeadershipAndJourney && (
            <div className="mt-8 space-y-12 animate-in fade-in slide-in-from-top-4 duration-300">
              
              {/* Subsection 1: Leadership Team */}
              <div id="leadership-team" className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-technical text-[10px] uppercase tracking-widest text-[#FFB77D] font-bold block">
                      EXECUTIVE GOVERNANCE
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                      Leadership Team
                    </h3>
                  </div>
                  <span className="text-[10px] font-technical uppercase text-gray-400 hidden sm:inline-block">
                    Growthland Space Solution Board
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Leader 1: Aniket Pathak */}
                  <div className="bg-white text-[#131B2E] rounded-lg border border-[#BAC7E1] p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-gray-100">
                        
                        {/* Space for Photograph with upload preview support */}
                        <div className="relative group w-32 h-36 rounded-md bg-[#F2F3FF] border-2 border-dashed border-[#BAC7E1] flex flex-col items-center justify-center overflow-hidden shrink-0">
                          {aniketPhoto ? (
                            <img src={aniketPhoto} alt="Aniket Pathak" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-2">
                              <Camera className="w-7 h-7 text-gray-400 mx-auto mb-1 group-hover:text-[#0B192C] transition-colors" />
                              <span className="text-[10px] font-technical uppercase font-bold text-gray-500 block leading-tight">
                                Space for Photo
                              </span>
                              <span className="text-[8px] text-gray-400 block mt-0.5">
                                Aniket Pathak
                              </span>
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-technical font-bold p-1 text-center">
                            <UploadCloud className="w-4 h-4 mb-0.5 text-[#FFB77D]" />
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handlePhotoUpload(e, 'aniket')} 
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Leader 1 Details */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-technical uppercase text-[#D97706] font-bold tracking-wider block">
                            Founder & Managing Director
                          </span>
                          <h4 className="font-display text-2xl font-bold text-[#0B192C]">
                            Aniket Pathak
                          </h4>
                          <p className="font-sans text-xs text-gray-600 leading-relaxed pt-1">
                            Industrial Real Estate Specialist & Government Statutory Allotment Expert guiding enterprise acquisitions across India.
                          </p>
                        </div>
                      </div>

                      <div className="py-4 space-y-2 text-xs font-sans text-gray-700">
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                          <span className="text-gray-500 font-technical text-[11px]">Official Email:</span>
                          <a href="mailto:pathak.aniket@growthlandspace.com" className="font-semibold text-[#0B192C] hover:underline">
                            pathak.aniket@growthlandspace.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-technical text-gray-400 uppercase">
                        Growthland Executive Board
                      </span>
                      <span className="text-xs font-technical text-gray-500 font-semibold">
                        Profile Active
                      </span>
                    </div>
                  </div>

                  {/* Leader 2: Jagdish Prasad Gaur */}
                  <div className="bg-white text-[#131B2E] rounded-lg border border-[#BAC7E1] p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-gray-100">
                        
                        {/* Space for Photograph with upload preview support */}
                        <div className="relative group w-32 h-36 rounded-md bg-[#F2F3FF] border-2 border-dashed border-[#BAC7E1] flex flex-col items-center justify-center overflow-hidden shrink-0">
                          {jagdishPhoto ? (
                            <img src={jagdishPhoto} alt="Jagdish Prasad Gaur" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-2">
                              <Camera className="w-7 h-7 text-gray-400 mx-auto mb-1 group-hover:text-[#0B192C] transition-colors" />
                              <span className="text-[10px] font-technical uppercase font-bold text-gray-500 block leading-tight">
                                Space for Photo
                              </span>
                              <span className="text-[8px] text-gray-400 block mt-0.5">
                                Jagdish Prasad Gaur
                              </span>
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-technical font-bold p-1 text-center">
                            <UploadCloud className="w-4 h-4 mb-0.5 text-[#FFB77D]" />
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handlePhotoUpload(e, 'jagdish')} 
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Leader 2 Details */}
                        <div className="space-y-1">
                          {/* Space kept blank for designation as requested */}
                          <div className="p-1 px-2.5 bg-gray-100 rounded border border-gray-200 inline-block">
                            <span className="text-[10px] font-technical uppercase text-gray-500 font-semibold tracking-wider">
                              [ Space Blank for Designation ]
                            </span>
                          </div>
                          
                          <h4 className="font-display text-2xl font-bold text-[#0B192C]">
                            Jagdish Prasad Gaur
                          </h4>
                          <p className="font-sans text-xs text-gray-500 italic pt-1">
                            Leadership Executive • Growthland Space Solution Advisory
                          </p>
                        </div>
                      </div>

                      <div className="py-4 space-y-2 text-xs font-sans text-gray-700">
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                          <span className="text-gray-500 font-technical text-[11px]">Executive Email:</span>
                          <a href="mailto:jp.gaur@growthlandspace.com" className="font-semibold text-[#0B192C] hover:underline">
                            jp.gaur@growthlandspace.com
                          </a>
                        </div>

                        <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-500 font-sans">
                          Space reserved for designation profile, background summary, and executive mandate domain.
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-technical text-gray-400 uppercase">
                        Growthland Executive Board
                      </span>
                      <span className="text-xs font-technical text-gray-500 font-semibold">
                        Profile Active
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Subsection 2: Our Journey */}
              <div id="our-journey" className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-technical text-[10px] uppercase tracking-widest text-[#FFB77D] font-bold block">
                      MILESTONES & HERITAGE
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                      Our Journey
                    </h3>
                  </div>
                  <span className="text-[10px] font-technical uppercase text-gray-400 hidden sm:inline-block">
                    Corporate Genesis to Pan-India Scale
                  </span>
                </div>

                {/* Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Step 1 */}
                  <div className="p-5 bg-white/5 rounded-lg border border-white/10 hover:border-[#D97706]/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-technical text-xs font-bold text-[#FFB77D]">INCEPTION</span>
                      <span className="text-[10px] font-technical text-gray-400 uppercase">Phase I</span>
                    </div>
                    <h5 className="font-sans text-sm font-bold text-white">
                      Founding Vision & Statutory Foundation
                    </h5>
                    <p className="font-sans text-xs text-gray-300 mt-1 leading-relaxed">
                      Established with a focus on resolving procedural hurdles in state industrial plot allotments and commercial leasing.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-5 bg-white/5 rounded-lg border border-white/10 hover:border-[#D97706]/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-technical text-xs font-bold text-[#FFB77D]">EXPANSION</span>
                      <span className="text-[10px] font-technical text-gray-400 uppercase">Phase II</span>
                    </div>
                    <h5 className="font-sans text-sm font-bold text-white">
                      Key Industrial Hub Aggregation
                    </h5>
                    <p className="font-sans text-xs text-gray-300 mt-1 leading-relaxed">
                      Consolidated multi-acre manufacturing and warehousing corridors across Delhi NCR, Neemrana, Pune, and Bhiwadi.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-5 bg-white/5 rounded-lg border border-white/10 hover:border-[#D97706]/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-technical text-xs font-bold text-[#FFB77D]">INSTITUTIONAL</span>
                      <span className="text-[10px] font-technical text-gray-400 uppercase">Phase III</span>
                    </div>
                    <h5 className="font-sans text-sm font-bold text-white">
                      Tier-1 Logistics & Corporate Leasing
                    </h5>
                    <p className="font-sans text-xs text-gray-300 mt-1 leading-relaxed">
                      Structured high-value Grade-A tech park leasing and automated distribution hubs for global Fortune 500 supply chains.
                    </p>
                  </div>

                  {/* Step 4: Open Free Space */}
                  <div className="p-5 bg-[#D97706]/10 rounded-lg border-2 border-dashed border-[#D97706]/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-technical text-xs font-bold text-[#FFB77D]">FUTURE FRONTIER</span>
                        <span className="text-[10px] font-technical text-[#FFB77D] uppercase">Space Free</span>
                      </div>
                      <h5 className="font-sans text-sm font-bold text-white">
                        [ Space Free to Add Our Journey ]
                      </h5>
                      <p className="font-sans text-xs text-gray-300 mt-1 leading-relaxed">
                        Customizable timeline block ready for company journey narratives, landmark transaction records, and upcoming sovereign announcements.
                      </p>
                    </div>
                    <span className="text-[10px] font-technical text-[#FFB77D] font-bold uppercase mt-3">
                      • Ready to Expand
                    </span>
                  </div>

                </div>

                {/* Free space narrative block */}
                <div className="p-5 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-300 font-sans leading-relaxed">
                  <span className="font-technical text-[10px] uppercase font-bold text-[#FFB77D] block mb-1">
                    CHRONICLE OF GROWTH & EXPANSION
                  </span>
                  From initial single-window clearances with state development corporations (HSIIDC, RIICO, YEIDA, KIADB) to executing comprehensive 30-year title searches, Growthland Space Solution Private Limited continues to expand its transaction presence across India's key economic lifelines.
                  <span className="text-gray-400 italic block mt-1">
                    (Space kept free to insert additional corporate milestones, historical reflections, and expansion highlights.)
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowLeadershipAndJourney(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-technical text-xs transition-colors flex items-center gap-1.5"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Collapse Leadership & Our Journey</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
