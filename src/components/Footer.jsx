import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Monitor, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { companyInfo } from '../data/siteData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/ticket", label: "Generate Ticket" },
    { to: "/ticket-status", label: "Track Ticket" },
    { to: "/contact", label: "Contact" },
  ];

  const services = [
    "Computer Repair",
    "CCTV Installation", 
    "AMC Plans",
    "Network Setup",
    "Printer Services",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          {/* Company Info */}
          <Col lg={5}>
            <div className="footer-brand d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center justify-content-center" style={{
                width: '3rem',
                height: '3rem',
                background: 'var(--bs-gradient-primary)',
                borderRadius: '0.75rem'
              }}>
                <Monitor className="text-white" size={24} />
              </div>
              <span className="fw-bold">{companyInfo.name}</span>
            </div>
            
            <p className="mb-4">
              Your trusted partner for comprehensive IT solutions, CCTV installation, 
              and professional technical support services.
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <MapPin className="text-primary-light" size={20} />
                <span className="small">{companyInfo.address}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Phone className="text-primary-light" size={20} />
                <span className="small">{companyInfo.phone}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Mail className="text-primary-light" size={20} />
                <span className="small">{companyInfo.email}</span>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3}>
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Services */}
          <Col lg={4}>
            <h5 className="fw-bold mb-4">Our Services</h5>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={service}>
                  <span 
                    className="cursor-pointer animate-fadeInUp"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-5 pt-4">
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center gap-2 text-light small">
                <Clock size={16} />
                <span>© {currentYear} {companyInfo.name}. All rights reserved.</span>
              </div>
            </Col>

            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <div className="d-flex gap-3 justify-content-md-end justify-content-start">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="floating-btn animate-fadeInUp"
                    style={{ 
                      animationDelay: `${0.5 + index * 0.05}s`,
                      width: '2.5rem',
                      height: '2.5rem'
                    }}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
