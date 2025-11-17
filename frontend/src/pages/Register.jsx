import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorType('');
    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      // Determine error type for styling
      if (errorMessage.toLowerCase().includes('username')) {
        setErrorType('username');
      } else if (errorMessage.toLowerCase().includes('email')) {
        setErrorType('email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Logo & Branding */}
        <div className="auth-logo-wrapper">
          <div className="auth-logo">
            <Wallet />
          </div>
          <h1 className="auth-brand">ExpenseTracker</h1>
          <p className="auth-tagline">Track your spending, grow your savings</p>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-title">Create account</h2>
            <p className="auth-description">Sign up to start tracking your expenses</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className={`error-message ${errorType === 'username' ? 'username-error' : errorType === 'email' ? 'email-error' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className={`form-input ${error && errorType === 'username' ? 'error' : ''}`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error && errorType === 'username') setError('');
                }}
                placeholder="Choose a username"
                required
                minLength={3}
              />
              {error && errorType === 'username' && (
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                  Try a different username
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-input ${error && errorType === 'email' ? 'error' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error && errorType === 'email') setError('');
                }}
                placeholder="you@example.com"
                required
              />
              {error && errorType === 'email' && (
                <p style={{ fontSize: '12px', color: '#f97316', marginTop: '4px' }}>
                  This email is already in use. Try logging in instead.
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Must be at least 6 characters
              </p>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-toggle">
            <button 
              type="button" 
              onClick={() => navigate('/login')}
              className="auth-toggle-btn"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="auth-features">
          <div className="feature-item">
            <TrendingUp className="feature-icon" />
            <span>Track Expenses</span>
          </div>
          <div className="feature-item">
            <Wallet className="feature-icon" />
            <span>Budget Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
