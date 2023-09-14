import React from 'react';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
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

export default function ProductInfo({productInfo,selectedItemInfo}:TProps) {
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
                    <p><strong>상품명</strong>: {selectedItemInfo.searchId}</p>
                    <p><strong>색상</strong>: {selectedItemInfo.searchColor}</p>
                    <p><strong>수량</strong>: {selectedItemInfo.searchQuantity}</p>
                    <p><strong>가격</strong>: {productInfo[0].price}원</p>
                </div>
            </div>
            <p>총 결제 금액은 {Number(selectedItemInfo.searchQuantity) * productInfo[0].price}원 입니다.</p>
           </>
        }
        
    </div>
  )
}
