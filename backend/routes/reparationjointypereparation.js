const express = require("express");
const router = express.Router();
const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");
require('../models/TypeReparation');
var mongoose = require("mongoose");
const reparationJoinTypeReparationSerivice = require("../services/reparationJoinTypeReparationService");
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

router.post("/",(req,res,next)=>{
  reparationJoinTypeReparationSerivice.ajouterListeTypeReparation(req.body.reparation,req.body.type_reparations)
  .then((reparation) => {
    if(reparation){
        res.status(201).json({
            ok : true,
            message : "Donnée(s) insérée(s) avec succès !",
            data : reparation
        })
    }else{
        res.status(400).json({
            ok : false,
            message : "Insertion de données échouées !"
        })
    }
  }).catch((error)=>{
      console.error(error)
      res.status(500).json({
          ok : false,
          message : "Une erreur s'est produite !"
      })
  })
})

module.exports = router;
