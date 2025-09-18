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
        if(userByEmail[0].loggedIn==true)
        {
            
            return res.json({"message":"User is already logged in"});
        }
        else 
            {
                if(userByEmail[0].password==req.body.password)
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

async function checkLoginStatus(req,res,next){
    const userByEmail=await user.find({email:req.body.email});
    if(userByEmail.length>0)
    {
        if(userByEmail[0].loggedIn==true)
        {
            
            next();
        }
        else 
            {
                return res.json({"message":"user is logged out"})
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
    userId:req.body.userId,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    mobile:req.body.mobile,
    loggedIn:false,
    });

    newUser.save()
    res.json(newUser)
});

app.post("/login",checkLogin,async (req,res)=>{
    const updateLoggedIn=await user.findOneAndUpdate(
                        {email:req.body.email},
                        {loggedIn:true}
                        );
    const loggedin_users_info=await user.find({"email":req.body.email});
    console.log(loggedin_users_info[0]);
    const accessToken=jwt.sign(loggedin_users_info[0]["email"],"secretkey");
    res.send({"token":accessToken,"message":"Login successful"});
    
});

app.post("/logout",checkLoginStatus, async (req,res)=>{
    const updateLoggedIn=await user.findOneAndUpdate({email:req.body.email},{loggedIn:false});

});

app.post("/cart",checkLoginStatus,async (req,res)=>{
    const productId=req.body.productId;
    const findProductIdInDB=await product.find({productId:productId});
    if(findProductIdInDB.length>0 && findProductIdInDB.quantity>0)
    {
        const checkIfProductAlreadyExists=await cart.find({userId:req.body.userId,productId:productId});
        if(checkIfProductAlreadyExists==undefined){
        const newItem=new cart({
            userId:req.body.userId,
            productId:req.body.productId,
            quantity:1
        });
        newItem.save();
        return res.send({"message":"item added to cart"})}
        else{
        await cart.findOneAndUpdate({userId:req.body.userId,productId:productId},{quantity:checkIfProductAlreadyExists[0].quantity+1});
            return res.send({"message":"item already exists in cart. Increased quantity by one"});
    }
    }
    
    else{
        return res.json({"message":"This product is not available"});
    }
});

app.put("/cart",checkLoginStatus,async (req,res)=>{
    const updatedProductQuantity=findOneAndUpdate({userId:req.body.userId,productId:req.body.productId},{quantity:req.body.quantity},{new:true});
    return res.json({"updatedProductQuantity":updatedProductQuantity})
});

app.delete("/cart",(req,res)=>{

});

app.listen(5100,()=>{
    console.log("Server is running on port 5100");
});