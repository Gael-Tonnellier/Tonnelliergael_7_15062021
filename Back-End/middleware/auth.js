const jwt= require('jsonwebtoken');

// MIDDLEWARE D AUTHENTIFICATION POUR LES DIFFERENTES ROUTES
module.exports=(req,res,next)=>{
    try{
        // RECUPERATION DU TOKEN SANS LE BEARER
        const token = req.headers.authorization;
        //console.log('test',token);
        // VERIFICATION DU TOKEN CORRESPONDANT AVEC CELUI ATTRIBUE A L USER
        const decodedToken = jwt.verify(token, 'letoken');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable';
        } else {
            next();
        }
    }catch (error){
        res.status(401).json({message : 'INVALID_TOKEN'});
    }
}