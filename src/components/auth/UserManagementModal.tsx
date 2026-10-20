import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, UserRole } from '../../types';
import { 
  X, 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Key, 
  Trash2, 
  Check, 
  AlertTriangle, 
  Smartphone, 
  Globe, 
  Clock, 
  UserCheck, 
  Lock 
} from 'lucide-react';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    users, 
    registerUser, 
    updateUser, 
    deleteUser, 
    toggleUserStatus, 
    toggle2FA, 
    isSuperAdmin 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'directory' | 'security'>('directory');
  const [showAddUser, setShowAddUser] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserOrg, setNewUserOrg] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('corporate_client');
  const [newUserTitle, setNewUserTitle] = useState('');

  // Editing permissions state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserOrg) return;

    registerUser({
      name: newUserName,
      email: newUserEmail,
      organization: newUserOrg,
      role: newUserRole,
      roleTitle: newUserTitle || 'Enterprise Delegate',
      twoFactorEnabled: false,
      status: 'active',
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserOrg('');
    setNewUserTitle('');
    setShowAddUser(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full h-[88vh] flex flex-col shadow-2xl border border-gray-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D97706]/20 text-[#FFB77D] rounded border border-[#D97706]/30">
              <Users className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold">
                Enterprise User Account Governance
              </h2>
              <p className="text-[10px] text-gray-400 font-technical uppercase tracking-wider">
                Role-Based Access Control (RBAC) • Session Protection • Audit Compliance
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="bg-[#F2F3FF] p-3 border-b border-[#DAE2FD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-1.5 rounded font-technical text-xs font-bold transition-all ${
                activeTab === 'directory'
                  ? 'bg-[#0B192C] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Enterprise Users Directory ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-1.5 rounded font-technical text-xs font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-[#0B192C] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              My Account Security & 2FA
            </button>
          </div>

          {activeTab === 'directory' && isSuperAdmin && (
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-[#0B192C] font-bold rounded font-technical text-xs flex items-center gap-1.5 shadow"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{showAddUser ? 'Close Form' : 'Add Corporate User'}</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          
          {activeTab === 'directory' ? (
            <div className="space-y-4">
              
              {/* Add user form inline */}
              {showAddUser && (
                <form
                  onSubmit={handleAddUserSubmit}
                  className="p-5 bg-white rounded border border-[#BAC7E1] shadow-md space-y-3 animate-in fade-in duration-150"
                >
                  <h4 className="font-technical text-xs font-bold uppercase text-[#0B192C] border-b border-gray-200 pb-2">
                    Provision New Institutional Client Account
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Shourie"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full h-8 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="arun@corporate.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="w-full h-8 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Enterprise Entity *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tata Steel / Mahindra Logistics"
                        value={newUserOrg}
                        onChange={(e) => setNewUserOrg(e.target.value)}
                        className="w-full h-8 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Account Role *
                      </label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                        className="w-full h-8 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-semibold"
                      >
                        <option value="corporate_client">Corporate Tenant / Client</option>
                        <option value="investor_pe">Institutional Investor / PE</option>
                        <option value="legal_auditor">Statutory Legal Auditor</option>
                        <option value="super_admin">Managing Director / Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-technical uppercase font-bold text-gray-600 mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Regional Asset Head"
                        value={newUserTitle}
                        onChange={(e) => setNewUserTitle(e.target.value)}
                        className="w-full h-8 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#0B192C] text-white rounded font-technical text-xs font-bold hover:bg-[#1E3E62]"
                    >
                      Create & Dispatch Invitation
                    </button>
                  </div>
                </form>
              )}

              {/* Users table */}
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white font-technical text-[9px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">User & Organization</th>
                      <th className="p-3">Role & Permissions</th>
                      <th className="p-3">Security & 2FA</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Administrative Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                        
                        {/* Name & Org */}
                        <td className="p-3 align-top">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#0B192C] text-[#FFB77D] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <strong className="block text-gray-900">{u.name}</strong>
                              <span className="text-[11px] text-gray-500 block">{u.email}</span>
                              <span className="text-[10px] text-[#D97706] font-semibold">{u.organization}</span>
                            </div>
                          </div>
                        </td>

                        {/* Role & Permissions */}
                        <td className="p-3 align-top">
                          <span className={`inline-block px-2 py-0.5 rounded font-technical text-[9px] uppercase font-bold ${
                            u.role === 'super_admin'
                              ? 'bg-[#0B192C] text-white'
                              : u.role === 'investor_pe'
                              ? 'bg-purple-100 text-purple-900'
                              : u.role === 'legal_auditor'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {u.role.replace('_', ' ')}
                          </span>
                          <span className="text-[11px] text-gray-600 block mt-1 font-medium">
                            {u.roleTitle}
                          </span>

                          <div className="flex flex-wrap gap-1 mt-1 text-[9px] font-technical text-gray-500">
                            {u.permissions.canUpload && <span className="bg-gray-100 px-1 py-0.2 rounded">Upload</span>}
                            {u.permissions.canDownload && <span className="bg-gray-100 px-1 py-0.2 rounded">Download</span>}
                            {u.permissions.canManageUsers && <span className="bg-gray-100 px-1 py-0.2 rounded">User Admin</span>}
                            {u.permissions.canAccessBoardDocs && <span className="bg-gray-100 px-1 py-0.2 rounded">Board Access</span>}
                          </div>
                        </td>

                        {/* Security & 2FA */}
                        <td className="p-3 align-top">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${u.twoFactorEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                            <span className="text-[11px] font-technical">
                              {u.twoFactorEnabled ? '2FA Active' : '2FA Off'}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {u.lastLogin}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-3 align-top">
                          <span className={`px-2 py-0.5 rounded font-technical text-[9px] uppercase font-bold ${
                            u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {u.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-3 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isSuperAdmin && u.id !== 'user-001' && (
                              <>
                                <button
                                  onClick={() => toggleUserStatus(u.id)}
                                  className={`px-2 py-1 rounded text-[10px] font-technical font-bold ${
                                    u.status === 'active'
                                      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                  }`}
                                >
                                  {u.status === 'active' ? 'Suspend' : 'Activate'}
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`Revoke and purge account for ${u.name}?`)) {
                                      deleteUser(u.id);
                                    }
                                  }}
                                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                  title="Delete User Account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}

                            {u.id === 'user-001' && (
                              <span className="text-[10px] font-technical text-gray-400 italic">
                                Master Admin
                              </span>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            /* My Account Security View */
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Profile Card */}
              <div className="p-6 bg-white rounded border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-technical text-xs font-bold uppercase text-gray-900 border-b border-gray-100 pb-2">
                  My Security Profile & Identity
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0B192C] text-[#FFB77D] flex items-center justify-center font-bold text-xl uppercase border-2 border-[#D97706]/40">
                    {currentUser?.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">{currentUser?.name}</h4>
                    <p className="text-xs text-gray-600">{currentUser?.email}</p>
                    <span className="text-xs text-[#D97706] font-semibold">{currentUser?.roleTitle} • {currentUser?.organization}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded">
                    <span className="text-[10px] font-technical uppercase text-gray-500 block">Assigned Role</span>
                    <strong className="text-gray-900 uppercase font-technical">{currentUser?.role.replace('_', ' ')}</strong>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <span className="text-[10px] font-technical uppercase text-gray-500 block">Direct Phone</span>
                    <strong className="text-gray-900">{currentUser?.phone || '+91 8178030187'}</strong>
                  </div>
                </div>
              </div>

              {/* 2FA Settings */}
              <div className="p-6 bg-white rounded border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#EAEDFF] text-[#1E3E62] rounded">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        Two-Factor Authentication (2FA)
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Requires SMS OTP or hardware TOTP token for every deal room file download.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={toggle2FA}
                    className={`px-4 py-2 rounded font-technical text-xs font-bold transition-all ${
                      currentUser?.twoFactorEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {currentUser?.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="p-6 bg-white rounded border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h4 className="font-technical text-xs font-bold uppercase text-gray-900">
                    Active Signed-In Devices & Sessions
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-technical font-bold">
                    SSL 256-Bit Protected
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-[#D97706]" />
                      <div>
                        <strong className="block text-gray-900">Current Workstation (Chrome / Linux Desktop)</strong>
                        <span className="text-[10px] text-gray-500 font-technical">IP: 103.24.188.42 (Delhi NCR, India) • Active Now</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-technical text-[9px] font-bold">
                      THIS DEVICE
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      <div>
                        <strong className="block text-gray-900">Executive Mobile Device (iOS Safari)</strong>
                        <span className="text-[10px] text-gray-500 font-technical">IP: 115.112.89.10 (Gurugram) • 3 hours ago</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Terminated remote session on mobile device.')}
                      className="text-[10px] font-technical text-red-600 hover:underline"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#0B192C] text-gray-400 px-6 py-3 flex items-center justify-between text-xs font-technical border-t border-white/10">
          <span>Enterprise Tenant Security Level: Institutional Tier-1</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
