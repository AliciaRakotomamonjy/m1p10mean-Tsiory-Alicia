const mongoose = require("mongoose");

const ReparationJoinTypeReparation = require("./models/ReparationJoinTypeReparation");
const Reparation = require("./models/Reparation");
const Voiture = require("./models/Voiture");

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://root:root123456789@cluster0.eqwhlbk.mongodb.net/db-garage"
);
require("./models/TypeReparation");

// ReparationJoinTypeReparation.find({"reparation":mongoose.Types.ObjectId("63d11d2122e838b5612ea022")})
//   .populate("type_reparation")
//   .then((p) => console.log(p))
//   .catch((error) => console.log(error));

Reparation.find({etat: { $ne: 6 } })
  .populate({
    path: "voiture",
    model: "Voiture",
    match : {"voiture.personne":mongoose.Types.ObjectId("63cf8cf7b1494e88fdafc680")}

  })
.then((result) => console.log(result))
.catch((error) => console.log("erreur :" + error))

// Reparation.find({ etat: { $ne: 6 } })
//   .populate("voiture")
//   .exec(function (err, story) {
//     // if (err) return handleError(err);

//     console.log("The author is %s", story.voiture);
//     // prints "The author is Ian Fleming"
//   });

// Voiture.find({ personne: mongoose.Types.ObjectId("63cf8cf7b1494e88fdafc680") })
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
