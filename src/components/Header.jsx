import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Menu, X, Monitor, Phone } from 'lucide-react';
import { companyInfo } from '../data/siteData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/ticket", label: "Ticket" },
    { to: "/ticket-status", label: "Track Ticket" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <Navbar expand="lg" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center" style={{
            width: '3rem',
            height: '3rem',
            background: 'var(--bs-gradient-primary)',
            borderRadius: '0.75rem'
          }}>
            <Monitor className="text-white" size={24} />
          </div>
          <span className="fw-bold">{companyInfo.name}</span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="border-0 bg-transparent"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={NavLink}
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          
          <Button 
            variant="outline-light" 
            className="ms-lg-3 mt-3 mt-lg-0"
            href={`tel:${companyInfo.phone}`}
          >
            <Phone size={16} className="me-2" />
            Call Now
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
