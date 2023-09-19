import React from 'react'
import './success.scss';
import Link from 'next/link';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/lib/firebaseConfig';
import format from 'date-fns/format';

type TSearchParams = {
    orderId:string;
    paymentKey: string ;
    amount: string;
    user:string;
}

async function confirmTosspayments(query:TSearchParams) {
    const {orderId, paymentKey, amount} = query;
    const secretKey = process.env.TOSS_CLIENT_SECRET;
    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const basicToken = Buffer.from(`${secretKey}:`,'utf-8').toString('base64');

    try {
        const data = await fetch(url, {
            method:'post',
            body:JSON.stringify({amount,orderId,paymentKey}),
            headers:{
                Authorization:`Basic ${basicToken}`,
                "Content-Type" : "application/json"
            }
        })
        return data.json();
    } catch(err) {
        console.error("err", err);
    }
}

async function savePurchaseItemDB(payment:any, userId: string) {
    const {method, orderId, orderName, totalAmount, approvedAt} = payment;

    const filedValue = {
        userId,
        orderId,
        orderName,
        totalAmount,
        approvedAt,
        method
    };

    try{
        await setDoc(doc(db, "purchases", payment.orderId),filedValue);
    } catch(err) {
        console.error("구매내역이 DB에 저장되지 않았습니다.", err);
    }
}

export default async function SuccessPage({searchParams}:{searchParams:TSearchParams}) {
    const payment = await confirmTosspayments(searchParams);
    savePurchaseItemDB(payment,searchParams.user);

  return (
    <div className='success'>
        <h1>결제가 완료되었습니다.</h1>
        <p>주문: {payment.orderName}</p>
        <p>결제 수단: {payment.method}</p>
        <p>결제 금액: {payment.totalAmount.toLocaleString()}원</p>
        <p>
            결제 일시: {format(new Date(payment.approvedAt), "yyyy/MM/dd HH:mm:ss")}
        </p>
        <Link href={'/'}>내 구매내역 보러가기</Link>
    </div>
  )
}
