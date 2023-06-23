const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,"golgappe")   
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(403).send({message:"Invalid Token"})
        } 
    }else{
        return res.status(401).send({message:"Token is not provided"})
    }
}

module.exports=auth