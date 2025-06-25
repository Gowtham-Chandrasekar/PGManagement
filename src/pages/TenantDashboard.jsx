import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Tenant Dashboard</h2>
      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>My PG & Payment Status</Card.Title>
              <Card.Text>Check your PG allocation and current payment status.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/tenant/status')}>
                View Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Submit Feedback</Card.Title>
              <Card.Text>Raise complaints or provide feedback to the PG Owner.</Card.Text>
              <Button variant="success" onClick={() => navigate('/tenant/feedback')}>
                Submit Feedback
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>View Food Time Table</Card.Title>
              <Card.Text>Check the meal plan and food timings for the week.</Card.Text>
              <Button variant="info" onClick={() => navigate('/food-timetable')}>
                View Food Schedule
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TenantDashboard;
