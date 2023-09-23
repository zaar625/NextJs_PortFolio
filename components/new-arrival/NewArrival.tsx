import './new-arrival.scss'

import React from 'react'
import BaseButton from '../buttons/BaseButton'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '../product/ProductCard'
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";
import {app} from '../../lib/firebaseConfig'

import newItemImg1 from '../../public/images/new-main1.jpg';
import newItemImg2 from '../../public/images/new-main2.jpg';

export default async function NewArrival() {
  const db = getFirestore(app);
  const docRef = collection(db, "products");
  const q = query(docRef, where('ver', '==', 'new'))
  

const querySnapshot = (await getDocs(q)).docs;
const products = querySnapshot.map((item) => item.data());

const data = products.slice(0,5);
  return (
    <section className='new-arrival mb-4 container'>
      <div className='new-arrival__title'>
          <h1>New Arrival</h1>
          <Link href={'/'}>
              <BaseButton>View more</BaseButton>
          </Link>
      </div>
      <div className='new-arrival__image-box'>
          <Image src={newItemImg1} alt='신규 상품' sizes='50vw'/>
          <Image src={newItemImg2} alt='신규 상품' sizes='50vw'/>
      </div>
      <div className='new-arrival__des-box'>
        <h1>CHANGING THE <span>IDEAL</span> OF BEAUTY</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five </p>
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
