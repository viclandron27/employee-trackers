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
                addDeparment();
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
    connection.query('SELECT * FROM role', function(err, res) {
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
        message: "Who is the employee's manager?"

    }
    ])
    //connection.query('INSERT INTO employee SET ?',
        //{
          //first_name: ,
         // last_name: ,
         // role_id: , 
         // manager_id
        //},
        //function(err, res) {
         // if (err) throw err;
        //  console.log(res.affectedRows + ' products deleted!\n');
}