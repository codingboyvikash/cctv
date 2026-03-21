import React, { useState } from 'react';
import { Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import {
  Monitor,
  Camera,
  FileText,
  ShoppingCart,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Phone,
  MessageCircle
} from 'lucide-react';
import { services } from '../../data/siteData';

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceIcons = {
    'IT Services': Monitor,
    'CCTV Installation & Surveillance': Camera,
    'Annual Maintenance Contract (AMC)': FileText,
    'Sales & Services': ShoppingCart,
    'Other Services': Settings,
  };

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Settings },
    { id: 'IT Services', name: 'IT Solutions', icon: Monitor },
    { id: 'CCTV Installation & Surveillance', name: 'CCTV & Security', icon: Camera },
    { id: 'Annual Maintenance Contract (AMC)', name: 'AMC Plans', icon: FileText },
    { id: 'Sales & Services', name: 'Products', icon: ShoppingCart },
    { id: 'Other Services', name: 'More Services', icon: Settings },
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: TrendingUp, number: '10+', label: 'Years Experience' },
    { icon: Shield, number: '24/7', label: 'Support Available' },
    { icon: Star, number: '4.9', label: 'Average Rating' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.title === selectedCategory);

  return (
    <>
      {/* Hero Section - Matching HomePage Layout */}
      <section className="hero">
        <Container className="hero-content">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Clock className="text-primary-light" size={20} />
                  <span className="eyebrow">24/7 Emergency Service Available</span>
                </div>

                <h1 className="hero-title">
                  Professional IT & CCTV
                  <span className="gradient-text">Solutions</span>
                </h1>

                <p className="hero-subtitle">
                  Complete technology solutions for homes, offices, and businesses.
                  From computer repairs to advanced CCTV surveillance systems with 24/7 support.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="px-4 py-3"
                    style={{ background: 'var(--bs-gradient-primary)', border: 'none', borderRadius: '0.75rem' }}
                    href="tel:+919876543210"
                  >
                    <Phone className="me-2" size={20} />
                    Call Now
                  </Button>

                  <Button
                    size="lg"
                    variant="outline-light"
                    className="px-4 py-3"
                    style={{ borderRadius: '0.75rem', borderWidth: '2px' }}
                    href="https://wa.me/919876543210"
                  >
                    <MessageCircle className="me-2" size={20} />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div className="animate-slideInLeft">
                <Card className="glass-effect">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="stat-icon">
                        <Shield size={28} />
                      </div>
                      <h3 className="fw-bold mb-0 text-white">Trusted by 500+ Clients</h3>
                    </div>

                    <p className="mb-4 text-white">
                      Fast response times, certified technicians, transparent service tracking,
                      and comprehensive AMC plans designed for your business growth.
                    </p>

                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <CheckCircle className="text-success" size={20} />
                        <span className="text-white">10+ Years Experience</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <CheckCircle className="text-success" size={20} />
                        <span className="text-white">24/7 Support Available</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <CheckCircle className="text-success" size={20} />
                        <span className="text-white">4.9 Average Rating</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Floating Elements */}
          <div className="position-absolute animate-float" style={{
            top: '5rem',
            right: '2.5rem',
            width: '5rem',
            height: '5rem',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '50%',
            filter: 'blur(1rem)'
          }} />
          <div className="position-absolute animate-float" style={{
            bottom: '5rem',
            left: '2.5rem',
            width: '8rem',
            height: '8rem',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '50%',
            filter: 'blur(1rem)',
            animationDelay: '1s'
          }} />
        </Container>
      </section>

      {/* Services Categories Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-3 py-2">
              Our Services
            </Badge>
            <h2 className="display-3 fw-bold mb-3">
              Complete Technology Solutions
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Professional services tailored to meet all your IT and security needs.
              Quality work guaranteed with affordable pricing.
            </p>
          </div>

          <Row className="g-3">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Col key={category.id} xs={6} md={4} lg={2}>
                  <button
                    type="button"
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      borderRadius: '0.75rem',
                      border: selectedCategory === category.id ? 'none' : '2px solid #0a66c2',
                      background: selectedCategory === category.id
                        ? 'linear-gradient(135deg, #0a66c2 0%, #3b82f6 100%)'
                        : 'white',
                      color: selectedCategory === category.id ? 'white' : '#0a66c2',
                      transition: 'all 0.3s ease',
                      boxShadow: selectedCategory === category.id
                        ? '0 10px 15px rgba(0,0,0,0.1)'
                        : 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      height: '100%',
                      minHeight: '80px'
                    }}
                  >
                    <Icon size={24} style={{ color: 'inherit' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{category.name}</span>
                  </button>

                  <style jsx>{`
                    .category-btn:hover {
                      background: #0a66c2 !important;
                      color: white !important;
                      border: none !important;
                      box-shadow: 0 20px 25px rgba(0,0,0,0.1) !important;
                      transform: translateY(-2px);
                    }
                    .category-btn:hover span,
                    .category-btn:hover svg {
                      color: white !important;
                    }
                  `}</style>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>



      {/* Main Services Section */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {filteredServices.map((service, index) => {
              const Icon = serviceIcons[service.title] || Settings;
              return (
                <Col key={service.title} md={6} lg={4} className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card
                    className="border-0 shadow-lg"
                    style={{
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      transform: hoveredService === service.title ? 'translateY(-10px)' : 'translateY(0)',
                      boxShadow: hoveredService === service.title ? '0 25px 50px rgba(0,0,0,0.25)' : '0 10px 15px rgba(0,0,0,0.1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={() => setHoveredService(service.title)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div style={{ height: '4px', background: 'var(--bs-gradient-primary)' }}></div>
                    <Card.Body className="p-4" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="text-center mb-4">
                        <div className="service-icon mx-auto mb-3" style={{
                          width: '4rem',
                          height: '4rem',
                          background: 'var(--bs-gradient-primary)',
                          borderRadius: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContentContent: 'center',
                          color: 'white'
                        }}>
                          <Icon size={32} />
                        </div>
                        <h3 className="fw-bold" style={{ fontSize: '1.5rem', color: 'var(--bs-dark)' }}>{service.title}</h3>
                      </div>

                      <ul className="list-unstyled mb-4" style={{ flex: 1 }}>
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="d-flex align-items-center mb-2" style={{ padding: '0.5rem 0', borderBottom: itemIndex < service.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <CheckCircle className="text-success me-2 flex-shrink-0" size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-3 border-top">
                        <Button
                          variant="outline-primary"
                          className="w-100 d-flex align-items-center justify-content-center gap-2"
                          href="/ticket"
                          style={{
                            borderRadius: '0.75rem',
                            padding: '0.75rem 1rem',
                            height: '50px',
                            minHeight: '50px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <span>Get Quote</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 text-white" style={{ background: 'var(--bs-gradient-primary)' }}>
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="animate-slideInLeft">
                <div className="mb-4">
                  <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill" style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    ⭐ Why Choose Us
                  </Badge>
                </div>

                <h1 className="display-2 fw-bold mb-4" style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  lineHeight: '1.1',
                  color: 'white',
                  fontWeight: '800'
                }}>
                  Trusted by 500+ Happy Clients
                </h1>

                <p className="lead mb-5" style={{
                  fontSize: '1.2rem',
                  opacity: '0.95',
                  lineHeight: '1.6',
                  maxWidth: '520px',
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  We deliver reliable IT and CCTV solutions with 24/7 support,
                  guaranteed quality, and 10+ years of proven excellence.
                </p>

                <div className="mb-5">
                  <Row className="g-4">
                    <Col xs={6}>
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Shield size={24} className="text-white" />
                        </div>
                        <div>
                          <h5 className="text-white fw-bold mb-1">100% Secure</h5>
                          <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                            Enterprise-grade security
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Clock size={24} className="text-white" />
                        </div>
                        <div>
                          <h5 className="text-white fw-bold mb-1">24/7 Support</h5>
                          <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                            Always here to help
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <TrendingUp size={24} className="text-white" />
                        </div>
                        <div>
                          <h5 className="text-white fw-bold mb-1">10+ Years</h5>
                          <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                            Proven experience
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Users size={24} className="text-white" />
                        </div>
                        <div>
                          <h5 className="text-white fw-bold mb-1">Expert Team</h5>
                          <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                            Certified professionals
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="d-flex gap-3">
                  <Button
                    size="lg"
                    className="px-4 py-3"
                    style={{
                      background: 'white',
                      color: '#0a66c2',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.25)',
                      transition: 'all 0.3s ease'
                    }}
                    href="/contact"
                  >
                    📞 Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline-light"
                    className="px-4 py-3"
                    style={{
                      borderRadius: '12px',
                      borderWidth: '2px',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                    href="/about"
                  >
                    💬 Learn More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="animate-fadeInUp">
                <Card className="border-0 bg-white text-dark" style={{ borderRadius: '1rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
                  <Card.Body className="p-4">
                    <h4 className="fw-bold mb-3">Need Help? Get a Free Quote!</h4>
                    <p className="text-muted mb-4">
                      Contact us today for a free consultation and quote for your IT or CCTV needs.
                    </p>
                    <div className="d-grid gap-3">
                      <Button
                        size="lg"
                        className="btn-primary d-flex align-items-center justify-content-center gap-2"
                        href="tel:+919876543210"
                      >
                        <Phone size={20} />
                        Call +91 98765 43210
                      </Button>
                      <Button
                        size="lg"
                        variant="outline-primary"
                        className="d-flex align-items-center justify-content-center gap-2"
                        href="https://wa.me/919876543210"
                      >
                        <MessageCircle size={20} />
                        WhatsApp Us
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;
