const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const personneService = require("../services/personneService");

router.post("/", (req,res) => {
    let email = req.body.email
    let mdp = req.body.mdp
    // _id type_personne responsable client
    const type_personne = '63c02ee2a24f608157199e55'

    personneService.findByEmailAndTypePersonne(email,type_personne)
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
  

router.post("/atelier", (req,res) => {
    let email = req.body.email
    let mdp = req.body.mdp
    // _id type_personne responsable atelier
    const type_personne = '63c02e62a24f608157199e53'
    console.log("tafiditra /login/atelier")
    personneService.findByEmailAndTypePersonne(email,type_personne)
        .then((user)=>{
            console.log(user)
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

router.post("/financier", (req,res) => {
    let email = req.body.email
    let mdp = req.body.mdp
    // _id type_personne responsable financier
    const type_personne = '63c02ed9a24f608157199e54'

    personneService.findByEmailAndTypePersonne(email,type_personne)
        .then((user)=>{
            console.log(user)
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