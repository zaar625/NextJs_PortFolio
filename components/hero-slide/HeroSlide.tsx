'use client'

import React,{useEffect, useState} from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { heroSlideData } from '@/constant/heroData';
import {AiOutlinePause} from 'react-icons/ai'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import {FiPlay} from 'react-icons/fi'
import './hero-slide.scss';
import 'swiper/css';



export default function HeroSlide() {
  const [slidePlayer, setSlidePlayer] = useState(true);

  return (
    <section className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000,disableOnInteraction:false }}
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
       <SwiperButton/>
      </Swiper>
    </section>
  )
}

function SwiperButton() {
  const [autoPlay, setAutoPlay] = useState(true);
  const swiper = useSwiper();

  const autoPlayActive = () => {
    if(autoPlay) {
      setAutoPlay(false);
      swiper.autoplay.pause();
    }else {
      setAutoPlay(true);
      swiper.autoplay.resume();
    }
  }
  return (
    <div className='slide-player'>
        <button className='slide-player__button' onClick={()=>swiper.slidePrev()}>
          <GrFormPrevious/>
        </button>
        <p className='slide-player__page'>0/3</p>
        <button className='slide-player__button'  onClick={()=>swiper.slideNext()}>
          <GrFormNext/> 
        </button>
        <button className='slide-player__autoPlay' onClick={autoPlayActive}>
          {
            autoPlay ? <AiOutlinePause/> : <FiPlay />
          }
        </button>
       </div>
  )
}

