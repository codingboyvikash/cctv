import { Link } from 'react-router-dom';

const TicketTable = ({ tickets }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <span className="badge bg-warning text-dark">Open</span>;
      case 'In Progress':
        return <span className="badge bg-info">In Progress</span>;
      case 'Closed':
        return <span className="badge bg-success">Closed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th className="fw-bold">Ticket No.</th>
            <th className="fw-bold">Customer</th>
            <th className="fw-bold">Service</th>
            <th className="fw-bold">Status</th>
            <th className="fw-bold">Technician</th>
            <th className="fw-bold">Date</th>
            <th className="fw-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="fw-medium">#{ticket.ticketNumber || 'T' + Math.floor(Math.random() * 1000)}</td>
                <td>{ticket.customerName || 'John Doe'}</td>
                <td>{ticket.serviceType || 'CCTV'}</td>
                <td>{getStatusBadge(ticket.status)}</td>
                <td>{ticket.assignedTechnician || 'Unassigned'}</td>
                <td>{new Date(ticket.createdAt || Date.now()).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/tickets/${ticket._id}`} className="btn btn-primary btn-sm">
                    VIEW
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
