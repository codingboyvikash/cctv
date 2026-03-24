import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDashboardStatsApi } from '../api/services';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Handle sidebar state from localStorage
    const savedState = localStorage.getItem('admin-sidebar-collapsed');
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    // Fetch dashboard stats for sidebar
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStatsApi();
        setStats(data.data);
      } catch (err) {
        console.error('Failed to fetch stats for sidebar:', err);
        // Set default values on error
        setStats({
          totalTickets: 0,
          openTickets: 0,
          inProgressTickets: 0,
          closedTickets: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    // Update main content margin when sidebar state changes
    const mainContent = document.querySelector('.admin-main-content');
    if (mainContent) {
      if (isCollapsed) {
        mainContent.style.marginLeft = '80px';
        mainContent.classList.add('sidebar-collapsed');
      } else {
        mainContent.style.marginLeft = '280px';
        mainContent.classList.remove('sidebar-collapsed');
      }
    }
  }, [isCollapsed]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      badge: null
    },
    {
      title: 'All Tickets',
      icon: FileText,
      // path: '/admin/tickets',
      badge: stats ? stats.openTickets.toString() : '0'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      // path: '/admin/analytics',
      badge: null
    },
    {
      title: 'Technicians',
      icon: Users,
      // path: '/admin/technicians',
      badge: null
    },
    {
      title: 'Reports',
      icon: TrendingUp,
      // path: '/admin/reports',
      badge: null
    },
    {
      title: 'Settings',
      icon: Settings,
      // path: '/admin/settings',
      badge: null
    }
  ];

  const quickStats = [
    { icon: Clock, label: 'Pending', value: stats ? stats.openTickets.toString() : '0', color: 'warning' },
    { icon: CheckCircle, label: 'Completed', value: stats ? stats.closedTickets.toString() : '0', color: 'success' }
  ];

  const handleLogout = () => {
    logout();
    // Redirect will be handled by AuthContext
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="admin-sidebar-overlay show"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <Shield size={32} className="text-primary" />
            {!isCollapsed && (
              <div className="admin-sidebar-brand">
                <span className="brand-text">Admin</span>
                <span className="brand-subtitle">Portal</span>
              </div>
            )}
          </div>
          
          {/* Toggle Buttons */}
          <div className="admin-sidebar-toggles">
            <button 
              className="admin-sidebar-toggle desktop-only"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <button 
              className="admin-sidebar-toggle mobile-only"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="admin-sidebar-profile">
          <div className="admin-profile-avatar">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=0a66c2&color=fff`} 
              alt="Profile" 
            />
          </div>
          {!isCollapsed && (
            <div className="admin-profile-info">
              <div className="admin-profile-name">{user?.name || 'Admin User'}</div>
              <div className="admin-profile-role">System Administrator</div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="admin-sidebar-stats">
            {loading ? (
              <div className="admin-stats-loading">
                <div className="spinner-border spinner-border-sm me-2" />
                Loading...
              </div>
            ) : (
              quickStats.map((stat, index) => (
                <div key={index} className="admin-stat-item">
                  <div className={`admin-stat-icon admin-stat-${stat.color}`}>
                    <stat.icon size={16} />
                  </div>
                  <div className="admin-stat-content">
                    <div className="admin-stat-value">{stat.value}</div>
                    <div className="admin-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-title">Main Menu</div>
            <ul className="admin-nav-list">
              {menuItems.map((item, index) => (
                <li key={index} className="admin-nav-item">
                  <Link 
                    to={item.path}
                    className={`admin-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="admin-nav-icon">
                      <item.icon size={20} />
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="admin-nav-text">{item.title}</span>
                        {item.badge && (
                          <span className="admin-nav-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          {!isCollapsed && (
            <div className="admin-nav-section">
              <div className="admin-nav-title">Support</div>
              <ul className="admin-nav-list">
                <li className="admin-nav-item">
                  <Link to="" className="admin-nav-link">
                    <div className="admin-nav-icon">
                      <HelpCircle size={20} />
                    </div>
                    <span className="admin-nav-text">Help Center</span>
                  </Link>
                </li>
                <li className="admin-nav-item">
                  <Link to="" className="admin-nav-link">
                    <div className="admin-nav-icon">
                      <Bell size={20} />
                    </div>
                    <span className="admin-nav-text">Notifications</span>
                    <span className="admin-nav-badge">3</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <button 
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
