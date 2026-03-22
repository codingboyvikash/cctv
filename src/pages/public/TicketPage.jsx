import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { Ticket, Star, Users, Award, Send, User, Phone, Mail, MapPin, MessageSquare, CheckCircle, Shield, Upload, Clock, AlertCircle, FileText, Camera, Paperclip, X, ChevronRight, ChevronLeft, Zap, HeadphonesIcon, Wrench, Monitor, Printer } from 'lucide-react';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { submitTicketApi } from '../../api/services';

const initialState = {
  fullName: '',
  mobileNumber: '',
  email: '',
  serviceType: '',
  problemDescription: '',
  address: '',
  priority: 'medium',
  attachments: [],
  estimatedResolution: ''
};

const serviceTypes = [
  { id: 'CCTV', name: 'CCTV Services', icon: Monitor, color: '#667eea', description: 'Security camera installation & maintenance' },
  { id: 'IT', name: 'IT Support', icon: Monitor, color: '#10b981', description: 'Computer hardware & software support' },
  { id: 'Printer', name: 'Printer Services', icon: Printer, color: '#f59e0b', description: 'Printer installation & repair services' },
  { id: 'AMC', name: 'AMC Services', icon: Wrench, color: '#ef4444', description: 'Annual maintenance contracts' },
  { id: 'Network', name: 'Network Support', icon: Zap, color: '#8b5cf6', description: 'Network setup & troubleshooting' },
  { id: 'Other', name: 'Other Services', icon: HeadphonesIcon, color: '#64748b', description: 'Custom service requirements' }
];

const priorityLevels = [
  { id: 'low', name: 'Low', icon: Clock, color: '#10b981', time: '48-72 hours', description: 'Non-urgent issues' },
  { id: 'medium', name: 'Medium', icon: AlertCircle, color: '#f59e0b', time: '24-48 hours', description: 'Standard priority' },
  { id: 'high', name: 'High', icon: Zap, color: '#ef4444', time: '12-24 hours', description: 'Urgent attention required' },
  { id: 'critical', name: 'Critical', icon: Shield, color: '#dc2626', time: '2-6 hours', description: 'Emergency service' }
];

const TicketPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const totalSteps = 4;

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        else if (value.length < 3) error = 'Name must be at least 3 characters';
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Name should only contain letters';
        break;
      case 'mobileNumber':
        if (!value) error = 'Mobile number is required';
        else if (!/^[6-9]\d{9}$/.test(value)) error = 'Please enter a valid 10-digit mobile number';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'serviceType':
        if (!value) error = 'Please select a service type';
        break;
      case 'problemDescription':
        if (!value.trim()) error = 'Problem description is required';
        else if (value.length < 20) error = 'Please provide at least 20 characters description';
        else if (value.length > 1000) error = 'Description should not exceed 1000 characters';
        break;
      case 'address':
        if (!value.trim()) error = 'Service address is required';
        else if (value.length < 10) error = 'Please provide a complete address';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    
    // Auto-save as draft
    setIsDraft(true);
  };

  const handleServiceTypeSelect = (serviceType) => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setFormErrors((prev) => ({ ...prev, serviceType: '' }));
    setIsDraft(true);
  };

  const handlePrioritySelect = (priority) => {
    setFormData((prev) => ({ ...prev, priority }));
    const selectedPriority = priorityLevels.find(p => p.id === priority);
    setFormData((prev) => ({ ...prev, estimatedResolution: selectedPriority?.time || '' }));
    setIsDraft(true);
  };

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf' || file.type.includes('document');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });
    
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }))]
    }));
    setIsDraft(true);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
    setIsDraft(true);
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      errors.fullName = validateField('fullName', formData.fullName);
      errors.mobileNumber = validateField('mobileNumber', formData.mobileNumber);
      errors.email = validateField('email', formData.email);
    } else if (step === 2) {
      errors.serviceType = validateField('serviceType', formData.serviceType);
    } else if (step === 3) {
      errors.problemDescription = validateField('problemDescription', formData.problemDescription);
    } else if (step === 4) {
      errors.address = validateField('address', formData.address);
    }
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Enhanced confetti animation
  const triggerConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, i * 20);
    }
  };

  // Floating particles animation
  const createFloatingParticles = () => {
    const particles = ['✨', '⭐', '💫', '🌟', '⚡'];
    const container = document.querySelector('.hero-bg-elements');
    
    if (container) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        container.appendChild(particle);
      }
    }
  };

  useEffect(() => {
    createFloatingParticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'attachments' && key !== 'estimatedResolution') {
        const error = validateField(key, formData[key]);
        if (error) allErrors[key] = error;
      }
    });
    
    if (Object.keys(allErrors).length > 0) {
      setFormErrors(allErrors);
      setError('Please fix all errors before submitting');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await submitTicketApi(formData);
      setTicketNumber(data.data.ticketNumber);
      setSuccess(`Ticket submitted successfully. Your ticket number is ${data.data.ticketNumber}.`);
      setFormData(initialState);
      setCurrentStep(1);
      setIsDraft(false);
      
      // Trigger confetti animation
      triggerConfetti();
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to submit ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <Container className="hero-content position-relative z-2">
          <Row className="align-items-center min-vh-100 g-5">
            <Col lg={6} className="py-5">
              <div className="animate-fadeInUp">
                <div className="d-inline-flex align-items-center gap-2 mb-4">
                  <Badge bg="warning" text="dark" className="px-3 py-2 fw-bold">
                    <Ticket className="me-2" size={16} />
                    Instant Support
                  </Badge>
                  <Badge bg="success" className="px-3 py-2 fw-bold animate-pulse">
                    <Shield className="me-2" size={16} />
                    24/7 Available
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h1 className="display-1 fw-bold mb-3 text-white">
                    Create Your <span className="text-warning">Support Ticket</span>
                  </h1>
                  <p className="lead text-white-50 mb-0">
                    Submit your service request and get instant ticket generation with real-time tracking.
                    Fast, reliable, and professional support for all your IT and CCTV needs.
                  </p>
                </div>
                
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Button variant="light" size="lg" className="fw-bold" onClick={() => document.getElementById('ticket-form').scrollIntoView({ behavior: 'smooth' })}>
                    <Send className="me-2" size={18} />
                    Create Ticket Now
                  </Button>
                  <Button variant="outline-light" size="lg" className="fw-bold" href="/contact">
                    <Phone className="me-2" size={18} />
                    Call Support
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-5 pt-4 border-top border-white-20">
                  <Row className="g-3">
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">5min</div>
                        <div className="text-white-50 small">Avg Response</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">98%</div>
                        <div className="text-white-50 small">Satisfaction</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">24/7</div>
                        <div className="text-white-50 small">Available</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">1000+</div>
                        <div className="text-white-50 small">Tickets Daily</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={6} className="py-5">
              <div className="animate-slideInLeft h-100 d-flex align-items-center">
                <Card className="glass-effect border-0 shadow-2xl">
                  <Card.Body className="p-5">
                    <div className="text-center mb-4">
                      <div className="d-inline-flex align-items-center justify-content-center stat-icon mb-3">
                        <Ticket size={48} />
                      </div>
                      <h3 className="fw-bold text-white mb-3">Quick Service Request</h3>
                      <Badge bg="info" className="mb-3">
                        Fast Response Guaranteed
                      </Badge>
                    </div>

                    <p className="text-center text-white mb-4">
                      Our streamlined ticket system ensures your service requests are handled
                      efficiently with complete transparency and real-time updates.
                    </p>

                    <div className="d-flex justify-content-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="fw-bold text-warning display-6">5min</div>
                        <div className="text-white-50 small">Avg Response</div>
                      </div>
                      <div className="text-center">
                        <div className="fw-bold text-success display-6">98%</div>
                        <div className="text-white-50 small">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="fw-bold text-info display-6">24/7</div>
                        <div className="text-white-50 small">Available</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button variant="light" size="sm" onClick={() => document.getElementById('ticket-form').scrollIntoView({ behavior: 'smooth' })}>
                        <Send className="me-2" size={16} />
                        Start Your Request
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Floating Elements */}
          <div className="position-absolute animate-float" style={{
            top: '10%',
            right: '5%',
            width: '6rem',
            height: '6rem',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '50%',
            filter: 'blur(1.5rem)'
          }} />
          <div className="position-absolute animate-float" style={{
            bottom: '15%',
            left: '5%',
            width: '4rem',
            height: '4rem',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '50%',
            filter: 'blur(1rem)',
            animationDelay: '1s'
          }} />
          <div className="position-absolute animate-float" style={{
            top: '60%',
            right: '10%',
            width: '3rem',
            height: '3rem',
            background: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '50%',
            filter: 'blur(0.8rem)',
            animationDelay: '2s'
          }} />
        </Container>
      </section>

      {/* Ticket Form Section */}
      <section className="py-5 bg-light position-relative overflow-hidden" id="ticket-form">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'dots\' width=\'30\' height=\'30\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'15\' cy=\'15\' r=\'2\' fill=\'rgba(10, 102, 194, 0.1)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23dots)\'/%3E%3C/svg%3E")',
          opacity: 0.8
        }} />
        
        <Container className="position-relative z-2">
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-3 px-4 py-2 fs-6 fw-bold">
              <Ticket className="me-2" size={18} />
              Generate Service Ticket
            </Badge>
            <h2 className="display-4 fw-bold mb-4">
              Submit Your <span className="text-primary">Service Request</span>
            </h2>
            <p className="lead text-muted mb-0">
              Fill out the form below and get instant ticket generation with real-time tracking.
            </p>
          </div>
                
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Card className="shadow-sm">
                <Card.Body className="p-4">
              {/* Progress Steps */}
              <div className="d-flex justify-content-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="text-center">
                    <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${
                      currentStep === step ? 'bg-primary text-white' : 
                      currentStep > step ? 'bg-success text-white' : 'bg-light text-muted'
                    }`} style={{width: '40px', height: '40px'}}>
                      {currentStep > step ? <CheckCircle size={20} /> : step}
                    </div>
                    <small className="d-block">
                      {step === 1 && 'Contact'}
                      {step === 2 && 'Service'}
                      {step === 3 && 'Details'}
                      {step === 4 && 'Address'}
                    </small>
                  </div>
                ))}
              </div>

              {isDraft && (
                <div className="alert alert-info d-flex align-items-center mb-3">
                  <FileText size={16} className="me-2" />
                  Draft auto-saved
                </div>
              )}

              <Alert type="success" message={success} />
              <Alert type="error" message={error} />
              {loading && <Loader text="Submitting ticket..." />}
                  <form onSubmit={handleSubmit}>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div>
                    <h4 className="mb-3">Contact Information</h4>
                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                        placeholder="Enter your full name" 
                        required 
                      />
                      {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile Number *</label>
                      <input 
                        type="tel" 
                        name="mobileNumber" 
                        value={formData.mobileNumber} 
                        onChange={handleChange} 
                        className={`form-control ${formErrors.mobileNumber ? 'is-invalid' : ''}`}
                        placeholder="10-digit mobile number" 
                        maxLength={10}
                        required 
                      />
                      {formErrors.mobileNumber && <div className="invalid-feedback">{formErrors.mobileNumber}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        placeholder="your.email@example.com" 
                        required 
                      />
                      {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </div>
                  </div>
                )}
                
                {/* Step 2: Service Details */}
                {currentStep === 2 && (
                  <div>
                    <h4 className="mb-3">Service Details</h4>
                    <div className="mb-3">
                      <label className="form-label">Service Type *</label>
                      <div className="row">
                        {serviceTypes.map((service) => {
                          const Icon = service.icon;
                          return (
                            <div key={service.id} className="col-md-6 mb-2">
                              <div
                                className={`card p-3 cursor-pointer ${formData.serviceType === service.id ? 'border-primary bg-light' : ''}`}
                                onClick={() => handleServiceTypeSelect(service.id)}
                              >
                                <div className="d-flex align-items-center">
                                  <Icon size={20} className="me-2" style={{ color: service.color }} />
                                  <div>
                                    <h6 className="mb-0">{service.name}</h6>
                                    <small className="text-muted">{service.description}</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {formErrors.serviceType && <div className="text-danger small">{formErrors.serviceType}</div>}
                    </div>
                                      </div>
                )}
                
                {/* Step 3: Problem Description */}
                {currentStep === 3 && (
                  <div>
                    <h4 className="mb-3">Problem Description</h4>
                    <div className="mb-3">
                      <label className="form-label">Describe your issue *</label>
                      <textarea 
                        name="problemDescription" 
                        value={formData.problemDescription} 
                        onChange={handleChange} 
                        className={`form-control ${formErrors.problemDescription ? 'is-invalid' : ''}`}
                        placeholder="Describe your issue in detail (minimum 20 characters)..." 
                        rows={5} 
                        required 
                      />
                      {formErrors.problemDescription && <div className="invalid-feedback">{formErrors.problemDescription}</div>}
                      <small className="text-muted">{formData.problemDescription.length}/1000</small>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Address */}
                {currentStep === 4 && (
                  <div>
                    <h4 className="mb-3">Service Address</h4>
                    <div className="mb-3">
                      <label className="form-label">Complete Address *</label>
                      <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                        placeholder="Enter your complete address with landmark, city, state, and pincode..." 
                        rows={4} 
                        required 
                      />
                      {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                    </div>
                    
                    <div className="alert alert-info">
                      <h6>Summary:</h6>
                      <p className="mb-1"><strong>Name:</strong> {formData.fullName}</p>
                      <p className="mb-1"><strong>Mobile:</strong> {formData.mobileNumber}</p>
                      <p className="mb-1"><strong>Service:</strong> {serviceTypes.find(s => s.id === formData.serviceType)?.name}</p>
                      <p className="mb-0"><strong>Address:</strong> {formData.address}</p>
                    </div>
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  {currentStep > 1 && (
                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                      Previous
                    </button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button type="button" className="btn btn-primary ms-auto" onClick={nextStep}>
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success ms-auto" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                  )}
                </div>
              </form>
              
              {ticketNumber && (
                <div className="alert alert-success mt-3">
                  <h5>🎉 Ticket Generated Successfully!</h5>
                  <p><strong>Your Ticket Number:</strong> {ticketNumber}</p>
                  <p>Track your service request here: <Link to="/ticket-status">Check Ticket Status</Link></p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
    </section>
    </>
  );
};

export default TicketPage;
