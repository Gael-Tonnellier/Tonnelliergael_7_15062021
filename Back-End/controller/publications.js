//import fs from 'fs';
const mysql = require("mysql2");
const myDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gael83600",
  database: "groupomagif",
});

exports.getAll = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");
    let request = "SELECT * FROM groupomagif.message";
    myDb.query(request, function (err, result) {
      if (err) throw err;
      console.log("Les messages s'affichent");
    });
  });
};

exports.create = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");

    let request = 
        `INSERT INTO \`message\` (\`title\`, \`description\`, \`idCategory\`, \`idUsers\`, \`image\`) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.category}', '${req.body.userId}', '${req.body.image}')`;
    ;
    console.log(req.body.image);
    myDb.query(request, function (err, result) {
      if (err) {
          console.log(err);
        res.status(401).json({ message: err });
      } else {
        res.status(201).json({ message: "Message crée !" });
      }
    });
  });
};
