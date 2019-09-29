var express =  require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../backend/models/user");

// root route
router.get("/", function(req, res) {
  res.render("landing");
});

// show register route
router.get("/register", function(req, res) {
  res.render("register", {page: 'register'});
});

// handle sign up logic
router.post("/register", function(req, res) {
  const newUser = new User({username: req.body.username});
  if(req.body.adminCode === process.env.ADMINCODE) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      req.flash("error", err.message);
      res.redirect("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to YC " + user.username);
      res.redirect("/campgrounds");
    })
  })
});

// show login form
router.get("/login", function(req, res) {
  res.render("login", {page: 'login'});
});

// handle login logic
router.post("/login", passport.authenticate("local", 
{
  successRedirect: "/campgrounds", 
  failureRedirect: "/login"
}), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You have logged out successfully!");
  res.redirect("/campgrounds");
});

module.exports = router;