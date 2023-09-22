'use client'

import React, { useEffect, useState } from 'react'
import ItemCard from './components/ItemCard';
import {auth} from '@/lib/firebaseConfig'
import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { db } from '@/lib/firebaseConfig';
import {getDoc,doc, setDoc} from "firebase/firestore";
import numberWithCommas from '@/util/numberWithCommas';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const currentUser = auth.currentUser?.uid || snsSession?.user?.name;
  const nonUserCartItems = useSelector((state: RootState) => state.cartItem.items);

  const [cartItem, setCartItem] = useState<TCartItem[]>();

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
  },[currentUser,nonUserCartItems])

  const userRemoveCartItem = async (chooseItem:TCartItem) => {
    const newData = cartItem?.filter((item) => chooseItem.name !== item.name || chooseItem.color !== item.color);
    
    if(currentUser){
      await setDoc(doc(db, "user", currentUser),{cart:newData}).then(()=>
      setCartItem(newData)
      )
    }
  }

  const totalItemPrice = cartItem ? 
    cartItem.reduce((pre: number, curr: TCartItem) => pre + Number(curr.price * curr.quantity),0) : 
    0;

  // 구매하기
  const onPurchaseBtn = () => {

    // 유저가 있어야합니다.
    if(!currentUser) {
      alert('로그인을 해주세요.');
      router.push('login');
      return;
    }
    // 카트에 상품이 있을 경우 vs 없을 경우
    if(cartItem && cartItem.length === 0) {
      alert('카트에 담긴 상품이 없습니다.');
      return;
    }
    // 카트에 상품이 여러개가 담겨있을 경우 대표로 보내줘야 합니다.
    if(cartItem && cartItem.length > 0) {
      const FIRST_ITEM = cartItem[0]
      const routeQuery = {
        id:FIRST_ITEM.name,
        color:FIRST_ITEM.color,
        quantity:`${FIRST_ITEM.quantity}`
      }
      
      router.push(`/purchase/?id=${routeQuery.id}&color=${routeQuery.color}&quantity=${routeQuery.quantity}&itemNum=${cartItem.length}&totalPrice=${totalItemPrice}`)
    }
  }

  return (
    <div className='cart section container'>
      <div className='cart__info mb-2'>
        <p>장바구니에 담긴 상품은 구매가 완료될 때까지 예약되지 않습니다.</p>
      </div>
      <div className='cart__items'>
        {
          cartItem && cartItem.map((item,index) => <ItemCard item={item} key={item.id} userRemoveCartItem={userRemoveCartItem}/>)
        }
      </div>
      {/* 구매하기 */}
      <div className='cart__purchase'>
        <div className='cart__purchase__price'>
          <p>총 {numberWithCommas(String(totalItemPrice))}원</p>
          <p>* 부가세 포함</p>
        </div>
        <BaseButton onClick={onPurchaseBtn}>구매하기</BaseButton>
      </div>
    </div>
  )
}
