import { Link } from 'react-router-dom';

const TicketTable = ({ tickets }) => {
  return (
    <div className="table-wrap">
      <table className="ticket-table w-100">
        <thead>
          <tr>
            <th>Ticket No.</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Status</th>
            <th>Technician</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.customerName}</td>
                <td>{ticket.serviceType}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTechnician || 'Unassigned'}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/tickets/${ticket._id}`} className="btn btn-sm text-white bg-primary view_btn">
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No tickets found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
