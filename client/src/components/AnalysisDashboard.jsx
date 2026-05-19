export default function AnalysisDashboard({ data }) {
  if (!data) return null;

  const getPriorityColor = (priority) => {
    switch(priority?.toUpperCase()) {
      case 'CRITICAL': return 'bg-critical';
      case 'HIGH': return 'bg-high';
      case 'MEDIUM': return 'bg-medium';
      default: return 'bg-low';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment?.toUpperCase()) {
      case 'URGENT': return 'bg-urgent';
      case 'FRUSTRATED': return 'bg-frustrated';
      case 'SATISFIED': return 'bg-satisfied';
      default: return 'bg-neutral';
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>AI Analysis Results</h2>
      
      <div className="dashboard-grid">
        <div className="stat-box">
          <div className="stat-label">Priority</div>
          <div className={`badge ${getPriorityColor(data.priority)}`}>{data.priority}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Sentiment</div>
          <div className={`badge ${getSentimentColor(data.sentiment)}`}>{data.sentiment}</div>
        </div>
        
        <div className="stat-box full-width">
          <div className="stat-label">Department Routed To</div>
          <div className="stat-value">{data.department}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Urgency Score</div>
          <div className="stat-value">{data.urgency_score} / 10</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Est. Resolution</div>
          <div className="stat-value">{data.estimated_resolution_days} Days</div>
        </div>
        
        <div className="stat-box full-width">
          <div className="stat-label">AI Summary</div>
          <div className="stat-value" style={{ fontSize: '1rem', fontWeight: 400 }}>{data.summary}</div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="stat-label">Tags</div>
        <div>
          {data.tags?.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="response-box">
        <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Auto Response Draft</div>
        <p>{data.auto_response}</p>
      </div>
    </div>
  );
}
