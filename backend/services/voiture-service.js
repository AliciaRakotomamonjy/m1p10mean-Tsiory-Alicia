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

const checkvoitureinreparation = async(idvoiture) => {
  await Reparation.count({ voiture: mongoose.Types.ObjectId(idvoiture), etat: { $ne: 6 } })
  .then((compteur) => {
    console.log(compteur);
    if(compteur == 0){
      return false;
    }else{
      return true;
    }
  });
};

module.exports = {
  voitureenGarageouNon,
  checkvoitureinreparation
}
