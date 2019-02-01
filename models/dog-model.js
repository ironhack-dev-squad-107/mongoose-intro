const mongoose = require("mongoose");

// get access to the Schema class from Mongoose
const Schema = mongoose.Schema;

// use the Schema class to create our dog schema object
// (the schema is the STRUCTURE of documents in the model's collection)
const dogSchema = new Schema({
  dogName: { type: String, required: true },
  age: { type: Number, min: 0, max: 50 },
  color: { type: String, minlength: 3, maxlength: 20 },
  vetVisits: [Date], // use [] for an array
  toys: [{ type: String, minlength: 2 }],
  // ObjectId IS NOT a built-in JavaScript class like String, Number, etc.
  // Mongoose gives us the class through Schema.Types
  owners: [Schema.Types.ObjectId],
  // regular expression matches a string of EXACTLY 2 UPPERCASE letters
  country: { type: String, match: /^[A-Z][A-Z]$/ },
  // regular expression matches a string that starts with "http://" or "https://"
  photoUrl: { type: String, match: /^https?:\/\// }
});

// the variable "Dog" is our Mongoose model class
// the "Dog" model will allow us to make queries on the "dogs" collection
// (Mongoose turns the model's name string "Dog" to the collection name "dogs")
const Dog = mongoose.model("Dog", dogSchema);

// share the Dog variable with other files that require dog-model.js
// (Dog is our Mongoose model that connects to the "dogs" collection)
module.exports = Dog;
