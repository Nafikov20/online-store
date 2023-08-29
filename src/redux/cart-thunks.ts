import { createAsyncThunk } from '@reduxjs/toolkit';
import {addToCart} from "@/redux/cart-reducer";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number | undefined;
    img1: string;
    img2: string;
    img3: string;
}

export const initializeCart = createAsyncThunk('cart/initializeCart', async (_, { dispatch }) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.forEach((item: Product) => {
        dispatch(addToCart(item));
    });
});
