import { useState } from 'react';
import { Search, CheckCircle, User, Phone, MapPin, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { checkTicketStatusApi } from '../../api/services';

const TicketStatusPage = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTicket(null);

    try {
      const { data } = await checkTicketStatusApi({ ticketNumber, contact });
      setTicket(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch ticket status.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    let variant = 'info';
    let icon = Clock;
    
    if (statusLower === 'completed') {
      variant = 'success';
      icon = CheckCircle;
    } else if (statusLower === 'in progress' || statusLower === 'pending') {
      variant = 'warning';
      icon = Clock;
    } else if (statusLower === 'cancelled') {
      variant = 'danger';
      icon = AlertCircle;
    }

    return (
      <Badge bg={variant} className="px-3 py-2 d-inline-flex align-items-center gap-2">
        <icon size={16} />
        {status || 'Unknown'}
      </Badge>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100 g-5">
            <Col lg={6}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Search className="text-primary-light" size={20} />
                  <span className="eyebrow">Track Your Service Request</span>
                </div>
                
                <h1 className="hero-title">
                  Check Ticket
                  <span className="gradient-text">Status</span>
                </h1>
                
                <p className="hero-subtitle">
                  Enter your ticket number and contact information to track the real-time status 
                  of your service request and get updates from our technical team.
                </p>
                
                <div className="d-flex flex-wrap gap-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => document.getElementById('status-form').scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Search className="me-2" size={18} />
                    Track Ticket
                  </Button>
                  
                  <Button variant="outline-light" size="lg" href="/ticket">
                    Create New Ticket
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="glass-effect animate-slideInLeft">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center stat-icon mb-3">
                      <Search size={48} />
                    </div>
                    <h3 className="fw-bold text-white mb-3">Real-time Tracking</h3>
                    <Badge bg="info" className="mb-3">
                      Instant Status Updates
                    </Badge>
                  </div>

                  <p className="text-center text-white mb-4">
                    Monitor your service requests with our advanced ticket tracking system. 
                    Get instant updates on technician assignment and service progress.
                  </p>

                  <div className="d-flex justify-content-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="fw-bold text-warning display-6">24/7</div>
                      <div className="text-white-50 small">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold text-success display-6">Live</div>
                      <div className="text-white-50 small">Tracking</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold text-info display-6">Fast</div>
                      <div className="text-white-50 small">Updates</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => document.getElementById('status-form').scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Search className="me-2" size={16} />
                      Start Tracking
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Status Check Form */}
      <section className="py-5 bg-light" id="status-form">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-4 py-2 fs-6 fw-bold">
              <Search className="me-2" size={18} />
              Ticket Status Check
            </Badge>
            <h2 className="display-4 fw-bold mb-4">
              Track Your <span className="text-primary">Service Request</span>
            </h2>
            <p className="lead text-muted mb-0">
              Enter your ticket details below to get real-time status updates.
            </p>
          </div>
                
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <Alert type="error" message={error} />
                  {loading && <Loader text="Checking ticket status..." />}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <Search className="me-2" size={18} />
                        Ticket Number
                      </label>
                      <input
                        type="text"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        className="form-control form-control-lg"
                        placeholder="Enter your ticket number (e.g., TK-2024-001)"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <Phone className="me-2" size={18} />
                        Contact Information
                      </label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="form-control form-control-lg"
                        placeholder="Mobile number or email address"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? 'Checking...' : 'Check Status'}
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Ticket Results */}
      {ticket && (
        <section className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <Card className="border-success shadow-lg">
                  <Card.Header className="bg-success text-white">
                    <div className="d-flex align-items-center">
                      <CheckCircle size={24} className="me-2" />
                      <h4 className="mb-0 text-white">Ticket Found</h4>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <div className="text-center mb-4">
                      <h5 className="text-muted mb-2">Ticket Number</h5>
                      <div className="display-6 fw-bold text-primary">{ticket.ticketNumber}</div>
                    </div>

                    <Row className="g-4">
                      <Col md={6}>
                        <div className="d-flex align-items-start mb-3">
                          <User className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Customer Name</h6>
                            <p className="text-muted mb-0">{ticket.customerName}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="d-flex align-items-start mb-3">
                          <MessageSquare className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Service Type</h6>
                            <p className="text-muted mb-0">{ticket.serviceType}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="d-flex align-items-start mb-3">
                          <Clock className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Status</h6>
                            <div className="mt-2">{getStatusBadge(ticket.status)}</div>
                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="d-flex align-items-start mb-3">
                          <User className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Assigned Technician</h6>
                            <p className="text-muted mb-0">{ticket.assignedTechnician || 'Pending assignment'}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="d-flex align-items-start mb-3">
                          <MessageSquare className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Problem Description</h6>
                            <p className="text-muted mb-0">{ticket.problemDescription}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="d-flex align-items-start mb-3">
                          <MapPin className="text-primary me-3 mt-1" size={20} />
                          <div>
                            <h6 className="fw-semibold mb-1">Service Address</h6>
                            <p className="text-muted mb-0">{ticket.address}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="text-center mt-4">
                      <Button variant="outline-primary" href="/ticket">
                        Create New Ticket
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default TicketStatusPage;
