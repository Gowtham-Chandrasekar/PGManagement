import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Owner Dashboard</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Admins</Card.Title>
              <Button variant="primary" className="m-1" onClick={() => navigate('/owner/add-admin')}>Add Admin</Button>
              <Button variant="warning" className="m-1" onClick={() => navigate('/owner/update-admin')}>Update Admin</Button>
              <Button variant="danger" className="m-1" onClick={() => navigate('/owner/delete-admin')}>Delete Admin</Button>
              <Button variant="info" className="m-1" onClick={() => navigate('/owner/list-admins')}>View Admins</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Tenants</Card.Title>
              <Button variant="primary" className="m-1" onClick={() => navigate('/owner/add-tenant')}>Add Tenant</Button>
              <Button variant="warning" className="m-1" onClick={() => navigate('/owner/update-tenant')}>Update Tenant</Button>
              <Button variant="danger" className="m-1" onClick={() => navigate('/owner/delete-tenant')}>Delete Tenant</Button>
              <Button variant="info" className="m-1" onClick={() => navigate('/owner/list-tenants')}>View Tenants</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage PGs</Card.Title>
              <Button variant="primary" className="m-1" onClick={() => navigate('/owner/add-pg')}>Add PG</Button>
              <Button variant="warning" className="m-1" onClick={() => navigate('/owner/update-pg')}>Update PG</Button>
              <Button variant="danger" className="m-1" onClick={() => navigate('/owner/delete-pg')}>Delete PG</Button>
              <Button variant="info" className="m-1" onClick={() => navigate('/owner/list-pgs')}>View PGs</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Payment Status</Card.Title>
              <Button variant="success" className="m-1" onClick={() => navigate('/owner/update-payment')}>Update Payments</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>View Feedback</Card.Title>
              <Button variant="dark" className="m-1" onClick={() => navigate('/owner/view-feedback')}>View Complaints</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerDashboard;
