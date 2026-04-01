import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner, Form } from 'react-bootstrap';
import { 
  BarChart3, 
  Users, 
  Ticket, 
  TrendingUp,
  Filter,
  Search,
  Settings,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Home,
  FileText,
  Phone,
  Mail,
  MapPin,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { getDashboardStatsApi, getTicketsApi } from '../../api/services';
import StatsCard from '../../components/StatsCard';
import TicketTable from '../../components/TicketTable';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', serviceType: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
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
      console.error('Dashboard fetch error:', err);
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

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const refreshData = () => {
    fetchData();
  };

  if (loading && !stats) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <div className="admin-panel-container p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="header bg-white shadow-sm p-4 mb-4 rounded">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 mb-1 fw-bold">Admin Dashboard</h1>
            <p className="text-muted mb-0">Manage your IT support system efficiently</p>
          </div>
          <Button variant="outline-primary" onClick={refreshData} className="d-flex align-items-center">
            <RefreshCw size={16} className="me-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        {error && (
          <Alert variant="danger" className="mb-4">
            <AlertCircle size={16} className="me-2" />
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-primary bg-opacity-10 rounded p-2">
                      <BarChart3 className="text-primary" size={24} />
                    </div>
                    <span className="text-muted small">12% from last month</span>
                  </div>
                  <h3 className="mb-0 fw-bold">{stats.totalTickets || 5}</h3>
                  <p className="text-muted mb-0">TOTAL TICKETS</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-warning bg-opacity-10 rounded p-2">
                      <Clock className="text-warning" size={24} />
                    </div>
                    <span className="text-muted small">Needs attention</span>
                  </div>
                  <h3 className="mb-0 fw-bold">{stats.openTickets || 2}</h3>
                  <p className="text-muted mb-0">OPEN TICKETS</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-info bg-opacity-10 rounded p-2">
                      <Activity className="text-info" size={24} />
                    </div>
                    <span className="text-muted small">Being handled</span>
                  </div>
                  <h3 className="mb-0 fw-bold">{stats.inProgressTickets || 2}</h3>
                  <p className="text-muted mb-0">IN PROGRESS</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="bg-success bg-opacity-10 rounded p-2">
                      <CheckCircle className="text-success" size={24} />
                    </div>
                    <span className="text-muted small">Resolved</span>
                  </div>
                  <h3 className="mb-0 fw-bold">{stats.closedTickets || 1}</h3>
                  <p className="text-muted mb-0">CLOSED TICKETS</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Filters Section */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0 fw-bold">Filter Tickets</h5>
            </div>
            
            <Form onSubmit={handleFilterSubmit}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="text-muted small">Search ticket/customer</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Search size={16} />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Search ticket/customer"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="text-muted small">All Status</Form.Label>
                    <Form.Select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="text-muted small">All Services</Form.Label>
                    <Form.Select
                      value={filters.serviceType}
                      onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                    >
                      <option value="">All Services</option>
                      <option value="CCTV">CCTV</option>
                      <option value="IT">IT Support</option>
                      <option value="Printer">Printer</option>
                      <option value="AMC">AMC</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={2}>
                  <Form.Group className="d-flex align-items-end">
                    <Button type="submit" variant="primary" className="w-100">
                      APPLY
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Recent Tickets */}
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <FileText className="text-primary me-2" size={20} />
                <h5 className="mb-0 fw-bold">Recent Tickets</h5>
              </div>
              <div className="text-muted small">
                <Eye size={14} className="me-1" />
                Showing {tickets.length} tickets
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <p className="text-muted">Loading tickets...</p>
              </div>
            ) : (
              <TicketTable tickets={tickets} />
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
