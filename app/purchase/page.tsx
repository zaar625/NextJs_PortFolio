'use client'

import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";
import {app} from '@/lib/firebaseConfig';
import { DocumentData } from 'firebase/firestore';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import ProductInfo from './components/ProductInfo';
import BaseButton from '@/components/buttons/BaseButton';
import { useSession } from 'next-auth/react';
import { TInputValue } from './components/DeliveryFrom';
import {auth} from '@/lib/firebaseConfig'


import DeliveryFrom from './components/DeliveryFrom';
import './purchase.scss';

export default function PurchasePage() {
  const searchParams = useSearchParams();
  const searchId = searchParams.get('id');
  const searchColor = searchParams.get('color');
  const searchQuantity= searchParams.get('quantity');

  const { data: snsSession } = useSession();
  const user = auth.currentUser?.uid || snsSession?.user?.name;
  

  const [product, setProduct] = useState<DocumentData[]>();

  const [inputValues, setInputValues] = useState<TInputValue>({
    name:'',
    zonecode:'',
    address:'',
    detailAdress:''
  })

  function checkEmptyValues(v:TInputValue) {
    for (const key in inputValues) {
      if (inputValues.hasOwnProperty(key) && v[key] === '') {
        // 빈 값을 발견한 경우
        return true; // 빈 값이 하나라도 있으면 true를 반환
      }
    }
    return false; // 모든 값이 비어있지 않으면 false를 반환
  }

  const selectedItemInfo = {
    searchColor,
    searchQuantity,
    searchId,
  }

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
    const checkEmptyAddressInfo = checkEmptyValues(inputValues);

    if(checkEmptyAddressInfo) {
      alert('배송정보를 입력해주세요.');
      return;
    }

    if(product){
      await tossPayments.requestPayment("카드",{
        amount:product[0].price * Number(searchQuantity),
        orderId:Math.random().toString(36).slice(2),
        orderName:product[0].name,
        successUrl:`${window.location.origin}/purchase/success?user=${user}`,
        failUrl:`${window.location.origin}/api/payment/fail`
      })
    }
  }

  return (
    <div className='purchase mb-3'>
      <DeliveryFrom inputValues={inputValues} setInputValue={setInputValues}/>
      <ProductInfo productInfo={product} selectedItemInfo={selectedItemInfo}/>
      <BaseButton onClick={tosspaymentHandler}>결제하기</BaseButton>
    </div>
  )
}
