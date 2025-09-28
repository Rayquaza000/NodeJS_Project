import { product,cart,user } from "./Model/script.js";
import jwt from "jsonwebtoken";
export async function userExists(req,res,next){
    const emailExists=await user.find({"email":req.body.email});
    console.log(emailExists);
    if(emailExists.length>0)
    {
        return res.send({"message":"User with this email already exists"});
    }
    next();
}
 
export async function checkLogin(req,res,next){
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

export async function checkLoginStatus(req,res,next){
    const authHeaders=req.headers['authorization'];
    const token=authHeaders && authHeaders.split(' ')[1];
    jwt.verify(token,"secretkey",(err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid JWT token"});
        }
        res.user=user;
        next();
    });
}