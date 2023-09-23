
import React from 'react';
import './mypage.scss';
import Mypurchase from './components/Mypurchase';
import MyReview from './components/MyReview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:'마이페이지',
}

export default function Mypage() {

  return (
    <div className='mypage'>
        <Mypurchase />
        <MyReview />
    </div>
  )
}
