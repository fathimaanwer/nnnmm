import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Modal, Form, Container, Row, Col, Table } from "react-bootstrap";

function DoctorProfile() {
  const { id } = useParams(); // id is the doctor_id
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    Phone: "",
    Email: "",
    Address: "",
    dept: "",
    status: "", // Add status field
  });
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(true); // State to check approval

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setProfile(response.data);
        
        // Check if status is approved
        if (response.data.status !== 'approved') {
          setIsApproved(false); // Set to false if not approved
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    // Fetch appointments for this doctor
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/${id}`);
        setAppointments(response.data.appointments); // Extract the appointments array
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
      
    fetchProfile();
    fetchAppointments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/updatedoctors/${id}`, profile);
      alert("Profile updated successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Back button click handler
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <div className="position-absolute top-0 start-0 p-3">
            <Button variant="secondary" onClick={handleBackClick}>Back</Button>
          </div>
          <Navbar.Brand href="#">Doctor Profile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Name:</strong> {profile.firstName} {profile.lastName}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Phone:</strong> {profile.Phone}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Email:</strong> {profile.Email}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Address:</strong> {profile.Address}
                </span>
              </Nav.Item>
              <Nav.Item>
                <span className="text-white">
                  <strong>Specialization:</strong> {profile.dept}
                </span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <br />
          <Button
            variant="outline-light"
            onClick={handleShowModal}
            className="ml-auto"
            disabled={!isApproved} // Disable if not approved
          >
            Update Profile
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-5">
        {/* Back button added */}
        <Row className="justify-content-center">
          <Col md={15} className="text-center">
            {isApproved ? (
              <>
                <h3>Welcome, Dr. {profile.firstName} {profile.lastName}</h3>
                <p>Here you can view and update your profile information.</p>

                {/* Appointments Section */}
                <Row className="justify-content-center mt-4">
                  <Col md={12}>
                    <h4>Your Appointments</h4>
                    {appointments.length > 0 ? (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Appointment ID</th>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => (
                            <tr key={appointment.appointment_id}>
                              <td>{appointment.appointment_id}</td>
                              <td>{appointment.patientName}</td> {/* Correct patientName */}
                              <td>{new Date(appointment.date).toLocaleDateString()}</td> {/* Format date */}
                              <td>{appointment.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No appointments found.</p>
                    )}
                  </Col>
                </Row>
              </>
            ) : (
              <h3>You have to be approved by the admin</h3> // Display pending message
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="Phone"
                value={profile.Phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={profile.Email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="Address"
                value={profile.Address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSpecialization" className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="dept"
                value={profile.dept}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DoctorProfile;
