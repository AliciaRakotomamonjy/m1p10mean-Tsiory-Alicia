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
        
    }
}