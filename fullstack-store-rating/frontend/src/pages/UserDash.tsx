import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, ArrowUpDown, ShieldAlert, CheckCircle, Edit3, Plus } from 'lucide-react';

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  overallRating: number;
  totalRatings: number;
  userSubmittedRating: number | null;
}

export const UserDash: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Rating Modal state
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  
  // Feedback state
  const [toast, setToast] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Verify auth
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!token || !userString) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userString);
    if (user.role !== 'NORMAL') {
      navigate('/login');
    }
  }, [token, navigate]);

  // Load stores
  const fetchStores = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        search,
        sortBy,
        sortOrder
      });
      const res = await fetch(`http://localhost:5000/api/stores?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setStores(data.data);
      }
    } catch (err) {
      console.error('Failed to load stores', err);
    }
  }, [token, search, sortBy, sortOrder]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Open modal for rating
  const openRatingModal = (store: Store) => {
    setSelectedStore(store);
    setSelectedRating(store.userSubmittedRating || 5); // default to existing or 5
    setRatingModalOpen(true);
  };

  // Submit/Modify rating
  const handleRatingSubmit = async () => {
    if (!selectedStore) return;
    setLoading(true);
    setToast(null);

    const isModify = selectedStore.userSubmittedRating !== null;
    const url = 'http://localhost:5000/api/ratings';
    const method = isModify ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          storeId: selectedStore.id,
          rating: selectedRating
        })
      });

      const data = await res.json();

      if (data.status === 'success') {
        setToast({
          type: 'success',
          text: `${isModify ? 'Updated' : 'Submitted'} rating for ${selectedStore.name}!`
        });
        setRatingModalOpen(false);
        fetchStores(); // reload
      } else {
        setToast({ type: 'danger', text: data.message || 'Rating submission failed.' });
      }
    } catch (err) {
      setToast({ type: 'danger', text: 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(field);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800 }}>Explore Stores</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Search stores, view their overall ratings, and submit your reviews</p>
        </div>
      </div>

      {toast && (
        <div className={`alert alert-${toast.type}`} style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Controls: Search and Sort */}
      <div className="controls-row" style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search stores by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Sort By:</span>
          
          <button 
            className={`btn btn-sm ${sortBy === 'name' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('name')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Name
            {sortBy === 'name' && <ArrowUpDown size={12} />}
          </button>

          <button 
            className={`btn btn-sm ${sortBy === 'address' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('address')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Address
            {sortBy === 'address' && <ArrowUpDown size={12} />}
          </button>

          <button 
            className={`btn btn-sm ${sortBy === 'overallRating' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('overallRating')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Rating
            {sortBy === 'overallRating' && <ArrowUpDown size={12} />}
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </span>
        </div>
      </div>

      {/* Stores Cards Grid */}
      {stores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No stores found matching your criteria.
        </div>
      ) : (
        <div className="store-grid">
          {stores.map((store) => (
            <div className="store-card" key={store.id}>
              <div className="store-card-body">
                <div className="store-title-row">
                  <h3 className="store-name">{store.name}</h3>
                </div>
                
                <p className="store-address">
                  <MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom', color: 'var(--text-muted)' }} />
                  {store.address}
                </p>

                <div className="store-ratings-info">
                  <div className="store-rating-row">
                    <span className="rating-label">Overall Platform Rating</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="rating-badge">
                        <Star size={12} className="star filled" />
                        {store.overallRating > 0 ? store.overallRating : 'N/A'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ({store.totalRatings} ratings)
                      </span>
                    </div>
                  </div>

                  <div className="store-rating-row">
                    <span className="rating-label">My Rating</span>
                    {store.userSubmittedRating !== null ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`star ${s <= (store.userSubmittedRating || 0) ? 'filled' : ''}`} 
                              style={{ width: '12px', height: '12px' }} 
                            />
                          ))}
                        </div>
                        <span>({store.userSubmittedRating} / 5)</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Not rated yet
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="store-card-footer">
                <button 
                  onClick={() => openRatingModal(store)}
                  className={`btn btn-sm ${store.userSubmittedRating !== null ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%' }}
                >
                  {store.userSubmittedRating !== null ? (
                    <>
                      <Edit3 size={14} />
                      Modify My Rating
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Rate This Store
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RATING SUBMIT/MODIFY DIALOG MODAL */}
      {ratingModalOpen && selectedStore && (
        <div className="modal-overlay" onClick={() => setRatingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                {selectedStore.userSubmittedRating !== null ? 'Modify Rating' : 'Submit Rating'}
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setRatingModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body" style={{ textAlign: 'center', padding: '1rem 0' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                How would you rate your experience with <strong style={{ color: 'var(--text-primary)' }}>{selectedStore.name}</strong>?
              </p>

              {/* Large Star Input */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <Star
                    key={starVal}
                    className={`star interactive ${
                      starVal <= (hoverRating !== null ? hoverRating : selectedRating) ? 'filled' : ''
                    }`}
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => setSelectedRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(null)}
                  />
                ))}
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--warning)', height: '24px' }}>
                {selectedRating === 1 && '1 Star - Poor'}
                {selectedRating === 2 && '2 Stars - Fair'}
                {selectedRating === 3 && '3 Stars - Good'}
                {selectedRating === 4 && '4 Stars - Very Good'}
                {selectedRating === 5 && '5 Stars - Excellent!'}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setRatingModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleRatingSubmit}
                disabled={loading || selectedRating === 0}
              >
                {loading ? 'Submitting...' : 'Save Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
