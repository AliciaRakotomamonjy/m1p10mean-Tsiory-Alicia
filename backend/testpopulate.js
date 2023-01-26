const mongoose = require("mongoose");

const ReparationJoinTypeReparation = require("./models/ReparationJoinTypeReparation");

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://root:root123456789@cluster0.eqwhlbk.mongodb.net/db-garage');
require('./models/TypeReparation');

ReparationJoinTypeReparation.find()
  .populate("type_reparation")
  .then((p) => console.log(p))
  .catch((error) => console.log(error));
