const mysql = require("mysql2");
const myDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gael83600",
  database: "groupomagif",
});

exports.getLike = (req, res) => {
  myDb.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la DB ");
    myDb.query(
      "SELECT userLike, messageLike FROM message_like",
      function (err, response) {
        if (err) throw err;
        res
          .status(200)
          .json({ response, message: "Récupération des likes  !" });
      }
    );
  });
};

exports.like = (req, res, next) => {
  myDb.connect(function (err) {
    if (err) throw err;
    let selectLike = [
      (userLike = req.body.userId),
      (messageLike = req.body.idMessage),
    ];
    let createLike = {
      userLike: req.body.userId,
      messageLike: req.body.idMessage,
    };
    myDb.query(
      "SELECT * FROM message_like WHERE userLike= ? AND messageLike = ?",
      selectLike,
      function (err, result) {
        if (err) throw err;
        else if (result.length > 0) {
          myDb.query(
            "DELETE FROM message_like WHERE userLike = ? AND messageLike = ?",
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
