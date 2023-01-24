const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TypePersonneSchema = new Schema({
    libelle : {
        type : String,
        required : true
    }
},{ collection: 'type_personne' });

const TypePersonne = mongoose.model("TypePersonne",TypePersonneSchema);

module.exports = TypePersonne;
