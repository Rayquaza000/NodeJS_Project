import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {product,user,cart} from "./script.js";

const app=new express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017");

const db=mongoose.connection;

db.on("open",()=>{
    console.log("connection successful");
});

db.on("error",()=>{
    console.log("Error in connection");
});

async function userExists(req,res,next){
    const emailExists=await user.find({"email":req.body.email});
    console.log(emailExists);
    if(emailExists.length>0)
    {
        return res.send({"message":"User with this email already exists"});
    }
    next();
}
 
async function checkLogin(req,res,next){
    const userByEmail=await user.find({email:req.body.email});
    if(userByEmail.length>0)
    {
        if(userByEmail.loggedIn==true)
        {
            return res.json({"message":"User is already logged in"});
        }
        else 
            {
                if(userByEmail.password==req.body.password)
                    {
                       next();
                    }
                else{
                    return res.json({"message":"wrong Password"})
                }
            }
    }
    else{
        return res.json({"message":"User not registered."})
    }
}


app.get("/products",async (req,res)=>{
    const products=await product.find();
    console.log(products)
    res.json(products);
});

app.get("/product/:id",async (req,res)=>{
    const particularProduct=await product.findOne({productId:req.params.id}).then((data)=>{
        if(!data)
        {
            return res.status(404).send("data for this id not found");
        }
        res.json(data);
    }).catch(err=>console.log(err.message));
    
});

app.post("/register",userExists,(req,res)=>{

    const newUser=new user({
    firstName:req.body.firstname,
    lastName:req.body.lastname,
    email:req.body.email,
    password:req.body.password,
    mobile:req.body.mobile,
    loggedIn:false,
    });

    newUser.save()
    res.json(newUser)
});

app.post("/login",checkLogin,(req,res)=>{
    const updateLoggedIn=user.findByIdAndUpdate(
                        req.body.email,
                        {loggedIn:true}
                        );
    return res.json({"message":"Login successful"});
});

app.listen(5100,()=>{
    console.log("Server is running on port 5100");
});