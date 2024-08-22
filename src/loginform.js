import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for making HTTP requests

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    try {
      let response;
      if (role === 'Admin') {
        response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      } else if (role === 'Doctor') {
        response = await axios.post('/api/doctor/login', { email, password });
      } else if (role === 'Patient') {
        response = await axios.post('/api/patient/login', { email, password });
      }

      if (response && response.data.success) {
        console.log(`Logged in as ${role}`);
        // Navigate to the respective dashboard or page
        if (role === 'Admin') {
          navigate('/adminpage');
        } else if (role === 'Doctor') {
          navigate('/doctorpage');
        } else if (role === 'Patient') {
          navigate('/patientpage');
        }
      } else {
        console.log('Login failed');
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="justify-content-center">
        <Col md={18} lg={16}> {/* Adjusted column width */}
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Button variant="secondary" onClick={handleBack}>Back</Button>{' '}
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-100 mb-2"
                  onClick={() => handleLogin('Patient')}
                >
                  Login as Patient
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-100 mb-2"
                  onClick={() => handleLogin('Doctor')}
                >
                  Login as Doctor
                </Button>
                <Button 
                  variant="success" 
                  size="sm" 
                  className="w-100 mb-2"
                  onClick={() => handleLogin('Admin')}
                >
                  Login as Admin
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
