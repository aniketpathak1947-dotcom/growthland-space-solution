import React, { useState } from 'react';
import { PhoneCall, X, Clock, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';

export const CallBackFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadDocument } = useDocuments();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('Within 15 Minutes (Immediate)');
  const [corridor, setCorridor] = useState('Delhi NCR');
  const [enquiryTopic, setEnquiryTopic] = useState('Warehouse Leasing');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const message = 
      `*URGENT CALL BACK REQUEST - GROWTHLAND SPACE SOLUTION*\n\n` +
      `*Caller Name:* ${name || 'Executive Enquirer'}\n` +
      `*Phone Number:* ${phone}\n` +
      `*Preferred Slot:* ${timeSlot}\n` +
      `*Target Corridor:* ${corridor}\n` +
      `*Enquiry Topic:* ${enquiryTopic}\n\n` +
      `_Dispatched to Aniket Pathak Helpline (+91 8178030187)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918178030187?text=${encodedMessage}`;

    uploadDocument({
      title: `Urgent Call Back: ${name || 'Visitor'} (${corridor})`,
      fileName: `Quick_CallBack_${phone.replace(/[^0-9]/g, '')}.pdf`,
      fileSize: '0.3 MB',
      fileType: 'pdf',
      category: 'corporate_lease',
      confidentiality: 'client_confidential',
      corridorOrAuthority: corridor,
      description: `Fast callback request via Floating Desk. Topic: ${enquiryTopic}. Preferred Time: ${timeSlot}. Contact: ${phone}.`,
      contentSnippet: `FLOATING CALL BACK: Phone: ${phone}. Name: ${name}. Corridor: ${corridor}. Priority: High. Dispatched to Aniket Pathak desk.`,
    });

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2200);
  };

  return (
    <>
      {/* Floating Call Back Trigger Button (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded-full shadow-2xl border-2 border-white/60 transition-all hover:scale-105 font-technical text-xs tracking-wider"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B192C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0B192C]"></span>
          </span>
          <PhoneCall className="w-4 h-4 text-[#0B192C]" />
          <span>REQUEST CALL BACK</span>
        </button>
      </div>

      {/* Floating Call Back Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-[#131B2E]">
            
            {/* Header */}
            <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
                  <PhoneCall className="w-4 h-4 text-[#D97706]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">
                    Request an Instant Call Back
                  </h3>
                  <p className="text-[10px] text-gray-400 font-technical uppercase">
                    Direct Line to Aniket Pathak (+91 8178030187)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sanjay Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Target Corridor
                      </label>
                      <select
                        value={corridor}
                        onChange={(e) => setCorridor(e.target.value)}
                        className="w-full h-9 px-2 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:bg-white"
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
                        Enquiry Type
                      </label>
                      <select
                        value={enquiryTopic}
                        onChange={(e) => setEnquiryTopic(e.target.value)}
                        className="w-full h-9 px-2 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:bg-white"
                      >
                        <option value="Warehouse Leasing">Warehouse Leasing</option>
                        <option value="Industrial Setup">Industrial Setup</option>
                        <option value="Government Land Allotment">Govt Allotment</option>
                        <option value="Corporate Space Leasing">Corporate Office</option>
                        <option value="Large Land Sourcing">Land Sourcing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                      Preferred Call Back Window
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full h-9 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:bg-white"
                    >
                      <option value="Within 15 Minutes (Immediate)">Immediate (Next 15 Minutes)</option>
                      <option value="Morning 10:00 AM - 1:00 PM">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon 2:00 PM - 5:00 PM">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening 5:00 PM - 8:00 PM">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-11 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold tracking-wider transition-all shadow flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-[#D97706]" />
                      <span>SUBMIT CALL BACK REQUEST</span>
                    </button>
                  </div>
                  
                  <span className="text-[10px] text-gray-400 font-sans block text-center mt-1">
                    Direct routing to Aniket Pathak (+91 8178030187)
                  </span>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-gray-900">
                    Call Back Request Dispatched
                  </h4>
                  <p className="font-sans text-xs text-gray-600 max-w-xs mx-auto">
                    Your enquiry has been routed to Aniket Pathak (+91 8178030187). Expect a call within your chosen window!
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
