import React, { createContext, useContext, useState, useEffect } from 'react';                                                                                                                                                                                                                                                             
import { supabase } from '../utils/supabase';
import { User, UserRole, AuditLog } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchUser: (userId: string) => void;
  registerUser: (userData: Omit<User, 'id' | 'lastLogin' | 'permissions'> & { permissions?: Partial<User['permissions']> }) => User;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
  toggle2FA: () => void;
  isSuperAdmin: boolean;
  canUpload: boolean;
  canDownload: boolean;
  canManageUsers: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load users from localStorage or initial
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('growthland_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });

  // Default active user is Aniket Pathak (Founder & MD / Super Admin)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem('growthland_users', JSON.stringify(users));
  }, [users]);

  // Sync current user ID
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('growthland_current_user_id', currentUser.id);
    } else {
      localStorage.removeItem('growthland_current_user_id');
    }
  }, [currentUser]);

  const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  if (!password) return false;

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

  if (error || !data.user) {
    return false;
  }

  const user = users.find(
    (u) =>
      u.email.toLowerCase() ===
      data.user.email?.toLowerCase()
  );

  if (!user) {
    await supabase.auth.signOut();
    return false;
  }

  // Verify Super Admin role from Supabase
  const { data: roleRecord, error: roleError } =
    await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

  const isSuperAdmin =
    !roleError &&
    roleRecord?.role === 'super_admin';

  // Do not allow a locally assigned Super Admin
  // role without database verification
  if (
    user.role === 'super_admin' &&
    !isSuperAdmin
  ) {
    await supabase.auth.signOut();
    return false;
  }

  const updatedUser: User = {
    ...user,
    role: isSuperAdmin
      ? 'super_admin'
      : user.role,
    lastLogin: 'Just now (Active)',
  };

  setUsers((prev) =>
    prev.map((u) =>
      u.id === user.id ? updatedUser : u
    )
  );

  setCurrentUser(updatedUser);

  return true;
};

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
};

  const switchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const updatedUser: User = {
        ...user,
        lastLogin: 'Just now (Active)',
      };
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      setCurrentUser(updatedUser);
    }
  };

  const registerUser = (userData: Omit<User, 'id' | 'lastLogin' | 'permissions'> & { permissions?: Partial<User['permissions']> }): User => {
    const defaultPermissions = {
      canUpload: userData.role === 'super_admin' || userData.role === 'investor_pe',
      canDownload: true,
      canDelete: userData.role === 'super_admin',
      canManageUsers: userData.role === 'super_admin',
      canAccessBoardDocs: userData.role === 'super_admin' || userData.role === 'legal_auditor',
      ...userData.permissions,
    };

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      roleTitle: userData.roleTitle,
      organization: userData.organization,
      phone: userData.phone || '+91 98000 00000',
      twoFactorEnabled: userData.twoFactorEnabled ?? false,
      status: 'active',
      lastLogin: 'Just now (New Registered Account)',
      permissions: defaultPermissions,
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updates };
        if (currentUser?.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    if (userId === 'user-001') {
      alert('Cannot delete the Founder & Lead Administrator account.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser?.id === userId) {
      setCurrentUser(users[0] || null);
    }
  };

  const toggleUserStatus = (userId: string) => {
    if (userId === 'user-001') {
      alert('Cannot suspend the Founder & Lead Administrator.');
      return;
    }
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const toggle2FA = () => {
    if (!currentUser) return;
    const nextVal = !currentUser.twoFactorEnabled;
    updateUser(currentUser.id, { twoFactorEnabled: nextVal });
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const canUpload = currentUser ? (currentUser.permissions.canUpload || isSuperAdmin) : false;
  const canDownload = currentUser ? (currentUser.permissions.canDownload || isSuperAdmin) : false;
  const canManageUsers = currentUser ? (currentUser.permissions.canManageUsers || isSuperAdmin) : false;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchUser,
        registerUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        toggle2FA,
        isSuperAdmin,
        canUpload,
        canDownload,
        canManageUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
