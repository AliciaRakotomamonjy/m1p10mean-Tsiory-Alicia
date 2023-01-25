const Personne = require("../models/Personne");

module.exports = {
    async findByEmailAndTypePersonne(email,type_personne){
        const result = []
        try{
            result = await Personne.find({email : email})
        }catch(error){
            throw error
        }
        return result;
    }
}