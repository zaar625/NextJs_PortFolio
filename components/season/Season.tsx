import React from 'react'
import BaseButton from '../buttons/BaseButton'
import './season.scss'
import Image from 'next/image'

export default function Season() {
  return (
    <section className="season">
        <div className="season__left"></div>
        <div className="season__right">
        <h1>changing the ideal of beauty</h1>
        <p>
            Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in
            Virginia, looked up one of the more obscure Latin words, consectetur,
            from a Lorem Ipsum passage.
        </p>
        <div className="season__productImage">
            <Image src={'/images/seasonImage2.webp'} alt='시즌 이미지' width={390} height={390}/>
            <p>
            Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old.
            </p>
        </div>
        <BaseButton className="small">See more</BaseButton>
        </div>
  </section>
  )
}
