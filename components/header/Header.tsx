'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import HeaderNav from './HeaderNav';
import MenuBtn from './MenuBtn';
import CategoryNav from './CategoryNav';
import './header.scss';

export default function Header() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shrinkHeader = () => {
      if (headerRef !== null) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          headerRef.current?.classList.add('shrink');
        } else {
          headerRef.current?.classList.remove('shrink');
        }
      }
    };
    window.addEventListener('scroll', shrinkHeader);

    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const menuBtnHandler = () => {
    setMenuIsActive(!menuIsActive);
  };

  return (
    <header ref={headerRef} className="header">
      <nav className="header__wrap">
        <div className="header__top container">
          <p className="logo">
            <Link href={'/'}>BABAN</Link>
          </p>
          {/* 반응형 */}
          <MenuBtn btnHandler={menuBtnHandler}>
            {menuIsActive ? <AiOutlineClose /> : <AiOutlineMenu />}
          </MenuBtn>
          {/* 네비게이션 */}
          <HeaderNav />
        </div>
        {menuIsActive && <CategoryNav />}
      </nav>
    </header>
  );
}
