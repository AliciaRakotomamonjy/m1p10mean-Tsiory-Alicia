const mongoose = require("mongoose");

const Schema = mongoose.Schema

const VoitureSchema = new Schema({
    matricule : {
        type : String,
        required : true,
        unique: true
    },
    personne : {
        type: Schema.Types.ObjectId,
        ref : "Personne",
        required : true
    }
},{collection: "voitures"});

const Voiture = mongoose.model("Voiture",VoitureSchema);

module.exports = Voiture;
