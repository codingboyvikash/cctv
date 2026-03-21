import { Card } from 'react-bootstrap';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ServiceCard = ({ title, items, icon: Icon = CheckCircle }) => {
  return (
    <Card className="service-card h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="service-icon">
            <Icon size={28} />
          </div>
          <h3 className="service-title mb-0">{title}</h3>
        </div>
        
        <ul className="service-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-top d-flex align-items-center gap-2">
          <span className="fw-semibold text-primary">Learn More</span>
          <ArrowRight size={16} className="text-primary" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
