import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERS } from '@/data/mock';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  address?: string;
  phone?: string;
  status?: 'active' | 'blocked' | 'pending';
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // hydrate session
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('flash.auth.v1');
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // persist session
  useEffect(() => {
    if (loading) return;
    AsyncStorage.setItem('flash.auth.v1', JSON.stringify(user)).catch(() => {});
  }, [user, loading]);


  const signIn = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const e = email.trim().toLowerCase();
    const u = USERS.find((x) => x.email.toLowerCase() === e);
    if (!u || u.password !== password) throw new Error('Email ou senha inválidos');
    if (u.status === 'blocked') throw new Error('Conta bloqueada');
    const { password: _pw, ...safeUser } = u;
    setUser(safeUser);
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, signIn, signOut, loading }), [user, loading, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
