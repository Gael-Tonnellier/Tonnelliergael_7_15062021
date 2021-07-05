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

      res.status(200).json({ response, message: "Recupération des messages !" });
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
        res.status(401).json({ message: err });
      } else {
        res.status(201).json({ message: "Message crée !" });
      }
    });
  });
};

exports.like = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    let selectLike = [
      (users = req.body.userId),
      (message = req.body.idMessage),
    ];
    let createLike = {
      users: req.body.userId,
      message: req.body.idMessage,
    };
    myDb.query(
      "SELECT * FROM message_like WHERE users= ? AND message = ?",
      selectLike,
      function (err, result) {
        if (err) throw err;
        else if (result.length > 0) {
          myDb.query(
            "DELETE FROM message_like WHERE users = ? AND message = ?",
            selectLike,
            function (err, result) {
              if (err) throw err;
              res.status(200).json({ message: "Like retiré" });
            }
          );
        } else {
          myDb.query(
            "INSERT INTO message_like SET ?",
            createLike,
            function (err, result) {
              if (err) throw err;
              res.status(201).json({ message: "Vous avez like" });
            }
          );
        }
      }
    );
  });
};

exports.getLike = (req,res) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");
    myDb.query('SELECT userLike, messageLike FROM message_like', function (err, response) {
      if (err) throw err;
      res.status(200).json({ response, message: "Récupération des likes  !" });
    });
  });
};

exports.getReply = (req,res)=>{
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");
    myDb.query('SELECT replyUser, replyContent, replyCreate, replyUpdate, replyMessage FROM reply', function (err, response) {
      if (err) throw err;
      res.status(200).json({ response, message: "Récupération des réponses !" });
    });
  });
}