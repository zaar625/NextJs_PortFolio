'use client'

import React, {useEffect, useState} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";
import {app} from '@/lib/firebaseConfig';
import { DocumentData } from 'firebase/firestore';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import './purchase.scss';

export default function Purchase() {
  const searchParams = useSearchParams();
  const searchId = searchParams.get('id');
  const searchColor = searchParams.get('color');
  const searchQuantity= searchParams.get('quantity');

  const [product, setProduct] = useState<DocumentData[]>()

// 아이템 정보 가져오기
  async function getItemInfo() {
      const params = decodeURIComponent(searchId as string)

      const db = getFirestore(app);
      const docRef = collection(db, "products");
      const q = query(docRef, where('name', '==',`${params}`));
      const querySnapshot = (await getDocs(q)).docs;
      const product = querySnapshot.map((item) => item.data());

      setProduct(product);
  }

  useEffect(()=>{
    getItemInfo();
  },[])

  //토스 결제하기
  const tosspaymentHandler = async () => {
    const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string);

    if(product){
      await tossPayments.requestPayment("카드",{
        amount:product[0].price * Number(searchQuantity),
        orderId:Math.random().toString(36).slice(2),
        orderName:product[0].name,
        successUrl:`${window.location.origin}/toss/success`,
        failUrl:`${window.location.origin}/api/payment/fail`
      })
    }
  }
    
  
  return (
    <div className='purchase'>
      <p>수량:{searchQuantity}</p>
      <p>이름:{searchId}</p>
      <p>컬러:{searchColor}</p>
      {
        product && <p>결제금액:{product[0].price * Number(searchQuantity)}</p>
      }
      <br/>
      <button onClick={tosspaymentHandler}>구매하기</button>
    </div>
  )
}
