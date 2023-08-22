import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {decrementQuantity, incrementQuantity, removeFromCart} from "@/redux/cart-reducer";

const Basket = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrementQuantity = (productId: number) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrementQuantity = (productId: number) => {
        dispatch(decrementQuantity(productId));
    };
    return (
        <div>
            <div className='flex flex-col'>
                <h1>Корзина</h1>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            {item.name} - {item.price}
                            {item.quantity && (
                                <span className='text-blue-700'>Количество: {item.quantity}</span>
                            )}
                            <div className='flex pt-3.5 gap-6'>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Удалить</button>
                                <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Basket;