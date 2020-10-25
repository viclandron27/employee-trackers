INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Max', 'Smith', 1, 0),
('Susie', 'Sanders', 2, 1),
('Zack', 'Martin', 4, 0),
('Jackie', 'Sawyer', 5, 2);

INSERT INTO manager (name)
VALUES
('Max Smith'),
('Zack Martin');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 30.2, 4),
('Salesperson', 10.5, 4),
('Legal Lead', 60.1, 3),
('Engineering Lead', 40.3, 1),
('Software Engineer', 20.4, 1),
('Finance Lead', 100.3, 2);

INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

