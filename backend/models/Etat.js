const mongoose = require("mongoose");

const Schema = mongoose.Schema

const EtatSchema = new Schema({
    libelle : {
        type : String,
        required : true
    }
},{ collection: 'etat' });

const Etat = mongoose.model("Etat",EtatSchema);

module.exports = Etat;
