import React, { useState } from 'react';


const AppointmentForm = () => {
    // State variables to hold form data
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data (you can add validation here)
        // For now, let's log the selected values
        console.log('Selected Doctor:', selectedDoctor);
        console.log('Selected Department:', selectedDepartment);
        // Redirect or perform other actions as needed
        // Example: history.push('/appointment2');
    };

    return (
        <div className="main">
            <div className="icon">
                <h2 className="logo">Care&Cure</h2>
            </div>

            <div className="box1">
                <div className="heading">
                    <h3><b>Book for an Appointment</b></h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="fbox1">
                        <label style={{ fontSize: '20px' }}><b>Doctor:</b></label>
                        <select
                            id="doctor"
                            name="doctor"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                            style={{ borderRadius: '10px', height: '35px', width: '150px' }}
                        >
                            <option value="">Select Doctor</option>
                            <option value="Dr. Mike">Dr. Mike</option>
                            <option value="Dr. Johnson">Dr. Johnson</option>
                            <option value="Dr. Williams">Dr. Williams</option>
                            <option value="Dr. Diya">Dr. Diya</option>
                        </select>
                    </div>

                    <div className="fbox2" style={{ marginLeft: '5%' }}>
                        <label style={{ fontSize: '20px', marginLeft: '460px' }}><b>Department:</b></label>
                        <select
                            id="department"
                            name="department"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            style={{ width: '150px', borderRadius: '10px', height: '35px' }}
                        >
                            <option value="">Select department</option>
                            <option value="Physician">Physician</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Ayurveda">Ayurveda</option>
                            <option value="Psychologist">Psychologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                        </select>
                    </div>

                    <br /><br />
                    <button
                        className="but"
                        style={{ width: '100px', height: '50px', marginLeft: '45%', borderRadius: '8px', borderColor: 'white' }}
                        type="submit"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;
