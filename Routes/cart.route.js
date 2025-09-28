import { deletecart, postCart, putCart } from "../Controller/carts.controller.js";

export function cartRoutes(app,checkLoginStatus)
{
    app.post("/cart",checkLoginStatus,postCart);
    app.put("/cart",checkLoginStatus,putCart);
    app.delete("/cart",checkLoginStatus,deletecart);
}