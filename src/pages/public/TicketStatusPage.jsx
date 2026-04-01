import { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { 
  Search, 
  Ticket, 
  User, 
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
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

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'in progress':
        return 'bg-primary';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={20} />;
      case 'in progress':
        return <Clock size={20} />;
      case 'pending':
        return <AlertCircle size={20} />;
      case 'cancelled':
        return <AlertCircle size={20} />;
      default:
        return <Ticket size={20} />;
    }
  };

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero position-relative">
        <Container className="hero-content position-relative z-2">
          <Row className="justify-content-center text-center py-5">
            <Col lg={8}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
                  <Search className="text-primary-light" size={24} />
                  <span className="eyebrow">Ticket Tracking System</span>
                </div>
                
                <h1 className="hero-title mb-4">
                  Track Your Service
                  <span className="gradient-text">Ticket Status</span>
                </h1>
                
                <p className="hero-subtitle mb-0">
                  Check the real-time status of your service tickets. Enter your ticket number 
                  and contact details to get instant updates on your IT and CCTV service requests.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3 mb-3">Check Ticket Status</h2>
                    <p className="text-muted">Enter your ticket details to track the status</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="ticketNumber" className="form-label fw-semibold">
                        <Ticket size={16} className="me-2" />
                        Ticket Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="ticketNumber"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        placeholder="e.g., TK-2024-001"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="contact" className="form-label fw-semibold">
                        <Phone size={16} className="me-2" />
                        Mobile Number or Email
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter your contact details"
                        required
                      />
                    </div>

                    {error && (
                      <Alert variant="danger" className="mb-4">
                        <AlertCircle size={16} className="me-2" />
                        {error}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <Search size={16} className="me-2" />
                          CHECK STATUS
                        </>
                      )}
                    </Button>
                  </form>
                </Card.Body>
              </Card>

              {ticket && (
                <Card className="border-0 shadow-lg mt-4">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          {getStatusIcon(ticket.status)}
                        </div>
                        <div>
                          <h4 className="h5 mb-1">Ticket Details</h4>
                          <p className="text-muted mb-0">{ticket.ticketNumber}</p>
                        </div>
                      </div>
                      <span className={`badge ${getStatusBadgeClass(ticket.status)} fs-6`}>
                        {ticket.status}
                      </span>
                    </div>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <small className="text-muted d-block mb-1">
                            <User size={14} className="me-1" />
                            Customer Name
                          </small>
                          <strong>{ticket.customerName}</strong>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted d-block mb-1">
                            <Ticket size={14} className="me-1" />
                            Service Type
                          </small>
                          <strong>{ticket.serviceType}</strong>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <small className="text-muted d-block mb-1">
                            <User size={14} className="me-1" />
                            Assigned Technician
                          </small>
                          <strong>{ticket.assignedTechnician || 'Pending assignment'}</strong>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted d-block mb-1">
                            <Mail size={14} className="me-1" />
                            Problem Description
                          </small>
                          <p className="mb-0 small">{ticket.problemDescription}</p>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="mb-0">
                          <small className="text-muted d-block mb-1">
                            <Phone size={14} className="me-1" />
                            Service Address
                          </small>
                          <p className="mb-0 small">{ticket.address}</p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TicketStatusPage;
