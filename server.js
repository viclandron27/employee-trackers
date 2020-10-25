const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags, title } = require('process');
const { connect } = require('http2');

rolesArray = [];
managersArray = [];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Maribel98*',
    database: 'employeeDB'
  });

connection.connect(err => {
    //if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});
  
afterConnection = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: ['View All Employees', 'View All Departments',
            'View All Roles', 'Add Employee', 'Add Department', 
            'Update Employee Role', 'Quit']
        },
    ])
    .then(userChoice => {
        //console.log("userChoice inside of createTeam(): ", userChoice);

        switch (userChoice.userChoice) {
            case "View All Employees":
                allEmployees();
                break;
            case "View All Departments":
                allDepartments();
                break;
            case "View All Roles":
                allRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Quit":
                connection.end();
                break;
        }
    })
};

function allEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS `role`, department.name AS `department`, role.salary, manager.name AS `manager` FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id;',
     function(err, res) {
        //if (err) throw err;
        console.table(res);

        afterConnection();
      });
}

function allDepartments() {
    connection.query('SELECT * FROM department', function(err, res) {
        //if (err) throw err;
        console.table(res);

        afterConnection();
    })
}

function allRoles() {
    connection.query('SELECT role.title, role.salary, department.name AS `department` FROM role LEFT JOIN department ON role.department_id = department.id;', function(err, res) {
        //if (err) throw err;
        console.table(res);

        afterConnection();
    })
}

function addEmployee() {
    connection.query('SELECT * FROM role', function(err, res) {
        //nif (err) throw err;
        const roles = res.map(myFunction)

        function myFunction(role) {
            return {name: role.title, value: role.id}
        }

        connection.query('SELECT * FROM manager', function(err, res) {
            //if (err) throw err;
            const managers = res.map(myFunction)
    
            function myFunction(manager) {
                return {name: manager.name, value: manager.id}
            }
    
            inquirer.prompt([
                {
                    type: "input",
                    name: "employeeFirstName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "employeeLastName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "employeeRole",
                    message: "What is the employee's role?",
                    choices: roles 
                },
                {
                    type: "list",
                    name: "employeeManager",
                    message: "Who is the employee's manager?",
                    choices: managers
        
                }
            ])  
            .then(addEmployee => {
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: addEmployee.employeeFirstName,
                        last_name: addEmployee.employeeLastName,
                        role_id: addEmployee.employeeRole,
                        manager_id: addEmployee.employeeManager
                    },
                    function(err, res) {
                    // if (err) throw error
                    console.log('New employee was added!\n');
                    afterConnection();
                    }
                )
            })      
        })
      });
};

function addDepartment () {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is name of the new department?"
        }
    ])
    .then( userDepartment => {
            connection.query(`INSERT INTO department SET ?`,
            {
                name: userDepartment.newDepartment
            },
            function(err, res) {
                if (err) throw err;
                console.log('New department: ' + userDepartment.newDepartment + ' added!\n');
                afterConnection();
            }
        )
    });
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM employee', function(err, res) {
        //if (err) throw err;
        const employees = res.map(myFunction)

        function myFunction(employee) {
            return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
        }

        connection.query('SELECT * FROM role', function(err, res) {
            //if (err) throw err;
            const roles = res.map(myFunction)
    
            function myFunction(role) {
                return {name: role.title, value: role.id}
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "chooseEmployee",
                    message: "Which employee do you want to update?",
                    choices: employees
                },
                {
                    type: "list",
                    name: "updatedRole",
                    message: "What is this employee's new role?",
                    choices: roles
                }
            ])
            .then(updateEmployee => {
                connection.query(`UPDATE employee SET ? WHERE ?`,
                {
                    role: updateEmployee.updatedRole
                },
                {
                    id: updateEmployee.chooseEmployee
                },
                function(err, res) {
                    if (err) throw err;
                    console.log( updateEmployee.chooseEmployee + ' was updated!\n');
                    afterConnection();
                })
            })
        })
        
    })
   
};