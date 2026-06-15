import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminDash } from './pages/AdminDash';
import { UserDash } from './pages/UserDash';
import { OwnerDash } from './pages/OwnerDash';
import { ChangePassword } from './pages/ChangePassword';
import { Layout } from './components/Layout';

// Helper component to redirect based on auth status
const HomeRedirect: React.FC = () => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');

  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (user.role === 'STORE_OWNER') {
      return <Navigate to="/owner-dashboard" replace />;
    } else {
      return <Navigate to="/stores" replace />;
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

// Protected Route wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');

  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    try {
      const user = JSON.parse(userString);
      if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
      }
    } catch (e) {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDash />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stores" 
            element={
              <ProtectedRoute allowedRoles={['NORMAL']}>
                <UserDash />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/owner-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['STORE_OWNER']}>
                <OwnerDash />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute allowedRoles={['NORMAL', 'STORE_OWNER']}>
                <ChangePassword />
              </ProtectedRoute>
            } 
          />

          {/* Fallbacks */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
