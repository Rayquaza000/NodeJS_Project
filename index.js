import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {product,user,cart} from "./Model/script.js";
import { productRoutes } from "./Routes/products.route.js";
import { userRoutes } from "./Routes/user.route.js";
import { userExists,checkLogin,checkLoginStatus } from "./middlewear.js";
import { cartRoutes } from "./Routes/cart.route.js";
const app=new express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/ecommerce");

const db=mongoose.connection;

db.on("open",()=>{
    console.log("connection successful");
});

db.on("error",()=>{
    console.log("Error in connection");
});

productRoutes(app);

userRoutes(app,userExists,checkLogin);

cartRoutes(app,checkLoginStatus);

app.listen(5100,()=>{
    console.log("Server is running on port 5100");
});