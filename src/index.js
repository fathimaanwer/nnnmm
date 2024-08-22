import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './home';
import LoginForm from './loginform';
import DoctorForm from './doctoreg';
import AppointmentForm from './appoiintment1';
import RegistrationForm  from'./patientreg';
import PendingDoctors from './pendingdoc';
import DoctorLoginForm from './doctorlogg';
import AdminPage from './AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/doctoreg" element={<DoctorForm />} />
        <Route path="/appoiintment1" element={<AppointmentForm />} />
        <Route path="/patientreg" element={<RegistrationForm  />} />
        <Route path="/adminpage" element={<AdminPage  />} />
        <Route path="/pendingdoc" element={<PendingDoctors  />} />
        <Route path="/doctorlogg" element={<DoctorLoginForm  />} />

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
