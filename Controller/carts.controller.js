import {product,user,cart} from "../Model/script.js"; 

export async function postCart(req,res) {
    const productId=req.body.productId;
    const findProductIdInDB=await product.find({productId:productId});
    if(findProductIdInDB.length>0 && findProductIdInDB[0]["stockQuantity"]>0)
    {
        const checkIfProductAlreadyExists=await cart.find({userId:req.body.userId,productId:productId});
        if(checkIfProductAlreadyExists.length==0){
        const newItem=new cart({
            userId:req.body.userId,
            productId:req.body.productId,
            quantity:1
        });
        await newItem.save();
        return res.send({"message":"item added to cart"})}
        else{
        await cart.findOneAndUpdate({userId:req.body.userId,productId:productId},{quantity:checkIfProductAlreadyExists[0]["quantity"]+1});
            return res.send({"message":"item already exists in cart. Increased quantity by one"});
    }
    }
    
    else{
        return res.json({"message":"This product is not available"});
    }
}

export async function putCart(req,res)
{
    const alreadyQuantity=await cart.findOne({userId:req.body.userId,productId:req.body.productId});
        const updatedProductQuantity=await cart.findOneAndUpdate({userId:req.body.userId,productId:req.body.productId},{quantity:alreadyQuantity.quantity+req.body.stockQuantity},{new:true});
        console.log(updatedProductQuantity);
        return res.json({"updatedProductQuantity":updatedProductQuantity});
}

export async function deletecart(req,res)
{
    const productDeletedFromCart=await cart.deleteOne({userId:req.body.userId,productId:req.body.productId});
    return res.json({"delete operation info":productDeletedFromCart});
}