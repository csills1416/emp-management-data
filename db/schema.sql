DROP DATABASE IF EXISTS
CREATE DATABASE employees

CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY,
    title TEXT,
    salary INTEGER,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);