db.reparations.count({ voiture: new ObjectId("63cfa52e23da0131964a104c"), etat: { '$ne': 6 }});
db.reparations.count({etat: { $ne: 6 }});
db.reparations.count({voiture:"63cfa52e23da0131964a104c"});
db.reparations.remove({"_id": "63d0e1f884158a21d203fcc7"});

db.reparations.remove({});


db.reparations.update({"_id": new ObjectId("63d11d2122e838b5612ea022")}, {$set: {"etat": 5}});
