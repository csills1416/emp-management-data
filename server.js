const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db',
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database.');
    startApp();
});

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
                    'Update an employee role',
                    'Delete an employee',
                    'Delete a role',
                    'Exit'
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
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Exit':
                    connection.end();
                    console.log('Goodbye!');
                    break;
                default:
                    startApp();
            }
        })
        .catch(err => console.error(err));
}

function viewAllDepartments() {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        startApp();
    });
}

function viewAllRoles() {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        startApp();
    });
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            throw err;
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
                        throw err;
                    }
                    console.log('Department added successfully.');
                    updateSqlFiles('departments', `'${answer.departmentName}'`);
                    startApp();
                }
            );
        })
        .catch(err => console.error(err));
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary of the role:',
            },
        ])
        .then(answer => {
            connection.query(
                'INSERT INTO roles (title, salary) VALUES (?, ?)',
                [answer.roleTitle, answer.roleSalary],
                (err, results) => {
                    if (err) {
                        throw err;
                    }
                    console.log('Role added successfully.');
                    const newRoleId = results.insertId;
                    addEmployee(newRoleId);
                    updateSqlFiles('roles', `'${answer.roleTitle}', ${answer.roleSalary}, ${answer.roleDepartment}`);
                }
            );
        })
        .catch(err => console.error(err));
}

function addEmployee(newRoleId) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter the first name of the employee:',
            },
            // Prompt for other employee details...
        ])
        .then(answer => {
            connection.query(
                'INSERT INTO employees (first_name, role_id) VALUES (?, ?)',
                [answer.employeeFirstName, newRoleId],
                err => {
                    if (err) {
                        throw err;
                    }
                    console.log('Employee added successfully.');
                    startApp();
                }
            );
        })
        .catch(err => console.error(err));
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'Enter the new role of the employee:',
            },
        ])
        .then(answer => {
            // Look up the role_id based on the provided role title
            connection.query(
                'SELECT id FROM roles WHERE title = ?',
                [answer.employeeRole],
                (err, results) => {
                    if (err) {
                        throw err;
                    }

                    if (results.length === 0) {
                        console.log('Role not found. Please enter a valid role.');
                        startApp();
                        return;
                    }

                    const newRoleId = results[0].id;

                    // Update the employee's role_id
                    connection.query(
                        'UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?',
                        [newRoleId, answer.employeeFirstName, answer.employeeLastName],
                        err => {
                            if (err) {
                                throw err;
                            }
                            console.log('Employee role updated successfully.');
                            startApp();
                        }
                    );
                }
            );
        })
        .catch(err => console.error(err));
}

function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter the first name of the employee you want to delete:',
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'Enter the last name of the employee you want to delete:',
            },
        ])
        .then(answer => {
            connection.query(
                'DELETE FROM employees WHERE first_name = ? AND last_name = ?',
                [answer.employeeFirstName, answer.employeeLastName],
                err => {
                    if (err) {
                        throw err;
                    }
                    console.log('Employee deleted successfully.');
                    startApp();
                }
            );
        })
        .catch(err => console.error(err));
}

// Function to delete a department

function deleteDepartment() {
    inquirer
       .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department you want to delete:',
            },
        ])
       .then(answer => {
            connection.query(
                'DELETE FROM departments WHERE name =?',
                [answer.departmentName],
                err => {
                    if (err) {
                        throw err;
                    }
                    console.log('Department deleted successfully.');
                    startApp();
                }
            );
        })
       .catch(err => console.error(err));
}

function deleteRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the role you want to delete:',
            },
        ])
        .then(answer => {
            connection.query(
                'DELETE FROM roles WHERE title = ?',
                [answer.roleTitle],
                err => {
                    if (err) {
                        throw err;
                    }
                    console.log('Role deleted successfully.');
                    startApp();
                }
            );
        })
        .catch(err => console.error(err));
}

function updateSqlFiles(table, values) {
    const sqlStatement = `\nINSERT INTO ${table} VALUES (${values});`;

    fs.appendFileSync('schema.sql', sqlStatement);
    fs.appendFileSync('seed.sql', sqlStatement);
}
