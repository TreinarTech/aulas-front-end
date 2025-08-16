import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = { id: string; name: string; email: string } | null;

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

  const signIn = async (email: string, password: string) => {
    // Mocked auth: accept any non-empty credentials
    await new Promise((r) => setTimeout(r, 400));
    if (!email || !password) throw new Error('Credenciais inválidas');
    setUser({ id: 'u1', name: email.split('@')[0] || 'Cliente', email });
  };

  const signOut = () => setUser(null);

  const value = useMemo(() => ({ user, signIn, signOut, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
