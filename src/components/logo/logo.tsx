import React, { HTMLProps } from 'react';
import Link from 'next/link';

import cc from 'classcat';

import style from '../../layout/Header/header.module.css';
interface Props extends HTMLProps<HTMLLinkElement> {
    path?: string;
}
export const Logo = ({ path, className }: Props) => {

    return (
        <Link
            className={cc([style.logo, className, { 'cursor-default': !path }])}
            href={'/'}
        >
            <div className={style.logoLeft}>DE LA MANO</div>
            <div className={style.logoRight}>DE LA MANO</div>
        </Link>
    );
};