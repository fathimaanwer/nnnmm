const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "hospital", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log("Connected to the MySQL database.");
});

// Server Utility Functions
const getPatientNameByID = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT name FROM patient WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        reject("Error##");
      } else {
        resolve(result[0]?.name || "Unknown Patient");
      }
    });
  });
};

const getDoctorNameByID = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT firstName, lastName FROM doctoreg WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        reject("Error##");
      } else {
        const fullName = result[0]
          ? `${result[0].firstName} ${result[0].lastName}`
          : "Unknown Doctor";
        resolve(fullName);
      }
    });
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (timeString) => {
  let [hours, minutes, seconds] = timeString.split(":");
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  return `${hours}:${minutes} ${suffix}`;
};

// API endpoint for user login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  // Query database
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length > 0) {
        // User authenticated
        res.status(200).json({ message: "Login successful" });
      } else {
        // Invalid credentials
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  );
});
//Api endpoint to get doctors for appointment
app.get("/api/doctorsapp", (req, res) => {
  const sql =
    "SELECT id,firstName,lastName,dept FROM doctoreg WHERE status='approved'";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});
// API Endpoint to get appointments
app.get("/api/appointments", async (req, res) => {
  const sql = "SELECT * FROM appointments";
  db.query(sql, async (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      // Use Promise.all to handle the async nature of map
      const appointments = await Promise.all(
        results.map(async (result) => {
          const appointment = {
            id: result.appointment_id,
            patient_name: await getPatientNameByID(result.patient_id),
            doctor_name: await getDoctorNameByID(result.doctor_id),
            date: formatDate(result.date),
            time: formatTime(result.time),
          };
          return appointment;
        })
      );
      res.json(appointments);
    }
  });
});

// API endpoint to create an appointment
app.put("/api/createappointment/:patientId", (req, res) => {
  const { patientId } = req.params;
  const { doc_name, time, date } = req.body;
  console.log(doc_name);

  const sql =
    "INSERT INTO appointments(doctor_id, patient_id, date, time)  VALUES(?,?,?,?)";

  db.query(sql, [doc_name, patientId, date, time], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      console.log(err);

      return;
    }
    res.json({ success: true, message: "Appointment Booked Successfully" });
  });
});
// API endpoint to get all doctors
app.get("/api/doctors", (req, res) => {
  const sql = "SELECT * FROM doctoreg";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // console.log(results);

    res.json(results);
  });
});

// API endpoint to approve a doctor
app.put("/api/doctors/approve/:doctorId", (req, res) => {
  const { doctorId } = req.params;
  const sql = "UPDATE doctoreg SET status = ? WHERE id = ?";

  db.query(sql, ["approved", doctorId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: "Doctor approved successfully" });
  });
});

// API endpoint to reject a doctor
app.put("/api/doctors/reject/:doctorId", (req, res) => {
  const { doctorId } = req.params;
  const sql = "UPDATE doctoreg SET status = ? WHERE id = ?";

  db.query(sql, ["rejected", doctorId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: "Doctor rejected successfully" });
  });
});

// API endpoint to register a doctor
app.post("/doctoreg", (req, res) => {
  console.log("working back");
  const {
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
    dept,
    password,
  } = req.body;

  const sql = `
      INSERT INTO doctoreg 
      (firstName, lastName, Phone, Email, Address, Locality, 
      Age, Gender, Nationality, DOB, EducationQualification, 
      dept, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
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
    dept,
    password,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log("Duplicate entry error:", err);
        return res.status(400).json({ error: "Duplicate entry" });
      }
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({ message: "Doctor registered successfully!" });
  });
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }

    if (results.length > 0) {
      res.send({ success: true, message: "Admin logged in successfully" });
    } else {
      res.send({ success: false, message: "Invalid credentials" });
    }
  });
});

// Login route for Doctor
app.post("/api/doctor/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM doctoreg WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }

    if (results.length > 0) {
      // If login is successful, send the doctor ID and success message to the frontend
      const doctor = results[0];
      res.send({
        success: true,
        message: "Doctor logged in successfully",
        doctorId: doctor.id, // Send the doctor's ID
      });
    } else {
      res.send({ success: false, message: "Invalid credentials" });
    }
  });
});


// Login route for Patient
app.post("/api/patient/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM patient WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }

    if (results.length > 0) {
      const patient = results[0];
      console.log(patient.id);
      res.send({
        success: true,
        message: "Patient logged in successfully",
        patient: {
          id: patient.id,
          name: patient.name,
          email: patient.email,
          // Include other relevant fields if needed
        },
      });
    } else {
      res.send({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post("/api/patients/register", (req, res) => {
  const { name, phone, email, address, gender, password } = req.body;

  const sql =
    "INSERT INTO patient (name, phone_no, email, address, gender, password) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, phone, email, address, gender, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting patient data:", err);
      return res.status(500).json({ error: "Database insertion failed" });
    }
    res.status(201).json({
      message: "Patient registered successfully",
      patientId: result.insertId,
    });
  });
});

// Fetch patient details
app.get("/api/patients/:id", (req, res) => {
  const patientId = req.params.id;
  const sql = "SELECT * FROM patient WHERE id = ?";
  db.query(sql, [patientId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

// Fetch patient details
app.get("/api/patients", (req, res) => {
  const patientId = req.params.id;
  const sql = "SELECT * FROM patient";
  db.query(sql, [patientId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// Update patient details
app.put("/api/updatepatients/:id", (req, res) => {
  const patientId = req.params.id;
  const { name, phone_no, email, address, gender } = req.body;
  const sql =
    "UPDATE patient SET name = ?, phone_no = ?, email = ?, address = ?, gender = ? WHERE id = ?";
  db.query(
    sql,
    [name, phone_no, email, address, gender, patientId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Profile updated successfully" });
      }
    }
  );
});

app.get('/api/doctors/:id', (req, res) => {
  const doctorId = req.params.id;
  const query = 'SELECT * FROM doctoreg WHERE id = ?';

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching doctor profile:', err);
      return res.status(500).json({ message: 'Error fetching doctor profile' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(results[0]);
  });
});

// Route to update a doctor's profile
app.put('/api/updatedoctors/:id', (req, res) => {
  const doctorId = req.params.id;
  const { firstName,lastName, Phone, Email, Address, dept } = req.body;

  const query = `
    UPDATE doctoreg 
    SET firstName = ?,lastName = ?, Phone = ?, email = ?, Address = ?, dept = ?
    WHERE id = ?`;

  db.query(
    query,
    [firstName,lastName, Phone, Email, Address, dept, doctorId],
    (err, results) => {
      if (err) {
        console.error('Error updating doctor profile:', err);
        return res.status(500).json({ message: 'Error updating doctor profile' });
      }
      res.json({ message: 'Doctor profile updated successfully' });
    }
  );
});
app.get("/api/appointments/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;

  // Query to fetch appointments and join with patient details
  const query = `
    SELECT a.appointment_id, a.date, a.time, p.name AS patientName
    FROM appointments a
    JOIN patient p ON a.patient_id = p.id
    WHERE a.doctor_id = ?;
  `;

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
    console.log(results)
    res.send({ success: true, appointments: results });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
