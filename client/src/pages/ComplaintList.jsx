import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DEPARTMENTS = [
  "All Departments",
  "Water Supply Department",
  "Electricity Department",
  "Roads & Infrastructure Department",
  "Sanitation & Garbage Department",
  "Public Health Department",
  "Law & Order Department",
  "Municipal Corporation",
  "Parks & Recreation Department",
  "Transport Department",
  "General Administration"
];

const STATUSES = ["Pending", "In Progress", "Resolved"];

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [locationSearch, setLocationSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Departments');
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchComplaints();
    }
  }, [categoryFilter]);

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      let url = '/api/complaints';
      if (categoryFilter !== 'All Departments') {
        url += `?category=${encodeURIComponent(categoryFilter)}`;
      }
      const response = await axios.get(url, getHeaders());
      setComplaints(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch complaints.');
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!locationSearch.trim()) {
      fetchComplaints();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/complaints/search?location=${encodeURIComponent(locationSearch)}`, getHeaders());
      setComplaints(response.data);
    } catch (err) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/complaints/${id}`, { status: newStatus }, getHeaders());
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-low';
      case 'In Progress': return 'bg-high';
      default: return 'bg-medium';
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', fontWeight: 600 }}>Track Complaints</h2>

      {/* Filters & Search Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', flex: '1', minWidth: '300px', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Search by Location..." 
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            style={{ flex: 1, padding: '0.5rem 1rem' }}
          />
          <button type="submit" style={{ width: 'auto', padding: '0.5rem 1.5rem' }}>Search</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '250px' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Filter Category:</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.5rem 1rem' }}
          >
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div style={{ color: '#fca5a5', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <span className="spinner"></span> Loading Complaints...
        </div>
      ) : complaints.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No complaints registered yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {complaints.map(complaint => (
            <div key={complaint._id} className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{complaint.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>
                    By: <strong>{complaint.name}</strong> ({complaint.email}) | Location: <strong>{complaint.location}</strong>
                  </p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${getStatusBadgeClass(complaint.status)}`}>{complaint.status}</span>
                  <select 
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    style={{ width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    {STATUSES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p style={{ margin: '1rem 0', fontSize: '0.95rem' }}>{complaint.description}</p>

              {complaint.aiAnalysis && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
                      Priority: {complaint.aiAnalysis.priority}
                    </span>
                    <span className="tag" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#fdba74' }}>
                      Urgency: {complaint.aiAnalysis.urgency_score}/10
                    </span>
                    <span className="tag" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#86efac' }}>
                      Sentiment: {complaint.aiAnalysis.sentiment}
                    </span>
                  </div>
                  {complaint.aiAnalysis.summary && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      <strong>AI Summary:</strong> {complaint.aiAnalysis.summary}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
