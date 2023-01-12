const jwt = require("jsonwebtoken");

const ensureToken = (req, res, next) => {
    var bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== 'undefined') { 
        const bearer = bearerHeader.split(" ") 
        const bearerToken = bearer[1] 
        jwt
        .verify(
            bearerToken,
            process.env.SECRET,
            (err,result)=>{
                if(err){
                    console.error(err)
                    res.status(403).json({
                        ok : false,
                        message : "Vous n'etes pas autorisé !"
                    }) 
                }else{
                    next()
                }
            }
        )
    } else { 
        res.status(403).json({
            ok : false,
            message : "Vous n'etes pas autorisé !"
        }) 
    } 
}
exports.ensureToken = ensureToken 