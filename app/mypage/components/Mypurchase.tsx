'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/lib/firebaseConfig';
import { collection ,query, where, getDocs, DocumentData} from 'firebase/firestore';
import '../mypage.scss';
import format from 'date-fns/format';
import Image from 'next/image';

export default function Mypurchase({user}:{user:string | null}) {
  const [purchaseItem, setPurchaseItem] = useState<DocumentData[]>();

  async function getUserPurchaseItem(){
    
    const docRef = collection(db, "purchases");
    const q = query(docRef, where('userId', '==',`${user}`));
    const querySnapshot = (await getDocs(q)).docs;
    const purchases = querySnapshot.map((item) => item.data());

    setPurchaseItem(purchases);
  };

  // console.log(purchaseItem);

  useEffect(()=>{
    getUserPurchaseItem();
  },[user]);

  return (
    <div className='purchase mb-2'>
      <h1>구매 내역</h1>
      {
        purchaseItem ? purchaseItem.map((item) => (
          <div key={item.orderId} className='purchase__card'>
            <p>주문아이디: {item.orderId}</p>
            <p>상품명: {item.orderName}</p>
            <p>총 결제 금액: {item.totalAmount}</p>
            <p>결제 일시: {format(new Date(item.approvedAt), "yyyy/MM/dd HH:mm:ss")}</p>
          </div>
        ))
        :
        <div>
          <p>구매 내역이 없습니다.</p>
        </div>
      }
    </div>
  )
}
