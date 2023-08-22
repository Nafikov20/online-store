import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {decrementQuantity, incrementQuantity, removeFromCart} from "@/redux/cart-reducer";

const Basket = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems, 'cartItems')
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrementQuantity = (productId: number) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrementQuantity = (productId: number) => {
        // const item = state.items.find(item => item.id === action.payload);
        //     if (item && item.quantity && item.quantity > 1) {
        //         item.quantity -= 1;
        //         localStorage.setItem('cart', JSON.stringify(state.items));
        //     }
        dispatch(decrementQuantity(productId));
    };
    return (
        <div>
            <div className='flex flex-col'>
                <h1>Корзина</h1>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.price}
                            {item.quantity && (
                                <span className='text-blue-700'>Количество: {item.quantity}</span>
                            )}
                            <div className='flex pt-3.5 gap-6'>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Удалить</button>
                                <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Basket;