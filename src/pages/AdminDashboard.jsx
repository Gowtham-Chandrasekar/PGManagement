import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Tenants</Card.Title>
              <Card.Text>Add, update, or delete tenant records</Card.Text>
              <Button onClick={() => navigate('/admin/tenants')} variant="primary">
                Manage Tenants
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>PG Status Update</Card.Title>
              <Card.Text>Change PG availability (Available / Unavailable)</Card.Text>
              <Button onClick={() => navigate('/admin/pgs')} variant="success">
                Update PG Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Update Payment Status</Card.Title>
              <Card.Text>Modify payment records of tenants</Card.Text>
              <Button onClick={() => navigate('/admin/payments')} variant="warning">
                Update Payments
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
