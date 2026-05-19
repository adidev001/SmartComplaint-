import { useState } from 'react';

const DEPARTMENTS = [
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

export default function ComplaintForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: DEPARTMENTS[0],
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Submit Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            placeholder="E.g. Rahul Kumar" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="E.g. rahul@gmail.com" 
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Complaint Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="E.g. Water Leakage Issue" 
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            required 
            placeholder="E.g. Ghaziabad Market" 
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea 
            name="description" 
            required 
            rows="5"
            placeholder="Describe the issue in detail..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="spinner"></span> Analyzing...</>
          ) : (
            'Submit for Analysis'
          )}
        </button>
      </form>
    </div>
  );
}
