import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "@/redux/cart-reducer";
import {initializeCart} from "@/redux/cart-thunks";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

store.dispatch(initializeCart());


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;