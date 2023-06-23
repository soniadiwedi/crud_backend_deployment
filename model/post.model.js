const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    img:{type:String ,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSlaQruvRHsgGQfxCQYuEnt4tgVM0t-f1YnFcZS92YmDGLgkvjbR0XiPYo8RWmuEIulH4&usqp=CAU"},
    title:String,
    description:String,
    sub:String,
    userID:String
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports={
    PostModel
}