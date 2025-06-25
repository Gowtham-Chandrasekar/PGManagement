import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/otp/send', { phone: user.phone });
      if (response.data === 'OTP sent successfully') {
        setStep(2);
        setMessage('OTP sent to your phone.');
        setError('');
      } else {
        setError('Failed to send OTP.');
      }
    } catch (err) {
      setError('Error sending OTP.');
    }
  };

  const verifyOtpAndRegister = async () => {
    try {
      const verifyResponse = await axios.post('http://localhost:8080/api/otp/verify', {
        phone: user.phone,
        otp,
      });

      if (verifyResponse.data === 'OTP verified successfully') {
        // Register the user
        await axios.post('http://localhost:8080/api/tenants/register', user);
        setMessage('Registration successful!');
        setError('');
        setStep(3); // registration complete
      } else {
        setError('Invalid OTP.');
      }
    } catch (err) {
      setError('Error verifying OTP or registering.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">User Registration</h3>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {step === 1 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={user.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone" value={user.phone} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={user.password} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" onClick={sendOtp}>Send OTP</Button>
        </Form>
      )}

      {step === 2 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </Form.Group>
          <Button variant="success" onClick={verifyOtpAndRegister}>Verify & Register</Button>
        </Form>
      )}

      {step === 3 && (
        <div className="text-center mt-4">
          <h5>✅ Registered successfully. Please <a href="/login">Login</a>.</h5>
        </div>
      )}
    </Container>
  );
};

export default Register;
