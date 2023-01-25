const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ReparationSchema = new Schema({
    voiture : {
        type : Schema.Types.ObjectId,
        ref : "Voiture"
    },
    etat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etat'
    },
    date_depot : {
        type : Date,
        default : Date.now
    },
    date_sortie: {
        type:Date
    },
    date_debut_reparation: { 
        type: Date 
    },
    date_fin_reparation: { 
        type: Date 
    },
    type_reparation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeReparation'
    }]
});
const Reparation = mongoose.model("Reparation",ReparationSchema);


module.exports = Reparation;