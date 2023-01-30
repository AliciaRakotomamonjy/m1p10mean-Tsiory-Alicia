const Reparation = require("../models/Reparation")
const Etat = require("../models/Etat");

module.exports = {
    async getAllEtat(){
        try{
            const result = await Etat.find().sort({_id : 1}).exec();
            return result;
        }catch(error){
            console.error(error)
            throw error
        }
    },
    async getAllEtatAvecReparation(){
        try{
           
            const result = Etat.aggregate([
                {
                    $lookup: {
                        from: "reparations",
                        let: { etatId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$etat", "$$etatId"] }
                                }
                            }
                        ],
                        as: "reparations"
                    }
                },
                {
                    $unwind: {
                        path: "$reparations",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "voitures",
                        localField: "reparations.voiture",
                        foreignField: "_id",
                        as: "reparations.voiture"
                    }
                },
                {
                    $unwind: {
                        path: "$reparations.voiture",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        libelle: { $first: "$libelle" },
                        reparations: { $push: "$reparations" }
                    }
                },{
                    $project: {
                        _id: 1,
                        libelle: 1,
                        reparations: {
                            $cond: {
                                if: { $eq: [ "$reparations", [{}] ] },
                                then: [],
                                else: "$reparations"
                            }
                        }
                    }
                },
                {
                    $sort : {
                        "_id" : 1
                    }
                }
            ]).exec()
            return result;

        }catch(error){
            console.error(error)
            throw error
        }
    }
}

