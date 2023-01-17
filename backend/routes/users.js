const express = require('express');
const router = express.Router();
const Personne = require("../models/Personne");
const bcrypt = require("bcrypt");

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

router.post("",(req,res,next)=> {
  bcrypt.hash(req.body.mdp,10).then(hash => {
    const pers = new Personne({
      nom : req.body.nom,
      prenom : req.body.prenom,
      date_naissance : req.body.date_naissance,
      email : req.body.email,
      mdp : hash
    });
    pers.save().then(persCreated=>{
      res.status(201).json({
        message:"User added successfulyy",
        persId : persCreated._id
      });
    }).catch(err => {
      res.status(500).json({
        error:err
      })
    });
  })
});


module.exports = router;
