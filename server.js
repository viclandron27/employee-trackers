const mysql = require('mysql2');

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
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });
  
  afterConnection = () => {
    connection.query('SELECT * employee', function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  };