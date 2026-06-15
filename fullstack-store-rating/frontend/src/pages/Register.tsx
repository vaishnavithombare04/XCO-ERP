import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, MapPin, Lock, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  
  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate form locally before sending
  const validateForm = (): boolean => {
    const tempErrors: Record<string, string> = {};
    
    // Name validation
    if (name.length < 20) {
      tempErrors.name = 'Name must be at least 20 characters';
    } else if (name.length > 60) {
      tempErrors.name = 'Name must be at most 60 characters';
    }

    // Address validation
    if (!address) {
      tempErrors.address = 'Address is required';
    } else if (address.length > 400) {
      tempErrors.address = 'Address must be at most 400 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      tempErrors.email = 'Invalid email address';
    }

    // Password validation: 8-16, 1 uppercase, 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,16}$/;
    if (password.length < 8 || password.length > 16) {
      tempErrors.password = 'Password must be between 8 and 16 characters';
    } else if (!passwordRegex.test(password)) {
      tempErrors.password = 'Password must contain at least one uppercase letter and one special character';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, address, password }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        // Store session and redirect immediately
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/stores');
      } else {
        setServerError(data.message || 'Signup failed. Please try again.');
        if (data.errors) {
          const apiErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            apiErrors[err.field] = err.message;
          });
          setErrors(apiErrors);
        }
      }
    } catch (err) {
      setServerError('Connection refused. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  const isCorrectLength = password.length >= 8 && password.length <= 16;

  return (
    <div className="form-card" style={{ maxWidth: '540px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.5rem' }}>
          Create Account
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Register as a normal user to rate stores
        </p>
      </div>

      {serverError && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name ({name.length}/60)</label>
          <div style={{ position: 'relative' }}>
            <User size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="name"
              type="text"
              className={`form-control search-input ${errors.name ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Min 20 characters (e.g. Johnathan Doe Normal User)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="email"
              type="email"
              className={`form-control search-input ${errors.email ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address">Address ({address.length}/400)</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} className="search-icon" style={{ left: '0.85rem', top: '1.5rem' }} />
            <textarea
              id="address"
              className={`form-control search-input ${errors.address ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem', minHeight: '80px' }}
              placeholder="Enter your residential address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.address}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} className="search-icon" style={{ left: '0.85rem' }} />
            <input
              id="password"
              type="password"
              className={`form-control search-input ${errors.password ? 'invalid' : ''}`}
              style={{ paddingLeft: '2.5rem' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {errors.password && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.password}</span>}
          
          {/* Real-time Checklist */}
          <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isCorrectLength ? 'var(--success)' : 'var(--text-secondary)' }}>
              {isCorrectLength ? <CheckCircle size={12} /> : <div style={{ width: 12 }} />}
              8-16 characters (Current: {password.length})
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

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.8rem', marginTop: '1.5rem' }}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : (
            <>
              <UserPlus size={18} />
              Sign Up
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
          Log In
        </Link>
      </div>
    </div>
  );
};
