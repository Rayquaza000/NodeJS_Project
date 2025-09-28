import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName:
    {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    loggedIn: {
        type: Boolean,
    }
});

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        requird: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export const product = mongoose.model("Product", productSchema);
export const user = mongoose.model("User", userSchema);
export const cart = mongoose.model("Cart", cartSchema);

