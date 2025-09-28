import {product,user,cart} from "../Model/script.js"; 
import jwt from "jsonwebtoken";

export async function postRegister(req,res)
{
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
}

export async function postLogin(req,res)
{
    const updateLoggedIn=await user.findOneAndUpdate(
                            {email:req.body.email},
                            {loggedIn:true}
                            );
        const loggedin_users_info=await user.find({"email":req.body.email});
        console.log(loggedin_users_info[0]);
        const accessToken=jwt.sign(loggedin_users_info[0].toObject(),"secretkey",{expiresIn:"5m"});
        res.send({"token":accessToken,"message":"Login successful"});
}