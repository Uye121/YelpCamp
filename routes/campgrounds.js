var express =  require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

/* INDEX - show all data */
router.get("/", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
    }
  });
});

/* CREATE - add new data to database */
router.post("/", middleware.isLoggedIn, function(req, res) {
  var newCampground = req.body.campground;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  newCampground.author = author;
  Campground.create(newCampground, function(err, newCampground) {
    if(err) {
      console.log(err);
    } else {
      console.log(newCampground);
      res.redirect("/campgrounds");
    }
  });
});

/* NEW - show form to create new data */
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

/* SHOW - show more info about one data */
router.get("/:id", function(req, res) {
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      console.log(campground);
      res.render("campgrounds/show", {campground: campground});
    }
  })
});

// EDIT - show edit form
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCg) {
      res.render("campgrounds/edit", {campground: foundCg});
    });
});

// UPDATE - update the data, then redirect
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCg) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

// DESTROY - delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;