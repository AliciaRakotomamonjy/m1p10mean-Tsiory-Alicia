const mongoose = require("mongoose");

const Schema = mongoose.Schema

const DepenseSchema = new Schema({
    montant : {
        type : Number,
        required : true  
    },
    date_depense : {
        type : Date,
        required : true  
    },
    remarque : {
        type : String
    },
    type_depense : {
        type : Schema.Types.ObjectId,
        ref : "TypeDepense"
    }
},{collection: "depense"});

const Depense = mongoose.model("Depense",DepenseSchema);

module.exports = Depense;
