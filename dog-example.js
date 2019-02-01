const mongoose = require("mongoose");

// connect this program to the code in dog-model.js
// (where Dog model and the schema are defined)
const Dog = require("./models/dog-model.js");

// connect to the database defined by this CONNECTION STRING
// (domain, port, database name, password, all info about the database server)
mongoose.connect("mongodb://localhost/dog-amazon");

// CRUD - create, read, update & delete
// =============================================================================

// (C)reating new DOGS in our database with Mongoose
// -----------------------------------------------------------------------------
Dog.create({ dogName: "Koda", age: 3 })
  // then() callbacks get called if the operation succeeded
  .then(doggyDoc => {
    // doggyDoc is the result of our create() query
    console.log("Koda CREATE success! 🐕", doggyDoc);
  })
  // catch() callbacks get called if the operation FAILS
  .catch(err => {
    console.log("Koda CREATE failure! 😞", err);
  });

// then() & catch() are standard methods of PROMISES
// Dog.create().then().catch();

// Dog.create() and other Mongoose methods RETURN the promise object
// const myPromise = Dog.create();
// myPromise.then();
// myPromise.catch();

const estellesDog = new Dog({ dogName: "Mojo", age: 1 });
estellesDog
  .save()
  .then(doggyDoc => {
    console.log("Mojo CREATE success! 🐩", doggyDoc);
  })
  .catch(err => {
    console.log("Mojo CREATE failure! 😢", err);
  });

// (R)eading DOGS from our database with Mongoose
// (uses filter, project, sort, limit, skip)
// -----------------------------------------------------------------------------

// find() will ALWAYS give you an ARRAY of results
Dog.find({ age: { $lt: 2 } })
  .then(dogResults => {
    // with find() the resulting variable is ALWAYS an ARRAY
    dogResults.forEach(doggyDoc => {
      console.log(`ONE DOG --- ${doggyDoc.dogName} (id: ${doggyDoc._id})`);
    });
  })
  .catch(err => {
    console.log("Dog.find() FAILURE 😡", err);
  });

// findOne() will ALWAYS give you ONE result (NOT an array)
Dog.findOne({ dogName: { $ne: "Koda" } })
  .then(doggyDoc => {
    console.log(
      `Dog.findOne() 🐶 --- ${doggyDoc.dogName} (id: ${doggyDoc._id})`
    );
  })
  .catch(err => {
    console.log("Dog.findOne() FAILURE 😾", err);
  });

// findById() will ALWAYS give you ONE result (NOT an array)
// (you can only search by ID with this method)
Dog.findById("5c5310238118fd8446555924")
  .then(doggyDoc => {
    console.log(
      `Dog.findById() 🦴 --- ${doggyDoc.dogName} (id: ${doggyDoc._id})`
    );
  })
  .catch(err => {
    console.log("Dog.findById() FAILURE 😖", err);
  });

// (U)pdating DOGS in our database with Mongoose
// -----------------------------------------------------------------------------
// 1st argument -> FILTER (which document(s) get updated?)
// 2nd argument -> UPDATES (what changes get made?)
//                 (MongoDB update operators: $set, $inc, $push)

// $set is like the = operator in JavaScript (dogName = "Milo")
Dog.findByIdAndUpdate("5c5310238118fd8446555924", {
  $set: { dogName: "Milo", age: 7 }
})
  .then(doggyDoc => {
    console.log(`Dog UPDATED ${doggyDoc._id} 🐾`);
  })
  .catch(err => {
    console.log("Dog UPDATE failure 💩", err);
  });

// $inc is like the ++ or += operators in JavaScript (age += 1)
Dog.updateMany({ dogName: { $eq: "Mojo" } }, { $inc: { age: 1 } })
  .then(result => {
    console.log("MOJOS are ONE YEAR older 🐺", result);
  })
  .catch(err => {
    console.log("Dog.updateMany() FAILURE! 😨", err);
  });

// $push is like the push() array method in JavaScript (toys.push("Rope Toy"))
Dog.findByIdAndUpdate("5c5310238118fd8446555924", {
  $push: { toys: "Rope Toy" }
})
  .then(doggyDoc => {
    console.log(`Dog $push WORKED ${doggyDoc._id}`);
  })
  .catch(err => {
    console.log("Dog $push FAILURE!! 🐈", err);
  });

// (D)eleting DOGS from our database with Mongoose
// -----------------------------------------------------------------------------
Dog.findByIdAndRemove("5c531b37975732853ec337b8")
  .then(doggyDoc => {
    if (doggyDoc) {
      console.log(`DELETED ${doggyDoc.dogName} (id: ${doggyDoc._id})`);
    } else {
      console.log("Couldn't find anything to DELETE. 😭");
    }
  })
  .catch(err => {
    console.log("Dog.findByIdAndRemove() FAILURE 🤥", err);
  });

Dog.deleteMany({ dogName: { $eq: "Newbie" } })
  .then(result => {
    console.log("Dog.deleteMany() SUCCESS! 🥪!", result);
  })
  .catch(err => {
    console.log("Dog.deleteMany() FAILURE! 😩", err);
  });
