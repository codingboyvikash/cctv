import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { submitContactApi } from '../../api/services';
import { companyInfo } from '../../data/siteData';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const contactInfo = [
    {
      icon: Phone,
      label: 'Call Us',
      value: companyInfo.phone,
      action: `tel:${companyInfo.phone}`,
      color: 'primary'
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: companyInfo.email,
      action: `mailto:${companyInfo.email}`,
      color: 'success'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: companyInfo.address,
      action: companyInfo.mapEmbed,
      color: 'info'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: companyInfo.whatsapp,
      action: `https://wa.me/${companyInfo.whatsapp}`,
      color: 'success'
    }
  ];

  const features = [
    { icon: Clock, text: '24/7 Available Support' },
    { icon: Shield, text: 'Professional & Reliable Service' },
    { icon: CheckCircle, text: 'Quick Response Time' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data } = await submitContactApi(formData);
      setMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to submit inquiry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero">
        <Container className="hero-content">
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Phone className="text-primary-light" size={20} />
                  <span className="eyebrow">Get In Touch</span>
                </div>

                <h1 className="hero-title">
                  Get in Touch with
                  <span className="gradient-text">Our Experts</span>
                </h1>

                <p className="hero-subtitle">
                  We're here to help with all your IT and CCTV needs.
                  Reach out to us for professional service and support.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Button variant="outline-light" size="lg" href={`tel:${companyInfo.phone}`}>
                    <Phone size={18} className="me-2" />
                    Call Now
                  </Button>
                  <Button variant="outline-light" size="lg" href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank">
                    <MessageCircle size={18} className="me-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="contact-hero-card animate-slideInLeft">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="contact-icon-wrapper">
                      <Phone size={40} className="text-white" />
                    </div>
                    <h3 className="fw-bold mb-3 text-white" >Quick Contact</h3>
                    <p className="text-white-90 mb-4">Multiple ways to reach us</p>
                  </div>

                  <div className="d-grid gap-3">
                    <Button variant="light" size="lg" className="contact-btn" href={`tel:${companyInfo.phone}`}>
                      <Phone size={20} className="me-2" />
                      Call Now
                    </Button>
                    <Button variant="outline-light" size="lg" className="contact-btn" href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank">
                      <FaWhatsapp size={20} color="white" className="me-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline-light" size="lg" className="contact-btn" href={`mailto:${companyInfo.email}`}>
                      <Mail size={20} className="me-2" />
                      Email Us
                    </Button>
                  </div>
                </Card.Body>
              </Card>
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

      {/* Contact Information Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Contact Information</h2>
            <p className="lead text-muted">Choose your preferred way to connect with us</p>
          </div>

          <Row className="g-4">
            {contactInfo.map((info, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="contact-info-card h-100 border-0 shadow-sm animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body className="text-center p-4">
                    <div className="contact-icon mb-3">
                      <info.icon size={32} />
                    </div>
                    <h5 className="fw-bold mb-2">{info.label}</h5>
                    <p className="text-muted mb-3">{info.value}</p>
                    <Button
                      variant={info.color}
                      size="sm"
                      href={info.action}
                      target={info.label === 'WhatsApp' ? '_blank' : '_self'}
                      rel={info.label === 'WhatsApp' ? 'noreferrer' : ''}
                      className="px-4"
                    >
                      {info.label === 'Visit Us' ? 'View Map' : info.label === 'WhatsApp' ? 'Chat Now' : 'Contact'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-5">
        <Container>
          <Row className="g-5">
            <Col lg={7}>
              <Card className="border-0 shadow animate-fadeInUp">
                <Card.Header className="bg-primary text-white border-0 py-3">
                  <h4 className="mb-0 fw-bold text-white">
                    <Send size={20} className="me-2" />
                    Send Us a Message
                  </h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <Alert type={message.type} message={message.text} />
                  {loading && <Loader text="Sending message..." />}

                  <form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <div className="form-group">
                          <label className="form-label fw-semibold">Your Name</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group">
                          <label className="form-label fw-semibold">Email Address</label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group">
                          <label className="form-label fw-semibold">Mobile Number</label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            placeholder="+91 98765 43210"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                          />
                        </div>
                      </Col>
                      {/* <Col md={6}>
                        <div className="form-group">
                          <label className="form-label fw-semibold">Service Type</label>
                          <select className="form-select form-select-lg" defaultValue="">
                            <option value="" disabled>Select a service</option>
                            <option value="general">General Inquiry</option>
                            <option value="cctv">CCTV Installation</option>
                            <option value="computer">Computer Repair</option>
                            <option value="amc">AMC Services</option>
                            <option value="printer">Printer Services</option>
                            <option value="network">Network Setup</option>
                          </select>
                        </div>
                      </Col> */}
                      <Col md={12}>
                        <div className="form-group">
                          <label className="form-label fw-semibold">Your Message</label>
                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Tell us more about your requirements..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="text-center mt-4">
                      <button className="btn btn-primary btn-lg px-5" type="submit" disabled={loading}>
                        <Send size={18} className="me-2" />
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow mb-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <Card.Header className="bg-success text-white border-0 py-3">
                  <h5 className="mb-0 fw-bold text-white">
                    <MapPin size={18} className="me-2" />
                    Our Location
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="ratio ratio-16x9">
                    <iframe
                      title="Google Map - Company Location"
                      src={companyInfo.mapEmbed}
                      className="w-100 h-100"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <Card.Header className="bg-info text-white border-0 py-3">
                  <h5 className="mb-0 fw-bold text-white">
                    <Clock size={18} className="me-2" />
                    Business Hours
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Monday - Saturday:</span>
                      <span className="fw-bold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Sunday:</span>
                      <span className="fw-bold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Emergency:</span>
                      <span className="badge bg-success">24/7 Available</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <h6 className="fw-bold mb-3">Quick Connect</h6>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="success" size="sm" href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank">
                        <MessageCircle size={14} className="me-1" />
                        WhatsApp
                      </Button>
                      <Button variant="primary" size="sm" href={`tel:${companyInfo.phone}`}>
                        <Phone size={14} className="me-1" />
                        Call
                      </Button>
                      <Button variant="info" size="sm" href={`mailto:${companyInfo.email}`}>
                        <Mail size={14} className="me-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
