import  {  createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') || false
  );

  const toggleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', '1111'); 
    }
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};