'use client'

import React, { useEffect, useState } from 'react'
import ItemCard from './components/ItemCard';
import {auth} from '@/lib/firebaseConfig'
import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { db } from '@/lib/firebaseConfig';
import {getDoc,doc} from "firebase/firestore";
import './cart.scss';

export type TCartItem = {
  color: string;
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const { data: snsSession } = useSession();
  const currentUser = auth.currentUser?.uid || snsSession?.user?.name;
  const nonUserCartItems = useSelector((state: RootState) => state.cartItem.items);
  const userCartItems = useSelector((state: RootState) => state.userCartItem.items,);

  const [cartItem, setCartItem] = useState<TCartItem[]>();

  // console.log(notUserCartItems);
  const getCartItem = async () => {
    if(currentUser) {
      // db
      const docRef = doc(db, "user",currentUser);
      const docSnap = await getDoc(docRef); 
      const data = docSnap.data();
      
      setCartItem(data?.cart);
    } 
  }

  useEffect(()=>{
    if(currentUser){
      getCartItem();
    } else {
      setCartItem(nonUserCartItems);
    }
  },[currentUser,nonUserCartItems,userCartItems])
  return (
    <div className='cart'>
      <div className='cart__info mb-2'>
        <p>장바구니에 담긴 상품은 구매가 완료될 때까지 예약되지 않습니다.</p>
      </div>
      <div className='cart__items'>
        {
          cartItem && cartItem.map((item,index) => <ItemCard item={item} key={item.id}/>)
        }
        
      </div>
    </div>
  )
}
