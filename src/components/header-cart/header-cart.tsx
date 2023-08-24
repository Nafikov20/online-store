'use client'
import React from 'react';
import {Icon} from "@/components/icon/icon";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const HeaderCart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    return (
        <div>
            <Link href={'/cart'}>
                <div className='relative flex w-14 items-center justify-center'>
                    <div className='relative flex h-full w-full cursor-pointer items-center justify-center hover:bg-bg'>
                        <Icon
                            className="h-[22px] w-[22px]"
                            name='cart'
                        />
                        {cartItems.length >= 1 &&
                            (
                                <span className='inline-flex items-center justify-center rounded-xl bg-[#99badb] py-1 px-1.5 text-[9px] leading-none text-white absolute -top-1/3 right-2'>
                                    {cartItems.length}
                                </span>
                            )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HeaderCart;