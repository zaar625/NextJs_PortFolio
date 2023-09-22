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
import numberWithCommas from '@/util/numberWithCommas';
import '../cart.scss';

type TProps = {
  item:TCartItem,
  userRemoveCartItem:(currItem:TCartItem) => void
}

export default function ItemCard({item,userRemoveCartItem}:TProps) {
  const dispatch = useDispatch();
  const { data: snsSession } = useSession()
  const firebaseUser = auth.currentUser 

  const isLoginUser = snsSession?.user?.name || firebaseUser?.uid;

  const removeCartItem = () => {
    if (isLoginUser) {
      userRemoveCartItem(item);
    } else {
      dispatch(removeItem(item));
    }
  }

  const onDeletBtn = () => {

    if (!confirm("게시물을 삭세하시겠습니까?")) {
      return;
    } else {
      removeCartItem();
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
      <p className='bold'>{item.name}</p>
      <p>{item.color}</p>
      <p>{numberWithCommas(String(item.price))}원</p>
      <p>수량: {item.quantity}</p>
      <button type='button' onClick={onDeletBtn} className='cart__items__card__deleteBtn'><RiDeleteBin6Line/></button>
    </div>
  )
}
