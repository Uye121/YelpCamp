var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catApp", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// First parameter of model always takes the singular version of the model
var Cat = mongoose.model("Cat", catSchema);

/* Add a cat to the database */
// var george = new Cat({
//   name: "Hoe",
//   age: 10,
//   temperament: "Evil"
// });

// // goerge is just a regular object, while cat is the cat george that was saved into the database
// george.save(function(err, cat) {
//   if(err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(cat);
//   }
// });

/* new and save all at once */
// Cat.create({
//   name: "White",
//   age: 15,
//   temperament: "Meh"
// }, function(err, cat) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(cat);
//   }
// });

/* Retrieve all cats and print them out */
// Cat.find({}, function(err, cats) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(cats);
//   }
// });