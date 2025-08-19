import React, { createContext, useContext, useMemo, useState } from 'react';

export type LoadingContextType = {
  loading: boolean;
  setLoading: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
};
