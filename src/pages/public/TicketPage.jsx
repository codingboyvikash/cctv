import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Monitor, 
  Camera, 
  ShoppingCart, 
  Settings, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { submitTicketApi } from '../../api/services';

const TicketPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    serviceType: '',
    problemDescription: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const serviceTypes = [
    { value: 'CCTV', label: 'CCTV Services', icon: Camera },
    { value: 'IT', label: 'IT Services', icon: Monitor },
    { value: 'Printer', label: 'Printer Services', icon: Settings },
    { value: 'AMC', label: 'Annual Maintenance Contract', icon: FileText },
    { value: 'Other', label: 'Other Services', icon: ShoppingCart }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }
    
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required';
    } else if (formData.problemDescription.trim().length < 20) {
      newErrors.problemDescription = 'Please provide at least 20 characters description';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await submitTicketApi(formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setTicketData(response.data);
        // Reset form
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          serviceType: '',
          problemDescription: '',
          address: ''
        });
      } else {
        setSubmitStatus('error');
        setErrors({ submit: response.data.message || 'Failed to submit ticket. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ 
        submit: error.response?.data?.message || 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
  const SelectedIcon = selectedService?.icon || Settings;

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero position-relative">
        <Container className="hero-content position-relative z-2">
          <Row className="justify-content-center text-center py-5">
            <Col lg={8}>
              <div className="animate-fadeInUp">
                <div className="d-inline-flex align-items-center gap-2 mb-4">
                  <FileText className="text-primary-light" size={24} />
                  <span className="eyebrow">Support Ticket System</span>
                </div>
                
                <h1 className="hero-title mb-4">
                  Generate Service
                  <span className="gradient-text">Support Ticket</span>
                </h1>
                
                <p className="hero-subtitle mb-0">
                  Fast and efficient ticket submission system for all your IT and CCTV service needs. 
                  Track your service requests in real-time with our professional support team.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        
        {/* Floating Elements */}
        <div className="position-absolute animate-float" style={{
          top: '10%',
          right: '5%',
          width: '100px',
          height: '100px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        <div className="position-absolute animate-float" style={{
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }} />
      </section>

      {/* Premium Form Section */}
      <section className="py-5 position-relative" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0f9ff 100%)',
        minHeight: '100vh'
      }}>
        {/* Background Decorations */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
          <div className="position-absolute animate-float" style={{
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(10, 102, 194, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />
          <div className="position-absolute animate-float" style={{
            top: '60%',
            right: '5%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animationDelay: '2s'
          }} />
          <div className="position-absolute animate-float" style={{
            bottom: '20%',
            left: '15%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animationDelay: '1s'
          }} />
        </div>
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="justify-content-center">
            <Col lg={10}>
              {submitStatus === 'success' && ticketData && (
                <div className="success-message-premium mb-5 animate-fadeInUp">
                  <div className="success-icon-wrapper">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <div className="success-content">
                    <h3 className="success-title">Ticket Submitted Successfully!</h3>
                    <div className="ticket-number-display">
                      <div className="ticket-label">Your Ticket Number</div>
                      <div className="ticket-number">{ticketData.ticketNumber}</div>
                    </div>
                    <p className="success-description">
                      Thank you for contacting us. Our support team will review your request and get back to you shortly. 
                      You can track your ticket status using the ticket number above.
                    </p>
                    <div className="d-flex gap-3 justify-content-center mt-4">
                      <Button 
                        variant="primary" 
                        href="/ticket-status"
                        className="px-4 py-2"
                        style={{
                          background: 'var(--bs-gradient-primary)',
                          border: 'none',
                          borderRadius: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        Track Ticket Status
                      </Button>
                      <Button 
                        variant="outline-primary"
                        onClick={() => setSubmitStatus(null)}
                        className="px-4 py-2"
                        style={{
                          borderColor: 'var(--bs-primary)',
                          color: 'var(--bs-primary)',
                          borderRadius: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        Submit Another Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus !== 'success' && (
                <Card className="border-0 shadow-xl animate-fadeInUp" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '2rem',
                  border: '1px solid rgba(10, 102, 194, 0.1)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Card Header */}
                  <div style={{
                    background: 'var(--bs-gradient-primary)',
                    padding: '3rem 0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')',
                      opacity: 0.3
                    }} />
                    
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{
                        width: '100px',
                        height: '100px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '2rem',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
                      }}>
                        <SelectedIcon size={50} className="text-white" />
                      </div>
                      
                      <h2 className="text-white mb-3" style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                      }}>
                        Service Request Form
                      </h2>
                      
                      <p className="text-white mb-0" style={{
                        fontSize: '1.2rem',
                        opacity: 0.95,
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                      }}>
                        Fill in the details below and we'll get back to you as soon as possible
                      </p>
                    </div>
                  </div>

                  <Card.Body className="p-5">
                    {errors.submit && (
                      <Alert variant="danger" className="mb-4 d-flex align-items-center gap-3" style={{
                        borderRadius: '1rem',
                        border: 'none',
                        background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                        color: '#991b1b'
                      }}>
                        <AlertCircle size={20} />
                        <span>{errors.submit}</span>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                      <Row className="g-4">
                        {/* Personal Information */}
                        <Col lg={6}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <User className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.fullName ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease'
                              }}
                              placeholder="Enter your full name"
                              disabled={isSubmitting}
                            />
                            {errors.fullName && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.fullName}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <Phone className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Mobile Number
                            </label>
                            <input
                              type="tel"
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleInputChange}
                              className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.mobileNumber ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease'
                              }}
                              placeholder="Enter 10-digit mobile number"
                              disabled={isSubmitting}
                            />
                            {errors.mobileNumber && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.mobileNumber}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <Mail className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.email ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease'
                              }}
                              placeholder="Enter your email address"
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <Settings className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Service Type
                            </label>
                            <select
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleInputChange}
                              className={`form-control ${errors.serviceType ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.serviceType ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                              }}
                              disabled={isSubmitting}
                            >
                              <option value="">Select a service type</option>
                              {serviceTypes.map(service => (
                                <option key={service.value} value={service.value}>
                                  {service.label}
                                </option>
                              ))}
                            </select>
                            {errors.serviceType && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.serviceType}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <FileText className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Problem Description
                            </label>
                            <textarea
                              name="problemDescription"
                              value={formData.problemDescription}
                              onChange={handleInputChange}
                              className={`form-control ${errors.problemDescription ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.problemDescription ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease',
                                minHeight: '140px',
                                resize: 'vertical'
                              }}
                              placeholder="Please describe your issue in detail (minimum 20 characters)..."
                              disabled={isSubmitting}
                            />
                            {errors.problemDescription && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.problemDescription}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mb-4">
                            <label className="d-flex align-items-center mb-3 fw-bold text-dark" style={{
                              fontSize: '0.95rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#1e293b'
                            }}>
                              <MapPin className="me-2" size={18} style={{ color: '#0a66c2' }} />
                              Service Address
                            </label>
                            <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                              style={{
                                borderRadius: '1rem',
                                border: errors.address ? '2px solid #ef4444' : '2px solid #e2e8f0',
                                padding: '1rem 1.25rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease',
                                minHeight: '100px',
                                resize: 'vertical'
                              }}
                              placeholder="Enter your complete service address..."
                              disabled={isSubmitting}
                            />
                            {errors.address && (
                              <div className="text-danger mt-2 small" style={{ fontWeight: '500' }}>
                                {errors.address}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>

                      <div className="text-center mt-5">
                        <button
                          type="submit"
                          className="btn btn-lg px-5 py-3"
                          style={{
                            background: 'var(--bs-gradient-primary)',
                            border: 'none',
                            borderRadius: '1.5rem',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: 'white',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 10px 30px rgba(10, 102, 194, 0.3)',
                            transition: 'all 0.3s ease',
                            minWidth: '250px'
                          }}
                          disabled={isSubmitting}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 15px 40px rgba(10, 102, 194, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 30px rgba(10, 102, 194, 0.3)';
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send size={20} className="me-2" />
                              Submit Ticket
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TicketPage;
