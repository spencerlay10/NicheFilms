import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { API_BASE_URL } from '../api/config'; // ✅ Make sure this is used in production!

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    console.log("📡 [AuthContext] Starting fetchUser()");

    try {
      const res = await fetch(`${API_BASE_URL}/me`, {
        credentials: 'include',
      });

      console.log("📥 [AuthContext] Received response from /me:", res);

      if (!res.ok) throw new Error('Unauthorized');

      const data: User = await res.json();
      console.log("✅ [AuthContext] User fetched successfully:", data);

      setUser(data);
    } catch (err) {
      console.warn("⚠️ [AuthContext] Failed to fetch user. Setting user to null.");
      setUser(null);
    } finally {
      console.log("⏹️ [AuthContext] fetchUser() complete. Setting loading to false.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🚀 [AuthContext] useEffect triggered on mount");
    fetchUser();
  }, []);

  console.log("🧠 [AuthContext] Rendered. Current state:", { user, loading });

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("🔍 [useAuth] Hook accessed. Returned context:", context);
  return context;
};
