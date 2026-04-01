import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { 
  Shield, 
  Mail, 
  Lock, 
  LogIn,
  Eye,
  EyeOff,
  User
} from 'lucide-react';
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Premium Hero Section with Overlay Form */}
      <section className="hero position-relative">
        <Container className="hero-content position-relative z-2">
          <Row className="justify-content-center text-center py-5">
          
          </Row>
        </Container>
        
        {/* Overlay Login Form */}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3">
          <Card className="border-0 shadow-lg" style={{ minWidth: '400px', maxWidth: '450px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <Shield className="text-primary" size={32} />
                </div>
                <h2 className="h3 mb-3">Admin Login</h2>
                <p className="text-muted">Enter your admin credentials</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-4">
                  <Shield size={16} className="me-2" />
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <Mail size={16} className="me-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    <Lock size={16} className="me-2" />
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg border-end-0"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                      className="border-start-0"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn size={16} className="me-2" />
                      Login to Dashboard
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  <Shield size={14} className="me-1" />
                  Secure admin access - Authorized personnel only
                </small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
};

export default AdminLoginPage;
