'use client';
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CartForm from  "@/components/cart-form/cart-form"

const DynamicCartProduct = dynamic(() => import('../../components/cart-product/cart-product'), {
    ssr: false,
});

export default function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className='flex flex-col items-center justify-center mt-[96px]'>
            <h1>BASKET</h1>
            <DynamicCartProduct />
            <CartForm />
        </div>
    )
}