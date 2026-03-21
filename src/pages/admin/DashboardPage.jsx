import { useEffect, useState } from 'react';
import { getDashboardStatsApi, getTicketsApi } from '../../api/services';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import StatsCard from '../../components/StatsCard';
import TicketTable from '../../components/TicketTable';

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
    <div>
      <h1>Admin Dashboard</h1>
      <Alert type="error" message={error} />
      {stats && (
        <div className="grid stats-grid">
          <StatsCard label="Total Tickets" value={stats.totalTickets} />
          <StatsCard label="Open Tickets" value={stats.openTickets} />
          <StatsCard label="In Progress" value={stats.inProgressTickets} />
          <StatsCard label="Closed Tickets" value={stats.closedTickets} />
        </div>
      )}

      <div className="card filter-card">
        <form className="filters" onSubmit={handleFilterSubmit}>
          <input placeholder="Search ticket/customer" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <select value={filters.serviceType} onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}>
            <option value="">All Services</option>
            <option value="CCTV">CCTV</option>
            <option value="IT">IT</option>
            <option value="Printer">Printer</option>
            <option value="AMC">AMC</option>
            <option value="Other">Other</option>
          </select>
          <button className="btn" type="submit">Apply Filters</button>
        </form>
      </div>

      {loading ? <Loader text="Refreshing tickets..." /> : <TicketTable tickets={tickets} />}
    </div>
  );
};

export default DashboardPage;
