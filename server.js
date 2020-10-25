const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

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
    connection.query('SELECT * FROM employee', function(err, res) {
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
            choices: ['Teacher', 'Principal', 'Nurse']
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: ['Max Smith', 'Zack Martin']

        }
    ])
    .then(addEmployee => {
        connection.query('INSERT INTO employee SET ?',
            {
            first_name: addEmployee.employeeFirstName,
                last_name: addEmployee.employeeLastName
            },
         // role_id: , 
         // manager_id
            function(err, res) {
            // if (err) throw err;
            console.log(res.affectedRows + ' added!\n');
            }
        )
    })
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
    inquirer.prompt([
        {
            type: "list",
            name: "chooseEmployee",
            message: "Which employee do you want to update?",
            choice: ['Max Smith', 'Susie Sanders', 'Zack Martin', 'Sydney Sawyer']
        },
        {
            type: "input",
            name: "updatedRole",
            message: "What is this employee's new role?"
        }
    ])
    .then(updateEmployee => {
            connection.query(`UPDATE employee SET ? WHERE ?`,
            {
                role: updateEmployee.updatedRole
            },
            {
                
            },
            function(err, res) {
                if (err) throw err;
                console.log('New department: ' + userDepartment.newDepartment + ' added!\n');
                afterConnection();
            })
        })
};