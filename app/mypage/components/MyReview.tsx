'use client'

import React, {useEffect, useState} from 'react'
import { collection,query,where,getDocs,DocumentData,deleteDoc,doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

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

      // console.log('reviewData',reviewData)
  return (
    <div>
        {
           reviewData && reviewData.map((reviewItem, index) => (
            <>
                <div key={index}>{reviewItem.title}</div>
                <button onClick={() => deletReview(reviewItem.id)}>삭세</button>
                <br/>
                <button>수정</button>
            </>
           )) 
        }
    </div>
  )
}
