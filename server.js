const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3003;

const db = mysql.createConnection({
  host: 'company',
  user: 'root',
  password: '',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
    createDatabaseAndTables();
  }
});

function createDatabaseAndTables() {
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.query(schemaSql, (err, results) => {
    if (err) {
      console.error('Error creating tables:', err);
    } else {
      console.log('Tables created');
      populateDatabase();
    }
  });
}

function populateDatabase() {
  const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  db.query(seedSql, (err, results) => {
    if (err) {
      console.error('Error populating data:', err);
    } else {
      console.log('Data populated');
      startServer();
    }
  });
}

function startServer() {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

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

  app.get('/', (req, res) => {
    res.send('Welcome to the Employee Management System');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
