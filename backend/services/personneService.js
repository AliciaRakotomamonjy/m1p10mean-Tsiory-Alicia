const Personne = require("../models/Personne");

module.exports = {
    async findByEmailAndTypePersonne(email,type_personne){
        try{
            let result = await Personne.findOne({email : email,type_personne: type_personne})
            return result;
        }catch(error){
            throw error
            console.error(error)
        }
        
    }
}