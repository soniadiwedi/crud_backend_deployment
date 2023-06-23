const express=require("express")
const { PostModel } = require("../model/post.model")
const postRouter=express.Router()


postRouter.post("/create",async(req,res)=>{
    try {
        const { img, title, description, sub, userID } = req.body;
        const newPost = new PostModel({
          img,
          title,
          description,
          sub,
          userID
        });
    
      
        const savedPost = await newPost.save();
    
        res.status(201).json(savedPost);
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
      }
})

postRouter.get("/",async(req,res)=>{
    //logic
    try{
        let data= await PostModel.find()
        res.status(200).send(data)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    //logic
    const {id}=req.params
    try{
        await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"data has been deleted"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    //logic
    const {id}=req.params
    const data=req.body
    try{
        await PostModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({"msg":"data has been updated"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})
module.exports=postRouter

// {
//     "title":"JavaScript ",
// "body":"learn most important",
// "subject":"Coding"
    

// }