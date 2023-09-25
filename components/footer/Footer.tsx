import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { BsInstagram } from 'react-icons/bs';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer container">
    <div className="footer__content">
      <Link href={'/'}>
        <h1>BABAN</h1>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        recusandae facilis omnis enim sint placeat!
      </p>
    </div>
    <div className="footer__content">
      <h1 className="footer__title">Our Address</h1>
      <ul className="footer__data">
        <li className="footer__information">1234 - 1234</li>
        <li className="footer__information">Seoul - 43210</li>
        <li className="footer__information">123-456-789</li>
      </ul>
    </div>
    <div className="footer__content">
      <h1 className="footer__title">Contact Us</h1>
      <ul className="footer__data">
        <li className="footer__information mb-1">+999 888 777</li>
        <li className="footer__social">
          <a
            href="https://www.facebook.com/"
            className="footer__social-link "
          >
            <p className="a11y-hidden">facebook</p>
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/"
            className="footer__social-link"
          >
            <p className="a11y-hidden">insta</p>
            <BsInstagram />
          </a>
          <a href="https://twitter.com/" className="footer__social-link">
            <p className="a11y-hidden">twitter</p>
            <RiTwitterXFill />
          </a>
        </li>
      </ul>
    </div>
    <div className="footer__content">
      <h1 className="footer__title">
        We accept all <br />
        credit cards
      </h1>
      <div className="footer__cards">
        <Image src={'/images/card1.webp'} width={30} height={20} alt='카드사'/>
        <Image src={'/images/card2.webp'} width={30} height={20} alt='카드사'/>
        <Image src={'/images/card3.webp'} width={30} height={20} alt='카드사'/>
        <Image src={'/images/card4.webp'} width={30} height={20} alt='카드사'/>
     
      </div>
    </div>
  </footer>
  )
}
