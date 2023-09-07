'use client'

import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import {AiOutlineMenu} from 'react-icons/ai'

import './header.scss';


export default function Header() {

  const headerNav = [
    {
      display: 'login',
      path:'/login',
    },
    {
      display:'like',
      path:'/like'
    },
    {
      display:'mypage',
      path:'/mypage'
    },
    {
      display:'cart',
      path:'/cart'
    },
  ];

  const pathName = usePathname();
  console.log(pathName)
  

  return (
    <div className='header'>
      <div className='header__wrap container'>
        <p className='logo'>BABAN</p>   
        <div className='menu'>
          <AiOutlineMenu/>    
        </div>
        
        <ul className='header__nav-right'>
        {headerNav.map((link, index) => {
        const isActive = pathName === link.path;
        return (
          <li>
            <Link  href={link.path} key={link.display} className={`${isActive ? 'active' : ''}`}>{link.display}</Link>
          </li>
        )
      })}
        </ul>
      </div>
    </div>
  )
}
