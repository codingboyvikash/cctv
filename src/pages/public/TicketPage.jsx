import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
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
      errors.priority = !formData.priority ? 'Please select a priority level' : '';
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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <div className="hero-content text-center">
            <div className="hero-icon mb-4">
              <div className="icon-pulse">
                <Ticket size={48} className="text-white" />
              </div>
            </div>
            <h1 className="hero-title mb-3">
              <span className="title-shine">Service Ticket Portal</span>
            </h1>
            <p className="hero-subtitle mb-5">Submit your service request and get instant ticket generation</p>
            
            {/* Enhanced Trust Indicators */}
            <div className="trust-indicators mb-5">
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Star className="text-warning" size={20} />
                </div>
                <div>
                  <div className="trust-number">4.9/5</div>
                  <div className="trust-label">Customer Rating</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <div className="trust-number">10,000+</div>
                  <div className="trust-label">Happy Customers</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Award className="text-success" size={20} />
                </div>
                <div>
                  <div className="trust-number">24/7</div>
                  <div className="trust-label">Premium Support</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced CTA Button */}
            <div className="hero-cta mb-4">
              <Button variant="primary" size="lg" className="btn-hero-enhanced" onClick={() => document.getElementById('ticket-form').scrollIntoView({ behavior: 'smooth' })}>
                <Send size={20} className="me-2" />
                <span>Create Ticket Now</span>
                <div className="btn-glow"></div>
              </Button>
            </div>
          </div>
        </Container>
        
        {/* Animated Background Elements */}
        <div className="hero-bg-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Multi-Step Ticket Form Section */}
      <section className="section" id="ticket-form">
        <div className="container narrow">
          <div className="ticket-form-wrapper">
            {/* Premium Form Header */}
            <div className="form-header-premium text-center mb-5">
              <div className="form-header-icon-premium mb-4">
                <Ticket size={64} className="text-white" />
              </div>
              <h1 className="form-header-title-premium mb-3">
                <span className="title-gradient">Generate Service Ticket</span>
              </h1>
              <p className="form-header-subtitle-premium">Submit your complaint or service request and get a unique ticket number instantly.</p>
            </div>
            
            {/* Progress Steps */}
            <div className="progress-steps-wrapper mb-5">
              <div className="progress-steps">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="step-item">
                    <button
                      className={`step-indicator ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'success' : ''}`}
                      onClick={() => goToStep(step)}
                      disabled={currentStep <= step}
                    >
                      {currentStep > step ? (
                        <CheckCircle size={24} />
                      ) : (
                        <span>{step}</span>
                      )}
                    </button>
                    <div className="step-label">
                      <div className="step-title">
                        {step === 1 && 'Contact Info'}
                        {step === 2 && 'Service Details'}
                        {step === 3 && 'Problem Description'}
                        {step === 4 && 'Address & Submit'}
                      </div>
                      <div className="step-subtitle">
                        {step === 1 && 'Your personal details'}
                        {step === 2 && 'Select service & priority'}
                        {step === 3 && 'Describe the issue'}
                        {step === 4 && 'Service location'}
                      </div>
                    </div>
                    {step < 4 && <div className={`progress-line ${currentStep > step ? 'active' : ''}`}></div>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Premium Form Card */}
            <div className="form-card-premium">
              <div className="form-body">
                <div className="form-header-decoration"></div>
                
                {/* Draft Indicator */}
                {isDraft && (
                  <div className="draft-indicator mb-4">
                    <FileText size={16} className="me-2" />
                    <span>Draft auto-saved</span>
                  </div>
                )}
                
                <Alert type="success" message={success} />
                <Alert type="error" message={error} />
                {loading && <Loader text="Submitting ticket..." />}
                
                <form onSubmit={handleSubmit} className="form-premium">
                  {/* Step 1: Contact Information */}
                  {currentStep === 1 && (
                    <div className="step-content">
                      <div className="step-header mb-4">
                        <h3 className="step-title">Contact Information</h3>
                        <p className="step-description">Please provide your contact details so we can reach you regarding your service request.</p>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium">
                          <label className="form-label-premium">
                            <User size={20} className="label-icon" />
                            Full Name
                            <span className="required-star">*</span>
                          </label>
                          <div className="input-wrapper-enhanced">
                            <input 
                              type="text" 
                              name="fullName" 
                              value={formData.fullName} 
                              onChange={handleChange} 
                              placeholder="Enter your full name" 
                              className={`form-input-premium ${formErrors.fullName ? 'error' : ''} ${formData.fullName ? 'has-value' : ''}`}
                              required 
                            />
                            <div className="input-icon-right">
                              {formData.fullName && <CheckCircle size={16} className="text-success" />}
                            </div>
                            {formErrors.fullName && (
                              <div className="error-message-enhanced">
                                <AlertCircle size={16} className="me-1" />
                                <span>{formErrors.fullName}</span>
                              </div>
                            )}
                            <div className="input-focus-border"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium">
                          <label className="form-label-premium">
                            <Phone size={20} className="label-icon" />
                            Mobile Number
                            <span className="required-star">*</span>
                          </label>
                          <div className="input-wrapper-enhanced">
                            <input 
                              type="tel" 
                              name="mobileNumber" 
                              value={formData.mobileNumber} 
                              onChange={handleChange} 
                              placeholder="10-digit mobile number" 
                              className={`form-input-premium ${formErrors.mobileNumber ? 'error' : ''} ${formData.mobileNumber ? 'has-value' : ''}`}
                              maxLength={10}
                              required 
                            />
                            <div className="input-icon-right">
                              {formData.mobileNumber && <CheckCircle size={16} className="text-success" />}
                            </div>
                            {formErrors.mobileNumber && (
                              <div className="error-message-enhanced">
                                <AlertCircle size={16} className="me-1" />
                                <span>{formErrors.mobileNumber}</span>
                              </div>
                            )}
                            <div className="input-focus-border"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium">
                          <label className="form-label-premium">
                            <Mail size={20} className="label-icon" />
                            Email Address
                            <span className="required-star">*</span>
                          </label>
                          <div className="input-wrapper-enhanced">
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              placeholder="your.email@example.com" 
                              className={`form-input-premium ${formErrors.email ? 'error' : ''} ${formData.email ? 'has-value' : ''}`}
                              required 
                            />
                            <div className="input-icon-right">
                              {formData.email && <CheckCircle size={16} className="text-success" />}
                            </div>
                            {formErrors.email && (
                              <div className="error-message-enhanced">
                                <AlertCircle size={16} className="me-1" />
                                <span>{formErrors.email}</span>
                              </div>
                            )}
                            <div className="input-focus-border"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Service Details */}
                  {currentStep === 2 && (
                    <div className="step-content">
                      <div className="step-header mb-4">
                        <h3 className="step-title">Service Details</h3>
                        <p className="step-description">Select the type of service you need and the priority level.</p>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium">
                          <label className="form-label-premium">
                            <Shield size={20} className="label-icon" />
                            Service Type
                            <span className="required-star">*</span>
                          </label>
                          <div className="service-types-enhanced">
                            {serviceTypes.map((service) => {
                              const Icon = service.icon;
                              return (
                                <div
                                  key={service.id}
                                  className={`service-card-premium ${formData.serviceType === service.id ? 'selected' : ''} ${formData.serviceType === service.id ? 'card-selected' : ''}`}
                                  onClick={() => handleServiceTypeSelect(service.id)}
                                >
                                  <div className="service-header">
                                    <div className="service-icon-premium" style={{ background: service.color }}>
                                      <Icon size={28} className="text-white" />
                                    </div>
                                    <div className="service-badge">{service.icon}</div>
                                  </div>
                                  <div className="service-body">
                                    <h5 className="service-title">{service.name}</h5>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-arrow">
                                      {formData.serviceType === service.id && <CheckCircle size={16} className="text-white" />}
                                      {formData.serviceType !== service.id && <ChevronRight size={16} />}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {formErrors.serviceType && (
                            <div className="error-message-enhanced">
                              <AlertCircle size={16} className="me-1" />
                              <span>{formErrors.serviceType}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium">
                          <label className="form-label-premium">
                            <Zap size={20} className="label-icon" />
                            Priority Level
                            <span className="required-star">*</span>
                          </label>
                          <div className="priority-enhanced">
                            {priorityLevels.map((priority) => {
                              const Icon = priority.icon;
                              return (
                                <div
                                  key={priority.id}
                                  className={`priority-card-enhanced ${formData.priority === priority.id ? 'selected' : ''} ${formData.priority === priority.id ? 'priority-selected' : ''}`}
                                  onClick={() => handlePrioritySelect(priority.id)}
                                >
                                  <div className="priority-header">
                                    <div className="priority-icon-enhanced" style={{ color: priority.color, borderColor: priority.color }}>
                                      <Icon size={24} />
                                    </div>
                                    <div className="priority-badge">{priority.icon}</div>
                                  </div>
                                  <div className="priority-body">
                                    <h6 className="priority-name">{priority.name}</h6>
                                    <div className="priority-time" style={{ color: priority.color }}>
                                      <Clock size={14} className="me-1" />
                                      <span>{priority.time}</span>
                                    </div>
                                    <p className="priority-description">{priority.description}</p>
                                  </div>
                                  <div className="priority-selection">
                                    {formData.priority === priority.id && <CheckCircle size={20} className="text-white" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {formData.estimatedResolution && (
                            <div className="estimated-resolution-enhanced">
                              <AlertCircle size={18} className="me-2 text-info" />
                              <span>Estimated resolution time: <strong>{formData.estimatedResolution}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Problem Description */}
                  {currentStep === 3 && (
                    <div className="step-content">
                      <div className="step-header mb-4">
                        <h3 className="step-title">Problem Description</h3>
                        <p className="step-description">Please describe your issue in detail and attach any relevant files.</p>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium full-width">
                          <label className="form-label-premium">
                            <MessageSquare size={20} className="label-icon" />
                            Problem Description
                            <span className="required-star">*</span>
                            <span className="character-count">
                              {formData.problemDescription.length}/1000
                            </span>
                          </label>
                          <div className="textarea-wrapper-enhanced">
                            <textarea 
                              name="problemDescription" 
                              value={formData.problemDescription} 
                              onChange={handleChange} 
                              placeholder="Describe your issue in detail... (minimum 20 characters)" 
                              rows={6} 
                              className={`form-textarea-premium ${formErrors.problemDescription ? 'error' : ''} ${formData.problemDescription ? 'has-value' : ''}`}
                              required 
                            />
                            <div className="textarea-footer">
                              <div className="character-indicator">
                                <div className="indicator-bar">
                                  <div className="indicator-fill" style={{ width: `${(formData.problemDescription.length / 1000) * 100}%` }}></div>
                                </div>
                                <span>{formData.problemDescription.length}/1000</span>
                              </div>
                              {formData.problemDescription && <CheckCircle size={16} className="text-success" />}
                            </div>
                            {formErrors.problemDescription && (
                              <div className="error-message-enhanced">
                                <AlertCircle size={16} className="me-1" />
                                <span>{formErrors.problemDescription}</span>
                              </div>
                            )}
                            <div className="input-focus-border"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium full-width">
                          <label className="form-label-premium">
                            <Paperclip size={20} className="label-icon" />
                            Attachments (Optional)
                            <span className="attachment-count">
                              {formData.attachments.length > 0 && `(${formData.attachments.length})`}
                            </span>
                          </label>
                          <div 
                            className={`file-upload-area-enhanced ${dragActive ? 'drag-active' : ''} ${formData.attachments.length > 0 ? 'has-files' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept="image/*,.pdf,.doc,.docx"
                              onChange={(e) => handleFileUpload(e.target.files)}
                              style={{ display: 'none' }}
                            />
                            <div className="upload-content">
                              <Upload size={48} className="upload-icon" />
                              <div className="upload-text">
                                <p className="upload-title">Drag & drop files here or <span className="upload-link">browse</span></p>
                                <p className="upload-subtitle">Supported: Images, PDF, Documents (Max 5MB per file)</p>
                              </div>
                              {formData.attachments.length === 0 && (
                                <div className="upload-placeholder">
                                  <div className="placeholder-icon">📁</div>
                                  <div className="placeholder-text">No files uploaded yet</div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {formData.attachments.length > 0 && (
                            <div className="attachments-list-enhanced">
                              {formData.attachments.map((file, index) => (
                                <div key={index} className="attachment-item-enhanced">
                                  <div className="attachment-icon-wrapper">
                                    <FileText size={20} className="attachment-icon" />
                                  </div>
                                  <div className="attachment-info">
                                    <div className="attachment-name">{file.name}</div>
                                    <div className="attachment-details">
                                      <span className="attachment-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                      <button
                                        type="button"
                                        className="remove-attachment-enhanced"
                                        onClick={() => removeFile(index)}
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Address & Submit */}
                  {currentStep === 4 && (
                    <div className="step-content">
                      <div className="step-header mb-4">
                        <h3 className="step-title">Service Address</h3>
                        <p className="step-description">Provide the complete address where the service needs to be provided.</p>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group-premium full-width">
                          <label className="form-label-premium">
                            <MapPin size={20} className="label-icon" />
                            Service Address
                            <span className="required-star">*</span>
                          </label>
                          <div className="textarea-wrapper-enhanced">
                            <textarea 
                              name="address" 
                              value={formData.address} 
                              onChange={handleChange} 
                              placeholder="Enter your complete address with landmark, city, state, and pincode..." 
                              rows={5} 
                              className={`form-textarea-premium ${formErrors.address ? 'error' : ''} ${formData.address ? 'has-value' : ''}`}
                              required 
                            />
                            <div className="textarea-footer">
                              <div className="address-indicator">
                                {formData.address && <CheckCircle size={16} className="text-success" />}
                                {!formData.address && <MapPin size={16} className="text-muted" />}
                              </div>
                              <span className="character-count">{formData.address.length}/200</span>
                            </div>
                            {formErrors.address && (
                              <div className="error-message-enhanced">
                                <AlertCircle size={16} className="me-1" />
                                <span>{formErrors.address}</span>
                              </div>
                            )}
                            <div className="input-focus-border"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Summary Section */}
                      <div className="summary-section">
                        <h4 className="summary-title">Ticket Summary</h4>
                        <div className="summary-grid">
                          <div className="summary-item">
                            <span className="summary-label">Name:</span>
                            <span className="summary-value">{formData.fullName}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Mobile:</span>
                            <span className="summary-value">{formData.mobileNumber}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Email:</span>
                            <span className="summary-value">{formData.email}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Service:</span>
                            <span className="summary-value">
                              {serviceTypes.find(s => s.id === formData.serviceType)?.name}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Priority:</span>
                            <span className="summary-value">{formData.priority}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Est. Time:</span>
                            <span className="summary-value">{formData.estimatedResolution}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="form-navigation">
                    <div className="nav-buttons">
                      {currentStep > 1 && (
                        <button type="button" className="btn-nav-prev" onClick={prevStep}>
                          <ChevronLeft size={20} className="me-2" />
                          Previous
                        </button>
                      )}
                      
                      {currentStep < totalSteps ? (
                        <button type="button" className="btn-nav-next" onClick={nextStep}>
                          Next
                          <ChevronRight size={20} className="ms-2" />
                        </button>
                      ) : (
                        <button type="submit" className="form-submit-premium" disabled={loading}>
                          <span className="button-content">
                            <Send size={22} className="me-2" />
                            <span className="button-text">{loading ? 'Submitting...' : 'Submit Ticket'}</span>
                          </span>
                          <div className="button-glow"></div>
                          <div className="button-particles">
                            <div className="particle particle-1"></div>
                            <div className="particle particle-2"></div>
                            <div className="particle particle-3"></div>
                            <div className="particle particle-4"></div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
                
                {ticketNumber && (
                  <div className="success-message-premium">
                    <div className="success-animation">
                      <div className="success-icon-wrapper">
                        <CheckCircle size={32} className="text-white" />
                      </div>
                      <div className="success-content">
                        <h4 className="success-title">🎉 Ticket Generated Successfully!</h4>
                        <div className="ticket-number-display">
                          <span className="ticket-label">Your Ticket Number:</span>
                          <span className="ticket-number">{ticketNumber}</span>
                        </div>
                        <p className="success-description">Track your service request here: <Link to="/ticket-status" className="success-link">Check Ticket Status</Link></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketPage;
