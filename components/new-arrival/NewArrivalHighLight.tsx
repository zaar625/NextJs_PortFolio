import React from 'react';
import Image from 'next/image';
import newItemImg1 from '../../public/images/new-main1.jpg';
import newItemImg2 from '../../public/images/new-main2.jpg';

export default function NewArrivalHighLight() {
  return (
    <>
      <div className="new-arrival__image-box">
        <Image src={newItemImg1} alt="신규 상품" sizes="50vw" />
        <Image src={newItemImg2} alt="신규 상품" sizes="50vw" />
      </div>
      <div className="new-arrival__des-box">
        <h1>
          CHANGING THE <span>IDEAL</span> OF BEAUTY
        </h1>
        <p data-testid="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five{' '}
        </p>
      </div>
    </>
  );
}
