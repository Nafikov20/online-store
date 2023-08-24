import React from 'react';

const CartForm = () => {
    return (
        <div>
            <h2 className='mb-20'>КОРЗИНА</h2>
            <div className="flex items-center mb-[30px]">
                <label htmlFor="email" className="self-start text-[#99badb] leading-[1px] pr-[10px] pt-[5px] flex-[0_0_30%]">E-mail</label>
                <div className="flex-[0_1_70%]">
                    <input
                        data-validate
                        data-required="email"
                        id="email" type="email"
                        name="form[1]"
                        className="border-solid border-[1px] border-[#99badb] h-[42px] w-full p-[12px 11px] text-[14px]"
                    />
                        <div className="p-[4px 0 0 0] text-[#8d0624] text-[10px]">Это поле обязательно</div>
                </div>
            </div>
            
        </div>
    );
};

export default CartForm;