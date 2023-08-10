const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Database setup
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'company',
    user: 'root',
    password: '',
    database: 'employee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/departments', (req, res) => {
    const query = 'SELECT id, name FROM departments';
    db.query(query, (err, departments) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(departments);
    });
});

process.on('SIGINT', () => {
    db.end();
    console.log('Database connection closed');
    process.exit();
});