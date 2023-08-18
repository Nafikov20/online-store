'use client';
import dynamic from "next/dynamic";

const DynamicBasket = dynamic(() => import('../../components/basket/basket'), {
    ssr: false,
});

export default function Basket() {

    return (
        <div className='flex flex-col items-center justify-center mt-[96px]'>
            <h1>BASKET</h1>
            <DynamicBasket />
        </div>
    )
}