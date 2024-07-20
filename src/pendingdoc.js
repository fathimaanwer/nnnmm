// PendingDoctors.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingDoctors = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pending-doctors'); // Replace with your actual API endpoint
        setPendingDoctors(response.data);
      } catch (error) {
        console.error('Error fetching pending doctors:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <h2>Pending Doctor Registrations</h2>
      <ul>
        {pendingDoctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingDoctors;

