const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db',
});

// Establish the connection
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');
    startApp();
});

// Define your inquirer prompts and actions
function startApp() {
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'action',
              message: 'Choose an action:',
              choices: [
                  'View all departments',
                  // Other choices...
              ],
          },
      ])
      .then(answer => {
          if (answer.action === 'View all departments') {
              viewAllDepartments(); // Call the function
          }
          // Handle other actions...
      })
      .catch(err => console.error(err));
}

function viewAllDepartments() {
  connection.query('SELECT * FROM departments', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApp(); // Continue the loop
  });
}

// Call the startApp function to initiate the application
