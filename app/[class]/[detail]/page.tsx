import React from 'react'
import './product-detail.scss';
import ProductSlide from './components/ProductSlide';
import { collection,getFirestore ,query, where, getDocs} from "firebase/firestore";
import {app} from '../../../lib/firebaseConfig'
import ProductDesc from './components/ProductDesc';
import Review from './components/ReviewCard';
import Link from 'next/link';

export default async function ProductiDetailPage({params}:{params:any}) {

  const productName = decodeURIComponent(params.detail);
  
  const db = getFirestore(app);
  const docRef = collection(db, "products");
  const q = query(docRef, where('name', '==',`${productName}`));
  const querySnapshot = (await getDocs(q)).docs;
  const product = querySnapshot.map((item) => item.data());
  
 
  return (
  <section className=" container section">
    <div className='productDetail'>
      <div className='productDetail__info'>
        <div className="productDetail__info__container">
          <p>소재, 세탁 방법 및 원산지</p>
          <p>JOIN LIFE</p>
          <p>Care for filber: 30% 이상 재생 폴리에스터 사용</p>
          <p>
            환경에 미치는 영향을 줄일 수 있는 기법과 원자재를 이용하여
            제조되는 제품에 Join Lite라는 이름의 태그를 부착합니다.
          </p>
        </div>
      </div>
      <ProductSlide product={product}/>
      <ProductDesc product={product}/>
    </div>
    <div>
      <Link href={`/${params.class}/${params.detail}/review`}>글 작성하기</Link>
      <Review productName={productName} productInfo={product[0]}/>
    </div>
  </section>
  )
}
