const express = require("express");
const router = express.Router();
const Reparation = require("../models/Reparation");

router.post("/", (req, res, next) => {
  //console.log(req.query);
  const reparation = new Reparation({
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
