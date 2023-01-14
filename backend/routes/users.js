const express = require('express');
const router = express.Router();
const Personne = require("../models/Personne");


/* GET users listing. */
router.get('/', async (req, res, next) => {
  try{
    const personnes = await Personne.find();
    res.status(200).json({
      ok : true,
      message : "Données récupérées avec succès !",
      data : personnes
    })
  }catch(error){
    res.status(500).json({
      ok : false,
      message : "Une erreur s'est produite !"
    })
  }
});

module.exports = router;
