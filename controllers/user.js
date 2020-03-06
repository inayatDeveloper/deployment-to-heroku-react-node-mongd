const User = require("../models/user"),
  algoliaClient = require("../config/config"),
  userIndex = algoliaClient.initIndex("UserIndex");

exports.addUser = (req, res) => {
  const { firstName, lastName, userName, address } = req.body,
    newUser = new User({ firstName, lastName, userName, address });
  newUser
    .save()
    .then(result => {
      userIndex
        .saveObjects(
          [{ firstName, lastName, userName, address, userId: result._id }],
          { autoGenerateObjectIDIfNotExist: true }
        )
        .then(data => {
          res.json({ success: true, msg: "successfully added user." });
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

exports.updateUser = (req, res) => {
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
exports.getAllUsers = (req, res) => {
  console.log("all users");
  res.json({ success: true, msg: "all users get" });
  // User.find({})
  //   .then(data => {
  //     res.json({ success: true, msg: "all users", data });
  //   })
  //   .catch(error => {
  //     console.log("Error occure", error);
  //     res.json({ success: false, msg: "Error try again.", error });
  //   });
};
