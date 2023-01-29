const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
},{ collection: 'typereparations' });

const TypeReparation = mongoose.model("TypeReparation",TypeReparationSchema);

module.exports = TypeReparation;

