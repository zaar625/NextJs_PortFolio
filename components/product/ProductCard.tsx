import './product-card.scss';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import numberWithCommas from '@/util/numberWithCommas';

export default function ProductCard({data}:any) {
  
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
    </>
  )
}