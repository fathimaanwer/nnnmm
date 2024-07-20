import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="main">
      <div className="navbar">
        <div className="icon">
          <h2 className="logo">Care&Cure</h2>
          <Link to="/login"><button>Login</button></Link>
        </div>
        <div className="menu">
          <ul>
            <li><a href="">HOME</a></li>
            <br></br>
            <li><a href="login.html">ADMIN</a></li>
            <br></br>
            <li><Link to="/docreg"><a href="doctor.html">DOCTOR'S</a></Link></li>
            <li><a href="contact.html">CONTACT</a></li>
            <li><a href="">ABOUT</a></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="content" style={{ color: 'black' }}>
          <h1><b>Welcome to Care&Cure Hospital</b></h1>
          <h1><b>We are ready to</b></h1><br />
          <h2><b>Treat You...</b></h2><br />
          <p><b>Our mission is to provide better health care to the society.<br />
            Our growth has been centered on you and excellence in <br />
            healthcare. We are provided with the latest equipment and modern <br />
            facilities over 200 beds. You are our core specialization.
          </b></p>
        </div>

        <div style={{ marginLeft: '900px' }}>
          <button style={{ borderRadius: '8px', borderColor: 'white', width: '200px', height: '40px', backgroundColor: 'rgb(181, 211, 212)' }}>Find a Doctor</button><br /><br />
          <Link to="/appoiintment1"><button style={{ borderRadius: '8px', borderColor: 'white', width: '200px', height: '40px', backgroundColor: 'rgb(181, 211, 212)' }}>Book an Appointment</button></Link>
        </div>
      </div>

      <h2 style={{ borderBottom: '1px solid grey', marginTop: '27%' }}></h2>

      <div className="container">
        <h2 style={{ marginLeft: '45%', fontSize: '30px' }}>Our Doctors</h2><br /><br /><br /><br />

        <div className="technology">
          <div className="main-technology">
            <div className="inner-technology">
              <img src="d4.jpg" alt="#" />
              <h2>Dr.Elsa</h2>
              <p>Senior Consultant</p>
            </div>

            <div className="inner-technology">
              <img src="d2.jpg" alt="" />
              <h2>Dr.Ron</h2>
              <p>Senior Consultant</p>
            </div>

            <div className="inner-technology">
              <img src="d3.jpg" alt="" />
              <h2>Dr.Smith</h2>
              <p>Senior Consultant</p>
            </div>
          </div>
        </div>

        <div className="button">
          <div className="main-button">
            <div className="inner-button1">
              <button style={{ marginLeft: '80%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="">View Details</a></button>
            </div>
            <div className="inner-button1">
              <button style={{ marginLeft: '550%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="d1.html">View Details</a></button>
            </div>
            <div className="inner-button1">
              <button style={{ marginLeft: '1020%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="">View Details</a></button>
            </div>
          </div>
        </div>

       
        <div className="technology">
          <div className="main-technology">
            <div className="inner-technology" style={{ marginLeft: '250px' }}>
              <img src="d2.jpg" alt="#" />
              <h2>Dr.Elsa</h2>
              <p>Senior Consultant</p>
            </div>

            <div className="inner-technology">
              <img src="d2.jpg" alt="" />
              <h2>Dr.Ron</h2>
              <p>Senior Consultant</p>
            </div>
          </div>
        </div>

        <div className="button">
          <div className="main-button">
            <div className="inner-button1">
              <button style={{ marginLeft: '400%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="">View Details</a></button>
            </div>
            <div className="inner-button1">
              <button style={{ marginLeft: '1010%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="">View Details</a></button>
            </div>
          </div>
        </div>

        <div className="button">
          <div className="main-button">
            <div className="inner-button1">
              <button style={{ marginLeft: '205%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white', marginBottom: '50px' }}><a href="">Book an Appointment</a></button>
            </div>
            <div className="inner-button1">
              <button style={{ marginLeft: '525%', width: '150%', height: '90%', borderRadius: '10px', borderColor: 'white' }}><a href="d1.html">Book an Appointment</a></button>
            </div>
          </div>
        </div>

        <h2 style={{ borderBottom: '1px solid grey' }}></h2>

      </div>

      <h3 style={{ marginLeft: '570px', fontSize: '30px' }}>Our services</h3>

      <div className="services">
        <div className="main-service">
          <div className="inner-service" style={{ border: '1px solid grey', borderColor: 'grey' }}>
            <img src="dermatology.jpg" alt="" />
            <h3 style={{ marginLeft: '50px' }}>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service" style={{ border: '1px solid grey' }}>
            <img src="dermatology.jpg" alt="" />
            <h3 style={{ marginLeft: '50px' }}>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service" style={{ border: '1px solid grey' }}>
            <img src="dermatology.jpg" alt="" />
            <h3 style={{ marginLeft: '50px' }}>Ayurvedic Treatment</h3>
          </div>
        </div><br />

        <div className="main-service2">
          <div className="inner-service2" style={{ border: '1px solid grey' }}>
            <img src="dermatology.jpg" alt="" />
            <h3 style={{ marginLeft: '50px' }}>Ayurvedic Treatment</h3>
          </div>
          <div className="inner-service2" style={{ border: '1px solid grey' }}>
            <img src="dermatology.jpg" alt="" />
            <h3 style={{ marginLeft: '50px' }}>Ayurvedic Treatment</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
