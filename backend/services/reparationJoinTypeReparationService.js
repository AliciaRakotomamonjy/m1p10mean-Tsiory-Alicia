const ReparationJoinTypeReparation = require("../models/ReparationJoinTypeReparation");

module.exports = {
    async ajouterListeTypeReparation(id_reparation,type_reparations){
        try {
            let joins = [];
            for(let i=0; i<type_reparations.length; i++){
                let join = { 
                    reparation : id_reparation,
                    type_reparation : type_reparations[i],
                    avancement : 0
                }
                joins.push(join)
            }
            const result = await ReparationJoinTypeReparation.insertMany(joins);
            return result; 
            // joins.forEach(async document => {
            //     const existingDocument = await ReparationJoinTypeReparation.findOne({ reparation: document.reparation, });
            //     if (!existingDocument) {
            //         await MyModel.create(document);
            //     }
            // });
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}