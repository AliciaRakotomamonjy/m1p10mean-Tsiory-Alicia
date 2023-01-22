const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ReparationSchema = new Schema({
    voiture : {
        type : Schema.Types.ObjectId,
        ref : "Voiture"
    },
    etat : {
        type: Number
    },
    date_depot : {
        type : Date,
        default : Date.now
    },
    date_sortie: {
        type:Date
    },
    date_debut_reparation: { type: Date },
    date_fin_reparation: { type: Date },
    type_reparation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeReparation'
    }]
});
const Reparation = mongoose.model("Reparation",ReparationSchema);


const TypeReparationSchema = new Schema({
    libelle : {
        type : String,
        required : true  
    },
    montant : {
        type : Number,
        required : true 
    },
    reparation_join_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReparationJoinTypeReparation'
    }
});

const TypeReparation = mongoose.model("TypeReparation",TypeReparationSchema);

const ReparationJoinTypeReparationSchema = new Schema({
    reparation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reparation'
    },
    type_reparation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeReparation'
    },
    avancement: {
      type: Number,
      default: 0
    }
});

const ReparationJoinTypeReparation = mongoose.model("ReparationJoinTypeReparation",ReparationJoinTypeReparationSchema);



module.exports = {TypeReparation, Reparation, ReparationJoinTypeReparation};