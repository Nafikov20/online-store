'use client';
import dynamic from 'next/dynamic';

const products = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
    // ...другие товары
];

const DynamicProductCard = dynamic(() => import('../../components/product-card/product-card'), {
    ssr: false,
});

export default function Delivery() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>DELIVERY</h1>
            {products.map(product => (
                <DynamicProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}