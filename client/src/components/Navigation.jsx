import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      borderRadius: '12px'
    }}>
      <Link to="/" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        background: '-webkit-linear-gradient(45deg, #60a5fa, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        SmartComplaint
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
          Submit Complaint
        </Link>
        {user ? (
          <>
            <Link to="/list" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
              Track Complaints
            </Link>
            <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', opacity: 0.8 }}>
              Hi, {user.name}
            </span>
            <button 
              onClick={handleLogout} 
              style={{
                width: 'auto',
                padding: '0.4rem 1rem',
                fontSize: '0.9rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
