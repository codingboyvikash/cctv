import { useState } from 'react';
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

  return (
    <section className="section">
      <div className="container narrow">
        <div className="card form-card">
          <h1>Ticket Status</h1>
          <p>Enter your ticket number and mobile number or email address.</p>
          <Alert type="error" message={error} />
          {loading && <Loader text="Checking ticket status..." />}
          <form onSubmit={handleSubmit} className="form-grid">
            <input value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} placeholder="Ticket Number" required />
            <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Mobile Number or Email" required />
            <button className="btn" type="submit">Check Status</button>
          </form>

          {ticket && (
            <div className="card ticket-result">
              <h3>{ticket.ticketNumber}</h3>
              <p><strong>Name:</strong> {ticket.customerName}</p>
              <p><strong>Service:</strong> {ticket.serviceType}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Assigned Technician:</strong> {ticket.assignedTechnician || 'Pending assignment'}</p>
              <p><strong>Description:</strong> {ticket.problemDescription}</p>
              <p><strong>Address:</strong> {ticket.address}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TicketStatusPage;
