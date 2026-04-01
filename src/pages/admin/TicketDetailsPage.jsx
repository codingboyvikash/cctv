import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleTicketApi, updateTicketApi } from '../../api/services';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Save,
  Calendar
} from 'lucide-react';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({ status: 'Open', assignedTechnician: '', note: '' });

  
  const fetchTicket = async () => {
    setLoading(true);
    try {
      const { data } = await getSingleTicketApi(id);
      setTicket(data.data);
      setFormData({
        status: data.data.status,
        assignedTechnician: data.data.assignedTechnician || '',
        note: '',
      });
    } catch (err) {
      console.error('Ticket fetch error:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load ticket.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await updateTicketApi(id, formData);
      setTicket(data.data);
      setFormData(prev => ({ ...prev, note: '' }));
      setMessage({ type: 'success', text: data.message });
    } catch (err) {
      console.error('Ticket update error:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <Badge bg="warning" className="text-dark">Open</Badge>;
      case 'In Progress':
        return <Badge bg="info">In Progress</Badge>;
      case 'Closed':
        return <Badge bg="success">Closed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading && !ticket) return <Loader text="Loading ticket details..." />;
  if (!ticket) return <Alert type="error" message="Ticket not found." />;

  return (
    <div className="admin-panel-container p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          className="me-3" 
          onClick={() => navigate('/admin/dashboard')}
        >
          <ArrowLeft size={16} className="me-2" />
          Back
        </Button>
        <div>
          <h1 className="h3 mb-1 fw-bold">Ticket #{ticket.ticketNumber}</h1>
          <p className="text-muted mb-0">Ticket Details and Management</p>
        </div>
      </div>

      {message.text && (
        <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mb-4">
          {message.text}
        </Alert>
      )}

      <Row>
        {/* Customer Information Card */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex align-items-center">
                <User className="text-primary me-2 text-white" size={20} />
                <h5 className="mb-0 fw-bold text-white">Customer Information</h5>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-3">
                <label className="text-muted small">Customer Name</label>
                <div className="fw-medium">{ticket.customerName}</div>
              </div>
              
              <div className="mb-3">
                <label className="text-muted small">Mobile Number</label>
                <div className="d-flex align-items-center">
                  <Phone size={16} className="text-muted me-2" />
                  <span>{ticket.mobileNumber}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="text-muted small">Email Address</label>
                <div className="d-flex align-items-center">
                  <Mail size={16} className="text-muted me-2" />
                  <span>{ticket.email}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="text-muted small">Service Type</label>
                <div className="d-flex align-items-center">
                  <Settings size={16} className="text-muted me-2" />
                  <span>{ticket.serviceType}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="text-muted small">Address</label>
                <div className="d-flex align-items-center">
                  <MapPin size={16} className="text-muted me-2" />
                  <span>{ticket.address}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="text-muted small">Status</label>
                <div>
                  {getStatusBadge(ticket.status)}
                </div>
              </div>
              
              <div>
                <label className="text-muted small">Created Date</label>
                <div className="d-flex align-items-center">
                  <Calendar size={16} className="text-muted me-2" />
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Problem Description Card */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex align-items-center">
                <FileText className="text-primary me-2 text-white" size={20} />
                <h5 className="mb-0 fw-bold text-white">Problem Description</h5>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="bg-light p-3 rounded" style={{ minHeight: '200px' }}>
                <p className="mb-0">{ticket.problemDescription}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Update Ticket Section */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex align-items-center">
            <Activity className="text-white me-2" size={20} />
            <h5 className="mb-0 fw-bold text-white">Update Ticket</h5>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleUpdate}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-muted small">Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-muted small">Assigned Technician</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter technician name"
                    value={formData.assignedTechnician}
                    onChange={(e) => setFormData({ ...formData, assignedTechnician: e.target.value })}
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-muted small">Add Note/Remark</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter note or remark"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="mt-4">
              <Button type="submit" variant="primary" className="px-4">
                <Save  size={16} className="me-2 " />
                Update Ticket
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Remarks/Notes Section */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex align-items-center">
            <FileText className="text-white me-2" size={20} />
            <h5 className="mb-0 fw-bold text-white">Remarks / Notes</h5>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          {ticket.notes?.length ? (
            <div className="space-y-3">
              {ticket.notes.map((note, index) => (
                <div key={`${note.createdAt}-${index}`} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <strong className="text-primary">{note.addedBy}</strong>
                    <small className="text-muted">
                      {new Date(note.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <p className="mb-0">{note.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <FileText size={48} className="text-muted mb-3" />
              <p className="text-muted mb-0">No notes added yet.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TicketDetailsPage;
