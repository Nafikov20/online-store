import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity = (item.quantity || 0) + 1;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decrementQuantity,
    incrementQuantity
} = cartSlice.actions;

export default cartSlice.reducer;

