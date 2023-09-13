'use client';

import React,{useState} from 'react'
import Link from 'next/link';
import {AiOutlineMinusSquare,AiOutlinePlusSquare} from 'react-icons/ai'
import BaseButton from '@/components/buttons/BaseButton';
import { getAuth } from 'firebase/auth';
import { useSession } from "next-auth/react"
import {app} from '@/lib/firebaseConfig'
import { useRouter } from 'next/navigation'


export default function ProductDesc({product}:any) {
  const auth = getAuth(app);
  const { data: snsSession } = useSession();
  const router = useRouter();

  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1); //수량
  const updateQuantity = (type: string) => {
      if (type === 'plus') {
        setQuantity(quantity + 1);
      } else {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
      }
  };
  const isLoginUser = auth.currentUser || snsSession;

  const nonUserBtnClickHandler = () => {
    if(!isLoginUser) {
      alert('로그인을 해주세요')
      router.replace('/login');

      return;
    }

    if(!color) alert('색상을 선택해주세요.');
  }

  return (
  <div className='productDetail__des'>
      <div className="productDetail__des__container">
            <h1>{product[0].name}</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s,
            </p>
            <p>색상을 선택해 주세요.</p>
            <div className="productDetail__des__container__color">
              {product[0].color.map((e:string, i:number) => (
                <button
                  tabIndex={0}
                  key={i}
                  className={`color ${color === e ? 'color_active' : ''}`}
                  onClick={() => setColor(e)}
                >
                  <div
                    className="circle"
                    style={{ backgroundColor: `${e}` }}
                  ></div>
                  <div>{e}</div>
                </button>
              ))}
            </div>
            <div className="productDetail__des__quan">
                  <AiOutlineMinusSquare onClick={() => updateQuantity('minus')} />
                  <div>{quantity}</div>
                  <AiOutlinePlusSquare onClick={() => updateQuantity('plus')} />
            </div>
            <div className="productDetail__des__btns">
              <BaseButton onClick={() =>console.log('카트에 담겼습니다.')}>Cart</BaseButton>
              {
                isLoginUser && color.length ? (
                  <BaseButton>
                    <Link href={{
                    pathname:'/purchase',
                    query:{id:product[0].name, color,quantity}
                    }}>구매하기</Link>
                  </BaseButton>    
                ) : (
                  <BaseButton onClick={nonUserBtnClickHandler}>구매하기</BaseButton>
                )
              }           
            </div>
          </div>
  </div>
  )
}
