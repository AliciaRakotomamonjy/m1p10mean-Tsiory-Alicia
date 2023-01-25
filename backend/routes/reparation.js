const express = require("express");
const router = express.Router();
const Reparation = require("../models/Reparation");
var mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  Reparation.count({
    voiture: mongoose.Types.ObjectId(req.body.voiture),
    etat: { $ne: 6 }
  }).then((resultat) => {
    console.log(resultat);
    if(resultat !=0){
      return res.status(500).json({
        "message" : "Une reparation est encore en cours sur cette vehicule"
      })
    }
    else{
      const reparation = new Reparation({
        voiture: req.body.voiture,
        date_sortie: undefined,
        date_debut_reparation: undefined,
        date_fin_reparation: undefined,
      });
      reparation
      .save()
      .then((reparationcree) => {
        res.status(201).json({
          message: "Reparation creer avec success",
          reparation: {
            ...reparationcree,
            id: reparationcree._id,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: `Reparation non creer pour cause : ${error}`,
        });
      });
    }
  })
});

router.get("/histo/:id", (req, res, next) => {
  Reparation.find({ voiture: req.params.id, etat: 6 })
    .then((repara) => {
      if (repara) {
        res.status(200).json(repara);
      } else {
        res.status(404).json({ message: "Aucun reparation non trouvee!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `repara non recuperer pour cause : ${error}`,
      });
    });
});

module.exports = router;
