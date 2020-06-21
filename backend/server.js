var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var cors = require("cors");
// var Campground = require("./models/campground");
// var Comment = require("./models/comment");
var User = require("./models/user");
// var seedDB = require("../seeds");
const dotenv = require('dotenv').config();

// required routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
  console.log("connected to DB");
}).catch(err => {
  console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(upload.array());
// app.use('/files', express.static('files'));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB(); // Seed the database

// Passport config
app.use(require("express-session")({
  secret: "dolor tacet",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 5000, process.env.IP, function(req, res) {
  console.log("YelpCamp server has started!");
});