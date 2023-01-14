const mongoose = require("mongoose");

const Schema = mongoose.Schema

const VoitureSchema = new Schema({
    matricule : {
        type : String,
        required : true  
    },
    personne : {

    }
});

const Voiture = mongoose.model("Voiture",VoitureSchema);

module.exports = Voiture;
