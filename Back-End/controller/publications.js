const myDb = require("../middleware/connect");

exports.getLast = (req, res, next) => {
  let request =
    "SELECT msg.*, users.pseudo, users.avatar, category.name FROM message AS msg JOIN users ON msg.idUsers = users.idUsers  JOIN category ON msg.idCategory = category.idCategory  ORDER BY Created DESC LIMIT 10";
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
};

exports.getOlder = (req, res, next) => {
  let request = `SELECT msg.*, users.pseudo, users.avatar, category.name FROM message AS msg  JOIN users ON msg.idUsers = users.idUsers  JOIN category ON msg.idCategory = category.idCategory ORDER BY Created DESC LIMIT ${req.params.id},10 `;
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

    res.status(200).json({
      response,
      message: "Recupération des messages plus anciens !",
    });
  });
};
exports.create = (req, res, next) => {
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
};
exports.updatePost = (req, res) => {
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
};

exports.deletePost = (req, res, next) => {
  let request = `DELETE message.* FROM message WHERE message.idMessage='${req.params.id}' `;
  myDb.query(request, function (err, result) {
    if (err) throw err;
    else {
      res.status(200).json({ message: "Message supprimé" });
    }
  });
};
