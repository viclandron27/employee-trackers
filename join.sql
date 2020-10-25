SELECT role.title, role.salary, department.name AS `department`
FROM role
    LEFT JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS `role`, department.name AS `department`, role.salary, manager.name AS `manager`
FROM employee
    INNER JOIN role ON employee.role_id = role.id
    LEFT JOIN manager ON employee.manager_id = manager.id
    LEFT JOIN department ON role.department_id = department.id;
