const mysql = require('mysql2');
const inquirer = require('inquirer');

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
            choices: ['View All Employees', 'View All Employees By Department',
            'View All Employees By Manager', 'Add Employee', 'Remove Employee', 
            'Update Employee Role', 'Update Employee Manager']
        },
    ])
    .then(userChoice => {
        //console.log("userChoice inside of createTeam(): ", userChoice);

        switch (userChoice.userChoice) {
            case "View All Employees":
                allEmployees();
                break;
            case "View All Employees By Department":
                byDepartment();
                break;
            case "View All Employees By Manager":
                byManager();
                break;
            case "Add Employe":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
        }
    })
};

function allEmployees() {
    connection.query('SELECT * FROM employee', function(err, res) {
        //if (err) throw err;
        console.log(res);
        connection.end();
      });
}