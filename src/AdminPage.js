import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AdminPage.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState("home"); // default view
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Appointments:", error);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/doctors/approve/${doctorId}`
      );
      if (response.data.success) {
        alert("Doctor approved successfully");
        fetchDoctors(); // Refresh the list after approval
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const rejectDoctor = async (doctorId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/doctors/reject/${doctorId}`
      );
      if (response.data.success) {
        alert("Doctor rejected successfully");
        fetchDoctors(); // Refresh the list after rejection
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  const renderContent = () => {
    switch (view) {
      case "viewDoctors":
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
                    {doctors
                      .filter((doctor) => doctor.status === "approved")
                      .map((doctor) => (
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
                          <td>{doctor.dept}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      case "approveDoctors":
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
                    {doctors
                      .filter((doctor) => doctor.status === "pending")
                      .map((doctor) => (
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
                          <td>{doctor.dept}</td>
                          <td>
                            <div className="d-flex">
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2"
                                onClick={() => approveDoctor(doctor.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => rejectDoctor(doctor.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      case "viewPatients":
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
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{patient.phone_no}</td>
                        <td>{patient.address}</td>
                        <td>{patient.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      case "viewAppointments":
        return (
          <Card>
            <Card.Body>
              <h3>Appointment List</h3>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Patient Name</th>
                      <th>Doctor Name</th>
                      <th>Date</th>
                      <th>time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.patient_name}</td>
                        <td>{appointment.doctor_name}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
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
            <Button
              variant="primary"
              size="sm"
              className="mb-2"
              onClick={() => setView("viewDoctors")}
            >
              View Doctor List
            </Button>
            <Button
              variant="success"
              size="sm"
              className="mb-2"
              onClick={() => setView("approveDoctors")}
            >
              Approve Doctor
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mb-2"
              onClick={() => setView("viewPatients")}
            >
              View Patient List
            </Button>
            <Button
              variant="warning"
              size="sm"
              className="mb-2"
              onClick={() => setView("viewAppointments")}
            >
              View Appointments
            </Button>
          </Nav>
        </Col>
        <Col md={10}>
          <div className="text-center mt-4">
            <Button
              variant="secondary"
              onClick={handleBack}
              size="sm"
              className="mb-4"
            >
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
