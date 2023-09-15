'use client'

import React,{useEffect, useState} from 'react';
import { TCartItem } from '../page';
import Image from 'next/image';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { userRemoveItem } from '@/redux/slice/userCartItem';
import { removeItem } from '@/redux/slice/cartItem';
import { useSession } from 'next-auth/react';
import {auth} from '@/lib/firebaseConfig'
import { useDispatch } from 'react-redux';


import '../cart.scss';

export default function ItemCard({item}:{item:TCartItem} ) {
  const dispatch = useDispatch();
  const { data: snsSession } = useSession()
  const firebaseUser = auth.currentUser 

  const isLoginUser = snsSession?.user?.name || firebaseUser?.uid

  const removeCartItem = () => {
    alert('해당 아이템을 삭제하시겠습니까?');
    if (isLoginUser) {
      dispatch(userRemoveItem({item, user:isLoginUser}));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div className='cart__items__card'>
      <div className='cart__items__card__imgWrap'>
        <Image src={item.image} alt='' 
        fill
        sizes="100vw"
        style={{
          objectFit:'contain',
        }}
        />
      </div>
      <p>{item.name}</p>
      <p>{item.color}</p>
      <p>{item.price}</p>
      <p>{item.quantity}</p>
      <button type='button' onClick={removeCartItem} className='cart__items__card__deleteBtn'><RiDeleteBin6Line/></button>
    </div>
  )
}
