'use client'

import React, { useState, useRef, FocusEvent } from 'react';
import { storage } from '@/lib/firebaseConfig';
import {ref ,getDownloadURL,uploadBytes} from "firebase/storage";
import {AiOutlineClose} from 'react-icons/ai'
import { useSession } from 'next-auth/react';
import {auth} from '@/lib/firebaseConfig'
import { db } from '@/lib/firebaseConfig';
import { doc, addDoc, collection} from "firebase/firestore"; 

import './review.scss';
import { update } from 'firebase/database';

export default function ProductReviewPage() {
  const [images, setImages] = useState<FileList[]>([]);
  const { data: snsSession } = useSession();
  const user = auth.currentUser?.uid || snsSession?.user?.name;
  const [formInput, setFormInput] = useState({
    title:'',
    content:''
  })

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지가 선택될 때 호출될 함수
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files as FileList; // 선택된 파일 목록을 가져옵니다.
  setImages([...images,files])

  }

  const openSelectFileWindow = () => {
    imageInputRef.current?.click();
  }


  const reviewUpLoad = async() => {
    
    if(!formInput.title) return alert('제목을 입력해주세요.');

    if(!formInput.content) return alert('내용을 입력해주세요.');
    
    const photosURLs: string[] = [];
    await Promise.all(
      images.map(async (image, index) => {
        const storageRef =  ref(storage,`review/${image[0].name}`);
        await uploadBytes(storageRef, image[0]).then((snapshot) => {
          
        });
        const url = await getDownloadURL(ref(storage,`review/${image[0].name}`))
        console.log(url)

        photosURLs.push(url);
      })
    );

    if(user) {
      const reviewData = {
        date:new Date(),
        images:photosURLs,
        tilte: formInput.title,
        content:formInput.content
      }
      await addDoc(collection(db, "review"),reviewData).then(()=> alert('리뷰 작성이 완료되었습니다.'));
    }
    
   
  }


  const removeFile = (removeIndex:number) => {
    const newImageList = images.filter((_,index) => index !== removeIndex );
    setImages(newImageList)
  }

  const onInputBlurEvent = (e:FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>, type:string) => {
    const value = e.target.value;
    setFormInput({...formInput,[type]:value})
  }

  return (
    <div className='review'>
      <form className='review__form'>
        <div className='review__form__container'>
          <label className='review__form__label mb-1' htmlFor='title'>제목</label>
          <input className='review__form__input mb-1' placeholder='제목을 입력해주세요.' onBlur={(e)=> onInputBlurEvent(e,'title')} name='title'/>
        </div>

        <div className='review__form__container'>
          <label className='review__form__label mb-1' >내용</label>
          <textarea className='review__form__textArea mb-1' placeholder='내용을 입력해주세요.' rows={4} cols={50} onBlur={(e)=> onInputBlurEvent(e,'content')}/>
        </div>

        <div className='mb-1'>
          <input ref={imageInputRef} placeholder='사진을 첨부해주세요' type='file' name='file'multiple onChange={handleImageChange} style={{display:'none'}}/>
          <button className='upload-btn' type='button' onClick={openSelectFileWindow} >파일찾기</button>
        </div>
      </form>

      <ul className='review__upload-list mb-2'>
        {images?.map((filename:FileList, index:number) => (
          <li className='review__upload-list__listWrap' key={index}>
            <button type='button' onClick={()=>removeFile(index)}>
              <AiOutlineClose/>
            </button>
            <p>{filename[0].name}</p>
          </li>
        ))}
      </ul>

      <button className='review__uploadBtn' type='button' onClick={reviewUpLoad}>업로드하기</button>
    </div>
  )
}
