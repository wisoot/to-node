const util = require('util');
const mysql = require('mysql');
let pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'mypassword',
  database        : 'todo'
});

pool.query = util.promisify(pool.query)

module.exports = pool;