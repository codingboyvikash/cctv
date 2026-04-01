import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import HomePage from './pages/public/HomePage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ServicesPage from './pages/public/ServicesPage.jsx';
import TicketPage from './pages/public/TicketPage.jsx';
import TicketStatusPage from './pages/public/TicketStatusPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import TicketDetailsPage from './pages/admin/TicketDetailsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './styles/admin.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/ticket-status" element={<TicketStatusPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tickets/:id" element={<TicketDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
