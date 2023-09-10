import {MainSlider} from "@/components/main-slider/main-slider";
import dynamic from 'next/dynamic';
import {products} from '@/shared/data/product'

const DynamicProductCard = dynamic(() => import('../components/product-card/product-card'), {
    ssr: false,
});
export default function Home() {
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MainSlider />
        <div className='grid grid-cols-3 gap-[20px] justify-between mt-[80px]'>
            {products.map(product => (
                <DynamicProductCard key={product.id} product={product} />
            ))}
        </div>
    </main>
  )
}
