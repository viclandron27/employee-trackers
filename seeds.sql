INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Max', 'Smith', 1, 2),
(2, 'Susie', 'Sanders', 1, 1),
(3, 'Zack', 'Martin', 3, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Teacher', 30.2, 1),
(2, 'Principal', 60.1, 2),
(3, 'Nurse', 40.3, 4);

INSERT INTO department (id, name)
VALUES
(1, 'Elementary School'),
(2, 'Middle School'),
(3, 'High School'),
(4, 'Entire School')

