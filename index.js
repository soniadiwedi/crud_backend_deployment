const express=require("express")
const { connection } = require("./db")
const userRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.route")
const app=express()
const cors=require("cors")

require("dotenv").config()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send(`<h1>Home Page</h1>`)
})

app.use("/api",userRouter)
app.use("/api",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is connected to db")
    }catch(e){
        console.log(e)
    }
    console.log(`server is running ${process.env.port}`)
})