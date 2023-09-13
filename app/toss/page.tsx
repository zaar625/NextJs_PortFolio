'use client';

import React from 'react'
import {loadTossPayments} from '@tosspayments/payment-sdk'

export default function Toss() {

  const handleClick = async () => {
    console.log('click')
    const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string);

    await tossPayments.requestPayment("카드",{
      amount:5000,
      orderId:Math.random().toString(36).slice(2),
      orderName:"맥북",
      successUrl:`${window.location.origin}/toss/success`,
      failUrl:`${window.location.origin}/api/payment/fail`
    })
  }
  return (
    <div style={{paddingTop:16*9}}>
        <button onClick={handleClick}>맥북 5000원</button>
    </div>
  )
}
