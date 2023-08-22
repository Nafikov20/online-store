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


export const Header = () => {
    const headerRef = useRef<HTMLHeadElement | null>(null)
    const cartItems = useSelector((state: RootState) => state.cart.items);

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

      <nav className="flex items-center gap-5">
          <ul className={cc([style.header__ul, 'flex gap-2.5'])}>
              {NAV_LINKS.map(({ path, name }) => {

                  return (
                      <Link
                          key={path}
                          // className={`${style.NavLink} ${isActive && style.NavLinkActive}`}
                          href={`${path}`}
                      >
                          <li className={cc([style.header__li, 'flex gap-2.5'])}>
                              {name}
                          </li>
                      </Link>
                  );
              })}
          </ul>
          <Link href={'/basket'}>
              <div className='flex items-center gap-2'>
                  <div className='cursor-pointer'>basket</div>
                  {cartItems.length ? (<div className='text-amber-800 text-[14px] text-center'>{cartItems.length}</div>) : ('')}
              </div>
          </Link>
      </nav>
    </header>
  );
};
