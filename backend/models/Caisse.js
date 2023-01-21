const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CaisseSchema = new Schema({
    entree : {
        type : Number 
    },
    sortie : {
        type : Number
    },
    date_mouvement : {
        type : Date,
        required : true,
        default: Date.now
    }
},{collection: "caisse"});

const Caisse = mongoose.model("Caisse",CaisseSchema);

module.exports = Caisse;
