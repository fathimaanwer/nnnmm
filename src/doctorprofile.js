import React from 'react';
import './d1.css'; // Import your CSS file

const DoctorProfile = () => {
    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>hospital website</title>
                <link rel="stylesheet" href="d1.css" />
                <style>
                    {`
                        table th, td {
                            border: 1px black;
                            padding: 5px;
                            border-style: double;
                        }
                    `}
                </style>
            </head>
            <body>
                <article>
                    <div className="navbar">
                        <div className="icon">
                            <div className="logo">
                                <h2 style={{ fontSize: '40px', marginLeft: '50px', color: 'hsl(189, 50%, 20%)' }}>
                                    <b>Care&Cure</b>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <h3 style={{ borderBottom: '1px solid grey' }}></h3>

                        <div className="qualification">
                            <button
                                style={{
                                    width: '20%',
                                    height: '400px',
                                    marginLeft: '100px',
                                    backgroundColor: 'rgb(216, 237, 238)',
                                    borderColor: 'white',
                                    borderRadius: '10px'
                                }}
                            >
                                <img src="d4.jpg" alt="Doctor" />
                            </button>
                            <br />
                            <div className="name" style={{ marginRight: '550px' }}>
                                <h2>
                                    <b>Dr.Elsa</b>
                                </h2>
                                <h3>Dermatology & Cosmetology</h3>
                                <h3>Designation: Consultant</h3>
                                <br />
                                <br />
                                <h3>Recommend to your loved ones</h3>
                                <br />
                                <br />
                                <button
                                    style={{
                                        width: '60%',
                                        height: '50px',
                                        borderRadius: '10px',
                                        borderColor: 'rgb(101, 146, 146)',
                                        backgroundColor: 'rgb(196, 235, 235)'
                                    }}
                                >
                                    <b>Book an Appointment</b>
                                </button>
                            </div>
                        </div>

                        <h2 style={{ borderBottom: '1px solid grey' }}></h2>

                        <h2 style={{ marginLeft: '50px' }}>Doctor's Profile</h2>

                        <br />

                        <h3 style={{ marginLeft: '50px' }}>Timings</h3>

                        <table style={{ marginLeft: '50px' }}>
                            <tr>
                                <td>
                                    <b>Monday</b>
                                </td>
                                <td>09:00AM TO 04:50</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Wednesday</b>
                                </td>
                                <td>09:00AM TO 04:50</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Friday</b>
                                </td>
                                <td>09:00AM TO 04:50</td>
                            </tr>
                        </table>
                    </div>

                    <h4 style={{ borderBottom: '1px solid gray' }}></h4>

                    <div
                        className="ads"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                            backgroundColor: 'rgb(101, 146, 146)'
                        }}
                    >
                        <h3>Contact Us on<br />9404330388</h3>
                        <h3>Emergency<br />8736257439</h3>
                        <h3>Ambulance<br />2222 33432</h3>
                    </div>
                </article>
            </body>
        </html>
    );
};

export default DoctorProfile;
