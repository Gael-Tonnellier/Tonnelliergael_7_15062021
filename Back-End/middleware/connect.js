const mysql = require("mysql2");
const myDataBase = mysql.createPool({
  connectionLimit: 10,  
  host: "localhost",
  user: "root",
  password: "Gael83600",
  database: "groupomagif",
  
},(err)=> console.log('Erreur création Pool : ',err));

module.exports = myDataBase
