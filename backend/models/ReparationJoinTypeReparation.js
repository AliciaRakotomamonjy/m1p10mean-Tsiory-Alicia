const mongoose = require("mongoose");

const Schema = mongoose.Schema

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
module.exports =  ReparationJoinTypeReparation;