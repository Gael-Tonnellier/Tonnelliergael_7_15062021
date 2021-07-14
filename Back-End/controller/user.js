const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const fs = require("fs");

const myDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gael83600",
  database: "groupomagif",
});

// ROUTE POUR INSCRIPTION
exports.signup = (req, res, next) => {
  // HASH DU PASSWORD RECU EN REQUEST
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      myDb.connect(function (err) {
        if (err) throw err;
        let users = {
          pseudo: req.body.pseudo,
          email: req.body.email,
          Password: hash,
          Description: req.body.description,
          avatar: req.body.image,
        };

        myDb.query("INSERT INTO users SET ?", users, function (err, result) {
          if (err) {
            res.status(400).json({ message: err });
          } else {
            res.status(201).json({ message: "Utilisateur crée !" });
          }
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//ROUTE POUR LA CONNECTION
exports.login = (req, res, next) => {
  //RECUPERATION DE L USER
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");
    let request = `SELECT users.* FROM users WHERE users.email = '${req.body.email}' `;
    myDb.query(request, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        bcrypt
          .compare(req.body.password, result[0].password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "mot de passe incorrect" });
            }
            res.status(200).json({
              userId: result[0].idUsers,
              token: jwt.sign({ userId: result[0].idUsers }, "letoken", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
      else{
        return res.status(400).json({message:"Utilisateur n'existe pas ! "})
      }
    });
  });
};

exports.info = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB");
    let request = `SELECT users.* FROM users WHERE users.idUsers = '${req.params.id}' `;
    myDb.query(request, function (err, result) {
      if (err) throw err;
      else {
        res.status(200).json({
          userId: result[0].idUsers,
          email: result[0].email,
          pseudo: result[0].pseudo,
          created: result[0].Created,
          description: result[0].description,
          avatar: result[0].avatar,
        });
      }
    });
  });
};
exports.update = (req,res)=>{

};

exports.delete = (req,res,next) =>{
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB");
    let request = `DELETE users.* FROM users WHERE users.idUsers='${req.params.id}' `;
    myDb.query(request, function (err, result) {
      if (err) throw err;
      else {
        res.status(200).json({message:"Utilisateur supprimé"});
      }
    });
  });

};

exports.getAllUsers =(req,res) =>{
  myDb.connect(function(err){
    if (err) throw err;
    console.log('Connecté à la DB');
    myDb.query('SELECT idUsers, pseudo, avatar, description FROM users',function (err,response){
      if(err) throw err;
      else {
        res.status(200).json({response, message:'Récupération des Utilisateurs'})
      }
    })
  })
}
