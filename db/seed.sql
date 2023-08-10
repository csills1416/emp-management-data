INSERT INTO departments (name) VALUES 
('Sales'),
('Engineering'),
('Marketing')

INSERT INTO roles (title, salary, department_id) VALUES

('Sales Lead', 100000, 1),

('Salesperson', 80000, 1),

('Lead Engineer', 150000, 2),

('Software Engineer', 120000, 2),

('Account Manager', 160000, 3),

INSERT INTO employees (first_name, last_name, role_id, department_id) VALUES

('John', 'Doe', 1, 1), --Sales Lead

('Mike', 'Chan', 2, 1), --Salesperson

('Ashley', 'Rodriguez', 3, 2), --Lead Engineer

('Kevin', 'Tupik', 4, 2), --Software Engineer

('Kimberly', 'Clark', 5, 3), --Account Manager