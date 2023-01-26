const express = require("express");
const router = express.Router();
const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");
var mongoose = require("mongoose");
require('../models/TypeReparation');

router.get("/:id", (req, res, next) => {
  ReparationJoinTypeReparation.find({"reparation":mongoose.Types.ObjectId(req.params.id)})
  .populate("type_reparation")
    .then((repara) => {
      if (repara) {
        res.status(200).json(repara);
      } else {
        res.status(404).json({ message: "Aucun details reparation non trouvee!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `details repara non recuperer pour cause : ${error}`,
      });
    });
});

module.exports = router;
