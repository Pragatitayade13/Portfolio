import React, { createContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges, loginAdmin, logoutAdmin } from '../services/authService';
import { readDocument } from '../services/portfolioService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch corresponding document from adminUsers collection
          const profile = await readDocument('adminUsers', user.uid);
          if (profile) {
            setAdminProfile(profile);
            setIsAdmin(profile.role === 'admin' && profile.active === true);
          } else {
            setAdminProfile(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Failed to load admin profile:", error.message);
          setAdminProfile(null);
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setAdminProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await loginAdmin(email, password);
      return user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setCurrentUser(null);
      setAdminProfile(null);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    adminProfile,
    loading,
    isAdmin,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
