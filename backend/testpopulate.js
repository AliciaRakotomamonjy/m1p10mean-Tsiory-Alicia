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

Reparation.find({ etat: { $ne: 6 } })
  .populate({
    path: "voiture",
    model: "Voiture",
    match: {
      "voiture.personne": mongoose.Types.ObjectId("63cf8cf7b1494e88fdafc680"),
    },
  })
  .then((result) => console.log(result))
  .catch((error) => console.log("erreur :" + error));

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

db.caisse.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$date_mouvement" },
        month: { $month: "$date_mouvement" },
      },
      total: { $sum: "$entree" },
    },
  },
]);

db.caisse.aggregate([
  {
    $group: {
      _id: {
        $dayOfYear: "$date_mouvement",
      },
      total: { $sum: "$entree" },
    },
  },
]);

db.caisse.aggregate([
  {
    $project: {
      date_mouvement: "$date_mouvement",
      entree: "$entree",
      year: { $year: "$date_mouvement" },
      month: { $month: "$date_mouvement" },
    },
  },
  { $match: { year: 2023, month: 1 } },
  ,
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date_mouvement: "$date_mouvement",
        },
      },
      total: { $sum: "$entree" },
    },
  },
]);

/////////////////////////////////////////////////

db.caisse.aggregate([
  {
    $match: {
      "date_mouvement": {
        $gte: ISODate("2023-01-01T00:00:00.000Z"),
        $lt: ISODate("2023-12-31T23:59:59.999Z"),
      }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$date_mouvement" },
        month: { $month: "$date_mouvement" },
        day: { $dayOfMonth: "$date_mouvement" },
      },
      total: { $sum: "$entree" }
    },
  },
]);
