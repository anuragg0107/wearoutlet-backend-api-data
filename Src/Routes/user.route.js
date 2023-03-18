const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require("dotenv").config()
// hi
const {userModel}=require("../models/userModel")
const userRouter=express.Router();

userRouter.get("/",async(req,res)=>{
    const data=await userModel.find()
    res.send(data)
})

userRouter.post("/register",async(req,res)=>{
    const {firstname,lastname,mobile,email,password}=req.body
    const userPresent=await userModel.findOne({email:email})
    if(userPresent?.email){
        res.send({msg:"User is already exists please login"})
    }
    else{
        try{
        bcrypt.hash(password,6,async(err,secure_password)=>{
            if(err){
                console.log(err)
            }
            else{
                const user=new userModel({
                    firstname,
                    lastname,
                    mobile,
                    email,
                    password:secure_password,
                })
                await user.save()
                res.send({msg:"Register Successful go to login"})
            }
        })
        }
        catch(err){
          res.send({msg:"Error during register the user"})
          console.log(`${e}`)
        }
    }
})


userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.find({email})
        console.log(user[0])
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign(
                        {userID:user[0]._id},
                       masai
                    )
                    res.send({
                        msg:"Login Successful",
                        token:token,
                        user_name:user[0].name,
                    })
                }
                else{
                    res.send({msg:"Wrong Credentials"})
                }
            })
        }
        else{
            res.send({msg:"Wrong Credentials"})
        }
    }
    catch(err){
        res.send({msg:"Login Failed"})
        console.log(`${err}`);
    }
})

module.exports={userRouter}