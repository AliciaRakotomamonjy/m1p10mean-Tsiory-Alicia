var mongoose = require("mongoose");

const Reparation = require("../models/Reparation");

const voitureenGarageouNon = async(carObject) => {
  const repar = await Reparation.find({voiture: mongoose.Types.ObjectId(carObject._id),
    etat: { $ne: 6 }});
    if(repar.length == 0){
      return "Sorti du garage"
    }
    return "Dans le garage"
}

module.exports = {
  voitureenGarageouNon
}
