import { postLogin, postRegister } from "../Controller/users.controller.js";

export function userRoutes(app,userExists,checkLogin)
{
    app.post("/register",userExists,postRegister);
    app.post("/login",checkLogin,postLogin);
}