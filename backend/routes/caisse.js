const express = require("express");
const router = express.Router();
const Caisse = require("../models/Caisse");
var mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const caisse = new Caisse({
    entree: req.body.entree,
    sortie: req.body.sortie,
  });
  caisse
    .save()
    .then((caissecreer) => {
      res.status(201).json({
        message: "Caisse creer",
        caisse: {
          ...caissecreer,
          id: caissecreer._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Voiture non creer pour cause : ${error}`,
      });
    });
});

router.get("/CA", (req, res, next) => {
  Caisse.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date_mouvement" },
          month: { $month: "$date_mouvement" },
        },
        total: { $sum: "$entree" },
      },
    },
  ])
    .then((repara) => {
      if (repara) {
        res.status(200).json(repara);
      } else {
        res.status(404).json({ message: "Aucun CA non trouvee!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `CA non recuperer pour cause : ${error}`,
      });
    });
});

router.get("/CAparjours/:annee", (req, res, next) => {
  // const ex = `${req.params.voiture}-01-01T00:00:00.000Z`;
  // console.log((ex));
  Caisse.aggregate([
    {
      $match: {
        "date_mouvement": {
          $gte: new Date(`${req.params.annee}-01-01T00:00:00.000Z`),
          $lt: new Date(`${req.params.annee}-12-31T23:59:59.999Z`),
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$date_mouvement" },
          month: { $month: "$date_mouvement" },
          day: { $dayOfMonth: "$date_mouvement" },
        },
        total: { $sum: "$entree" }
      },
    },
  ])
    .then((repara) => {
      if (repara) {
        res.status(200).json(repara);
      } else {
        res.status(404).json({ message: "Aucun CA par jours non trouvee!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `CA par jours  non recuperer pour cause : ${error}`,
      });
    });
});


module.exports = router;
