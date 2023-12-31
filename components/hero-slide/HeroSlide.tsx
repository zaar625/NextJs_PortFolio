'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { heroSlideData } from '@/constant/heroData';
import { AiOutlinePause } from 'react-icons/ai';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import BaseButton from '../buttons/BaseButton';
import { FiPlay } from 'react-icons/fi';

import './hero-slide.scss';
import 'swiper/css';

export default function HeroSlide() {
  const [pageNum, setPageNum] = useState(1);
  return (
    <section className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        onSlideChange={swipe => {
          setPageNum(swipe.activeIndex + 1);
        }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {heroSlideData.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`hero-slide__item ${isActive ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.originalimage})` }}
              >
                <div className="hero-slide__item__content container">
                  <div className="hero-slide__item__content__info">
                    <h2 className="title">{slide.title}</h2>
                    <p className="des">{slide.des}</p>
                    <div className="btns">
                      <Link href={'/'}>
                        <BaseButton className="null">View more</BaseButton>
                      </Link>
                    </div>
                  </div>
                  <div className="hero-slide__item__content__poster">
                    <Image
                      src={`/images/${slide.w500}`}
                      alt={`${slide.title}`}
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
        <SwiperButton pageNum={pageNum} />
      </Swiper>
    </section>
  );
}

function SwiperButton({ pageNum }: { pageNum: number }) {
  const [autoPlay, setAutoPlay] = useState(true);
  const swiper = useSwiper();

  const autoPlayActive = () => {
    if (autoPlay) {
      setAutoPlay(false);
      swiper.autoplay.pause();
    } else {
      setAutoPlay(true);
      swiper.autoplay.resume();
    }
  };
  return (
    <div className="slide-player">
      <button className="slide-player__button" aria-label="이전" onClick={() => swiper.slidePrev()}>
        <GrFormPrevious />
      </button>
      <p className="slide-player__page">{pageNum} / 3</p>
      <button className="slide-player__button" aria-label="다음" onClick={() => swiper.slideNext()}>
        <GrFormNext />
      </button>
      <button
        className="slide-player__autoPlay"
        aria-label={autoPlay ? '중지' : '재생'}
        onClick={autoPlayActive}
      >
        {autoPlay ? <AiOutlinePause /> : <FiPlay />}
      </button>
    </div>
  );
}
