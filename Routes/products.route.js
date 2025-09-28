import { getProducts, getProductsById, postProducts } from "../Controller/products.controller.js";


export function productRoutes(app)
{
    app.get("/products",getProducts);
    app.get("/product/:id",getProductsById);
    app.post("/product",postProducts);
}