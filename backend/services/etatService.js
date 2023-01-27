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
            // const result = await Etat.find().populate({path : "reparations",model: "Reparation"}).exec();
            const result = await Reparation.find({}).populate({path : "etat",select: "_id indice libelle",model: "Etat"});
            // const result = await Reparation.aggregate([
            //     {
            //         $group: {
            //             _id: "$etat",
            //             reparations: { $push: "$$ROOT" }
            //         }
            //     }
            // ]).exec()
            return result;

        }catch(error){
            console.error(error)
            throw error
        }
    }
}

// db.createView("reparations_par_état", "reparations",
//   [{
//     $group: {
//       _id: "$etat",
//       reparations: { $push: "$$ROOT" }
//     }
//   }]
// )