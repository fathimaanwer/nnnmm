import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Card, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './AdminPage.css'; // Import custom CSS

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState('home'); // default view

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      const response = await axios.post(`/api/doctors/approve/${doctorId}`);
      if (response.data.success) {
        alert('Doctor approved successfully');
        fetchDoctors(); // Refresh the list after approval
      }
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
  };

  const rejectDoctor = async (doctorId) => {
    try {
      const response = await axios.post(`/api/doctors/reject/${doctorId}`);
      if (response.data.success) {
        alert('Doctor rejected successfully');
        fetchDoctors(); // Refresh the list after rejection
      }
    } catch (error) {
      console.error('Error rejecting doctor:', error);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'viewDoctors':
        return (
          <Card>
            <Card.Body>
              <h3>Doctor List</h3>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Locality</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Nationality</th>
                      <th>DOB</th>
                      <th>Education Qualification</th>
                      <th>Higher Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.firstName}</td>
                        <td>{doctor.lastName}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.address}</td>
                        <td>{doctor.locality}</td>
                        <td>{doctor.age}</td>
                        <td>{doctor.gender}</td>
                        <td>{doctor.nationality}</td>
                        <td>{doctor.dob}</td>
                        <td>{doctor.educationQualification}</td>
                        <td>{doctor.higherQualification}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      case 'approveDoctors':
        return (
          <Card>
            <Card.Body>
              <h3>Approve Doctors</h3>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Locality</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Nationality</th>
                      <th>DOB</th>
                      <th>Education Qualification</th>
                      <th>Higher Qualification</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.firstName}</td>
                        <td>{doctor.lastName}</td>
                        <td>{doctor.Phone}</td>
                        <td>{doctor.Email}</td>
                        <td>{doctor.Address}</td>
                        <td>{doctor.Locality}</td>
                        <td>{doctor.Age}</td>
                        <td>{doctor.Gender}</td>
                        <td>{doctor.Nationality}</td>
                        <td>{doctor.DOB}</td>
                        <td>{doctor.EducationQualification}</td>
                        <td>{doctor.HigherQualification}</td>
                        <td>
                          {doctor.status === 'pending' ? (
                            <div className="d-flex">
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2" // Margin end for spacing
                                onClick={() => approveDoctor(doctor.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="me-2" // Margin end for spacing
                                onClick={() => rejectDoctor(doctor.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            'Approved'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      case 'viewPatients':
        return (
          <Card>
            <Card.Body>
              <h3>Patient List</h3>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{patient.condition}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      default:
        return (
          <div className="text-center mt-5">
            <h1>Care&Cure</h1>
          </div>
        );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-white p-3 vh-100">
          <Nav className="flex-column justify-content-between h-100">
            <Button variant="primary" size="sm" className="mb-2" onClick={() => setView('viewDoctors')}>
              View Doctor List
            </Button>
            <Button variant="success" size="sm" className="mb-2" onClick={() => setView('approveDoctors')}>
              Approve Doctor
            </Button>
            <Button variant="secondary" size="sm" className="mb-2" onClick={() => setView('viewPatients')}>
              View Patient List
            </Button>
            <Button variant="warning" size="sm" className="mb-2" onClick={() => setView('approvePatients')}>
              Approve Patients
            </Button>
          </Nav>
        </Col>
        <Col md={10}>
          <div className="text-center mt-4">
            <Button variant="secondary" size="sm" className="mb-4">
              Back
            </Button>
          </div>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
