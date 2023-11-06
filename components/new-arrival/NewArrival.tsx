import './new-arrival.scss';

import React from 'react';
import ProductCard from '../product/ProductCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import NewArrivalTitle from './NewArrivalTitle';
import NewArrivalHighLight from './NewArrivalHighLight';
import NewProductList from './NewProductList';

export interface IProduct {
  class: string;
  color: string[];
  image: string;
  imageDetail: string[];
  name: string;
  price: number;
  stock: number;
  ver: string;
  size: 's' | 'm'[];
}

export default async function NewArrival() {
  const docRef = collection(db, 'products');
  const q = query(docRef, where('ver', '==', 'new'));

  const querySnapshot = (await getDocs(q)).docs;
  const products: IProduct[] = querySnapshot.map(item => item.data() as IProduct);

  const data = products.slice(0, 5);

  return (
    <section className="new-arrival mb-4 container">
      {/* 타이틀 */}
      <NewArrivalTitle />
      {/* 대표*/}
      <NewArrivalHighLight />
      {/* 상품들 */}
      <NewProductList productList={data} />
    </section>
  );
}
