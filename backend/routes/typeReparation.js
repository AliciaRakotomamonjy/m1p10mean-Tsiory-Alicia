const express = require("express");
const router = express.Router();
const typeReparationService = require("../services/typeReparationService");

router.get("/", (req, res, next)=>{
    typeReparationService.getTypeReparations()
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
                message : "Aucun type de réparation enregistré dans la base de données !"
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            ok : false,
            message : "Une erreur s'est produite !"
        })
    })
})
router.get("/reparations/disponible/:idreparation", (req, res, next)=>{
    typeReparationService.getTypeReparationsDisponible(req.params.idreparation)
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
                message : "Aucun type de réparation enregistré dans la base de données !"
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            ok : false,
            message : "Une erreur s'est produite !"
        })
    })
})
module.exports = router;