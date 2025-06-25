import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const ListTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/all-tenants');
      setTenants(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tenants.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">List of Tenants</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {tenants.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tenant ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={tenant.tenantId}>
                <td>{index + 1}</td>
                <td>{tenant.tenantId}</td>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.phone}</td>
                <td>{tenant.password}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No tenants found.</p>
      )}
    </Container>
  );
};

export default ListTenants;
