'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<{ user: { role?: string } | null; login: (credentials: { email: string; password: string; }) => Promise<void>; logout: () => Promise<void>; hasRole: (role: string) => boolean; hasAnyRole: (roles: string[]) => boolean } | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ role?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    await api.post('/login', credentials);
    const res = await api.get('/user');
    setUser(res.data);
    router.push('/dashboard');
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    router.push('/login');
  };

  const hasRole = (role: string) => user?.role === role;
  const hasAnyRole = (roles: string[]) => roles.includes(user?.role || '');

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
