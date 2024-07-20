// AdminPage.jsx

import React, { useState } from 'react';

const AdminPage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const handleAddPatient = () => {
    const newPatient = {
      id: patients.length + 1, // Basic id generation, replace with appropriate logic
      name: `Patient ${patients.length + 1}`, // Default name, replace with form input
      // Add more fields as needed
    };
    setPatients([...patients, newPatient]);
  };

  const handleModifyPatient = (id) => {
    // Placeholder for modify patient logic, replace with actual implementation
    console.log(`Modify patient with id ${id}`);
  };
  const handleAddDoctor = () => {
    const newDoctor = {
      id: doctors.length + 1, // Basic id generation, replace with appropriate logic
      name: `Doctor ${doctors.length + 1}`, // Default name, replace with form input

      // Add more fields as needed
    };
    setDoctors([...doctors, newDoctor]);
  };

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>

      {/* Buttons for actions */}
      <div>
        <button onClick={handleAddPatient}>Add Patient</button><br></br>
        <button onClick={() => handleModifyPatient(1)}>Modify Patient</button> {/* Example with patient id */}<br></br>
        <button onClick={handleAddDoctor}>Add Doctor</button><br></br>
      </div>

      {/* Display list of patients */}
      <div>
        <h3>Patients</h3>
        <ul>
          {patients.map(patient => (
            <li key={patient.id}>{patient.name}</li>
            // Render more details if needed
          ))}
        </ul>
      </div>

      {/* Display list of doctors */}
      <div>
        <h3>Doctors</h3>
        <ul>
          {doctors.map(doctor => (
            <li key={doctor.id}>{doctor.name}</li>
            // Render more details if needed
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
