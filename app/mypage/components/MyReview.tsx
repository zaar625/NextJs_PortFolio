'use client'

import React, {useEffect, useState} from 'react'
import { collection,query,where,getDocs,DocumentData,deleteDoc,doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import Link from 'next/link';

export default function MyReview({user}:{user:string | null}) {
    const [reviewData, setReviewData] = useState<DocumentData[]>()

    async function getMyReview(){
      console.log('getMyReview',user)
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
          // 취소(아니오) 버튼 클릭 시 이벤트
          return;
      } else {
        await deleteDoc(doc(db, "review",refId)).then(()=> alert('해당 리뷰 게시물이 삭제되었습니다.'));
        getMyReview();
      }
    }
  
    console.log(reviewData)
  return (
    <div>
        {
           reviewData && reviewData.map((reviewItem, index) => (
            <div key={index}>
                <div>{reviewItem.title}</div>
                <button onClick={() => deletReview(reviewItem.id)}>삭제</button>
                <br/>
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
           )) 
        }
    </div>
  )
}
