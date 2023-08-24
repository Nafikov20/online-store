'use client';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {decrementQuantity, incrementQuantity, removeFromCart} from "@/redux/cart-reducer";
import {Icon} from "@/components/icon/icon";
import Image from "next/image";
import { Select } from 'antd';


const sizeData = [
        {
            value: 'xs',
            label: 'XS',
        },
        {
            value: 'S',
            label: 'S',
        },
        {
            value: 'M',
            label: 'M',
        },
        {
            value: 'L',
            label: 'L',
        },
    ]


const CartProduct = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems)
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
        <div className='flex flex-col border-b-[1px] border-[#99badbc6] pb-2.5 w-full'>
            {cartItems.map(item => (
                <div key={item.id} className="flex gap-2.5 items-center justify-between w-full">


                    <div className='flex gap-2.5 items-center'>
                        <Image
                            alt='image cart product'
                            src={'/img/slider1.JPG'}
                            width={80}
                            height={100}
                        />
                        <h3>{item.name}</h3>
                        <span className='text-zinc-600'>color grey</span>
                    </div>


                    <div className='flex gap-2.5'>
                        <Select
                            className='w-[70px] !h-[42px]'
                            defaultValue='XS'
                            optionFilterProp="children"
                            onChange={() => console.log(123)}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={sizeData}
                        />
                        <div className='flex m-[0 20px] w-[100px] h-[42px] border-[1px] border-solid border-[#dbd6d2] gap-2.5'>
                            <button
                                className='flex-[0_0_25px] ease-in duration-300 hover:bg-[#99badb40] relative'
                                onClick={() => handleIncrementQuantity(item.id)}>
                                +
                            </button>
                            <div className='flex-[1_1_auto] flex items-center justify-center'>
                                <span className='text-[14px] font-normal'>{item.quantity}</span>
                            </div>
                            <button
                                className='flex-[0_0_25px] ease-in duration-300 hover:bg-[#99badb40] relative'
                                onClick={() => handleDecrementQuantity(item.id)}>
                                -
                            </button>
                        </div>
                    </div>



                    <div className='flex gap-2.5'>
                        <h3>{`${(item.price)}`}₽</h3>
                        <button onClick={() => handleRemoveFromCart(item.id)}>
                            <Icon  width={24} height={24}  name='delete' />
                        </button>
                    </div>


            </div>
            ))}
        </div>
    );
};

export default CartProduct;