const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

module.exports = async function () {
   mongoose.set("useNewUrlParser", true);
   mongoose.set("useFindAndModify", false);
   mongoose.set("useCreateIndex", true);
   mongoose.set("useUnifiedTopology", true);
   mongoose
       .connect(""
      )
       .then(() => console.log("Connected to MongoDB..."))
       .catch(err => console.error("Could not connect to MongoDB...", err))
    };