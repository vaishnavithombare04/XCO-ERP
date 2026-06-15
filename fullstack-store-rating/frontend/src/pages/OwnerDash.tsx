import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ArrowUpDown, ChevronDown, ChevronUp, Calendar, Mail, MapPin } from 'lucide-react';

interface Review {
  id: number;
  rating: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
    address: string;
  };
}

interface DashboardData {
  storeName: string;
  averageRating: number;
  totalRatings: number;
  ratings: Review[];
}

export const OwnerDash: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  // Verify auth
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!token || !userString) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userString);
    if (user.role !== 'STORE_OWNER') {
      navigate('/login');
    }
  }, [token, navigate]);

  // Load Dashboard Data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        sortBy,
        sortOrder
      });
      const res = await fetch(`http://localhost:5000/api/stores/owner-dashboard?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setData(resData.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  }, [token, sortBy, sortOrder]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleSort = (field: string) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(field);
  };

  const renderSortIndicator = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown size={14} className="sort-icon" style={{ opacity: 0.3 }} />;
    return sortOrder === 'asc' ? <ChevronUp size={14} className="sort-icon" /> : <ChevronDown size={14} className="sort-icon" />;
  };

  // Calculate rating breakdown distribution (1-5 stars)
  const getRatingDistribution = () => {
    if (!data) return [0, 0, 0, 0, 0];
    const dist = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5
    data.ratings.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        dist[r.rating - 1]++;
      }
    });
    return dist.reverse(); // Return 5, 4, 3, 2, 1
  };

  const distribution = getRatingDistribution();

  return (
    <div>
      {loading && !data ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Store Dashboard...</div>
      ) : data ? (
        <div>
          {/* Dashboard Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              {data.storeName}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome to your store management center. View customer ratings and comments.</p>
          </div>

          {/* Stats Section */}
          <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: '2.5rem' }}>
            {/* Big Rating Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2.5rem 1.5rem', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Store Average Rating
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>
                  {data.averageRating}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <div className="rating-stars" style={{ gap: '0.1rem' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        className={`star ${s <= Math.round(data.averageRating) ? 'filled' : ''}`}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>out of 5 stars</span>
                </div>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Users size={16} />
                <span>{data.totalRatings} customers rated this store</span>
              </div>
            </div>

            {/* Distribution Graph Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>Rating Breakdown</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                {distribution.map((count, index) => {
                  const starVal = 5 - index;
                  const percentage = data.totalRatings > 0 ? (count / data.totalRatings) * 100 : 0;
                  return (
                    <div key={starVal} style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', fontSize: '0.9rem' }}>
                      <span style={{ width: '60px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        {starVal} <Star size={12} className="star filled" />
                      </span>
                      
                      {/* Bar Container */}
                      <div style={{ flexGrow: 1, height: '8px', background: 'var(--bg-primary)', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--warning)', borderRadius: '9999px', transition: 'width 0.6s ease' }} />
                      </div>
                      
                      <span style={{ width: '35px', color: 'var(--text-secondary)', textAlign: 'right', fontWeight: 500 }}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Customer Reviews Table */}
          <div className="card" style={{ padding: '2rem 1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>Submitted Ratings Directory</h3>
            
            <div className="table-container" style={{ marginTop: 0 }}>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="sortable" onClick={() => handleSort('name')}>
                        Customer Name {renderSortIndicator('name')}
                      </th>
                      <th>Email Address</th>
                      <th>Address</th>
                      <th className="sortable" onClick={() => handleSort('rating')}>
                        Rating Given {renderSortIndicator('rating')}
                      </th>
                      <th className="sortable" onClick={() => handleSort('createdAt')}>
                        Submission Date {renderSortIndicator('createdAt')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.ratings.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                          No customer reviews have been submitted for your store yet.
                        </td>
                      </tr>
                    ) : (
                      data.ratings.map((review) => (
                        <tr key={review.id}>
                          <td style={{ fontWeight: 600 }}>{review.user.name}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                              <Mail size={14} />
                              {review.user.email}
                            </div>
                          </td>
                          <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                              <MapPin size={14} />
                              {review.user.address}
                            </div>
                          </td>
                          <td>
                            <span className="rating-badge">
                              <Star size={12} className="star filled" />
                              {review.rating}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                              <Calendar size={14} />
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--danger)' }}>
          Could not load dashboard data. Please try again.
        </div>
      )}
    </div>
  );
};
