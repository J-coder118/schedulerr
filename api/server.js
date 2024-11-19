const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Schedule = require("./models/schedule");
const dbController = require("./controllers/db_controller"); // Import the router
const db = require("./db/db.js");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Express session
app.use(
  require("express-session")({
    secret: "This is our secret session 2016 for users!",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Body-Parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// // Landing
// app.get("/", autoRedirect, function (req, res) {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

// Public files <this needs to stay right below app.get("/")!!!!
app.use(express.static(__dirname + "/public"));

// Use the router from db_controller.js
app.use("/", dbController);

// LOCAL AUTH
app.post("/register", async function (req, res) {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      userType: req.body.userType,
      picture:
        "https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png",
    });

    await User.register(newUser, req.body.password);
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.sendFile(path.resolve(__dirname, "public", "error.html"));
  }
});

// LOGIN AUTH
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    reRoute(req, res);
  }
  // (req, res) => {
  //   console.log("Login attempt:", req.body);
  //   if (req.isAuthenticated()) {
  //     console.log("Login successful for user:", req.user);
  //   } else {
  //     console.log("Login failed");
  //   }
  // }
);

// Functions for Auth
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


function reRoute(req, res) {
  console.log("req.user.userType", req.user.userType);
  const redirectUrl = req.user.userType === "manager" ? "/manager" : "/employee";
    res.json({ redirectUrl });
}

function autoRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    reRoute(req, res);
  } else {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  }
}

app.get("/user", isLoggedIn, function (req, res) {
  console.log("----------------", req.user)
  res.send(req.user);
});

// Restricting routes
app.get("/login", isLoggedIn, function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/manager", isLoggedIn, function (req, res) {
  if (req.user.userType === "manager") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "public", "notauth.html"));
  }
});

app.get("/manager/*", isLoggedIn, function (req, res) {
  if (req.user.userType === "manager") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "public", "notauth.html"));
  }
});

app.get("/employee", isLoggedIn, function (req, res) {
  if (req.user.userType === "employee") {
    console.log("here    employee=-=-=-=-=-=-=-");
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.redirect("/manager");
  }
});

app.get("/employee/*", isLoggedIn, function (req, res) {
  if (req.user.userType === "employee") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.redirect("/manager");
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

const routes = require("./controllers/db_controller.js");
app.use("/", isLoggedIn, routes);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "404.html"));
});


// Calendar Routes

// Start the server only after the database connection is successful
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
