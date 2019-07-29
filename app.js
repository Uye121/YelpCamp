var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "camp1", image: "https://www.rd.com/wp-content/uploads/2017/05/00_camping_Bucket-List-Worthy-American-Campsites_358158596_shuttero_FT.jpg"},
  {name: "camp2", image: "https://static.jellystonemammothcave.com/media/images/campsite-2.original.2e16d0ba.fill-350x200.format-jpeg.jpg"},
  {name: "camp3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkbxUzS_7ka3WHMRPcH3u0SmnVFpCBDCmSqblPkNeOsu-5FZZ"}
]

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var img = req.body.image;
  campgrounds.push({name: name, image: img});
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res) {
  console.log("YelpCamp server has started!");
});