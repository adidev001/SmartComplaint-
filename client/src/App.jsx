import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import ComplaintForm from './components/ComplaintForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComplaintList from './pages/ComplaintList';
import './index.css';

function SubmitComplaintView() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    setSuccessMsg('');
    setAnalysisData(null);
    
    try {
      const response = await axios.post('/api/complaints', formData);
      setSuccessMsg(response.data.message || 'Complaint submitted successfully!');
      
      if (response.data.complaint?.aiAnalysis) {
        setAnalysisData(response.data.complaint.aiAnalysis);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit complaint. Ensure backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="title">SmartComplaint</h1>
      <p className="subtitle">Civic Complaint Analysis Engine</p>

      {successMsg && (
        <div className="glass-panel animate-fade-in" style={{ background: 'rgba(34, 197, 94, 0.2)', borderColor: 'rgba(34, 197, 94, 0.5)', marginBottom: '2rem', color: '#86efac', textAlign: 'center' }}>
          {successMsg}
        </div>
      )}

      {error && (
        <div className="glass-panel" style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.5)', marginBottom: '2rem', color: '#fca5a5', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div className="app-container">
        <ComplaintForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        {analysisData && <AnalysisDashboard data={analysisData} />}
      </div>
    </>
  );
}

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<SubmitComplaintView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={
          <ProtectedRoute>
            <ComplaintList />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
