'use client';
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const DynamicBasket = dynamic(() => import('../../components/basket/basket'), {
    ssr: false,
});

export default function Basket() {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className='flex flex-col items-center justify-center mt-[96px]'>
            <h1>BASKET</h1>
            {cartItems.length? (
                <DynamicBasket />
            ) : (
               <div className='text-amber-800'>Ваша корзина пока пуста</div>
            )}

        </div>
    )
}