import './globals.scss';
import HeroSlide from '@/components/hero-slide/HeroSlide';
import NewArrival from '@/components/new-arrival/NewArrival';
import Season from '@/components/season/Season';
import Trend from '@/components/trend/Trend';


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
