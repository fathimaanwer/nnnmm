import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Button,
    Modal,
    Form,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

function PatientProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState({
        name: '',
        phone_no: '',
        email: '',
        address: '',
        gender: '',
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching patient profile:', error);
            }
        };

        fetchProfile();
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
            console.log(profile)
            await axios.put(`http://localhost:5000/api/updatepatients/${id}`, profile);
            alert('Profile updated successfully');
            setShowModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Patient Profile</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item className="me-3">
                                <span className="text-white"><strong>Name:</strong> {profile.name}</span>
                            </Nav.Item>
                            <Nav.Item className="me-3">
                                <span className="text-white"><strong>Phone:</strong> {profile.phone_no}</span>
                            </Nav.Item>
                            <Nav.Item className="me-3">
                                <span className="text-white"><strong>Email:</strong> {profile.email}</span>
                            </Nav.Item>
                            <Nav.Item className="me-3">
                                <span className="text-white"><strong>Address:</strong> {profile.address}</span>
                            </Nav.Item>
                            <Nav.Item>
                                <span className="text-white"><strong>Gender:</strong> {profile.gender}</span>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    <br/><Button variant="outline-light" onClick={handleShowModal} className="ml-auto">
                        Update Profile
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

export default PatientProfile;
