const Article = require("../models/article"),
  algoliaClient = require("../config/config"),
  ArticleIndex = algoliaClient.initIndex("ArticleIndex");

exports.addArticle = (req, res) => {
  const { title, descripation } = req.body,
    newArticle = new Article({ title, descripation });
  newArticle
    .save()
    .then(result => {
      ArticleIndex.saveObjects(
        [{ title, descripation, articleId: result._id }],
        { autoGenerateObjectIDIfNotExist: true }
      )
        .then(data => {
          res.json({ success: true, msg: "successfully added article." });
        })
        .catch(error => {
          res.json({
            success: false,
            msg: "Error occure in entry to algolia search.",
            error
          });
        });
    })
    .catch(error => {
      res.json({
        success: false,
        msg: "Error occure during to entry to db.",
        error: error
      });
    });
};

exports.updateArticle = (req, res) => {
  console.log("update", req.body.firstName);
  userIndex
    .partialUpdateObject({
      firstName: req.body.firstName,
      objectID: req.body.userId
    })
    .then(({ objectID }) => {
      console.log(objectID);
    })
    .catch(error => {
      console.log("error in update...", error);
    });
};
