const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserModel = require("../model/user.model")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
 
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      return res.status(400).send("User Has alredy Exist");
    } else {
      try {
        bcrypt.hash(password, 5, async (err, hash) => {
          const newuser = new UserModel({ name, email, password: hash });
          await newuser.save();
          res.status(201).send({ msg: "Registration has been done", newuser });
        });
      } catch (err) {
        res.status(400).send({ msg: err.message });
      }
    }
})


userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res
              .status(200)
              .json({
                msg: "Login sucessfull!",
                token: jwt.sign({ userId: user._id }, "apple"),
              });
          } else {
            res.status(400).json({ msg: "Wrong Credentila" });
          }
        });
      } else {
        res.status(200).json({ message: "No such user Exist" });
      }
    } catch (err) {
      res.status(400).json({ msg: err.messgae });
    }
})

module.exports=userRouter

// "name" : "sonia",
// "email":"sonia@gmail.com",
// "password":"123"