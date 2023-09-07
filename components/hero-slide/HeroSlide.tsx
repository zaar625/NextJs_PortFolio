'use client'

import React from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/react';

import { heroSlideData } from '@/constant/heroData';


import './hero-slide.scss';
import 'swiper/css';



export default function HeroSlide() {
  const swiper = useSwiper();
  console.log(swiper)
  return (
    <section className='hero-slide'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // grabCursor={true}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
       {heroSlideData.map((slide, index) => (
        <SwiperSlide key={index}>
          {({isActive}) => (
            <div className={`hero-slide__item ${
              isActive ? 'active' : ''
            }`} style={{backgroundImage:`url(${slide.originalimage})`}}>
                <div className="hero-slide__item__content container">
                  <div className="hero-slide__item__content__info">
                    <h2 className="title">{slide.title}</h2>
                    <p className="des">{slide.des}</p>
                    <div className="btns">
                      {/* <Link to="/products">
                        <Button className="null">View more</Button>
                      </Link> */}
                    </div>
                  </div>
                  <div className="hero-slide__item__content__poster">
                    <Image src={`/images/${slide.w500}`} alt={`${slide.title}`} width={400} height={400}/>
                  </div>
                </div>
             
               
            </div>
            

            
            )}
        </SwiperSlide>
       ))}
      </Swiper>
    </section>
  )
}

