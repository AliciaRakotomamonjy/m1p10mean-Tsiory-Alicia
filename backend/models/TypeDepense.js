const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TypeDepenseSchema = new Schema({
    libelle : {
        type : String,
        required : true  
    }
});

const TypeDepense = mongoose.model("TypeDepense",TypeDepenseSchema);

module.exports = TypeDepense;
