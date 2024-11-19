const mongoose = require('mongoose');
const Promise = require("bluebird");

mongoose.Promise = Promise;

// DB
const databaseUri = "mongodb://localhost/schedulr";

const connectUri = process.env.MONGODB_URI || databaseUri;
mongoose.connect(connectUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});

// Export the connection
module.exports = db;