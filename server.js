require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  port = process.env.PORT || 3000,
  routes = require("./routes/route"),
  app = express();
app.use(cors());
// mongodb+srv://yamaan:1551993Ih@cluster0-yikls.mongodb.net/test?retryWrites=true&w=majority
// process.env.MONGODB_URL || "mongodb://localhost/algoliaSearch"
// process.env.PROD_MONGODB

mongoose
  .connect(
    "mongodb+srv://yamaan:1551993Ih@cluster0-yikls.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connection successful"))
  .catch(err => console.error("Error in connection", err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(port, () => {
  console.log("Server is listening on Port:", port);
});
