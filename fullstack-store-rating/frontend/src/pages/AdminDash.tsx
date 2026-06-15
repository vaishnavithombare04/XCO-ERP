import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Store, Star, UserPlus, ArrowUpDown, 
  Search, Eye, ShieldAlert, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
  breakdown: {
    admin: number;
    normal: number;
    storeOwner: number;
  };
}

interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
  role: 'ADMIN' | 'NORMAL' | 'STORE_OWNER';
  rating?: number;
}

interface StoreData {
  id: number;
  name: string;
  email: string;
  address: string;
  rating: number;
  totalRatings: number;
}

export const AdminDash: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'stores' | 'addUser'>('stats');
  
  // Dashboard states
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [stores, setStores] = useState<StoreData[]>([]);
  
  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Add user states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'ADMIN' | 'NORMAL' | 'STORE_OWNER'>('NORMAL');
  
  // Modals & Feedback states
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const token = localStorage.getItem('token');

  // Verify auth
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!token || !userString) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userString);
    if (user.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [token, navigate]);

  // API Call Helpers
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setStats(data.data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        role: roleFilter,
        sortBy: sortField,
        sortOrder: sortOrder
      });
      const res = await fetch(`http://localhost:5000/api/admin/users?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setUsers(data.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  }, [token, searchQuery, roleFilter, sortField, sortOrder]);

  const fetchStores = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        sortBy: sortField === 'role' ? 'name' : sortField, // stores don't have role
        sortOrder: sortOrder
      });
      const res = await fetch(`http://localhost:5000/api/admin/stores?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setStores(data.data);
    } catch (err) {
      console.error('Failed to fetch stores', err);
    }
  }, [token, searchQuery, sortField, sortOrder]);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'stats') {
      fetchStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'stores') {
      fetchStores();
    }
  }, [activeTab, fetchStats, fetchUsers, fetchStores]);

  // Sort change handler
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // View User Details
  const handleViewDetails = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSelectedUser(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch user details', err);
    }
  };

  // User Add Submission
  const validateAddForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (newName.length < 20 || newName.length > 60) {
      errors.name = 'Name must be 20 to 60 characters';
    }
    if (newAddress.length > 400) {
      errors.address = 'Address must be at most 400 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      errors.email = 'Invalid email address';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,16}$/;
    if (newPassword.length < 8 || newPassword.length > 16) {
      errors.password = 'Password must be between 8 and 16 characters';
    } else if (!passwordRegex.test(newPassword)) {
      errors.password = 'Password must contain at least one uppercase letter and one special character';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!validateAddForm()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          address: newAddress,
          password: newPassword,
          role: newRole
        }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        setMessage({ type: 'success', text: `Created ${newRole === 'STORE_OWNER' ? 'Store' : 'User'} successfully!` });
        // Clear fields
        setNewName('');
        setNewEmail('');
        setNewAddress('');
        setNewPassword('');
        setNewRole('NORMAL');
      } else {
        setMessage({ type: 'danger', text: data.message || 'Failed to create user.' });
        if (data.errors) {
          const apiErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            apiErrors[err.field] = err.message;
          });
          setFormErrors(apiErrors);
        }
      }
    } catch (err) {
      setMessage({ type: 'danger', text: 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="sort-icon" style={{ opacity: 0.3 }} />;
    return sortOrder === 'asc' ? <ChevronUp size={14} className="sort-icon" /> : <ChevronDown size={14} className="sort-icon" />;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all platform stores, ratings, and user accounts</p>
        </div>
        
        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('stats')}
          >
            Overview
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('users'); setSearchQuery(''); setRoleFilter(''); setSortField('name'); }}
          >
            Users
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'stores' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('stores'); setSearchQuery(''); setSortField('name'); }}
          >
            Stores
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'addUser' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('addUser'); setMessage(null); setFormErrors({}); }}
          >
            <UserPlus size={14} />
            Create
          </button>
        </div>
      </div>

      {/* 1. STATS TAB */}
      {activeTab === 'stats' && stats && (
        <div>
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <h3>Total Accounts</h3>
                <div className="stat-value">{stats.totalUsers}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                <Store size={24} />
              </div>
              <div className="stat-info">
                <h3>Registered Stores</h3>
                <div className="stat-value">{stats.totalStores}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                <Star size={24} className="star filled" />
              </div>
              <div className="stat-info">
                <h3>Submitted Ratings</h3>
                <div className="stat-value">{stats.totalRatings}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Account Role Breakdowns</h3>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Normal Users</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--success)' }}>{stats.breakdown.normal}</div>
              </div>
              <div style={{ flex: 1, minWidth: '200px', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Store Owners</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--warning)' }}>{stats.breakdown.storeOwner}</div>
              </div>
              <div style={{ flex: 1, minWidth: '200px', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Administrators</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--danger)' }}>{stats.breakdown.admin}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. USERS LIST TAB */}
      {activeTab === 'users' && (
        <div>
          {/* Filters Row */}
          <div className="controls-row">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search Name, Email, Address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <select 
                className="filter-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="NORMAL">Normal Users</option>
                <option value="ADMIN">Administrators</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="sortable" onClick={() => handleSort('name')}>
                      Name {renderSortIndicator('name')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('email')}>
                      Email {renderSortIndicator('email')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('address')}>
                      Address {renderSortIndicator('address')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('role')}>
                      Role {renderSortIndicator('role')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No users found matching filters
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td style={{ fontWeight: 600 }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.address}</td>
                        <td>
                          <span className={`role-badge ${u.role === 'ADMIN' ? 'role-admin' : 'role-normal'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleViewDetails(u.id)}
                            style={{ padding: '0.3rem 0.6rem' }}
                          >
                            <Eye size={14} />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. STORES LIST TAB */}
      {activeTab === 'stores' && (
        <div>
          {/* Search Row */}
          <div className="controls-row">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search Store Name, Address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="sortable" onClick={() => handleSort('name')}>
                      Store Name {renderSortIndicator('name')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('email')}>
                      Email {renderSortIndicator('email')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('address')}>
                      Address {renderSortIndicator('address')}
                    </th>
                    <th className="sortable" onClick={() => handleSort('rating')}>
                      Average Rating {renderSortIndicator('rating')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No stores registered
                      </td>
                    </tr>
                  ) : (
                    stores.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>{s.email}</td>
                        <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.address}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="rating-badge">
                              <Star size={14} className="star filled" />
                              {s.rating}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({s.totalRatings} ratings)</span>
                          </div>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleViewDetails(s.id)}
                            style={{ padding: '0.3rem 0.6rem' }}
                          >
                            <Eye size={14} />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. ADD USER/STORE TAB */}
      {activeTab === 'addUser' && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus style={{ color: 'var(--primary)' }} />
            Add New User or Store
          </h3>

          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.type === 'success' ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={newRole}
                onChange={(e) => {
                  setNewRole(e.target.value as any);
                  setFormErrors({});
                }}
              >
                <option value="NORMAL">Normal User</option>
                <option value="STORE_OWNER">Store Owner (Store)</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                {newRole === 'STORE_OWNER' ? 'Store Name' : 'Full Name'} ({newName.length}/60)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={newRole === 'STORE_OWNER' ? "Min 20 characters (e.g. Super Store Alpha Location)" : "Min 20 characters (e.g. Johnathan Doe Normal User)"}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              {formErrors.name && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="email@storerating.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              {formErrors.email && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Address ({newAddress.length}/400)</label>
              <textarea
                className="form-control"
                placeholder="Enter physical address details"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
              />
              {formErrors.address && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.address}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Temporary Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Min 8 chars, 1 uppercase, 1 special char"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {formErrors.password && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.password}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      )}

      {/* DETAILS VIEW MODAL */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Account Details</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedUser(null)}>✕</button>
            </div>
            
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ID Reference</div>
                  <div style={{ fontWeight: 600 }}>#{selectedUser.id}</div>
                </div>
                <span className={`role-badge ${
                  selectedUser.role === 'ADMIN' ? 'role-admin' : selectedUser.role === 'STORE_OWNER' ? 'role-owner' : 'role-normal'
                }`}>
                  {selectedUser.role}
                </span>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: '0.25rem' }}>Name</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedUser.name}</div>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: '0.25rem' }}>Email Address</label>
                <div>{selectedUser.email}</div>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: '0.25rem' }}>Physical Address</label>
                <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                  {selectedUser.address}
                </div>
              </div>

              {selectedUser.role === 'STORE_OWNER' && (
                <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.25rem' }}>Store Rating Summary</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="rating-badge" style={{ fontSize: '1.1rem', padding: '0.4rem 0.8rem' }}>
                      <Star size={16} className="star filled" />
                      {selectedUser.rating || '0.0'}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Overall Rating calculated from submitted reviews
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
