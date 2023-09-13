import React from 'react'

export default async function Page({searchParams}:any) {
    const secretKey = process.env.TOSS_CLIENT_KEY;
    const basicToken = Buffer.from(`${secretKey}:`,'utf-8').toString("base64");

    const payments = await fetch(`https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`,
    {
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type":"application/json",
        }
    }).then(res => res.json());

    const {card} = payments;

  return (
    <div>
        <h1>결제가 완료되었습니다.</h1>
        <ul>
            <li>결제상품 {payments.orederName}</li>
            <li>주문번호 {payments.orderId}</li>
            <li>카드회사 {payments.company}</li>
            <li>카드번호 {card.number}</li>
            <li>결제 금액 {card.amount}</li>
            <li>승일 날짜 {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}</li>
        </ul>
    </div>
  )
}
