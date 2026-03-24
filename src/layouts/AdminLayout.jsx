import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout, adminAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <p>{adminAuth?.admin?.name}</p>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </aside> */}
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
