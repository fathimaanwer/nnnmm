import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function PatientProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    name: "",
    phone_no: "",
    email: "",
    address: "",
    gender: "",
  });
  const [docApp, setDocApp] = useState({
    doc_name: "",
    time: "",
    date: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalApp, setShowModalApp] = useState(false);
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patients/${id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctorsapp`
        );
        setDocs(response.data);
      } catch (error) {
        console.error("Error fetching doctors :", error);
      }
    };
    fetchDoctors();
  }, [showModalApp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  const handleChangeApp = (e) => {
    const { name, value } = e.target;
    setDocApp({
      ...docApp,
      [name]: value,
    });
    console.log(docApp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profile);
      await axios.put(
        `http://localhost:5000/api/updatepatients/${id}`,
        profile
      );
      alert("Profile updated successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSubmitApp = async (e) => {
    e.preventDefault();
    try {
      console.log(docApp);
      if (docApp.doc_name == "" || docApp.time == "" || docApp.date == "") {
        alert("Please fill all fields");
      } else {
        await axios.put(
          `http://localhost:5000/api/createappointment/${id}`,
          docApp
        );
        alert("Appointment Booked successfully");
        setShowModalApp(false);
      }
    } catch (error) {
      console.error("Error Booking Appointment :", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModalApp = () => setShowModalApp(true);
  const handleCloseModalApp = () => setShowModalApp(false);

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = ("0" + tomorrow.getDate()).slice(-2);
    const month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
    const year = tomorrow.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
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
          <Navbar.Brand href="#">Patient Profile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Name:</strong> {profile.name}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Phone:</strong> {profile.phone_no}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Email:</strong> {profile.email}
                </span>
              </Nav.Item>
              <Nav.Item className="me-3">
                <span className="text-white">
                  <strong>Address:</strong> {profile.address}
                </span>
              </Nav.Item>
              <Nav.Item>
                <span className="text-white">
                  <strong>Gender:</strong> {profile.gender}
                </span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <br />
          <Button
            variant="outline-light"
            onClick={handleShowModal}
            className="ml-auto"
          >
            Update Profile
          </Button>
          <br />
          <Button
            variant="outline-light"
            onClick={handleShowModalApp}
            className="ml-auto"
          >
            Book an Appointment
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h3>Welcome, {profile.name}</h3>
            <p>Here you can view and update your profile information.</p>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone_no"
                value={profile.phone_no}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalApp} onHide={handleCloseModalApp} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitApp}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Choose your Doctor</Form.Label>
              <Form.Select
                name="doc_name"
                aria-label="Doctor"
                onChange={handleChangeApp}
                required
              >
                <option disabled selected>
                  Select Doctor
                </option>
                {docs &&
                  docs.map((doc) => {
                    return (
                      <option value={doc.id}>
                        {doc.firstName +
                          " " +
                          doc.lastName +
                          " (" +
                          doc.dept +
                          ")"}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formtime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={docApp.time}
                onChange={handleChangeApp}
                required
              />
            </Form.Group>
            <Form.Group controlId="formdate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                min={getTomorrowDate()}
                value={docApp.date}
                onChange={handleChangeApp}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleCloseModalApp}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Book Appointment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PatientProfile;
