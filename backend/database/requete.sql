mongosh "mongodb+srv://cluster0.eqwhlbk.mongodb.net/db-garage" --username root

db.reparations.count({ voiture: new ObjectId("63cfa52e23da0131964a104c"), etat: { '$ne': 6 }});
db.reparations.count({etat: { $ne: 6 }});
db.reparations.count({voiture:"63cfa52e23da0131964a104c"});
db.reparations.remove({"_id": "63d0e1f884158a21d203fcc7"});

db.reparationjointypereparations.remove({});


db.reparations.update({"_id": new ObjectId("63d11d2122e838b5612ea022")}, {$set: {"etat": 5}});


db.typereparations.insert({"libelle": "Pneu","montant":10000});


db.reparationjointypereparations.insert({"reparation": new ObjectId("63d11d2122e838b5612ea022"),"type_reparation":new ObjectId("63d236c94546219dc8c3dfe5"),"avancement":20});


db.caisse.aggregate([
  		{$match: {year: '2022'}},
  {
    $group:{
      _id: { year: { $year: "$date_mouvement" }, month: { $month: "$date_mouvement" } }
      total : {$sum: "$entree"}
    }
}]);

db.caisse.aggregate([
   			{$match: {'date_mouvement': Date.now()}},,
  {
    $group: {
      total: { $sum: "$entree" },
    },
  },
]);
