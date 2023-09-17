'use client'

import React, { useState } from 'react';
import { storage } from '@/lib/firebaseConfig';
import {  ref ,getDownloadURL,uploadBytes} from "firebase/storage";
import './review.scss';

export default function ProductReviewPage() {
  const [images, setImages] = useState<FileList[]>([]);

  // 이미지가 선택될 때 호출될 함수
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 선택된 파일 목록을 가져옵니다.
    setImages([...images,files])
    
}

const reviewUpLoad = async() => {
  const photosURL: string[] = [];
  await Promise.all(
    images.map(async (image, index) => {
      const storageRef =  ref(storage,`review/${image[0].name}`);
      await uploadBytes(storageRef, image[0]).then((snapshot) => {
        
      });
      const url = await getDownloadURL(ref(storage,`review/${image[0].name}`))
      console.log(url)

      photosURL.push(url);
    })
  );


  
}

  return (
    <div className='review'>
      <input placeholder='제목'/>
      <input placeholder='내용'/>
      <input placeholder='사진을 첨부해주세요' type='file' multiple onChange={handleImageChange}/>
      <ul>
        {images?.map((filename:FileList, index:number) => <li key={index}>{filename[0].name}</li>)}
      </ul>
      <button type='button' onClick={reviewUpLoad}> 업로드</button>
    </div>
  )
}
