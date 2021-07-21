const mysql = require("mysql2");
const myDataBase = mysql.createPool({
  connectionLimit: 10,  
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
},(err)=> console.log('Erreur création Pool : ',err));

module.exports = myDataBase
