import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleTicketApi, updateTicketApi } from '../../api/services';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

const TicketDetailsPage = () => {
  const { id } = useParams();
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
      setFormData((prev) => ({ ...prev, note: '' }));
      setMessage({ type: 'success', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !ticket) return <Loader text="Loading ticket details..." />;
  if (!ticket) return <Alert type="error" message="Ticket not found." />;

  return (
    <div className="card page-card">
      <h1>{ticket.ticketNumber}</h1>
      <Alert type={message.type} message={message.text} />
      <p><strong>Customer:</strong> {ticket.customerName}</p>
      <p><strong>Mobile:</strong> {ticket.mobileNumber}</p>
      <p><strong>Email:</strong> {ticket.email}</p>
      <p><strong>Service Type:</strong> {ticket.serviceType}</p>
      <p><strong>Description:</strong> {ticket.problemDescription}</p>
      <p><strong>Address:</strong> {ticket.address}</p>

      <form onSubmit={handleUpdate} className="form-grid top-gap">
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          placeholder="Assign technician"
          value={formData.assignedTechnician}
          onChange={(e) => setFormData({ ...formData, assignedTechnician: e.target.value })}
        />
        <textarea
          rows="4"
          placeholder="Add note or remark"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
        <button className="btn" type="submit">Update Ticket</button>
      </form>

      <div className="top-gap">
        <h3>Remarks / Notes</h3>
        {ticket.notes?.length ? (
          ticket.notes.map((note, index) => (
            <div key={`${note.createdAt}-${index}`} className="note-item">
              <strong>{note.addedBy}</strong>
              <p>{note.message}</p>
              <small>{new Date(note.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No notes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TicketDetailsPage;
