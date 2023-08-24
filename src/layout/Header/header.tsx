"use client";
import Link from 'next/link';
import cc from 'classcat';
import style from './header.module.css'
import {NAV_LINKS} from "@/constants/nav-links";
import {useEffect, useRef} from "react";
import {ROUTES} from "@/constants/routes-links";
import {Logo} from "@/components/logo/logo";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Icon} from "@/components/icon/icon";
import HeaderCart from "@/components/header-cart/header-cart";
import dynamic from "next/dynamic";


const DynamicHeaderCart = dynamic(() => import('../../components/header-cart/header-cart'), {
    ssr: false,
})

export const Header = () => {
    const headerRef = useRef<HTMLHeadElement | null>(null)
    const scrollListener = () => {
        window.scrollY > 50 && headerRef.current
            ? headerRef.current.classList.add('bg-white')
            : headerRef.current?.classList.remove('bg-white')
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);
            return () => window.removeEventListener('scroll', scrollListener);
    }, []);


  return (
    <header ref={headerRef} className={cc([style.header, 'app-container h-[55px]'])}>

        <Logo path={ROUTES.home} />

      <nav className="flex items-center gap-12">
          <ul className={cc([style.header__ul, 'flex gap-2.5'])}>
              {NAV_LINKS.map(({ path, name }) => {

                  return (
                      <Link
                          key={path}
                          href={`${path}`}
                      >
                          <li className={cc([style.header__li, 'flex gap-2.5'])}>
                              {name}
                          </li>
                      </Link>
                  );
              })}
          </ul>
          <DynamicHeaderCart />
      </nav>
    </header>
  );
};
