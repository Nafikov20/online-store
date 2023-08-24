import React, { HTMLProps } from 'react';
import Link from 'next/link';
import Image from "next/image";

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
            <Image  priority  width={120} src={require('../../../public/img/de_la_mano_logo@3x.png')} alt='logo'/>
        </Link>
    );
};