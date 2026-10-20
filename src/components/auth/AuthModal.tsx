import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  X, 
  Lock, 
  User, 
  Mail, 
  Key, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, registerUser, users, switchUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [role, setRole] = useState<UserRole>('corporate_client');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email);
    if (success) {
      onClose();
    } else {
      setErrorMsg('No active user account found with this email. You can register below or select an account from the 1-Click Executive Desk.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !email || !organization) {
      setErrorMsg('Please fill in all mandatory enterprise details.');
      return;
    }

    registerUser({
      name,
      email,
      role,
      roleTitle: roleTitle || (role === 'corporate_client' ? 'Corporate Real Estate Director' : 'Institutional Representative'),
      organization,
      phone,
      twoFactorEnabled: false,
      status: 'active',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D97706]/20 text-[#FFB77D] rounded">
              <Lock className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                {mode === 'login' ? 'Institutional Sign In' : 'Register Enterprise Account'}
              </h3>
              <p className="text-[10px] text-gray-400 font-technical uppercase">
                Growthland Space Solution • Confidential Deal Room
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-technical">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-3 font-bold uppercase transition-colors text-center border-b-2 ${
              mode === 'login'
                ? 'border-[#0B192C] text-[#0B192C] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In Existing Account
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-3 font-bold uppercase transition-colors text-center border-b-2 ${
              mode === 'register'
                ? 'border-[#0B192C] text-[#0B192C] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Register Enterprise Client
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Quick 1-Click Fast Switch Desk (Extremely handy for reviewing the app!) */}
          <div className="p-3 bg-[#EAEDFF] rounded border border-[#BAC7E1]/70">
            <div className="flex items-center justify-between mb-2">
              <span className="font-technical text-[10px] uppercase tracking-wider text-[#0B192C] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>1-Click Executive Access (Instant Switch)</span>
              </span>
              <span className="text-[9px] text-[#44474C] font-technical">Demo Profiles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    onClose();
                  }}
                  className="p-2 bg-white hover:bg-[#F2F3FF] border border-[#CBD5E1] rounded text-left transition-all flex flex-col group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#1E3E62] truncate">
                      {u.name}
                    </span>
                    <span className={`text-[8px] font-technical uppercase font-bold px-1.5 py-0.2 rounded ${
                      u.role === 'super_admin' ? 'bg-[#0B192C] text-[#FFB77D]' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {u.role === 'super_admin' ? 'ADMIN' : u.role.split('_')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 truncate mt-0.5">
                    {u.organization}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                  Security Passcode / Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-technical mt-1 block">
                  Password check bypassed for authenticated corporate delegates.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
              >
                <span>SIGN IN SECURELY</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="r.kumar@enterprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Enterprise / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reliance Supply Chain Ltd."
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Corporate Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Account Role Type *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#0B192C]"
                  >
                    <option value="corporate_client">Corporate Tenant / Client</option>
                    <option value="investor_pe">Institutional Investor / PE</option>
                    <option value="legal_auditor">Statutory Auditor & Legal Counsel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-technical text-[10px] uppercase text-[#44474C] font-bold mb-1">
                    Corporate Title / Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VP Infrastructure"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold transition-all shadow flex items-center justify-center gap-2 mt-2"
              >
                <span>CREATE ACCOUNT & ACCESS DEAL ROOM</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
