var express =  require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var multer = require("multer");
var NodeGeocoder = require('node-geocoder');

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

var imageFilter = function(req, file, cb) {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Images only!"), false);
  }
  cb(null, true);
}
var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "riculus",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

/* INDEX - show all data */
router.get("/", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user, page: "campgrounds"});
    }
  });
});

/* CREATE - add new data to database */
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
  cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    req.body.campground.image = result.secure_url;
    req.body.campground.imageId = result.public_id;
    req.body.campground.author = {
      id: req.user._id,
      username: req.user.username
    }

    geocoder.geocode(req.body.location, (err, data) => {
      if(err) throw err;

      let lat = data[0].latitude,
          lng = data[0].longitude,
          location = data[0].formattedAddress;

      req.body.campground.lat = lat;
      req.body.campground.lng = lng;
      req.body.campground.location = location;

      Campground.create(req.body.campground, function(err, newCampground) {
        if(err) {
          req.flash('error', err.message);
          res.redirect('back');
        } else {
          res.redirect("/campgrounds/"+newCampground.id);
        }
      });
    });
  })
});

/* NEW - show form to create new data */
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

/* SHOW - show more info about one data */
router.get("/:id", function(req, res) {
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, campground) {
    if(err || !campground) {
      console.log(err);
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
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
router.put("/:id", middleware.checkCampgroundOwnership, upload.single('image'), function(req, res) {
  Campground.findById(req.params.id, async function(err, campground) {
    if(err) {
      req.flash('error', error.message);
      res.redirect("back");
    } else {
      if(req.file) {
        try {
          await cloudinary.v2.uploader.destroy(campground.imageId);
          let result = await cloudinary.v2.uploader.upload(req.file.path);
          campground.imageId = result.public_id;
          campground.image = result.secure_url;
        } catch(err) {
          req.flash('error', err.message);
          return res.redirect("back");
        }
      }

      geocoder.geocode(req.body.location, function (err, data) {
        if(err) throw err;

        campground.lat = data[0].latitude;
        campground.lng = data[0].longitude;
        campground.location = data[0].formattedAddress;
        campground.name = req.body.campground.name;
        campground.description = req.body.campground.description;
        campground.save();
        res.redirect("/campgrounds/"+req.params.id);
      });
    }
  });
});

// DESTROY - delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
  Campground.findById(req.params.id, async function(err, campground) {
    if(err) {
      req.flash('error', err.message);
      res.redirect("back");
    } else {
      try {
        await cloudinary.v2.uploader.destroy(campground.imageId);
        campground.remove();
        req.flash('success', "campground deleted successfully");
        res.redirect("/campgrounds");
      } catch(err) {
        req.flash('error', err.message);
        res.redirect("back");
      }
    }
  });
});

module.exports = router;