import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { adminLoginApi } from '../../api/services';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    <section className="section admin-login-page">
      <div className="container narrow">
        <div className="card form-card">
          <h1>Admin Login</h1>
          <Alert type="error" message={error} />
          {loading && <Loader text="Authenticating..." />}
          <form onSubmit={handleSubmit} className="form-grid">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
