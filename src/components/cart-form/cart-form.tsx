'use client'
import {ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
interface formValues {
    'name': string
    'surname': string
    'email': string | number
    'tel': number
}
const CartForm = () => {
    const {
        register: register,
        formState: {errors},
        handleSubmit ,
        reset,
    } = useForm<formValues>({mode: 'onBlur'});

    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems, 'cartItems')
    const PATTERN = /\D/g;
    const getInputNambersValue = (value: string) => {
        return value.replace(PATTERN, '');
    }

    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>): any => {
        const input = event.target;
        let inputNumberValue = getInputNambersValue(input.value);
        let formattedInputValue = '';
        const selectionStart = input.selectionStart;

        if (!inputNumberValue) {
            return (input.value = '');
        }

        if (input.value.length !== selectionStart) {
            return
        }

        if (['7', '8', '9'].indexOf(inputNumberValue[0]) > -1) {
            //обработка российских номеров
            if (inputNumberValue[0] === '9') {
                inputNumberValue = '7' + inputNumberValue
            }

            const firstSymbol = inputNumberValue[0] === '8' ? '8' : '+7';
            formattedInputValue = firstSymbol + ' ';

            if (inputNumberValue.length > 1) {
                formattedInputValue += '(' +inputNumberValue.substring(1, 4);
            }

            if (inputNumberValue.length >= 5 ) {
                formattedInputValue += ') ' +inputNumberValue.substring(4, 7);
            }

            if (inputNumberValue.length >= 8) {
                formattedInputValue += '-' +inputNumberValue.substring(7, 9);
            }

            if (inputNumberValue.length >= 10) {
                formattedInputValue += '-' +inputNumberValue.substring(9, 11);
            }
        } else {
            //обработка не российских номеров
            formattedInputValue = '+' + inputNumberValue.substring(0, 16)
        }
        input.value = formattedInputValue;
    }

    const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        //удаляет первый элемент
        const input = event.target as HTMLInputElement;

        if (event.key === 'Backspace' && getInputNambersValue(input.value).length === 1) {
            input.value = '';
        }
        return input;
    }

    const handlePhonePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        // @ts-ignore
        const pasted = event.clipboardData ?? window['clipboardData'];
        const input = event.target as HTMLInputElement;
        const inputNumberValue = getInputNambersValue(input.value);

        if(pasted) {
            const pastedText = pasted.getData('Text');
            if(PATTERN.test(pastedText)) {
                input.value = inputNumberValue;
            }
        }
    }

    const onSubmit = (data: any) => {
        reset()
    }


    return (
        <div className='flex gap-2.5 justify-between w-full m-[40px_0_0_0]'>
            {/*Правая сторона формы для карзины*/}
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className='flex'>
                    <div className='w-full pr-[13%]'>
                        <h2 className='mb-20'>КОРЗИНА</h2>

                        <div className="flex items-center mb-[30px]">
                            <label className="self-start text-[#99badb] leading-[1px] pr-[10px] pt-[5px] flex-[0_0_30%]">Имя</label>
                            <div className="flex-[0_1_70%]">
                                <input
                                    {...register("name", {
                                        required: "Это поле обязательно",
                                        minLength: {
                                            value: 5,
                                            message: 'Минимум 5 символов'
                                        }
                                    })}
                                    className='border-solid border-[1px] border-[#99badb] h-[42px] w-full py-[12px] px-[11px] text-[14px]'
                                />
                                <div className="p-[4px 0 0 0] text-[#8d0624]">
                                    {errors?.name && <p className='text-[10px]'>{errors?.name?.message || 'Ошибка'}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mb-[30px]">
                            <label htmlFor="email" className="self-start text-[#99badb] leading-[1px] pr-[10px] pt-[5px] flex-[0_0_30%]">Фамилия</label>
                            <div className="flex-[0_1_70%]">
                                <input
                                    {...register("surname", {
                                        required: "Это поле обязательно",
                                        minLength: {
                                            value: 5,
                                            message: 'Минимум 5 символов'
                                        }
                                    })}
                                    className='border-solid border-[1px] border-[#99badb] h-[42px] w-full py-[12px] px-[11px] text-[14px]'
                                />
                                <div className="p-[4px 0 0 0] text-[#8d0624]">
                                    {errors?.surname && <p className='text-[10px]'>{errors?.surname?.message || 'Ошибка'}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mb-[30px]">
                            <label htmlFor="email" className="self-start text-[#99badb] leading-[1px] pr-[10px] pt-[5px] flex-[0_0_30%]">Email</label>
                            <div className="flex-[0_1_70%]">
                                <input
                                    {...register("email", {
                                        required: "Это поле обязательно",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Не правильный формат почты",
                                        },
                                    })}
                                    className='border-solid border-[1px] border-[#99badb] h-[42px] w-full py-[12px] px-[11px] text-[14px]'
                                />
                                <div className="p-[4px 0 0 0] text-[#8d0624]">
                                    {errors?.email && <p className='text-[10px]'>{errors?.email?.message || 'Ошибка'}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mb-[30px]">
                            <label htmlFor="phone" className="self-start text-[#99badb] leading-[1px] pr-[10px] pt-[5px] flex-[0_0_30%]">Телефрн</label>
                            <div className="flex-[0_1_70%]">
                                <input
                                    onInput={handleChangePhone}
                                    onKeyDown={handlePhoneKeyDown}
                                    onPaste={handlePhonePaste}
                                    {...register("tel", {
                                        required: "Это поле обязательно",
                                        maxLength: {
                                            value: 18,
                                            message: 'Ошибка длинны'
                                        },
                                    })}
                                    className='border-solid border-[1px] border-[#99badb] h-[42px] w-full py-[12px] px-[11px] text-[14px]'
                                />
                                <div className="p-[4px 0 0 0] text-[#8d0624]">
                                    {errors?.tel && <p className='text-[10px]'>{errors?.tel?.message || 'Ошибка'}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Правая сторона формы для карзины*/}

                    {/*Левая сторона формы для корзины*/}
                    <div className='flex-[0_0_238px]'>
                        <div className="sticky top-[68px]">
                            <div className="mb-8">
                                <div className="flex items-center justify-between uppercase">
                                    <div>Итого:</div>
                                    <div></div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className="w-full border-none mb-8"
                            >
                                <span className='bg-[#99badb] hover:bg-[#89a7c5] text-white flex items-center justify-center uppercase px-4.5 py-3.5 font-normal w-fullborder-none mb-8'>Оформить заказ</span>
                            </button>
                            {/*    Оформить заказ*/}
                            {/*</input>*/}
                            <p className="text-[11px]">
                                Нажимая на кнопку «оформить заказ», я принимаю условия публичной оферты и политики конфиденциальности
                            </p>
                        </div>
                    </div>
                    {/*Левая сторона формы для корзины*/}
                </div>
            </form>
        </div>
    );
};

export default CartForm;