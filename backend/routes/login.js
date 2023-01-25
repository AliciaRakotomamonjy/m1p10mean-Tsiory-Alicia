const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Personne = require("../models/Personne");

router.post("/", (req,res) => {
    let email = req.body.email
    let mdp = req.body.mdp

    Personne.findOne({email : email
    })
        .then((user)=>{
            if(!user){
                res.status(404).json({
                    ok: false,
                    message: "Email ou mot de passe incorrect !"
                })
            }else{
                bcrypt.compare(mdp,user.mdp,(err,isMatch)=>{
                    if(err){
                        res.status(500).json({
                            ok: false,
                            message: "Une erreur s'est produite !"
                        }) 
                    }
                    console.log(isMatch)
                    if(!isMatch){
                        res.status(404).json({
                            ok: false,
                            message: "Email ou mot de passe incorrect !"
                        }) 
                    }else{
                        
                        const token = jwt.sign({ id: user._id , email : email,date : Date() }, 
                        process.env.SECRET) 
                        res.status(200).json({
                            ok : true,
                            token: token
                        })
                    }  
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