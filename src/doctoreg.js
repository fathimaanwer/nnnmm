import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
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
            higherQualification
        };

        try {
            // Send POST request to backend API
            const response = await axios.post('http://localhost:5000/doctoreg', formData);
            console.log(response.data); // Log the response from the server
            // Optionally, reset form fields after successful submission
            // setFirstName('');
            // setLastName('');
            // ...
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="main">
            <div className="icon">
                <h2 className="logo">Care&Cure</h2>
            </div>

            <header><b><h5>Doctor Registration Form</h5></b></header>

            <div className="container" style={{ marginLeft: '10%', marginTop: '5%' }}>
                <form onSubmit={handleSubmit}>
                    <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div className="inner-container">
                            <label htmlFor="firstName">First Name *</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                placeholder="Enter your first name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="lastName">Last Name *</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                placeholder="Enter your last name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="phone">Phone/Mobile *</label>
                            <input 
                                type="text" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone or mobile number" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                        <div className="inner-container">
                            <label htmlFor="email">Email *</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="address">Permanent Address *</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                placeholder="Enter your permanent address" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="locality">Locality *</label>
                            <input 
                                type="text" 
                                id="locality" 
                                name="locality" 
                                placeholder="Enter your locality" 
                                value={locality} 
                                onChange={(e) => setLocality(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                        <div className="inner-container">
                            <label htmlFor="age">Age *</label>
                            <input 
                                type="text" 
                                id="age" 
                                name="age" 
                                placeholder="Enter your age" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="gender">Gender *</label>
                            <input 
                                type="text" 
                                id="gender" 
                                name="gender" 
                                placeholder="Enter your gender" 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="nationality">Nationality *</label>
                            <input 
                                type="text" 
                                id="nationality" 
                                name="nationality" 
                                placeholder="Enter your nationality" 
                                value={nationality} 
                                onChange={(e) => setNationality(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                        <div className="inner-container">
                            <label htmlFor="dob">Date of Birth *</label>
                            <input 
                                type="text" 
                                id="dob" 
                                name="dob" 
                                placeholder="Enter your date of birth (dd/mm/yy)" 
                                value={dob} 
                                onChange={(e) => setDob(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="education">Educational Qualification *</label>
                            <input 
                                type="text" 
                                id="education" 
                                name="education" 
                                placeholder="Enter your educational qualification" 
                                value={education} 
                                onChange={(e) => setEducation(e.target.value)} 
                            />
                        </div>
                        <div className="inner-container">
                            <label htmlFor="higherQualification">Higher Qualification *</label>
                            <input 
                                type="text" 
                                id="higherQualification" 
                                name="higherQualification" 
                                placeholder="Enter your higher qualification" 
                                value={higherQualification} 
                                onChange={(e) => setHigherQualification(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <button type="submit" className="but">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorForm;
