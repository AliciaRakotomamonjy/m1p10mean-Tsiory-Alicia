const mongoose = require("mongoose")
const TypeReparation = require("../models/TypeReparation");

module.exports = {
    async getTypeReparations(){
        try{
            const result = await TypeReparation.find({});
            return result
        }catch(error){
            console.error(error)
            throw error
        }
        
    },
    async getTypeReparationsDisponible(idreparation){
        try{
            const result = await TypeReparation.aggregate([
                {
                    $lookup: {
                      from: 'reparationjointypereparations',
                      localField: '_id',
                      foreignField: 'type_reparation',
                      as: 'reparation_join'
                    }
                  },
                  {
                    $match: {
                      'reparation_join.reparation': {
                        $ne: mongoose.Types.ObjectId(idreparation)
                      }
                    }
                  }
            ]).exec();
            return result
        }catch(error){
            console.error(error)
            throw error
        }
    }
}