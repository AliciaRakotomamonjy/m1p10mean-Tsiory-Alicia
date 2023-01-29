const express = require("express");
const router = express.Router();
const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");
require('../models/TypeReparation');
var mongoose = require("mongoose");
const reparationJoinTypeReparationSerivice = require("../services/reparationJoinTypeReparationService");

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
