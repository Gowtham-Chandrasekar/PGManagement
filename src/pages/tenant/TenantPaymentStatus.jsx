import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Alert, Row, Col } from 'react-bootstrap';

const TenantPaymentStatus = () => {
  const [tenant, setTenant] = useState(null);
  const [error, setError] = useState('');

  // Simulated logged-in tenant ID (replace with actual auth-based logic)
  const tenantId = 1;

  useEffect(() => {
    const fetchTenantStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/tenant/status/${tenantId}`);
        setTenant(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load payment status.');
      }
    };

    fetchTenantStatus();
  }, [tenantId]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your PG & Payment Status</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {tenant && (
        <Card className="p-4 shadow-lg">
          <Row>
            <Col md={6}>
              <h5 className="mb-3">👤 Tenant Info</h5>
              <p><strong>Name:</strong> {tenant.name}</p>
              <p><strong>Email:</strong> {tenant.email}</p>
              <p><strong>Phone:</strong> {tenant.phone}</p>
            </Col>

            <Col md={6}>
              <h5 className="mb-3">🏠 PG & Payment Info</h5>
              <p><strong>PG Name:</strong> {tenant.pgName}</p>
              <p><strong>Fees:</strong> ₹{tenant.pgFees}</p>
              <p><strong>Status:</strong> {tenant.pgStatus}</p>
              <p><strong>Payment:</strong> {tenant.paymentStatus}</p>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default TenantPaymentStatus;
