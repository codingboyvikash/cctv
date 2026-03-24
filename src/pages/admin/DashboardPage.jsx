import { useEffect, useState } from 'react';
import { BarChart3, Users, Clock, CheckCircle, Search, Filter, RefreshCw, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { getDashboardStatsApi, getTicketsApi } from '../../api/services';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import StatsCard from '../../components/StatsCard';
import TicketTable from '../../components/TicketTable';
import AdminLayout from '../../components/AdminLayout';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', serviceType: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, ticketsRes] = await Promise.all([
        getDashboardStatsApi(),
        getTicketsApi(filters),
      ]);
      setStats(statsRes.data.data);
      setTickets(ticketsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getTicketsApi(filters);
      setTickets(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to filter tickets.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) return <Loader text="Loading dashboard..." />;

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        {/* Dashboard Header */}
        <div className="admin-dashboard-header">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="admin-dashboard-title">Admin Dashboard</h1>
              <p className="admin-dashboard-subtitle">Manage your IT support system efficiently</p>
            </div>
            <button className="btn btn-outline-primary" onClick={fetchData} disabled={loading}>
              <RefreshCw size={18} className={`me-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          
          <Alert type="error" message={error} />
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="admin-stats-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <div className="admin-stats-icon admin-stats-total">
                  <BarChart3 size={32} />
                </div>
                <div className="admin-stats-content">
                  <h3 className="admin-stats-number">{stats.totalTickets}</h3>
                  <p className="admin-stats-label">Total Tickets</p>
                  <div className="admin-stats-trend">
                    <TrendingUp size={16} />
                    <span>12% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="admin-stats-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="admin-stats-icon admin-stats-open">
                  <Clock size={32} />
                </div>
                <div className="admin-stats-content">
                  <h3 className="admin-stats-number">{stats.openTickets}</h3>
                  <p className="admin-stats-label">Open Tickets</p>
                  <div className="admin-stats-trend">
                    <AlertTriangle size={16} />
                    <span>Needs attention</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="admin-stats-card animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="admin-stats-icon admin-stats-progress">
                  <Activity size={32} />
                </div>
                <div className="admin-stats-content">
                  <h3 className="admin-stats-number">{stats.inProgressTickets}</h3>
                  <p className="admin-stats-label">In Progress</p>
                  <div className="admin-stats-trend">
                    <Activity size={16} />
                    <span>Being handled</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="admin-stats-card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="admin-stats-icon admin-stats-closed">
                  <CheckCircle size={32} />
                </div>
                <div className="admin-stats-content">
                  <h3 className="admin-stats-number">{stats.closedTickets}</h3>
                  <p className="admin-stats-label">Closed Tickets</p>
                  <div className="admin-stats-trend">
                    <CheckCircle size={16} />
                    <span>Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="admin-filter-card animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="admin-filter-header">
            <h5 className="admin-filter-title">
              <Filter size={20} className="me-2" />
              Filter Tickets
            </h5>
          </div>
          <form onSubmit={handleFilterSubmit} className="admin-filter-form">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="admin-input-group">
                  <Search size={18} className="admin-input-icon" />
                  <input
                    placeholder="Search ticket/customer"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="form-control admin-filter-input"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <select 
                  value={filters.status} 
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="form-select admin-filter-select"
                >
                  <option value="">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select 
                  value={filters.serviceType} 
                  onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
                  className="form-select admin-filter-select"
                >
                  <option value="">All Services</option>
                  <option value="Computer Repair">Computer Repair</option>
                  <option value="CCTV Installation">CCTV Installation</option>
                  <option value="Network Setup">Network Setup</option>
                  <option value="AMC Plan">AMC Plan</option>
                  <option value="Printer Service">Printer Service</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <button type="submit" className="admin-filter-btn w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Filtering...
                    </>
                  ) : (
                    <>
                      <Filter size={18} className="me-2" />
                      Apply
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tickets Table */}
        <div className="admin-tickets-section animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="admin-tickets-header">
            <h5 className="admin-tickets-title">
              Recent Tickets
            </h5>
            <div className="admin-tickets-count">
              <span className="badge bg-primary">{tickets.length}</span> tickets
            </div>
          </div>
          <div className="admin-tickets-table-wrapper">
            <TicketTable tickets={tickets} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
