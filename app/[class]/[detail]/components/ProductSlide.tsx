'use client';

import React,{useState} from 'react'
import { Swiper, SwiperSlide,  } from 'swiper/react';
import { Navigation,Thumbs } from 'swiper/modules';
import '../product-detail.scss';
import Image from 'next/image';
import 'swiper/css';


export default function ProductSlide({product}:any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  
  return (
    <div className='productDetail__imageBox'>
        <Swiper
        loop={false}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{swiper:thumbsSwiper}}
        className='productDetail__imageBox__slider'
      >
        {product[0].imageDetail.map((item:any, index:any) => (
            <SwiperSlide key={index}>
                <Image src={item} alt="product images" 
                width={450}
                height={450}
                
                />
            </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
            modules={[Navigation, Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            loop={false}
            spaceBetween={10}
            slidesPerView={4}
            className="product-images-slider-thumbs"
        >
            {product[0].imageDetail.map((item:any, index:any) => (
                <SwiperSlide key={index}>
                    <div className="product-images-slider-thumbs-wrapper">
                        <img src={item} alt="product images" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}
