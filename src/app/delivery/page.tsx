'use client';
import dynamic from 'next/dynamic';

const products = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
    { id: 3, name: 'Товар 2', price: 200 },
    { id: 4, name: 'Товар 2', price: 200 },
    { id: 5, name: 'Товар 2', price: 200 },
    { id: 6, name: 'Товар 2', price: 200 },
    { id: 7, name: 'Товар 2', price: 200 },
    { id: 8, name: 'Товар 2', price: 200 },
    // ...другие товары
];

const DynamicProductCard = dynamic(() => import('../../components/product-card/product-card'), {
    ssr: false,
});

export default function Delivery() {
    return (
        <div className="flex flex-col items-center justify-center mt-[55px]">
            <h1>DELIVERY</h1>
            <div className='grid grid-cols-3 gap-[20px] justify-between'>
                {products.map(product => (
                    <DynamicProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
    );
}