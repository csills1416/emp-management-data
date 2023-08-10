const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'company',
  user: 'root',
  password: '',
  database: 'employees' // Change this to your database name
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define route to display employees in a table
app.get('/employees', (req, res) => {
  const query = 'SELECT id, first_name, last_name FROM employees';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
    } else {
      res.render('employees', { employees: results });
    }
  });
});

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management System');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
