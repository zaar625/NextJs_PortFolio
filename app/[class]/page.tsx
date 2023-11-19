'use client';

import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import ProductCard from '@/components/product/ProductCard';
import './class.scss';

async function getProductClass(q: string) {
  const queryParams = query(collection(db, 'products'), where('class', '==', q));
  const querySnapshot = (await getDocs(queryParams)).docs;

  return querySnapshot.map(doc => doc.data());
}

export default async function ProductClassPage({ params }: { params: { class: string } }) {
  const data = await getProductClass(params.class);

  return (
    <div className="product-class container">
      <h1 className="mb-2">{params.class}</h1>
      <div className="product-class__itemWrap">
        {data && data.length === 0 && <p>해당 카테고리에 등록된 상품이 없습니다.</p>}
        {data &&
          data.map((item, index) => (
            <ProductCard data={item} key={index}>
              <ProductCard.ProductImg image={item.image} />
              <ProductCard.ProductInfo data={item} />
            </ProductCard>
          ))}
      </div>
    </div>
  );
}
