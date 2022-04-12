const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bug_db',
  insecureAuth: true,
});

connection.connect(err => {
  if (err) throw new Error('mySql failed connection');
  else console.log('connected to SQL server');
});

function runSQL(sqlCommand, data = []) {
  console.log('sqlCommand,data', sqlCommand, data);
  return new Promise((resolve, reject) => {
    connection.query(sqlCommand, data, function (error, results, fields) {
      if (error) reject(error);
      else resolve(results);
    });
  });
}
// connection.end();

module.exports = {
  runSQL,
};
