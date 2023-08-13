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
    if (err) {
        throw err; // Added brackets around the if block
    }
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
                  'View all Roles',
                  'View all Employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee role'
              ],
          },
      ])
      .then(answer => {
          switch (answer.action) {
              case 'View all departments':
                  viewAllDepartments();
                  break;
              case 'View all Roles':
                  viewAllRoles();
                  break;
              case 'View all Employees':
                  viewAllEmployees();
                  break;
              case 'Add a department':
                  addDepartment();
                  break;
              case 'Add a role':
                  addRole();
                  break;
              case 'Add an employee':
                  addEmployee();
                  break;
              case 'Update an employee role':
                  updateEmployeeRole();
                  break;
              default:
                  connection.end(); // Close the connection on exit
                  console.log('Goodbye!');
          }
      })
      .catch(err => console.error(err));
}

function viewAllDepartments() {
  connection.query('SELECT * FROM departments', (err, results) => {
      if (err) {
          throw err; // Added brackets around the if block
      }
      console.table(results);
      startApp();
  });
}

function viewAllRoles() {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) {
            throw err; // Added brackets around the if block
        }
        console.table(results);
        startApp();
    });
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            throw err; // Added brackets around the if block
        }
        console.table(results);
        startApp();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO departments (name) VALUES (?)',
        [answer.departmentName],
        err => {
          if (err) {
            throw err; // Added brackets around the if block
          }
          console.log('Department added successfully.');
          startApp();
        }
      );
    })
    .catch(err => console.error(err));
}

// Implement similar functions for adding roles, employees, and updating employee roles.

// Call the startApp function to initiate the application
