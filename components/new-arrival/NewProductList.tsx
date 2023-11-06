'use client';

import React from 'react';
import ProductCard from '../product/ProductCard';
import { IProduct } from './NewArrival';

export default function NewProductList({ productList }: { productList: IProduct[] }) {
  return (
    <div className="products-container">
      {productList.map((product: IProduct, index: number) => (
        <ProductCard data={product} key={index}>
          <ProductCard.ProductImg image={product.image} />
          <ProductCard.ProductInfo data={product} />
        </ProductCard>
      ))}
    </div>
  );
}
