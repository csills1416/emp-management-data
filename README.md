# Employee Management System

The Employee Management System is a command-line application that allows you to manage departments, roles, and employees in a company. It provides various functionalities such as viewing information, adding new records, updating records, and deleting records in the database.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

To run the Employee Management System, you need to have the following installed on your system:

- Node.js
- MySQL Server

### Installation

1. Clone the repository to your local machine:

   `git clone https://github.com/csills1416/employee-management-system.git`

2. Navigate to the project directory:

   `cd employee-management-system`

3. Install the required Node.js packages:

   `npm install`

4. Set up your MySQL database:
   - Create a new database named `company_db` (or a name of your choice).
   - Update the MySQL connection details in the `server.js` file.

5. Start the application:

   `node server.js`

## Usage

Upon running the application, you'll be presented with a menu of options to interact with the database:

- View all departments, roles, or employees.
- Add a new department, role, or employee.
- Update an employee's role.
- Delete an employee or a role.
- Exit the application.

Follow the on-screen prompts to navigate through the options and manage your company's data.

## Features

- View department, role, and employee information in a tabular format.
- Add new departments, roles, and employees to the database.
- Update an employee's role within the company.
- Delete employees and roles.
- Well-organized code structure with modularity and error handling.
- Utilizes inquirer for user input and mysql2 for database interaction.

## Contributing

Contributions are welcome! If you find a bug or want to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
