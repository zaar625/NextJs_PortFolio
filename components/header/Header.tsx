'use client'

import React,{useState,useEffect,useRef} from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { headerNav , productNav} from '@/constant/navigation';
import { getAuth } from "firebase/auth";
import {app} from '@/lib/firebaseConfig';
import { useSession,signOut } from "next-auth/react"

import './header.scss';


export default function Header() {
  const [menuIsActive, setMenuIsActive] = useState(false) 
  const { data: snsSession } = useSession()
  
  const headerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const auth = getAuth(app);
  const firebaseUser = auth.currentUser 
  // console.log( snsSession)

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

  const logout = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      if(firebaseUser){
        auth.signOut();
      }

      if(snsSession){
        signOut();
      }

      alert('로그아웃되었습니다.');
      window.location.replace('/');
    }

   
    

  }

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
          
          <ul className='header__nav-right'>
          <li>
            {firebaseUser || snsSession ? <button onClick={logout}>logout</button> : <Link href={'/login'}>login</Link>}
          </li>
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
