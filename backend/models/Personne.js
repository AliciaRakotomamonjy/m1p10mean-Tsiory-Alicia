const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema

const PersonneSchema = new Schema({
    nom : {
        type : String,
        required : true
    },
    prenom : {
        type : String,
        required : true
    },
    date_naissance : {
        type : Date,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique:true
    },
    mdp: {
        type : String,
        required : true
    },
    type_personne : {
        type : Schema.Types.ObjectId,
        ref : "TypePersonne"
    }
},{
    collection : "personne"
});

PersonneSchema.plugin(uniqueValidator);

const Personne = mongoose.model("Personne",PersonneSchema);

module.exports = Personne;
