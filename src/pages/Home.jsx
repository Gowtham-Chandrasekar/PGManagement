import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1570129477492-45c003edd2be)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
        paddingTop: '80px',
      }}
    >
      <Container className="text-center">
        <h1 className="mb-4">Welcome to PG Management System</h1>
        <p className="lead mb-5">Search PGs, Register, View Food Plans & Submit Feedback</p>

        <Row className="justify-content-center mb-4">
          <Col md={2} className="mb-2">
            <Button variant="light" size="lg" onClick={() => navigate('/login')}>
              Tenant Login
            </Button>
          </Col>
          <Col md={2} className="mb-2">
            <Button variant="light" size="lg" onClick={() => navigate('/login')}>
              Admin Login
            </Button>
          </Col>
          <Col md={2} className="mb-2">
            <Button variant="light" size="lg" onClick={() => navigate('/login')}>
              Owner Login
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col md={3} className="mb-2">
            <Button variant="success" size="lg" onClick={() => navigate('/pg-search')}>
              🔍 Search PG
            </Button>
          </Col>
          <Col md={3} className="mb-2">
            <Button variant="warning" size="lg" onClick={() => navigate('/food-timetable')}>
              🧾 Food Time Table
            </Button>
          </Col>
          <Col md={3} className="mb-2">
            <Button variant="info" size="lg" onClick={() => navigate('/feedback')}>
              ✉️ Feedback
            </Button>
          </Col>
        </Row>

        <div className="mt-5">
          <h3>About Us</h3>
          <p style={{ maxWidth: '700px', margin: 'auto', color: '#f1f1f1' }}>
            Our Paying Guest (PG) Management System helps tenants search and manage PG accommodation easily. Owners and admins can manage users, payments, and feedback efficiently.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
