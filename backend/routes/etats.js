const express = require("express");
const router = express.Router();
const etatService = require("../services/etatService");

router.get("/", (req, res, next)=>{
    etatService.getAllEtat()
    .then((liste) => {
        if(liste){
            res.status(200).json({
                ok : true,
                message : "Données récupérées avec succès !",
                data : liste
            })
        }else{
            res.status(404).json({
                ok : false,
                message : "Aucun état enregistré dans la base de données !"
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            ok : false,
            message : "Une erreur s'est produite !"
        })
    })
})

router.get("/reparations", (req, res, next)=>{
    etatService.getAllEtatAvecReparation()
    .then((liste) => {
        if(liste){
            res.status(200).json({
                ok : true,
                message : "Données récupérées avec succès !",
                data : liste
            })
        }else{
            res.status(404).json({
                ok : false,
                message : "Aucun état enregistré dans la base de données !"
            })
        }
    }).catch((error)=>{
        console.error(error)
        res.status(500).json({
            ok : false,
            message : "Une erreur s'est produite !"
        })
    })
})

module.exports = router;