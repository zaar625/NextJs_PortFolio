import React from 'react';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import numberWithCommas from '@/util/numberWithCommas';
import '../purchase.scss';

type TProps = {
    productInfo:DocumentData[] | undefined,
    selectedItemInfo:TSelectedItemInfo
}

export type TSelectedItemInfo = {
    searchColor:string | null;
    searchQuantity:string | null;
    searchId:string | null;
}

export default function ProductInfo({productInfo,searchParams }:any) {

  const cartItemLength = searchParams.itemNum;
  return (
    <div className='purchase__productInfo mb-2'>
        {productInfo && 
           <>
            <h1 className='mb-2'>상품 정보</h1>
            <div className='purchase__productInfo__infoWrap mb-2'>
                <Image  src={productInfo[0].imageDetail[0]} alt='상품 이미지'
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={200}
                height={200}
                />
                <div className='purchase__productInfo__infoWrap__info'>
                  <p><strong>상품명</strong>: {cartItemLength > 2 ? `${searchParams.id} 외 ${cartItemLength-1}` :searchParams.id }</p>
                  <p><strong>색상</strong>: {searchParams.color}</p>
                  <p><strong>수량</strong>: {searchParams.quantity}</p>
                  <p><strong>가격</strong>: {numberWithCommas(searchParams.totalPrice)}원</p>
                </div>
            </div>
            <p>총 결제 금액은 {numberWithCommas(searchParams.totalPrice)}원 입니다.</p>
           </>
        }
        
    </div>
  )
}
