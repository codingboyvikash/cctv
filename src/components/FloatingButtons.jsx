import { Phone, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/siteData';

const FloatingButtons = () => {
  return (
    <div className="floating-actions">
      <a
        href={`https://wa.me/${companyInfo.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="floating-btn whatsapp pulse"
        aria-label="WhatsApp Chat"
        style={{
          animationDelay: '1s'
        }}
      >
        <MessageCircle size={24} />
        <span 
          className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-2"
          style={{ fontSize: '0.5rem' }}
        >
          <span className="visually-hidden">Online</span>
        </span>
      </a>

      <a
        href={`tel:${companyInfo.phone}`}
        className="floating-btn call"
        aria-label="Call Now"
        style={{
          animationDelay: '1.2s'
        }}
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons;
