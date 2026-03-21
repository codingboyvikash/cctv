import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  Award, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Zap,
  Eye,
  Phone,
  Mail
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import { companyInfo } from '../../data/siteData';

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+", color: "primary" },
    { icon: Award, label: "Years Experience", value: "10+", color: "success" },
    { icon: Shield, label: "Projects Completed", value: "1200+", color: "info" },
    { icon: Clock, label: "24/7 Support", value: "Always", color: "warning" },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To deliver secure, affordable, and modern technical solutions through responsive service and quality products.",
      color: "primary"
    },
    {
      icon: Eye,
      title: "Vision",
      description: "To become the most trusted IT and CCTV service provider in our region through innovation and customer satisfaction.",
      color: "success"
    },
    {
      icon: Heart,
      title: "Values",
      description: "Integrity, Excellence, Innovation, and Customer-Centric approach in everything we do.",
      color: "danger"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Skilled technicians and professional support workflow with continuous training and certification.",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Transparent Process",
      description: "Clear service ticket generation, real-time status tracking, and detailed reporting.",
      color: "success"
    },
    {
      icon: Zap,
      title: "Comprehensive Services",
      description: "AMC, repair, installation, and sales services all under one roof for complete peace of mind.",
      color: "warning"
    },
    {
      icon: Globe,
      title: "Digital First",
      description: "Business-focused, mobile-friendly digital presence with online ticket management.",
      color: "info"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "ISO certified processes and quality assurance at every step of service delivery.",
      color: "primary"
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "Latest technology adoption and innovative solutions for modern business challenges.",
      color: "success"
    }
  ];

  const timeline = [
    {
      year: "2014",
      title: "Company Founded",
      description: "Started as a small IT repair service with a vision to provide quality technical support."
    },
    {
      year: "2017",
      title: "Expansion",
      description: "Added CCTV installation and AMC services to our portfolio."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online ticket management system and digital customer portal."
    },
    {
      year: "2024",
      title: "Excellence Milestone",
      description: "Reached 500+ happy clients and 1200+ completed projects milestone."
    }
  ];

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
                    <Award className="me-2" size={16} />
                    Trusted Since 2014
                  </Badge>
                  <Badge bg="success" className="px-3 py-2 fw-bold animate-pulse">
                    <Shield className="me-2" size={16} />
                    ISO Certified
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h1 className="display-1 fw-bold mb-3 text-white">
                    About <span className="text-warning">{companyInfo.name}</span>
                  </h1>
                  <p className="lead text-white-50 mb-0">
                    Your trusted IT services and surveillance technology partner, delivering excellence 
                    through innovation, reliability, and customer-centric solutions.
                  </p>
                </div>
                
                <div className="d-flex flex-wrap gap-3">
                  <Button variant="light" size="lg" href="/contact" className="fw-bold">
                    <Shield className="me-2" size={18} />
                    Get in Touch
                  </Button>
                  <Button variant="outline-light" size="lg" href="/services" className="fw-bold">
                    <Zap className="me-2" size={18} />
                    Our Services
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-5 pt-4 border-top border-white-20">
                  <Row className="g-3">
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">500+</div>
                        <div className="text-white-50 small">Happy Clients</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">10+</div>
                        <div className="text-white-50 small">Years Experience</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">1200+</div>
                        <div className="text-white-50 small">Projects</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <div className="text-white fw-bold display-6">24/7</div>
                        <div className="text-white-50 small">Support</div>
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
                        <Shield size={48} />
                      </div>
                      <h3 className="fw-bold text-white mb-3">Company Profile</h3>
                      <Badge bg="info" className="mb-3">
                        Leading IT Solutions Provider
                      </Badge>
                    </div>
                    
                    <p className="text-center text-white mb-4">
                      We are a professional IT Services and CCTV company focused on fast support, 
                      preventive maintenance, and long-term service quality for residential 
                      and commercial customers across all sectors.
                    </p>

                    <div className="d-flex justify-content-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="fw-bold text-warning display-6">500+</div>
                        <div className="text-white-50 small">Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="fw-bold text-success display-6">1200+</div>
                        <div className="text-white-50 small">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="fw-bold text-info display-6">10+</div>
                        <div className="text-white-50 small">Years</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button variant="light" size="sm" href="/contact">
                        <Award className="me-2" size={16} />
                        Learn More About Us
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

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="stat-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body className="text-center">
                    <div className="stat-icon mx-auto mb-3">
                      <stat.icon size={32} />
                    </div>
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Mission Vision Values */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <SectionHeading
              eyebrow="Our Foundation"
              title="Mission, Vision & Values"
              description="The core principles that guide our business and drive our commitment to excellence."
            />
          </div>
          
          <Row className="g-4">
            {values.map((value, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 animate-fadeInUp" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <Card.Body className="text-center p-4">
                    <div className={`stat-icon mx-auto mb-3 bg-${value.color}`}>
                      <value.icon size={32} />
                    </div>
                    <h4 className="fw-bold mb-3">{value.title}</h4>
                    <p className="text-muted">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="What Makes Us Different"
              description="We combine expertise, technology, and customer focus to deliver exceptional service."
            />
          </div>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="h-100 border-0 shadow-sm animate-fadeInUp" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className={`stat-icon bg-${feature.color}`} style={{ minWidth: '3rem', minHeight: '3rem' }}>
                        <feature.icon size={20} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">{feature.title}</h5>
                        <p className="text-muted small mb-0">{feature.description}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-5 bg-light position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'dots\' width=\'30\' height=\'30\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'15\' cy=\'15\' r=\'2\' fill=\'rgba(10, 102, 194, 0.1)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23dots)\'/%3E%3C/svg%3E")',
          opacity: 0.8
        }} />
        
        <Container className="position-relative z-2">
          <div className="text-center mb-5">
            <SectionHeading
              eyebrow="Our Journey"
              title="Timeline of Excellence"
              description="From humble beginnings to becoming a trusted IT partner, here's our story of growth and innovation."
            />
          </div>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="timeline">
                {timeline.map((item, index) => (
                  <div key={index} className="timeline-item animate-fadeInUp" style={{ animationDelay: `${0.4 + index * 0.15}s` }}>
                    <Row className="align-items-center g-4">
                      <Col md={3} className="text-md-end">
                        <div className="timeline-year">
                          <Badge bg="primary" className="px-4 py-3 fs-5 fw-bold position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle badge bg-success rounded-circle p-1" style={{ width: '0.5rem', height: '0.5rem' }}>
                              <span className="visually-hidden">Milestone</span>
                            </span>
                            {item.year}
                          </Badge>
                          <div className="mt-3">
                            <div className="timeline-dot position-relative">
                              <div className="w-3 h-3 bg-primary rounded-full mx-auto"></div>
                              {index < timeline.length - 1 && (
                                <div className="position-absolute top-100 start-50 translate-middle w-0.5 h-20 bg-primary"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={9}>
                        <Card className="border-0 shadow-lg h-100 animate-slideInLeft" style={{ animationDelay: `${0.5 + index * 0.15}s` }}>
                          <Card.Body className="p-4">
                            <div className="d-flex align-items-start gap-3 mb-3">
                              <div className="timeline-icon bg-gradient-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                                {index === 0 && <Award size={20} />}
                                {index === 1 && <TrendingUp size={20} />}
                                {index === 2 && <Globe size={20} />}
                                {index === 3 && <Target size={20} />}
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="fw-bold mb-2">{item.title}</h5>
                                <Badge bg="secondary" className="mb-2">Milestone {index + 1}</Badge>
                              </div>
                            </div>
                            <p className="text-muted mb-0">{item.description}</p>
                            
                            {/* Progress Indicator */}
                            <div className="mt-3">
                              <div className="progress" style={{ height: '0.5rem' }}>
                                <div 
                                  className="progress-bar" 
                                  style={{ 
                                    width: `${(index + 1) * 25}%`,
                                    animation: `progressFill 1s ease-out ${0.6 + index * 0.15}s forwards`
                                  }}
                                ></div>
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <small className="text-muted">Progress</small>
                                <small className="fw-bold text-primary">{(index + 1) * 25}%</small>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
          opacity: 0.5
        }} />
        
        <Container className="position-relative z-2">
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="animate-fadeInUp text-center">
                <Badge bg="warning" text="dark" className="mb-4 px-4 py-3 fs-6 fw-bold animate-pulse">
                  <Zap className="me-2" size={20} />
                  Let's Build Something Amazing Together
                </Badge>
                
                <h2 className="display-3 fw-bold mb-4">
                  Ready to Transform Your <span className="text-warning">Business</span>?
                </h2>
                
                <p className="lead mb-5 text-black-high-contrast">
                  Join hundreds of satisfied customers who trust us for their IT and CCTV needs. 
                  Get started today and experience the difference professional service makes.
                </p>
                
                <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                  <Button variant="light" size="lg" href="/contact" className="fw-bold px-4">
                    <Shield className="me-2" size={20} />
                    Start Your Project
                  </Button>
                  <Button variant="dark" size="lg" href="/ticket" className="fw-bold px-4">
                    <Award className="me-2" size={20} />
                    Get Free Consultation
                  </Button>
                </div>

                {/* Quick Contact Info */}
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  <div className="d-flex align-items-center gap-2 bg-white/10 px-3 py-2 rounded-pill">
                    <Phone size={18} className="text-black" />
                    <span className="fw-semibold text-black">{companyInfo.phone}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 bg-white/10 px-3 py-2 rounded-pill">
                    <Mail size={18} className="text-black" />
                    <span className="fw-semibold text-black">{companyInfo.email}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Floating Elements */}
          <div className="position-absolute animate-float" style={{
            top: '20%',
            right: '10%',
            width: '8rem',
            height: '8rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(2rem)'
          }} />
          <div className="position-absolute animate-float" style={{
            bottom: '10%',
            left: '5%',
            width: '6rem',
            height: '6rem',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '50%',
            filter: 'blur(1.5rem)',
            animationDelay: '1s'
          }} />
        </Container>
      </section>

      <style>{`
        .timeline-item {
          margin-bottom: 2rem;
          position: relative;
        }
        
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 1.5rem;
          top: 3rem;
          bottom: -2rem;
          width: 2px;
          background: var(--bs-primary);
        }
        
        @media (max-width: 768px) {
          .timeline-item::after {
            left: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default AboutPage;
