import React from 'react';
import numberWithCommas from '@/utils/numberWithCommas';

export default function ProductInfo({ data }: any) {
  return (
    <div className="product-card__hover">
      <p className="product-card__hover__title">{data.name}</p>
      <div className="product-card__hover__color">
        {data.color.map((color: string, index: number) => (
          <div key={index} style={{ backgroundColor: `${color}` }}></div>
        ))}
      </div>
      <span>{numberWithCommas(`${data.price}`)}</span>
    </div>
  );
}
