const express = require("express"),
  router = express.Router(),
  userController = require("../controllers/user"),
  articleController = require("../controllers/article"),
  searchController = require("../controllers/search");

router.post("/add/user", userController.addUser);
router.put("/edit/user", userController.updateUser);
router.get("/all/user", userController.getAllUsers);

//article api..
router.post("/add/article", articleController.addArticle);
router.put("/edit/article", articleController.updateArticle);

//search api..
router.post("/search", searchController.searchItems);
module.exports = router;
