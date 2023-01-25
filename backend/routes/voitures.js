const express = require("express");
const router = express.Router();
const Voiture = require("../models/Voiture");
const Reparationroute = require("./reparation");

router.get("/", (req, res, next) => {
  //console.log(req.query);
  Voiture.find({ personne: "" })
    .then((vtr) => {
      res.status(200).json({
        message: "Liste des voitures bien recu!",
        voiture: vtr,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Liste des voitures pour cause : ${error}`,
      });
    });
});


router.post("/", (req, res, next) => {
  //console.log(req.query);
  const voiture = new Voiture({
    matricule: req.body.matricule,
    personne: req.userData.userId,
    // personne: '63cf8cf7b1494e88fdafc680',
  });
  voiture
    .save()
    .then((voiturecree) => {
      res.status(201).json({
        message: "Voiture creer",
        voiture: {
          ...voiturecree,
          id: voiturecree._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Voiture non creer pour cause : ${error}`,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  // console.log(req.params.id);
  // console.log(req.userData);
  const check = Reparationroute.checkvoitureinreparation(req.params.id);
  if (!check) {
    Voiture.deleteOne({ _id: req.params.id, personne: req.userData.userId })
      .then((result) => {
        // console.log('------');
        // console.log(result);
        if (result.deletedCount > 0) {
          res.status(200).json({ message: "Deletien successful!" });
        } else {
          res.status(401).json({ message: "Not authorized" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: `Voiture non supprimer pour cause : ${error}`,
        });
      });
  } else {
    res.status(401).json({ message: "La voiture est en cours de reparation" });
  }
});

router.put("/:id", (req, res, next) => {
  const voiture = new Voiture({
    _id: req.body.id,
    matricule: req.body.matricule,
    // personne: req.userData.userId,
    personne: req.userData.userId,
  });
  Voiture.updateOne({ _id: req.params.id, personne: req.userData.userId }, voiture)
    .then((result) => {
      console.log("-----");
      console.log(result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized ou Aucune modification na ete faites" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Voiture non mise a jour pour cause : ${error}`,
      });
    });
});

module.exports = router;
