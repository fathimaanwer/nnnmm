import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="main">
      <div className="navbar">
        <div className="icon">
          <h2 style={{ color: 'white' }}  className="logo">Care&Cure</h2>
          <Link to="/login"><button className="nav-button">Login</button></Link>
        </div>
        <div className="menu">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><Link to="/doctoreg">DOCTOR'S</Link></li>
            <li><a href="contact.html">CONTACT</a></li>
            <li><a href="#">ABOUT</a></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <h1>Welcome to Care&Cure Hospital</h1>
          <h1>We are ready to</h1>
          <h2>Treat You...</h2>
          <p>
            Our mission is to provide better health care to the society.
            Our growth has been centered on you and excellence in 
            healthcare. We are provided with the latest equipment and modern 
            facilities over 200 beds. You are our core specialization.
          </p>
        </div>
        <div className="action-buttons">
          <button className="main-button">Find a Doctor</button>
          <Link to="/appointment1">
            <button className="main-button">Book an Appointment</button>
          </Link>
        </div>
      </div>

      <h2 className="section-divider"></h2>

      <div className="container">
        <h2 className="section-title">Our Doctors</h2>
        <div className="technology">
          <div className="main-technology">
            <div className="inner-technology">
              <img src="d4.jpg" alt="Dr.Elsa" />
              <h2>Dr.Elsa</h2>
              <p>Senior Consultant</p>
              <button className="view-details-button"><a href="#">View Details</a></button>
            </div>
            <div className="inner-technology">
              <img src="d2.jpg" alt="Dr.Ron" />
              <h2>Dr.Ron</h2>
              <p>Senior Consultant</p>
              <button className="view-details-button"><a href="d1.html">View Details</a></button>
            </div>
            <div className="inner-technology">
              <img src="d3.jpg" alt="Dr.Smith" />
              <h2>Dr.Smith</h2>
              <p>Senior Consultant</p>
              <button className="view-details-button"><a href="#">View Details</a></button>
            </div>
          </div>
        </div>
        <div className="additional-doctors">
          <div className="inner-technology">
            <img src="d2.jpg" alt="Dr.Elsa" />
            <h2>Dr.Elsa</h2>
            <p>Senior Consultant</p>
            <button className="view-details-button"><a href="#">View Details</a></button>
          </div>
          <div className="inner-technology">
            <img src="d2.jpg" alt="Dr.Ron" />
            <h2>Dr.Ron</h2>
            <p>Senior Consultant</p>
            <button className="view-details-button"><a href="#">View Details</a></button>
          </div>
        </div>
      </div>

      <h2 className="section-divider"></h2>

      <h3 className="section-title">Our Services</h3>
      <div className="services">
        <div className="main-service">
          <div className="inner-service">
            <img src="dermatology.jpg" alt="Ayurvedic Treatment" />
            <h3>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service">
            <img src="dermatology.jpg" alt="Ayurvedic Treatment" />
            <h3>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service">
            <img src="dermatology.jpg" alt="Ayurvedic Treatment" />
            <h3>Ayurvedic Treatment</h3>
          </div>
        </div>
        <div className="main-service2">
          <div className="inner-service2">
            <img src="dermatology.jpg" alt="Ayurvedic Treatment" />
            <h3>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service2">
            <img src="dermatology.jpg" alt="Ayurvedic Treatment" />
            <h3>Ayurvedic Treatment</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
