const express = require("express");
const router = express.Router();
const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");
require('../models/TypeReparation');
var mongoose = require("mongoose");
const Reparation = require("../models/Reparation");

router.get("/:id",async (req, res, next) => {
  await Reparation.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
  .populate("voiture")
  .then(async (repara) => {
    if (repara) {
      console.log(repara._id);
      let detailsreparation = await ReparationJoinTypeReparation.find({
        reparation: repara._id,
      }).populate("type_reparation");
      console.log(detailsreparation);
      res.status(200).json({
        message: "Donnees bien recuperer",
        data: {
          reparation: repara,
          detailsreparations: detailsreparation,
        },
      });
    } else {
      res.status(404).json({ message: "Aucun details non trouvee!" });
    }
  })
  .catch((error) => {
    res.status(500).json({
      message: `details non recuperer pour cause : ${error}`,
    });
  });
});

module.exports = router;
