'use client'

import React from 'react';
import './mypage.scss';
import Mypurchase from './components/Mypurchase';
import MyReview from './components/MyReview';
import { useSession } from 'next-auth/react';
import {auth} from '@/lib/firebaseConfig';

export default function Mypage() {
  const { data: snsSession } = useSession();
  const user = auth.currentUser?.uid || snsSession?.user?.name;

  return (
    <div className='mypage'>
        <Mypurchase user={user ? user : null}/>
        <MyReview user={user ? user : null}/>
    </div>
  )
}
