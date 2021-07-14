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
    let request =
      "SELECT msg.*, users.pseudo, users.avatar, category.name FROM message AS msg  JOIN users ON msg.idUsers = users.idUsers  JOIN category ON msg.idCategory = category.idCategory ";
    myDb.query(request, function (err, result) {
      if (err) throw err;
      let response = result.map((message) => {
        const post = {
          authorId: message.idUsers,
          title: message.title,
          description: message.description,
          image: message.image,
          idMessage: message.idMessage,
          idCategory: message.idCategory,
          categoryName: message.name,
          date: message.created,
        };
        return post;
      });

      res
        .status(200)
        .json({ response, message: "Recupération des messages !" });
    });
  });
};
exports.create = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");

    let request = {
      title: req.body.title,
      description: req.body.description,
      idCategory: req.body.category,
      idUsers: req.body.userId,
      image: req.body.image,
    };
    myDb.query("INSERT INTO message SET ?", request, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ message: err });
      } else {
        res.status(201).json({ message: "Message crée !" });
      }
    });
  });
};
exports.updatePost = (req, res) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB");
    let messageUpdate = {
      title: req.body.title,
      description: req.body.description,
      idCategory: req.body.category,
      image: req.body.image,
    };
    let request = `UPDATE message SET ? WHERE message.idMessage ='${req.params.id}' `;
    myDb.query(request, messageUpdate, function (err, result) {
      if (err) throw err;
      else {
        res.status(200).json({ message: "Publication modifié" });
      }
    });
  });
};

exports.deletePost = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB");
    let request = `DELETE message.* FROM message WHERE message.idMessage='${req.params.id}' `;
    myDb.query(request, function (err, result) {
      if (err) throw err;
      else {
        res.status(200).json({ message: "Message supprimé" });
      }
    });
  });
};


