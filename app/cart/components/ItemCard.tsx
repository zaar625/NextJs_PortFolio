'use client'

import React, { useEffect,useState } from 'react';
import { TCartItem } from '../page';
import Image from 'next/image';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { removeItem } from '@/redux/slice/cartItem';
import { useSession } from 'next-auth/react';
import {auth} from '@/lib/firebaseConfig'
import { useDispatch } from 'react-redux';
import numberWithCommas from '@/utils/numberWithCommas';
import { collection ,query,where,getDocs} from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import '../cart.scss';

type TProps = {
  item:TCartItem,
  userRemoveCartItem:(currItem:TCartItem) => void
}

export default function ItemCard({item,userRemoveCartItem}:TProps) {
  const dispatch = useDispatch();
  const [isPurchase, setIsPurchase] = useState(true)
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
    if (!confirm("해당 아이템을 삭세하시겠습니까?")) {
      return;
    } else {
      removeCartItem();
    }
  };

  // 구매가능 여부
  const isPurchaseItem = async() => {
    // 해당 아이템 스탁 재고 파악
    const docRef = collection(db, "products");
    const q = query(docRef, where('name', '==',`${item.name}`));
    const querySnapshot = (await getDocs(q)).docs;
    const product = querySnapshot.map((item) => item.data());
    
    if(product[0].stock > item.quantity) {
      setIsPurchase(true);
    }else {
      setIsPurchase(false);
    }
  }

  useEffect(()=>{
    isPurchaseItem();
  },[])

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
          {!isPurchase && <p className='cart__items__nonPurchase'>품절</p>}
      </div>
      <p className='bold'>{item.name}</p>
      <p>{item.color}</p>
      <p>{numberWithCommas(String(item.price))}원</p>
      <p>수량: {item.quantity}</p>
      <button type='button' onClick={onDeletBtn} className='cart__items__card__deleteBtn'><RiDeleteBin6Line/></button>
      
    </div>
  )
}
