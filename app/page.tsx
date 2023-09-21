import './globals.scss';
import { Metadata } from 'next';
import HeroSlide from '@/components/hero-slide/HeroSlide';
import NewArrival from '@/components/new-arrival/NewArrival';
import Season from '@/components/season/Season';
import Trend from '@/components/trend/Trend';
  

export const metadata: Metadata = {
  title: 'BABAN',
  description: '가방의 모든 것, BABAN에서 트렌디하게',
}

export default function Home() {
  
  return (
    <>
      <HeroSlide/>
      <NewArrival/>
      <Season/>
      <Trend/>
    </>
  )
}
