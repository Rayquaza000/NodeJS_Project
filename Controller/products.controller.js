import {product,user,cart} from "../Model/script.js"; 

export async function getProducts(req,res)
{
    const products=await product.find();
    console.log(products);
    res.json(products);
}

export async function getProductsById(req,res)
{
    const particularProduct=await product.findOne({productId:req.params.id}).then((data)=>{
            if(!data)
            {
                return res.status(404).send("data for this id not found");
            }
            res.json(data);
        }).catch(err=>console.log(err.message));
}

export async function postProducts(req,res)
{
    const productIdExists=await product.find({productId:req.body.productId});
        console.log(productIdExists);
        if(productIdExists.length==0)
        {
            const newProduct=new product({
                productId:req.body.productId,
                title:req.body.title,
                brand:req.body.brand,
                stockQuantity:req.body.stockQuantity,
                price:req.body.price
            });
            newProduct.save();
            return res.json({"message":"new product added in database"});
        }
        else{
            return res.json({"message":"ProductId already exists"});
        }
}