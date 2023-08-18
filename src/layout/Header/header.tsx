"use client";
import Link from 'next/link';
import cc from 'classcat';
import style from './header.module.css'
import {NAV_LINKS} from "@/constants/nav-links";
import {useEffect, useRef} from "react";
import {ROUTES} from "@/constants/routes-links";
import {Logo} from "@/components/logo/logo";


export const Header = () => {
    const headerRef = useRef<HTMLHeadElement>(null)


    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 && headerRef.current
                ? headerRef.current.classList.add('bg-white')
                : headerRef.current?.classList.remove('bg-white')
        })
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
              <div className='cursor-pointer'>basket</div>
          </Link>
      </nav>
    </header>
  );
};
