var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//   {
//     name: "camp2",
//     image: "https://static.jellystonemammothcave.com/media/images/campsite-2.original.2e16d0ba.fill-350x200.format-jpeg.jpg",
//     description: "A random campground I found on the internet"
//     }, function(err, campground) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
// });

app.get("/", function(req, res) {
  res.render("landing");
});

/* INDEX - show all data */
app.get("/campgrounds", function(req, res) {
  // res.render("campgrounds", {campgrounds: campgrounds});
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: campgrounds});
    }
  });
});

/* CREATE - add new data to database */
app.post("/campgrounds", function(req, res) {
  // var name = req.body.name;
  // var image = req.body.image;
  // var desc = req.body.description;
  // var newCampground = {name: name, image: image, description: desc};
  var newCampground = req.body.campground;
  Campground.create(newCampground, function(err, newCampground) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

/* NEW - show form to create new data */
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

/* SHOW - show more info about one data */
app.get("/campgrounds/:id", function(req, res) {
  var id = req.params.id;
  Campground.findById(id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: campground});
    }
  })
});

// EDIT - show edit form
app.get("/campgrounds/:id/edit", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCg) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.render("edit", {campground: foundCg});
    }
  })
});

// UPDATE - update the data, then redirect
// app.put("/campgrounds/:id", function(req, res) {
//   Campground.findByIdAndUpdate(req.params.id, req.body)
// })

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res) {
  console.log("YelpCamp server has started!");
});