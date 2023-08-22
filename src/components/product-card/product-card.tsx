"use client";
import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "@/redux/cart-reducer";
import {RootState} from "@/redux/store";

interface ProductCard {
    id: number;
    name: string;
    price: number;
}
interface ProductProps {
    product: ProductCard;
}

interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

interface CartState {
    items: Product[];
}

const ProductCard = ({ product}: ProductProps )=> {
    // const [activeImage, setActiveImage] = useState('/img/slider1.JPG');
    // const [showIndicators, setShowIndicators] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [itemQuantity, setItemQuantity] = useState(0);

    const isProductInCart = cartItems.some(item => item.id === product.id);


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
        <div>
            {/*<div className="catalog__card products-search-header">*/}
            {/*    <div className="products-search-header__slide">*/}
            {/*        /!*<Link href="#" className="products-search-header__content">*!/*/}
            {/*            <div className="products-search-header__image">*/}
            {/*                <div className="products-search-header__image-slider image-slider">*/}
            {/*                    <nav*/}
            {/*                        className="image-slider__tabs"*/}
            {/*                        onMouseEnter={handleMouseEnter}*/}
            {/*                        onMouseLeave={handleMouseLeave}*/}
            {/*                    >*/}
            {/*                        <button*/}
            {/*                            onMouseEnter={() =>*/}
            {/*                                handleImageChange('/img/slider1.JPG')*/}
            {/*                            }*/}
            {/*                            data-id="1"*/}
            {/*                            type="button"*/}
            {/*                            className="image-slider__tab"*/}
            {/*                        ></button>*/}
            {/*                        <button*/}
            {/*                            onMouseEnter={() =>*/}
            {/*                                handleImageChange('/img/slider2.JPG')*/}
            {/*                            }*/}
            {/*                            data-id="2"*/}
            {/*                            type="button"*/}
            {/*                            className="image-slider__tab"*/}
            {/*                        ></button>*/}
            {/*                        <button*/}
            {/*                            onMouseEnter={() =>*/}
            {/*                                handleImageChange('/img/slider3.JPG')*/}
            {/*                            }*/}
            {/*                            data-id="3"*/}
            {/*                            type="button"*/}
            {/*                            className="image-slider__tab"*/}
            {/*                        ></button>*/}
            {/*                    </nav>*/}
            {/*                    <div*/}
            {/*                        className="image-slider__slides"*/}
            {/*                    >*/}
            {/*                        <div className="image-slider__slide">*/}
            {/*                            <Image*/}
            {/*                                className="image-slider__slide-img"*/}
            {/*                                src={activeImage}*/}
            {/*                                width={200}*/}
            {/*                                height={300}*/}
            {/*                                alt="img"*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    {showIndicators && (*/}
            {/*                        <div*/}
            {/*                            className="products-search-header__progress-block"*/}
            {/*                        >*/}
            {/*                        <span*/}
            {/*                            data-id="1"*/}
            {/*                            className={`products-search-header__progress ${*/}
            {/*                                activeImage === '/img/slider1.JPG' && '_active'*/}
            {/*                            }`}*/}
            {/*                        ></span>*/}
            {/*                            <span*/}
            {/*                                data-id="2"*/}
            {/*                                className={`products-search-header__progress ${*/}
            {/*                                    activeImage === '/img/slider2.JPG' && '_active'*/}
            {/*                                }`}*/}
            {/*                            ></span>*/}
            {/*                            <span*/}
            {/*                                data-id="3"*/}
            {/*                                className={`products-search-header__progress ${*/}
            {/*                                    activeImage === '/img/slider3.JPG' && '_active'*/}
            {/*                                }`}*/}
            {/*                            ></span>*/}
            {/*                        </div>*/}
            {/*                    )}*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="products-search-header__items flex justify-between">*/}
            {/*                <div className='flex flex-col'>*/}
            {/*                    <div className="products-search-header__text">Стакан<span>для кофе</span></div>*/}
            {/*                    <div className="products-search-header__desc">*/}
            {/*                        <div className="products-search-header__sum">6 980 ₽</div>*/}
            {/*                        <div className="products-search-header__color">*/}
            {/*                            <span className='bg-[#CDB059]'></span>*/}
            {/*                            <span className='bg-[#477C88]'></span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="products-search-header__caps">Капсула GI</div>*/}
            {/*                </div>*/}
            {/*                /!*<button onClick={handleAddToCart}>basket</button>*!/*/}
            {/*            </div>*/}
            {/*        /!*</Link>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                {isProductInCart ? (
                    <p>Товар в корзине</p>
                ) : (
                    <button onClick={handleAddToCart}>Добавить в корзину</button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;