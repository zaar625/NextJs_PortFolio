'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/lib/firebaseConfig';
import { collection ,query, where, getDocs, DocumentData} from 'firebase/firestore';
import '../mypage.scss';
import format from 'date-fns/format';
import {auth} from '@/lib/firebaseConfig'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Mypurchase() {
  const [purchaseItem, setPurchaseItem] = useState<DocumentData[]>();
  const { data: snsSession } = useSession();
  const user = auth.currentUser?.uid || snsSession?.user?.name;

  async function getUserPurchaseItem(){
    
    const docRef = collection(db, "purchases");
    const q = query(docRef, where('userId', '==',`${user}`));
    const querySnapshot = (await getDocs(q)).docs;
    const purchases = querySnapshot.map((item) => item.data());

    setPurchaseItem(purchases);
  };

  useEffect(()=>{
    getUserPurchaseItem();
  },[user]);

  console.log(purchaseItem)
  return (
    <div className='purchase mb-2'>
      <h1 className='mb-1'>구매 내역</h1>
      {
        purchaseItem && purchaseItem.length > 0? purchaseItem.map((item, index) => (
          <div key={index}  className='purchase__card'>
            <div key={item.orderId}>
              <p>주문아이디: {item.orderId}</p>
              <p>상품명: {item.orderName}</p>
              <p>총 결제 금액: {item.totalAmount.toLocaleString()}원</p>
              <p>결제 일시: {format(new Date(item.approvedAt), "yyyy/MM/dd HH:mm:ss")}</p>
            </div>
             <div className='review__wirteBtn'>
              <Link href={`/review/${item.orderName}`}>리뷰 작성하기</Link>
            </div>
          </div>
        ))
        :
        <div className='purchase__empty'>
          <p>구매 내역이 없습니다.</p>
        </div>
      }
    </div>
  )
}
