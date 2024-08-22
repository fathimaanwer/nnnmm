const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'hospital', // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log('Connected to the MySQL database.');
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password' });
  }

  // Query database
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        // User authenticated
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  );
});

// API endpoint to get all doctors
app.get('/api/doctors', (req, res) => {
  const sql = 'SELECT * FROM doctoreg';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// API endpoint to approve a doctor
app.put('/api/doctors/approve', (req, res) => {
  const { name, specialization } = req.body;
  const sql = 'UPDATE doctoreg SET status = ? WHERE name = ? AND specialization = ?';
  db.query(sql, ['approved', name, specialization], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Doctor approved successfully' });
  });
});

// API endpoint to reject a doctor
app.put('/api/doctors/reject', (req, res) => {
  const { name, specialization } = req.body;
  const sql = 'UPDATE doctoreg SET status = ? WHERE name = ? AND specialization = ?';
  db.query(sql, ['rejected', name, specialization], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Doctor rejected successfully' });
  });
});

// API endpoint to register a doctor
app.post('/doctoreg', (req, res) => {
  console.log("working back")
  const { 
      firstName, lastName, phone, email, address, locality, 
      age, gender, nationality, dob, education, 
      higherQualification, password 
  } = req.body;

  const sql = `
      INSERT INTO doctoreg 
      (firstName, lastName, Phone, Email, Address, Locality, 
      Age, Gender, Nationality, DOB, EducationQualification, 
      HigherQualification, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      firstName, lastName, phone, email, address, locality, 
      age, gender, nationality, dob, education, 
      higherQualification, password
  ];

  db.query(sql, values, (err, result) => {
    
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.log('Duplicate entry error:', err);
            return res.status(400).json({ error: 'Duplicate entry' });
        }
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

      res.status(200).json({ message: 'Doctor registered successfully!' });
  });
});




app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.send({ success: true, message: 'Admin logged in successfully' });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Login route for Doctor
app.post('/api/doctor/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM doctoreg WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.send({ success: true, message: 'Doctor logged in successfully' });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Login route for Patient
app.post('/api/patient/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM patient WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.send({ success: true, message: 'Patient logged in successfully' });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
