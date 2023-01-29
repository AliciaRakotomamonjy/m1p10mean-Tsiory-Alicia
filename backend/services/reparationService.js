const mongoose = require("mongoose")
const Reparation = require("../models/Reparation")


module.exports = {
    async updateEtatReparation(id,etat){
        try{
            const result = await Reparation
                .findByIdAndUpdate(id, { $set: { etat: etat } }, { new: true })
                .populate("voiture")
                .populate("etat")
                .exec()
            return result
        }catch(error){
            console.error(error)
            throw error
        }
    },
    async getDetailReparation(id){
        try{
            const result = await Reparation 
                .aggregate([
                    {
                        $match: { _id: mongoose.Types.ObjectId(id) }
                    },
                    
                    {
                        $lookup: {
                            from: "reparationjointypereparations",
                            localField: "_id",
                            foreignField: "reparation",
                            as: "jointure"
                        }
                    },
                    {
                        $unwind: "$jointure"
                    },
                    {
                        $lookup: {
                            from: "typereparations",
                            localField: "jointure.type_reparation",
                            foreignField: "_id",
                            as: "type_reparations"
                        }
                    },
                    {
                        $unwind: "$type_reparations"
                    },
                    {
                        $lookup: {
                            from: "voitures",
                            localField: "voiture",
                            foreignField: "_id",
                            as: "voiture"
                        }
                    },
                    {
                        $unwind: "$voiture"
                    },
                    {
                        $lookup: {
                            from: "etat",
                            localField: "etat",
                            foreignField: "_id",
                            as: "etat"
                        }
                    },
                    {
                        $unwind: "$etat"
                    },
                    {
                        $group: {
                            _id: "$_id",
                            etat: { $first: "$etat" },
                            voiture: { $first: "$voiture" },
                            date_depot : { $first: "$date_depot" },
                            date_sortie: { $first: "$date_sortie" },
                            date_debut_reparation: { $first: "$date_debut_reparation" },
                            date_fin_reparation: { $first: "$date_fin_reparation" },
                            typereparations: { $push:  
                                { 
                                    id : "$type_reparations._id", 
                                    libelle : "$type_reparations.libelle", 
                                    montant : "$type_reparations.montant" , 
                                    avancement : "$jointure.avancement",
                                    reparation_join_type : "$jointure._id"
                                }  
                            }
                        }
                    },
                    
                ])
                .exec();
            return result;
        }catch(error){
            console.error(error)
            throw error
        }
    },
    
}

