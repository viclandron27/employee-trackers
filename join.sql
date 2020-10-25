SELECT title, salary
FROM role
    LEFT JOIN department ON role.department_id = department.id;