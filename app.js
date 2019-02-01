// Setup
// -----------------------------------------------------------------------------
// #############################################################################
const express = require("express");
const mongoose = require("mongoose");

// connect this program to the code in dog-model.js
// (where Dog model and the schema are defined)
const Dog = require("./models/dog-model.js");

// connect to the database defined by this CONNECTION STRING
// (domain, port, database name, password, all info about the database server)
mongoose.connect("mongodb://localhost/dog-amazon");

const app = express();

app.listen(5555, () => {
  console.log("Dog server READY! 🐕");
});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

// Routes
// -----------------------------------------------------------------------------
// #############################################################################

app.get("/", (request, response, next) => {
  Dog.find({ age: { $gt: 0 } })
    .then(dogResults => {
      // send the database results to the HBS for displaying
      response.locals.dogArray = dogResults;
      response.render("index.hbs");
    })
    .catch(err => {
      console.log("HOME PAGE Dog.find() failed!! 💩", err);
      response.render("dog-error.hbs");
    });
});
