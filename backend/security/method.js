const jwt = require("jsonwebtoken");
const Personne = require("../models/Personne")
const ensureToken = (req, res, next) => {
    var bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined') { 
        const bearer = bearerHeader.split(" ") 
        const bearerToken = bearer[1] 
        
        let decoded
        try{
            decoded = jwt.verify(bearerToken, process.env.SECRET)
        }catch(e){
            res.json({
                ok : false,
                message : error
            })
        }

        let userId = decoded.id
        Personne.findOne({ _id: userId})
        .then((user)=>{
            if(!user){
                res.json({
                    ok : false,
                    message : "Mauvais id dans le token"
                })
            }else{
                next()
            }
        }).catch((error)=>{
            res.json({
                ok : false,
                message : error
            })
        })

    } else { 
        res.status(403).json({
            ok : false,
            message : "Vous n'etes pas autorisé !"
        }) 
    } 
}
exports.ensureToken = ensureToken 