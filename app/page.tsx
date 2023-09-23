import './globals.scss';
import { Metadata } from 'next';
import HeroSlide from '@/components/hero-slide/HeroSlide';
import NewArrival from '@/components/new-arrival/NewArrival';
import Season from '@/components/season/Season';
import Trend from '@/components/trend/Trend';
  

export const metadata: Metadata = {
  title: 'BABAN',
  openGraph: {
    title: 'BABAN',
    description: '가방의 모든 것, BABAN에서 트렌디하게',
  },
  description: '가방의 모든 것, BABAN에서 트렌디하게',
  authors:[{ name: 'BABAN' }],
  colorScheme:'dark light',
  viewport:{
    width:'device-width',
    userScalable:false,
    initialScale:1,
    maximumScale:1,
    minimumScale:1,
    viewportFit:'cover'
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
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
