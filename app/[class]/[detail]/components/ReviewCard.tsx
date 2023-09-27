'use client'

import React,{useEffect, useState} from 'react'
import { collection, query, where, getDocs, limit, DocumentData, startAt,orderBy } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import Image from 'next/image';
import format from 'date-fns/format';
import '@/app/review/[orderId]/review.scss'

export default  function Review({productInfo}:{productInfo:any}) {
  const [reviews, setReview] = useState<DocumentData[]>();
  const [currentPage, setCurrentPage] = useState(1);

  async function getReviewData() {
    const reviewsPerPage = 2;
    const offset = (currentPage - 1) * reviewsPerPage;
    const queryParams = query(collection(db, "review"), where("product", "==", productInfo.name),orderBy('date','desc'),limit(reviewsPerPage),startAt('2'));
    const querySnapshot = (await getDocs(queryParams)).docs;
  
    const res = querySnapshot.map((doc) => doc.data())
    setReview(res)
    
  }

useEffect(()=>{
  getReviewData();
},[currentPage])

  return (
    <div className='review-card'>
      {
        reviews?.map((item, index) => <ReviewItem key={index} reviewData={item} productInfo={productInfo}/>)
      }
    </div>
  )
}

function ReviewItem({reviewData,productInfo}:any) {
  
  return (
    <div className='review-card__item mb-2'>
      {/* 헤더 */}
      <div className='review-card__item__header-container mb-1'>
        <p>작성자 : {reviewData.author}</p>
        <p>{format(reviewData.date.toDate(),'yyyy.MM.dd')}</p>
      </div>
      {/* 상품 정보 */}
      <div className='review-card__item__product-info mb-2'>
        <div className='review-card__item__product-info__imageWrap'>
          <Image src={productInfo.image} alt='상품 이미지' width={100} height={150} />
        </div>
        <div className='review-card__item__product-info__infoWrap'>
          <p>{productInfo.class}</p>
          <p>상품명 : {productInfo.name}</p>
          <p>상품 가격 : {productInfo.price.toLocaleString()}원</p>
        </div>
      </div>
      {/* 내용 */}
      <div className='review-card__item__contents mb-1'>
        <p>제목: {reviewData.title}</p>
        <p>내용:</p>
        <p>{reviewData.content}</p>
      </div>
      {/* 이미지 */}
      <ul className='review-card__item__userImage'>
        {reviewData.images && reviewData.images.map((image:string ,index:number)=>
          <li key={index}>
            <Image src={image} alt='나의 사진' fill style={{objectFit:'contain'}} sizes='100vw'/>
          </li>
        )}
      </ul>
    </div>
  )
}