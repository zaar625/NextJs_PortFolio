'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import numberWithCommas from '@/utils/numberWithCommas';
import ProductInfo from './ProductInfo';
import ProductImg from './ProductImg';
import './product-card.scss';

export default function ProductCard({ data, children }: any) {
  const [like, setlike] = useState(false);
  const [timer, setTimer] = useState(0);

  // 좋아요 디바운스 클릭 이벤트입니다. _ 추후 추가 기능
  const likeOnClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    setlike(!like);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = window.setTimeout(async () => {
      try {
        //데이터베이스 로직 추가
      } catch (e) {
        console.error('error', e);
      }
    }, 800);

    setTimer(newTimer);
  };

  return (
    <>
      <Link href={`/${data.class}/${data.name}`}>
        <div className="product-card">{children}</div>
        <p className="product-card__name">{data.name}</p>
      </Link>
    </>
  );
}

ProductCard.ProductInfo = ProductInfo;
ProductCard.ProductImg = ProductImg;
