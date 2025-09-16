import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    productId:String,
    title:String,
    brand:String,
    stockQuantity:Number,
    price:Number
});

const userSchema=mongoose.Schema({
    userId:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobile:Number,
    loggedIn:Boolean
});

const cartSchema=mongoose.Schema({
    userId:String,
    productId:String,
    quantity:Number
})

export const product=mongoose.model("Product",productSchema);
export const user=mongoose.model("User",userSchema);
export const cart=mongoose.model("Cart",cartSchema);

