"use client";
import React, { useState } from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "@/redux/cart-reducer";
import {RootState} from "@/redux/store";
import { useRouter } from 'next/navigation';

interface ProductCard {
    id: number;
    name: string;
    price: number;
    img1: string;
    img2: string;
    img3: string;
}
interface ProductProps {
    product: ProductCard;
}

interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number;
    img1: string;
    img2: string;
    img3: string;
}

interface CartState {
    items: Product[];
}

const ProductCard = ({ product}: ProductProps )=> {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [activeImage, setActiveImage] = useState(product.img1);
    const [showIndicators, setShowIndicators] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter()



    const isProductInCart = cartItems.some(item => item.id === product.id);

    const handleImageChange = (newImage: React.SetStateAction<string>) => {
        setActiveImage(newImage);
    };

    const handleMouseEnter = () => {
        setShowIndicators(true); // Показать индикаторы при наведении курсора
    };

    const handleMouseLeave = () => {
        setShowIndicators(false); // Скрыть индикаторы при убирании курсора
    };

    const handleAddToCart = () => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // Обновляем состояние количества товара в корзине
            setItemQuantity(existingItem.quantity || 0);
        } else {
            dispatch(addToCart(product));

            // Обновляем cartItems и сохраняем в localStorage
            const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));

            // Обновляем itemQuantity
            setItemQuantity(1);
        }
    };

    return (
        <div className="catalog__card products-search-header">
            <div className="products-search-header__slide">
                {/*<Link href="#" className="products-search-header__content">*/}
                    <div className="products-search-header__image">
                        <div className="products-search-header__image-slider image-slider">
                            <nav
                                className="image-slider__tabs"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    onMouseEnter={() =>
                                        handleImageChange(product.img1)
                                    }
                                    type="button"
                                    className="image-slider__tab"
                                ></button>
                                <button
                                    onMouseEnter={() =>
                                        handleImageChange(product.img2)
                                    }
                                    type="button"
                                    className="image-slider__tab"
                                ></button>
                                <button
                                    onMouseEnter={() =>
                                        handleImageChange(product.img3)
                                    }
                                    type="button"
                                    className="image-slider__tab"
                                ></button>
                            </nav>
                            <div
                                className="image-slider__slides"
                            >
                                <div className="image-slider__slide">
                                    <Image
                                        className="image-slider__slide-img"
                                        src={activeImage}
                                        width={200}
                                        height={300}
                                        alt="img"
                                    />
                                </div>
                            </div>
                            {showIndicators && (
                                <div
                                    className="products-search-header__progress-block"
                                >
                                    <span
                                        data-id="1"
                                        className={`products-search-header__progress ${
                                            activeImage === '/img/slider1.JPG' && '_active'
                                        }`}
                                    ></span>
                                    <span
                                        data-id="2"
                                        className={`products-search-header__progress ${
                                            activeImage === '/img/slider2.JPG' && '_active'
                                        }`}
                                    ></span>
                                    <span
                                        data-id="3"
                                        className={`products-search-header__progress ${
                                            activeImage === '/img/slider3.JPG' && '_active'
                                        }`}
                                    ></span>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="products-search-header__items flex justify-between">
                        <div className='flex flex-col'>
                            <div className="products-search-header__text">{product.name}</div>
                            <div className="products-search-header__desc">
                                <div className="products-search-header__sum">{product.price}₽</div>
                                {/*<div className="products-search-header__color">*/}
                                {/*    <span className='bg-[#CDB059]'></span>*/}
                                {/*    <span className='bg-[#477C88]'></span>*/}
                                {/*</div>*/}
                            </div>
                            <div className="products-search-header__caps">Капсула GI</div>
                        </div>
                        {isProductInCart ? (
                            <button
                                className='w-auto h-[20px] py-2.5 px-1.5 flex items-center rounded bg-[#db99b7] hover:bg-[#C589A4] whitespace-nowrap text-white font-medium'
                                onClick={() => router.push('/cart')}>
                                В корзину
                            </button>
                        ) : (
                            <button
                                className='w-auto h-[20px] py-2.5 px-1.5 flex items-center rounded bg-[#99badb] hover:bg-[#89A7C5] whitespace-nowrap text-white font-medium'
                                onClick={handleAddToCart}>
                                Купить
                            </button>
                        )}
                    </div>
                {/*</Link>*/}
            </div>
        </div>
    );
};

export default ProductCard;