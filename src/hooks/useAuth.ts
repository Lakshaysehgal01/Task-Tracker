import { useState, useEffect } from 'react';
import { getStoredUser, setStoredUser, removeStoredUser } from '../utils/localStorage';

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string) => {
    setStoredUser(username);
    setUser(username);
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};