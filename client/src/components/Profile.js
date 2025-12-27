import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profile: {
      phone: user?.profile?.phone || '',
      college: user?.profile?.college || '',
      branch: user?.profile?.branch || '',
      graduationYear: user?.profile?.graduationYear || '',
      targetExam: user?.profile?.targetExam || 'GATE-2026'
    }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    // Phone validation
    if (formData.profile.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.profile.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Graduation year validation
    if (formData.profile.graduationYear) {
      const year = parseInt(formData.profile.graduationYear);
      if (isNaN(year) || year < 2020 || year > 2030) {
        newErrors.graduationYear = 'Graduation year must be between 2020 and 2030';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name] || errors[name.split('.')[1]]) {
      const newErrors = { ...errors };
      if (name.startsWith('profile.')) {
        delete newErrors[name.split('.')[1]];
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
    }

    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Please fix the validation errors before submitting.'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message || 'Profile updated successfully!'
        });
        setIsEditing(false);
        setErrors({}); // Clear all errors

        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Failed to update profile'
        });
        
        // If there are server-side validation errors, show them
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach(error => {
            if (error.path) {
              const fieldName = error.path.replace('profile.', '');
              serverErrors[fieldName] = error.msg;
            }
          });
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <Header />
      
      <main className="profile-main">
        <div className="container">
          <div className="profile-header">
            <h1>My Profile</h1>
            <p>Manage your account information and preferences</p>
          </div>

          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <div className="avatar-info">
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                  <span className="user-role">{user?.role || 'Student'}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
                {message.text && (
                  <div className={`message ${message.type}`}>
                    <span className="message-icon">
                      {message.type === 'success' ? '✅' : '❌'}
                    </span>
                    {message.text}
                  </div>
                )}

                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                      />
                      <small>Email cannot be changed</small>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile.phone">Phone Number</label>
                      <input
                        type="tel"
                        id="profile.phone"
                        name="profile.phone"
                        value={formData.profile.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="profile.college">College/University</label>
                      <input
                        type="text"
                        id="profile.college"
                        name="profile.college"
                        value={formData.profile.college}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter your college name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile.branch">Branch/Department</label>
                      <input
                        type="text"
                        id="profile.branch"
                        name="profile.branch"
                        value={formData.profile.branch}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="profile.graduationYear">Graduation Year</label>
                      <select
                        id="profile.graduationYear"
                        name="profile.graduationYear"
                        value={formData.profile.graduationYear}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={errors.graduationYear ? 'error' : ''}
                      >
                        <option value="">Select Year</option>
                        {[2024, 2025, 2026, 2027, 2028].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.graduationYear && <span className="error-message">{errors.graduationYear}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile.targetExam">Target Exam</label>
                      <select
                        id="profile.targetExam"
                        name="profile.targetExam"
                        value={formData.profile.targetExam}
                        onChange={handleChange}
                        disabled={!isEditing}
                      >
                        <option value="GATE-2025">GATE 2025</option>
                        <option value="GATE-2026">GATE 2026</option>
                        <option value="GATE-2027">GATE 2027</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  {!isEditing ? (
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => {
                        setIsEditing(true);
                        setErrors({}); // Clear any previous errors
                      }}
                    >
                      <span className="btn-icon">✏️</span>
                      Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setIsEditing(false);
                          setErrors({}); // Clear all errors
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            profile: {
                              phone: user?.profile?.phone || '',
                              college: user?.profile?.college || '',
                              branch: user?.profile?.branch || '',
                              graduationYear: user?.profile?.graduationYear || '',
                              targetExam: user?.profile?.targetExam || 'GATE-2026'
                            }
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-btn" disabled={loading}>
                        <span className="btn-icon">
                          {loading ? '⏳' : '💾'}
                        </span>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="stats-card">
              <h3>Your Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-icon">📝</span>
                  <div className="stat-info">
                    <span className="stat-value">{user?.stats?.totalQuizzes || 0}</span>
                    <span className="stat-label">Total Quizzes</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🎯</span>
                  <div className="stat-info">
                    <span className="stat-value">{user?.accuracy || 0}%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">⏱️</span>
                  <div className="stat-info">
                    <span className="stat-value">{user?.stats?.totalTimeSpent || 0}</span>
                    <span className="stat-label">Minutes Studied</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">📊</span>
                  <div className="stat-info">
                    <span className="stat-value">{user?.stats?.averageScore || 0}%</span>
                    <span className="stat-label">Average Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
