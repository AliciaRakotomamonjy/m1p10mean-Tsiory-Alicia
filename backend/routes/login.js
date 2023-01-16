const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Personne = require("../models/Personne");

router.post("/", (req,res) => {
    console.log("enter /login with method post")
    console.log(req.body)
    let email = req.body.email
    let mdp = req.body.mdp

    Personne.findOne({email : email, mdp: mdp})
        .then((user)=>{
            console.log(user)
            if(!user){
                res.status(404).json({
                    ok: false,
                    message: "Email ou mot de passe incorrect"
                })
                
            }else{
                const token = jwt.sign({ id: user._id , email : email,date : Date() }, 
                    process.env.SECRET) 
                res.json({
                    ok : true,
                    token: token
                })
            }
        }).catch((error)=>{
            res.json({
                ok: false,
                message: error
            })
        })
    
    
})
  
module.exports = router;