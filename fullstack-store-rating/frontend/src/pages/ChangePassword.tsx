import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle, Save } from 'lucide-react';

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation/feedback states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Verify auth
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const validateForm = (): boolean => {
    const tempErrors: Record<string, string> = {};

    if (!oldPassword) {
      tempErrors.oldPassword = 'Old password is required';
    }

    // New password rules: 8-16, 1 uppercase, 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,16}$/;
    if (newPassword.length < 8 || newPassword.length > 16) {
      tempErrors.newPassword = 'Password must be between 8 and 16 characters';
    } else if (!passwordRegex.test(newPassword)) {
      tempErrors.newPassword = 'Password must contain at least one uppercase letter and one special character';
    }

    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        setMessage({ type: 'success', text: 'Password updated successfully! Redirecting in 2s...' });
        // Clear
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Redirect home based on role after 2s
        setTimeout(() => {
          const userString = localStorage.getItem('user');
          if (userString) {
            const user = JSON.parse(userString);
            if (user.role === 'STORE_OWNER') navigate('/owner-dashboard');
            else navigate('/stores');
          }
        }, 2000);
      } else {
        setMessage({ type: 'danger', text: data.message || 'Failed to change password.' });
      }
    } catch (err) {
      setMessage({ type: 'danger', text: 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword);
  const isCorrectLength = newPassword.length >= 8 && newPassword.length <= 16;

  return (
    <div className="form-card" style={{ maxWidth: '500px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          Change Password
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Secure your account by updating your credentials
        </p>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="oldPassword">Current Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="oldPassword"
              type="password"
              className={`form-control search-input ${errors.oldPassword ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.oldPassword && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.oldPassword}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="newPassword">New Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="newPassword"
              type="password"
              className={`form-control search-input ${errors.newPassword ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.newPassword && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.newPassword}</span>}
          
          {/* Real-time Checklist */}
          <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isCorrectLength ? 'var(--success)' : 'var(--text-secondary)' }}>
              {isCorrectLength ? <CheckCircle size={12} /> : <div style={{ width: 12 }} />}
              8-16 characters (Current: {newPassword.length})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: hasUppercase ? 'var(--success)' : 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {hasUppercase ? <CheckCircle size={12} /> : <div style={{ width: 12 }} />}
              At least one uppercase letter (A-Z)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: hasSpecial ? 'var(--success)' : 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {hasSpecial ? <CheckCircle size={12} /> : <div style={{ width: 12 }} />}
              At least one special character (!@#$%^&*)
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="confirmPassword"
              type="password"
              className={`form-control search-input ${errors.confirmPassword ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.confirmPassword && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.confirmPassword}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.8rem' }}
          disabled={loading}
        >
          {loading ? 'Saving Changes...' : (
            <>
              <Save size={18} />
              Update Password
            </>
          )}
        </button>
      </form>
    </div>
  );
};
