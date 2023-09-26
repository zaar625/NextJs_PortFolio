import React from 'react'
import './product-detail.scss';
import ProductSlide from './components/ProductSlide';
import { collection ,query, where, getDocs} from "firebase/firestore";
import { db } from '../../../lib/firebaseConfig';
import ProductDesc from './components/ProductDesc';
import Review from './components/ReviewCard';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata ({params, searchParams}:any, parent:ResolvingMetadata):Promise<Metadata>{

  const productName = decodeURIComponent(params.detail);
  const docRef = collection(db, "products");
  const q = query(docRef, where('name', '==',`${productName}`));
  const querySnapshot = (await getDocs(q)).docs;
  const product = querySnapshot.map((item) => item.data());

  const previousImages = (await parent).openGraph?.images || []
  return {
    title:product[0].name,
    description:product[0].name,
    openGraph: {
      images: [product[0].image, ...previousImages],
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
}

export default async function ProductiDetailPage({params}:any) {
  const productName = decodeURIComponent(params.detail);

  const docRef = collection(db, "products");
  const q = query(docRef, where('name', '==',`${productName}`));
  const querySnapshot = (await getDocs(q)).docs;
  const product = querySnapshot.map((item) => item.data());
  

  return (
  <section className="container section">
    {/* 상품 정보 */}
    <figure className='productDetail mb-4'>
      <figcaption className='productDetail__info'>
        <div className="productDetail__info__container">
          <p>소재, 세탁 방법 및 원산지</p>
          <p>JOIN LIFE</p>
          <p>Care for filber: 30% 이상 재생 폴리에스터 사용</p>
          <p>
            환경에 미치는 영향을 줄일 수 있는 기법과 원자재를 이용하여
            제조되는 제품에 Join Lite라는 이름의 태그를 부착합니다.
          </p>
        </div>
      </figcaption>
      <ProductSlide product={product}/>
      <ProductDesc product={product}/>
    </figure>
  
    <Review productInfo={product[0]}/>
  </section>
  )
}
