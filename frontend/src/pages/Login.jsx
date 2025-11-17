import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password.');
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
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-description">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
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
                className="form-input"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-toggle">
            <button 
              type="button" 
              onClick={() => navigate('/register')}
              className="auth-toggle-btn"
            >
              Don't have an account? Sign up
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

export default Login;
