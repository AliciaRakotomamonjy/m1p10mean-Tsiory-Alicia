const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req,res) => {
    let email = req.body.email
    let mdp = req.body.mdp

    var token = jwt.sign( 
    { email: email,date : Date() }, 
    process.env.SECRET, 
    (err, token) => { 
        if(err){
            res.status(500).json({
                ok : false,
                message : "Une erreur s'est produite !"
            })
        }else{
            res.status(200).json({
                ok : true,
                message : "Connexion réussie !",
                token: token
            })
        }
    }) 
    
})
  
module.exports = router;