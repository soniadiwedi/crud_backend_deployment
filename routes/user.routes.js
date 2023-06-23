const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserModel = require("../model/user.model")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({name,email,password:hash})
            await user.save()
            res.status(200).send({"msg":"Registration has been done"})
        })
    }catch(e){
        res.status(400).send({"msg":e.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Successfull!","token":jwt.sign({"userID":user._id},"golgappe")})
                   
                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            })
        }else{
            res.status(200).send({"msg":"No such User Exist "})  
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

module.exports=userRouter

// "name" : "sonia",
// "email":"sonia@gmail.com",
// "password":"123"