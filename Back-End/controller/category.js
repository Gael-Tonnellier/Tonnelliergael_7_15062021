const myDb = require("../middleware/connect");

exports.createCategory = (req, res, next) => {
  
};

exports.deleteCategory = (req, res) => {
  
};

exports.getCategory = (req, res) => {
  myDb.query(
    "SELECT * FROM category ",
    function (err, response) {
      if (err) throw err;
      res
        .status(200)
        .json({ response, message: "Récupération des catégories !" });
    }
  );
};