import React from 'react'
import BaseButton from '../buttons/BaseButton';
import Link from 'next/link';
import ProductCard from '../product/ProductCard';
import {app} from '../../lib/firebaseConfig'
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";

export default async function Trend() {
    const db = getFirestore(app);
    const docRef = collection(db, "products");
    const q = query(docRef, where('ver', '==', 'trend'))
    
  
  const querySnapshot = (await getDocs(q)).docs;
  const products = querySnapshot.map((item) => item.data());
  
  const data = products.slice(0,5);

  return (
    <section className='new-arrival mb-4 container'>
        <div className='new-arrival__title'>
          <h1>Trend Item</h1>
          <Link href={'/'}>
              <BaseButton>View more</BaseButton>
          </Link>
      </div>
      <div className='products-container'>
        {
          data.map((product, index) => (
            <ProductCard data={product} key={index}/> 
          ))
        }
      </div>
    </section>
  )
}
