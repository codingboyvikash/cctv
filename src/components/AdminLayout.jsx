import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Handle sidebar state in localStorage
    const savedState = localStorage.getItem('admin-sidebar-collapsed');
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState));
    }

    // Listen for sidebar toggle events
    const handleStorageChange = (e) => {
      if (e.key === 'admin-sidebar-collapsed') {
        setIsCollapsed(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className={`admin-main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
