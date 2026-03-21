import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Phone,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SectionHeading from '../../components/SectionHeading';
import ServiceCard from '../../components/ServiceCard';
import { services, companyInfo } from '../../data/siteData';

const HomePage = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: CheckCircle, label: "Projects Completed", value: "1200+" },
    { icon: Clock, label: "24/7 Support", value: "Always" },
    { icon: TrendingUp, label: "Success Rate", value: "98%" },
  ];

  return (
    <>
      {/* Premium Hero Section */}
      <section className="hero">
        <Container className="hero-content">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <div className="animate-fadeInUp">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Zap className="text-primary-light" size={20} />
                  <span className="eyebrow">Professional IT & CCTV Support</span>
                </div>
                
                <h1 className="hero-title">
                  Reliable Business
                  <span className="gradient-text">Technology Solutions</span>
                </h1>
                
                <p className="hero-subtitle">
                  {companyInfo.name} provides comprehensive computer repair, CCTV installation, 
                  AMC plans, printer services, network setup, and business support solutions for 
                  homes, offices, and shops.
                </p>
                
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/ticket" className="btn btn-primary btn-lg">
                    Generate Service Ticket
                    <ArrowRight size={18} className="ms-2" />
                  </Link>
                  
                  <Button variant="outline-light" size="lg" href={`tel:${companyInfo.phone}`}>
                    <Phone size={18} className="me-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <Card className="glass-effect animate-slideInLeft">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="stat-icon">
                      <Shield size={28} />
                    </div>
                    <h3 className="fw-bold mb-0">24×7 Expert Support</h3>
                  </div>
                  
                  <p className="mb-4">
                    Fast response times, certified technicians, transparent ticket tracking, 
                    and scalable service operations designed for your business growth.
                  </p>
                  
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <CheckCircle className="text-success" size={20} />
                      <span>On-site and remote support</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <CheckCircle className="text-success" size={20} />
                      <span>Real-time ticket tracking</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <CheckCircle className="text-success" size={20} />
                      <span>Comprehensive AMC plans</span>
                    </div>
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

      {/* Premium Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="stat-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body>
                    <div className="stat-icon">
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

      {/* Premium Services Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <SectionHeading
              eyebrow="What We Do"
              title="Complete business solutions under one roof"
              description="From IT maintenance to CCTV deployment, we help businesses stay secure and operational with cutting-edge technology solutions."
            />
          </div>
          
          <Row className="g-4">
            {services.slice(0, 3).map((service, index) => (
              <Col lg={4} key={service.title}>
                <div className="animate-fadeInUp" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <ServiceCard {...service} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
