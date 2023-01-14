const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TypeReparationSchema = new Schema({
    libelle : {
        type : String,
        required : true  
    },
    montant : {
        type : Number,
        required : true 
    }
});

const TypeReparation = mongoose.model("TypeReparation",TypeReparationSchema);

module.exports = TypeReparation;
