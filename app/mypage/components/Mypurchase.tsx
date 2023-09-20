'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/lib/firebaseConfig';
import { collection ,query, where, getDocs, DocumentData} from 'firebase/firestore';

export default function Mypurchase({user}:{user:string | null}) {
  const [purchaseItem, setPurchaseItem] = useState<DocumentData[]>();

  async function getUserPurchaseItem(){
    
    const docRef = collection(db, "purchases");
    const q = query(docRef, where('userId', '==',`${user}`));
    const querySnapshot = (await getDocs(q)).docs;
    const purchases = querySnapshot.map((item) => item.data());

    setPurchaseItem(purchases);
  };

  // console.log(purchaseItem)
  useEffect(()=>{
    getUserPurchaseItem();
  },[])
  return (
    <div>Mypurchase</div>
  )
}
