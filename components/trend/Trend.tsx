import React from 'react';
import BaseButton from '../buttons/BaseButton';
import Link from 'next/link';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import NewProductList from '../new-arrival/NewProductList';

export default async function Trend() {
  const docRef = collection(db, 'products');
  const q = query(docRef, where('ver', '==', 'trend'));

  const querySnapshot = (await getDocs(q)).docs;
  const products = querySnapshot.map(item => item.data());

  const data = products.slice(0, 5);

  return (
    <section className="new-arrival mb-4 container">
      <div className="new-arrival__title">
        <h1>Trend Item</h1>
        <Link href={'/'}>
          <BaseButton>View more</BaseButton>
        </Link>
      </div>
      <div className="products-container">
        <NewProductList productList={data} />
      </div>
    </section>
  );
}
