'use client'

import React,{useState,useEffect,useRef} from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { headerNav , productNav} from '@/constant/navigation';


import './header.scss';


export default function Header() {
  const [menuIsActive, setMenuIsActive] = useState(false) 
  const headerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useEffect(() => {
    const shrinkHeader = () => {
      if (headerRef !== null) {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
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

  return (
    <header ref ={headerRef}className='header'>
      <nav className='header__wrap'>
        <div className='header__top container'>
          <p className='logo'>
            <Link href={'/'}>
              BABAN
            </Link>
          </p>
          <button className='menu' onClick={()=>setMenuIsActive(!menuIsActive) }>
          {menuIsActive ? <AiOutlineClose/> : <AiOutlineMenu/> }   
          </button>
          
          <ul className='         header__nav-right'>
          {headerNav.map((link, index) => {
          const isActive = pathName === link.path;
          return (
            <li key={index}>
              <Link  href={link.path} key={link.display} className={`${isActive ? 'active' : ''}`}>{link.display}</Link>
            </li>
          )
        })}
          </ul>
        </div>
          {menuIsActive &&(
            <ul className='product-nav'>
              {productNav.map((link, index) => {
              return (
                <li key={index}>
                  <Link href={'/'} key={link.display}>{link.display}</Link>
                </li>
              )
            })}
            </ul>) 
          }
      </nav>
     
    </header>
  )
}
