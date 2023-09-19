import React from 'react'
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import ProductCard from '@/components/product/ProductCard';
import './class.scss';

async function getProductClass(q:string) {
  const queryParams = query(collection(db, "products"), where("class", "==", q));
  const querySnapshot = (await getDocs(queryParams)).docs;

  return querySnapshot.map((doc) => doc.data())
}

export default async function ProductClassPage({params}:{params:{class:string}}) {
  const data = await getProductClass(params.class);
  console.log(data);

  return (
    <div className='product-class container'>
      <h1 className='mb-2'>{params.class}</h1>
      <div className='product-class__itemWrap'>
        {data && data.map((item) => <ProductCard data={item}/>)}
      </div>
    </div>
  )
}
