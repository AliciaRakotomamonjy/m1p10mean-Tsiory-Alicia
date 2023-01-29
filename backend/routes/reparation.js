const express = require("express");
const router = express.Router();
const Reparation = require("../models/Reparation");
var mongoose = require("mongoose");
const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");
require("../models/TypeReparation");
require("../models/Voiture");

router.post("/", (req, res, next) => {
  Reparation.count({
    voiture: mongoose.Types.ObjectId(req.body.voiture),
    etat: { $ne: 6 },
  }).then((resultat) => {
    console.log(resultat);
    if (resultat != 0) {
      return res.status(500).json({
        message: "Une reparation est encore en cours sur cette vehicule",
      });
    } else {
      const reparation = new Reparation({
        voiture: req.body.voiture,
        date_sortie: null,
        date_debut_reparation: null,
        date_fin_reparation: null,
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
  });
});

router.post("/recuperervoiture", (req, res, next) => {
  Reparation.count({
    voiture: mongoose.Types.ObjectId(req.body.voiture),
    etat: 5,
  }).then((resultat) => {
    console.log(resultat);
    if (resultat == 0) {
      return res.status(500).json({
        message: "Le voiture n'est pas encore recuperable",
      });
    } else {
      Reparation.updateOne(
        { _id: req.body.id, voiture: req.body.voiture },
        {
          date_sortie: Date.now(),
          etat: 6,
        }
      )
        .then((result) => {
          console.log(result);
          res.status(200).json({ message: "Voiture Bien recuperer!" });
        })
        .catch((error) => {
          res.status(500).json({
            message: `Voiture non recuperer pour cause : ${error}`,
          });
        });
    }
  });
});

router.get("/histo/:id", (req, res, next) => {
  Reparation.find({ voiture: req.params.id})
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

router.get("/", (req, res, next) => {
  Reparation.find()
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

router.get("/reparationencours/:voiture", async (req, res, next) => {
  await Reparation.findOne({ voiture: req.params.voiture, etat: { $ne: 6 } })
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
