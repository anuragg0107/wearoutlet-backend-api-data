const express=require('express')
const app=express()
const cors=require('cors')
const {userRouter}=require("./Src/Routes/user.route")
const {connection}=require("./Src/db/db")

// hi
app.use(
    cors({
        origin:"*"
    })
)
app.use(express.json())

app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(4000,async()=>{
    try{
        await connection
        console.log("Successful connected to db ");
    }
    catch(err){
        console.log({msg:`${err}`});
    }
})