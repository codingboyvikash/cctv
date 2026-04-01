import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Phone, 
  BarChart3, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Settings,
  Shield
} from 'lucide-react';

const AdminLayout = () => {
  const { logout, adminAuth } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  if (!adminAuth?.token) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="admin-layout d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className={`sidebar bg-dark text-white ${sidebarOpen ? 'open' : 'collapsed'}`} style={{
        width: sidebarOpen ? '280px' : '70px',
        transition: 'all 0.3s ease',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        zIndex: 1000,
        overflow: 'hidden'
      }}>
        {/* Sidebar Header */}
        <div className="sidebar-header p-3 border-bottom border-secondary d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0052cc' }}>
          <div className={`d-flex align-items-center ${!sidebarOpen && 'd-none'}`}>
            <div className="bg-primary rounded-circle p-2 me-2">
              <Shield size={20} />
            </div>
            <div>
              <span className="fw-bold d-block">Admin PORTAL</span>
              <small className="text-white">Admin Panel</small>
            </div>
          </div>
          <button 
            className="btn btn-link text-white p-0" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Admin User Info */}
        {sidebarOpen && (
          <div className="p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center">
              <div className="bg-primary rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-white fw-bold">AD</span>
              </div>
              <div>
                <div className="fw-bold text-white">Admin User</div>
                <small className="text-white">System Administrator</small>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="mt-3 d-flex gap-2">
              <div className="bg-warning text-dark px-2 py-1 rounded" style={{ fontSize: '12px' }}>
                PENDING (2)
              </div>
              <div className="bg-success px-2 py-1 rounded" style={{ fontSize: '12px' }}>
                COMPLETED (1)
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="sidebar-nav p-3">
          {/* MAIN MENU Section */}
          {sidebarOpen && (
            <div className="text-white small mb-3 fw-bold">MAIN MENU</div>
          )}
          
          <div className="mb-2">
            <NavLink 
              to="/admin/dashboard" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center justify-content-between"
              style={{ backgroundColor: activeAccordion === 'dashboard' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('dashboard')}
            >
              <div className="d-flex align-items-center">
                <Home size={18} className={sidebarOpen ? "me-3" : ""} />
                {sidebarOpen && <span>Dashboard</span>}
              </div>
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/tickets" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center justify-content-between position-relative"
              style={{ backgroundColor: activeAccordion === 'tickets' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('tickets')}
            >
              <div className="d-flex align-items-center">
                <FileText size={18} className={sidebarOpen ? "me-3" : ""} />
                {sidebarOpen && <span>All Tickets</span>}
              </div>
              {sidebarOpen && (
                <span className="bg-danger rounded-circle px-2 py-1" style={{ fontSize: '10px', position: 'absolute', right: '10px', top: '8px' }}>2</span>
              )}
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/analytics" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center"
              style={{ backgroundColor: activeAccordion === 'analytics' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('analytics')}
            >
              <BarChart3 size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Analytics</span>}
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/technicians" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center"
              style={{ backgroundColor: activeAccordion === 'technicians' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('technicians')}
            >
              <Users size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Technicians</span>}
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/reports" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center"
              style={{ backgroundColor: activeAccordion === 'reports' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('reports')}
            >
              <FileText size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Reports</span>}
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/settings" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center"
              style={{ backgroundColor: activeAccordion === 'settings' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('settings')}
            >
              <Settings size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Settings</span>}
            </NavLink>
          </div>

          {/* SUPPORT Section */}
          {sidebarOpen && (
            <div className="text-white small mb-3 mt-4 fw-bold">SUPPORT</div>
          )}
          
          <div className="mb-2">
            <NavLink 
              to="/admin/help" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center"
              style={{ backgroundColor: activeAccordion === 'help' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('help')}
            >
              <Phone size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Help Center</span>}
            </NavLink>
          </div>

          <div className="mb-2">
            <NavLink 
              to="/admin/notifications" 
              className="nav-link text-white text-decoration-none p-2 rounded d-flex align-items-center justify-content-between position-relative"
              style={{ backgroundColor: activeAccordion === 'notifications' ? '#0d6efd' : 'transparent' }}
              onClick={() => setActiveAccordion('notifications')}
            >
              <div className="d-flex align-items-center">
                <Phone size={18} className={sidebarOpen ? "me-3" : ""} />
                {sidebarOpen && <span>Notifications</span>}
              </div>
              {sidebarOpen && (
                <span className="bg-danger rounded-circle px-2 py-1" style={{ fontSize: '10px', position: 'absolute', right: '10px', top: '8px' }}>3</span>
              )}
            </NavLink>
          </div>

          {/* Logout */}
          <div className="mt-4 pt-4 border-top border-secondary">
            <button 
              className="btn btn-danger text-white w-100 text-start p-2 d-flex align-items-center rounded"
              onClick={handleLogout}
            >
              <LogOut size={18} className={sidebarOpen ? "me-3" : ""} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <section className="admin-content flex-fill" style={{ marginLeft: sidebarOpen ? '280px' : '70px', transition: 'all 0.3s ease' }}>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
