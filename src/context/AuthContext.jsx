import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(() => {
    const saved = localStorage.getItem('adminAuth');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data) => {
    setAdminAuth(data);
    localStorage.setItem('adminAuth', JSON.stringify(data));
  };

  const logout = () => {
    setAdminAuth(null);
    localStorage.removeItem('adminAuth');
  };

  const value = useMemo(() => ({ adminAuth, login, logout }), [adminAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
