const express = require("express");
const router = express.Router();
const Personne = require("../models/Personne");
const Typepersonne = require("../models/TypePersonne");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const personnes = await Personne.find();
    res.status(200).json({
      ok: true,
      message: "Données récupérées avec succès !",
      data: personnes,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Une erreur s'est produite !",
    });
  }
});

router.post("", (req, res, next) => {
  Typepersonne.findOne({
    _id: "63c02ee2a24f608157199e55",
    libelle: "responsable client",
  })
    .then((type) =>
      bcrypt.hash(req.body.mdp, 10).then((hash) => {
        const pers = new Personne({
          nom: req.body.nom,
          prenom: req.body.prenom,
          date_naissance: req.body.date_naissance,
          email: req.body.email,
          mdp: hash,
          type_personne: type._id,
        });
        pers
          .save()
          .then((persCreated) => {
            res.status(201).json({
              message: "User added successfulyy",
              persId: persCreated._id,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `User non creer pour cause : ${err}`,
            });
          });
      })
    )
    .catch((error) => {
      res.status(500).json({
        message: `Compte client pour cause : ${error}`,
      });
    });
});

module.exports = router;
