import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Star, User as UserIcon, Shield, Store, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user info from localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'role-admin';
      case 'STORE_OWNER':
        return 'role-owner';
      default:
        return 'role-normal';
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Admin';
      case 'STORE_OWNER':
        return 'Store Owner';
      default:
        return 'User';
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <Star className="star filled" style={{ width: '24px', height: '24px' }} />
            <span>RateStore</span>
          </Link>
          
          {user && (
            <>
              <nav className="nav-links">
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/admin-dashboard" 
                    className={`nav-link ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Dashboard
                  </Link>
                )}
                {user.role === 'NORMAL' && (
                  <>
                    <Link 
                      to="/stores" 
                      className={`nav-link ${location.pathname === '/stores' ? 'active' : ''}`}
                    >
                      <Store size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      Stores
                    </Link>
                    <Link 
                      to="/change-password" 
                      className={`nav-link ${location.pathname === '/change-password' ? 'active' : ''}`}
                    >
                      <UserIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      Password
                    </Link>
                  </>
                )}
                {user.role === 'STORE_OWNER' && (
                  <>
                    <Link 
                      to="/owner-dashboard" 
                      className={`nav-link ${location.pathname === '/owner-dashboard' ? 'active' : ''}`}
                    >
                      <LayoutDashboard size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      Dashboard
                    </Link>
                    <Link 
                      to="/change-password" 
                      className={`nav-link ${location.pathname === '/change-password' ? 'active' : ''}`}
                    >
                      <UserIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      Password
                    </Link>
                  </>
                )}
              </nav>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="user-badge">
                  {user.role === 'ADMIN' ? (
                    <Shield size={14} className="role-admin" style={{ color: 'var(--danger)' }} />
                  ) : (
                    <UserIcon size={14} style={{ color: 'var(--primary)' }} />
                  )}
                  <span className="user-name-badge">{user.name.split(' ')[0]}</span>
                  <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                    {formatRole(user.role)}
                  </span>
                </div>
                
                <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                  <LogOut size={16} />
                  <span className="desktop-only" style={{ marginLeft: '4px' }}>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} RateStore Platform. Built as a FullStack Intern Assessment. Fully Responsive Design.</p>
      </footer>
    </div>
  );
};
