const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'hospital', // Replace with your database name
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password' });
  }

  // Query database
  pool.query(
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
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
app.post('/doctoreg', (req, res) => {
  const formData = req.body;

  // Insert into MySQL table
  connection.query('INSERT INTO doctoreg SET ?', formData, (err, results) => {
      if (err) {
          console.error('Error inserting into database:', err);
          res.status(500).send('Error inserting into database');
          return;
      }
      console.log('Inserted:', results);
      res.status(200).send('Inserted into database');
  });
});
