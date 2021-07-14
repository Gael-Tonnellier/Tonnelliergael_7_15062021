const mysql = require("mysql2");
const myDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gael83600",
  database: "groupomagif",
});

exports.createReply = (req, res, next) => {
    myDb.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la DB ");
      let request = {
        replyUser: req.body.userId,
        replyContent: req.body.content,
        replyMessage: req.body.idMessage
      };
      //console.log(request);
      myDb.query("INSERT INTO reply SET ?", request, function (err, result) {
        if (err) {
          console.log(err);
          res.status(400).json({ message: err });
        } else {
          res.status(201).json({ message: "Commentaire crée !" });
        }
      });
    });
  };
  
  exports.updateReply = (req, res) => {
    myDb.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la DB");
      let replyUpdate = {
        replyContent : req.body.reply.content
      };
      console.log(req.body.reply.content);
      let request = `UPDATE reply SET ? WHERE reply.idReply ='${req.params.id}' `;
      myDb.query(request, replyUpdate, function (err, result) {
        if (err) throw err;
        else {
          res.status(200).json({ message: "Publication modifié" });
        }
      });
    });
  };
  
  exports.deleteReply = (req, res, next) => {
    myDb.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la DB");
      let request = `DELETE reply.* FROM reply WHERE reply.idReply='${req.params.id}' `;
      myDb.query(request, function (err, result) {
        if (err) throw err;
        else {
          res.status(200).json({ message: "Commentaire supprimé" });
        }
      });
    });
  };

  exports.getReply = (req, res) => {
    myDb.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la DB ");
      myDb.query(
        "SELECT replyUser, replyContent, replyCreate, idReply, replyMessage FROM reply",
        function (err, response) {
          if (err) throw err;
          res
            .status(200)
            .json({ response, message: "Récupération des réponses !" });
        }
      );
    });
  };