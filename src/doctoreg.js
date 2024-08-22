import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import './doctorForm.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const DoctorForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [education, setEducation] = useState('');
    const [higherQualification, setHigherQualification] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // You may want to add validation for password and confirmPassword match here
        
        const formData = {
            firstName,
            lastName,
            phone,
            email,
            address,
            locality,
            age,
            gender,
            nationality,
            dob,
            education,
            higherQualification,
            password,  // Include the password in the form data
            confirmPassword  // Optionally, send confirmPassword for backend validation
        };

       try {
            const response = await axios.post('http://localhost:5000/doctoreg', formData);
            setMessage(response.data.message); // Display the success message from the server
        } catch (err) {
            

            if (err.response && err.response.data && err.response.data.error === 'Duplicate entry') {
                setMessage("Error: Email address already in use. Please use a different email.");
            } else {
                setMessage("Error: Sign in failed. Please try again.");
            }
            console.error("Error:", err);
        }
    };
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };
    return (
        <div className="form-main">
            <div className="form-header">
                <h2 className="form-logo">Care&Cure</h2>
                <h5 className="form-title">Doctor Registration Form</h5>
                <Button variant="secondary" onClick={handleBack}>Back</Button>{' '}<br/>
            </div>
            <br/>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                placeholder="Enter your first name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                placeholder="Enter your last name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone/Mobile *</label>
                            <input 
                                type="text" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone or mobile number" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Permanent Address *</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                placeholder="Enter your permanent address" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="locality">Locality *</label>
                            <input 
                                type="text" 
                                id="locality" 
                                name="locality" 
                                placeholder="Enter your locality" 
                                value={locality} 
                                onChange={(e) => setLocality(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="age">Age *</label>
                            <input 
                                type="text" 
                                id="age" 
                                name="age" 
                                placeholder="Enter your age" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender *</label>
                            <input 
                                type="text" 
                                id="gender" 
                                name="gender" 
                                placeholder="Enter your gender" 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality *</label>
                            <input 
                                type="text" 
                                id="nationality" 
                                name="nationality" 
                                placeholder="Enter your nationality" 
                                value={nationality} 
                                onChange={(e) => setNationality(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth *</label>
                            <input 
                                type="date" 
                                id="dob" 
                                name="dob" 
                                placeholder="Enter your date of birth" 
                                value={dob} 
                                onChange={(e) => setDob(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Educational Qualification *</label>
                            <input 
                                type="text" 
                                id="education" 
                                name="education" 
                                placeholder="Enter your educational qualification" 
                                value={education} 
                                onChange={(e) => setEducation(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="higherQualification">Higher Qualification *</label>
                            <input 
                                type="text" 
                                id="higherQualification" 
                                name="higherQualification" 
                                placeholder="Enter your higher qualification" 
                                value={higherQualification} 
                                onChange={(e) => setHigherQualification(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Confirm your password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
                {message && <p className="mt-3 text-center">{message}</p>}

            </div>
        </div>
    );
};

export default DoctorForm;
