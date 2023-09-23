'use client'

import React,{useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import numberWithCommas from '@/util/numberWithCommas';
import './product-card.scss';

export default function ProductCard({data}:any) {
  const [like, setlike] = useState(false);
  const [timer, setTimer] = useState(0); 

  // 좋아요 디바운스 클릭 이벤트입니다. _ 추후 추가 기능
  const likeOnClickEvent = (e:React.MouseEvent<HTMLButtonElement>) => {
    setlike(!like);
    
    if (timer) {
      clearTimeout(timer);
    }
    
    const newTimer = window.setTimeout(async () => {
      try {
      //데이터베이스 로직 추가
      } catch (e) {
        console.error('error', e);
      }
    }, 800);
    
    setTimer(newTimer);
  }

  return (
    <>
      <Link href={`/${data.class}/${data.name}`}>
        <div className='product-card'>
            <Image src={data.image} alt='' 
            width={190}
            height={290}
            />
            <div className="product-card__hover">
              <p className="product-card__hover__title">{data.name}</p>
              <div className="product-card__hover__color">
                {data.color.map((color:string, index:number) => (
                  <div key={index} style={{ backgroundColor: `${color}` }}></div>
                ))}
              </div>
              <span>{numberWithCommas(`${data.price}`)}</span>
            </div>
        </div>
        <p className='product-card__name'>{data.name}</p>
      </Link>
      {/* <button type='button' onClick={likeOnClickEvent}>
        <LikeIcon width={18} height={18} color={like ? '#FF2F54' : 'transparent'}/>
      </button> */}
    </>
  )
}