'use client'

import React,{useState,useEffect,useRef ,useCallback} from 'react';
import Link from 'next/link';
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { productNav} from '@/constant/navigation';
import { useSession,signOut } from "next-auth/react"
import {auth} from '@/lib/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { doc,onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import './header.scss';

export default function Header() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<null | string>(null);
  const { data: snsSession } = useSession();
  const nonUserCartItems = useSelector((state: RootState) => state.cartItem.items);
  const [cartLength, setCartLength] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);

  const isUser = firebaseUser || snsSession?.user?.name;

  useEffect(() => {
    const shrinkHeader = () => {
  
      if (headerRef !== null) {
        if (
          document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50
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

  useEffect(()=>{
    // 파이어베이스 로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setFirebaseUser(user.uid)
        // ...
      } else {
        setFirebaseUser(null);
        // User is signed out
        // ...
      }
    });
    return unsubscribe;
  },[]);

  const getUserCartItem = useCallback(() => {
    if(isUser) {
      onSnapshot(doc(db, "user", isUser), (doc) => {
        const data = doc.data();
        setCartLength(data?.cart.length);
      });
    }else {
      setCartLength(nonUserCartItems.length);
    }
  },[isUser]);

  useEffect(()=>{
    getUserCartItem();
  },[isUser,nonUserCartItems])

  return (
    <header ref ={headerRef}className='header'>
      <nav className='header__wrap'>
        <div className='header__top container'>
          <p className='logo'>
            <Link href={'/'}>
              BABAN
            </Link>
          </p>
          <button aria-label="메뉴 버튼" type ='button' className='menu' onClick={()=> setMenuIsActive(!menuIsActive)}>
          {menuIsActive ? <AiOutlineClose/> : <AiOutlineMenu/> }   
          </button>
          <ul className='header__nav-right'>
            <li>
              {isUser ? <button onClick={logout}>logout</button> : <Link href={'/login'}>login</Link>}
            </li>
            <li>
              {isUser && <Link href={'/mypage'}>mypage</Link>}
            </li>
            {/* <li>
              {
                isUser ?  <Link href={'/cart'}>{`cart(${cartLength})`}</Link> :  <Link href={'/cart'}>{`cart(${nonUserCartItems.length})`}</Link>
              }
            </li> */}
            <li> <Link href={'/cart'}>cart</Link></li>
          </ul>
        </div>
          {menuIsActive &&(
            <ul className='product-nav'>
              {productNav.map((link, index) => {
              return (
                <li key={index}>
                  <Link href={`/${link.display}`} key={link.display}>{link.display}</Link>
                </li>
              )
            })}
            </ul>) 
          }
      </nav>
     
    </header>
  )
}
