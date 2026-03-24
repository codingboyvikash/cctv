import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, FileText, Clock, CheckCircle, AlertCircle, Edit3, Save, X, MessageSquare, Calendar } from 'lucide-react';
import { getSingleTicketApi, updateTicketApi } from '../../api/services';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import AdminLayout from '../../components/AdminLayout';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({ status: 'Open', assignedTechnician: '', note: '' });

  const fetchTicket = async () => {
    try {
      const { data } = await getSingleTicketApi(id);
      setTicket(data.data);
      setFormData({
        status: data.data.status,
        assignedTechnician: data.data.assignedTechnician || '',
        note: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load ticket details.' });
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
    setMessage('');

    try {
      await updateTicketApi(id, formData);
      setMessage({ type: 'success', text: 'Ticket updated successfully!' });
      await fetchTicket(); // Refresh ticket details
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !ticket) return <Loader text="Loading ticket details..." />;
  if (!ticket) return <Alert type="error" message="Ticket not found." />;

  return (
    <AdminLayout>
      <div className="admin-ticket-details">
        {/* Ticket Header */}
        <div className="admin-ticket-header">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div className="d-flex align-items-center gap-3 mb-2">
                <h1 className="admin-ticket-number">{ticket.ticketNumber}</h1>
                <span className={`admin-ticket-status admin-status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="admin-ticket-meta">
                <Calendar size={16} className="me-2" />
                Created on {new Date(ticket.createdAt).toLocaleDateString()} at {new Date(ticket.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <Alert type={message.type} message={message.text} />
        </div>

        {/* Customer Information Card */}
        <div className="admin-customer-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="admin-card-header">
            <h5 className="admin-card-title">
              <User size={20} className="me-2" />
              Customer Information
            </h5>
          </div>
          <div className="admin-card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="admin-info-item">
                  <div className="admin-info-icon">
                    <User size={18} />
                  </div>
                  <div className="admin-info-content">
                    <label className="admin-info-label">Name</label>
                    <p className="admin-info-value">{ticket.customerName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="admin-info-item">
                  <div className="admin-info-icon">
                    <Phone size={18} />
                  </div>
                  <div className="admin-info-content">
                    <label className="admin-info-label">Mobile</label>
                    <p className="admin-info-value">{ticket.mobileNumber}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="admin-info-item">
                  <div className="admin-info-icon">
                    <Mail size={18} />
                  </div>
                  <div className="admin-info-content">
                    <label className="admin-info-label">Email</label>
                    <p className="admin-info-value">{ticket.email}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="admin-info-item">
                  <div className="admin-info-icon">
                    <FileText size={18} />
                  </div>
                  <div className="admin-info-content">
                    <label className="admin-info-label">Service Type</label>
                    <p className="admin-info-value">
                      <span className="admin-service-badge">{ticket.serviceType}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="admin-info-item">
                <div className="admin-info-icon">
                  <MapPin size={18} />
                </div>
                <div className="admin-info-content">
                  <label className="admin-info-label">Address</label>
                  <p className="admin-info-value">{ticket.address}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="admin-info-item">
                <div className="admin-info-icon">
                  <FileText size={18} />
                </div>
                <div className="admin-info-content">
                  <label className="admin-info-label">Problem Description</label>
                  <p className="admin-info-value admin-problem-desc">{ticket.problemDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Ticket Form */}
        <div className="admin-update-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="admin-card-header">
            <h5 className="admin-card-title">
              <Edit3 size={20} className="me-2" />
              Update Ticket
            </h5>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleUpdate} className="admin-update-form">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="admin-form-label">
                    <Clock size={18} className="me-2" />
                    Status
                  </label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-select admin-form-control"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="admin-form-label">
                    <User size={18} className="me-2" />
                    Assign Technician
                  </label>
                  <input
                    placeholder="Enter technician name"
                    value={formData.assignedTechnician}
                    onChange={(e) => setFormData({ ...formData, assignedTechnician: e.target.value })}
                    className="form-control admin-form-control"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="admin-form-label">
                  <MessageSquare size={18} className="me-2" />
                  Add Note/Remark
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter your note or remark..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="form-control admin-form-control admin-textarea"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary admin-update-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} className="me-2" />
                    Update Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Notes/Remarks Section */}
        <div className="admin-notes-card animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="admin-card-header">
            <h5 className="admin-card-title">
              <MessageSquare size={20} className="me-2" />
              Remarks & Notes
            </h5>
          </div>
          <div className="admin-card-body">
            {ticket.notes?.length ? (
              <div className="admin-notes-list">
                {ticket.notes.map((note, index) => (
                  <div key={`${note.createdAt}-${index}`} className="admin-note-item animate-slideInLeft">
                    <div className="admin-note-header">
                      <div className="admin-note-author">
                        <div className="admin-note-avatar">
                          {note.addedBy.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="admin-note-name">{note.addedBy}</p>
                          <p className="admin-note-time">
                            <Clock size={14} className="me-1" />
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="admin-note-content">
                      <p>{note.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-state">
                <MessageSquare size={48} className="admin-empty-icon" />
                <p className="admin-empty-text">No notes added yet.</p>
                <p className="admin-empty-subtitle">Add your first note to track the ticket progress.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TicketDetailsPage;
