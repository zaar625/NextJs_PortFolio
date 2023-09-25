'use client'

import React, {useEffect, useState} from 'react'
import { collection,query,where,getDocs,DocumentData,deleteDoc,doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useSession } from 'next-auth/react';
import {auth} from '@/lib/firebaseConfig'
import '../mypage.scss';
import Link from 'next/link';

export default function MyReview() {
    const [reviewData, setReviewData] = useState<DocumentData[]>()
    const { data: snsSession } = useSession();
    const user = auth.currentUser?.uid || snsSession?.user?.name;
    console.log(user)

    async function getMyReview(){
      const docRef = collection(db, "review");
      const q = query(docRef, where('author', '==',`${user}`));
      const querySnapshot = (await getDocs(q)).docs;
      const reviews = querySnapshot.map((item) => item.data());

      setReviewData(reviews);
    };

    useEffect(() => {
      if(user){
        getMyReview();
      }
    },[user])

   async function deletReview(refId:string) {
      if (!confirm("게시물을 삭세하시겠습니까?")) {
          return;
      } else {
        await deleteDoc(doc(db, "review",refId)).then(()=> alert('해당 리뷰 게시물이 삭제되었습니다.'));
        getMyReview();
      }
    }
  
  return (
    <div className='myReview'>
      <h1 className='mb-1'>작성한 글</h1>
      {
        reviewData?.length ? reviewData.map((reviewItem, index) => (
          <div key={index} className='myReview__card '>
            <div className='myReview__card__product'>
              <p>상품: {reviewItem.product}</p>
              <p>제목: {reviewItem.title}</p>
            </div>
            <div className='myReview__card__btnWrap'>
              <button onClick={() => deletReview(reviewItem.id)}>삭제</button>
              <Link href={{
                  pathname:'/mypage/editReview',
                  query:{
                    id:reviewItem.id, //문서 아이디
                    content:reviewItem.content,
                    title:reviewItem.title,
                    class:reviewItem.class,
                  }
              }}>수정</Link>
            </div>
          </div>
        ))
        :
        <div className='purchase__empty'>
          <p>작성한 리뷰가 없습니다.</p>
        </div>
      }
    </div>
  )
}
