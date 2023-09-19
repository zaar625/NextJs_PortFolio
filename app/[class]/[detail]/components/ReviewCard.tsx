import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import Image from 'next/image';
import format from 'date-fns/format';
import '../review/review.scss';

async function getReviewData(q:string) {
  const queryParams = query(collection(db, "review"), where("product", "==", q));
  const querySnapshot = (await getDocs(queryParams)).docs;

  return querySnapshot.map((doc) => doc.data())
}

export default async function Review({productName,productInfo}:{productName:string,productInfo:any}) {
  const data = await getReviewData(productName)

  // console.log(data)
  return (
    <div className='review-card'>
      {
        data.map((item) => <ReviewItem reviewData={item} productInfo={productInfo}/>)
      }
      
    </div>
  )
}

function ReviewItem({reviewData,productInfo}:any) {
  console.log(reviewData)
  
  return (
    <div className='review-card__item'>
      {/* 헤더 */}
      <div className='review-card__item__header-container'>
        <p>{reviewData.author}</p>
        <p>{format(reviewData.date.toDate(),'yyyy.MM.dd')}</p>
      </div>
      {/* 상품 정보 */}
      <div className='review-card__item__product-info'>
        <div className='review-card__item__product-info__imageWrap'>
          <Image src={productInfo.image} alt='상품 이미지' width={100} height={150} />
        </div>
        <div className='review-card__item__product-info__infoWrap'>
          <p>{productInfo.class}</p>
          <p>{productInfo.name}</p>
          <p>{productInfo.price}</p>
        </div>
      </div>
      {/* 내용 */}
      <p>{reviewData.title}</p>
      <p>{reviewData.content}</p>
      {/* 이미지 */}
      <ul className='review-card__item__userImage'>
        {reviewData.images && reviewData.images.map((image:string)=>
          <li>
            <Image src={image} alt='나의 사진' fill style={{objectFit:'contain'}} sizes='100vw'/>
          </li>
        )}
      </ul>
    </div>
  )
}