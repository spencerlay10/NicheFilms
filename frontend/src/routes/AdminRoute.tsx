// src/routes/AdminRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("🔐 AdminRoute check:", {
    user,
    loading,
    roles: user?.roles,
  });

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.roles.includes('Administrator')) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
