import { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Send,
  User,
  Building,
  Globe
} from 'lucide-react';
import { submitContactApi } from '../../api/services';
import { companyInfo } from '../../data/siteData';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero position-relative">
        <Container className="hero-content position-relative z-2">
          <Row className="justify-content-center text-center py-5">
            <Col lg={8}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
                  <MessageCircle className="text-primary-light" size={24} />
                  <span className="eyebrow">Get In Touch</span>
                </div>
                
                <h1 className="hero-title mb-4">
                  Contact Our
                  <span className="gradient-text">Support Team</span>
                </h1>
                
                <p className="hero-subtitle mb-0">
                  Reach out to us for any IT and CCTV service requirements. Our expert team is 
                  ready to provide professional solutions for your business and personal needs.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* Contact Information Card */}
            <Col lg={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3 mb-3">Contact Information</h2>
                    <p className="text-muted">Get in touch with our team</p>
                  </div>

                  <div className="contact-info">
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <Building className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-1">Company</h5>
                          <p className="mb-0">{companyInfo.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <MapPin className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-1">Address</h5>
                          <p className="mb-0">{companyInfo.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <Phone className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-1">Mobile</h5>
                          <p className="mb-0">{companyInfo.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <Mail className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-1">Email</h5>
                          <p className="mb-0">{companyInfo.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-3 mb-4">
                    <Button 
                      variant="success" 
                      size="lg" 
                      className="flex-fill"
                      href={`https://wa.me/${companyInfo.whatsapp}`} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <MessageCircle size={16} className="me-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="flex-fill"
                      href={`tel:${companyInfo.phone}`}
                    >
                      <Phone size={16} className="me-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="map-container">
                    <iframe 
                      title="Google Map" 
                      src={companyInfo.mapEmbed} 
                      className="w-100 rounded-3 border-0"
                      style={{ height: '300px' }}
                      loading="lazy"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Form Card */}
            <Col lg={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3 mb-3">Send Inquiry</h2>
                    <p className="text-muted">Fill out the form below</p>
                  </div>

                  {message.text && (
                    <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mb-4">
                      {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        <User size={16} className="me-2" />
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        <Mail size={16} className="me-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label fw-semibold">
                        <Phone size={16} className="me-2" />
                        Mobile
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label fw-semibold">
                        <MessageCircle size={16} className="me-2" />
                        Message
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe your requirements or questions..."
                        rows="6"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="me-2" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
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
