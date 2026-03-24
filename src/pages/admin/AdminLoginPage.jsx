import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { adminLoginApi } from '../../api/services';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await adminLoginApi({ email, password });
      login(data.data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card admin-login-card animate-fadeInUp">
              <div className="card-body p-5">
                {/* Logo and Header */}
                <div className="text-center mb-4">
                  <div className="admin-login-icon mb-3">
                    <Shield size={48} className="text-primary" />
                  </div>
                  <h1 className="admin-login-title">Admin Portal</h1>
                  <p className="admin-login-subtitle">Sign in to manage your IT support system</p>
                </div>

                {/* Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4 animate-slideInLeft">
                    <AlertCircle size={20} className="me-2" />
                    {error}
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="text-center mb-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Authenticating...</span>
                    </div>
                    <p className="mt-2 text-muted">Authenticating...</p>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="admin-login-form">
                  <div className="form-group mb-4">
                    <label className="form-label">
                      <Mail size={18} className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">
                      <Lock size={18} className="me-2" />
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn admin-login-btn w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Shield size={18} className="me-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted small">
                    Secure Admin Access • IT Support Management System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
