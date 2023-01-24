const express = require("express");
const router = express.Router();
const Reparation = require("../models/Reparation");

const checkvoitureinreparation = (idvoiture) => {
  let compteur;
  compteur = Reparation.count({ voiture: idvoiture, etat: { $ne: 6 } });
  if ((compteur = 0)) {
    return false;
  } else {
    return true;
  }
};

router.post("/", (req, res, next) => {
  if (checkvoitureinreparation(req.body.voiture)) {
    //console.log(req.query);
    const reparation = new Reparation({
      voiture: req.body.voiture,
      date_sortie: undefined,
      date_debut_reparation: undefined,
      date_fin_reparation: undefined,
      type_reparation: undefined,
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
  } else {
    res.status(500).json({
      message: `une reparation est encore en cours sur cette vehicule`,
    });
  }
});

router.get("/histo/:id", (req, res, next) => {
  Reparation.find({voiture: req.params.id, etat:6})
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

module.exports = { router, checkvoitureinreparation };
