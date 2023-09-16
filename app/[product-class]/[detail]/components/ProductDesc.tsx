'use client';

import React,{useState, useCallback} from 'react'
import Link from 'next/link';
import {AiOutlineMinusSquare,AiOutlinePlusSquare} from 'react-icons/ai'
import BaseButton from '@/components/buttons/BaseButton';
import { getAuth } from 'firebase/auth';
import { useSession } from "next-auth/react"
import {app} from '@/lib/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slice/cartItem';
import { userAddItem } from '@/redux/slice/userCartItem';
import { db } from '@/lib/firebaseConfig';
import { doc, setDoc,getFirestore  } from 'firebase/firestore';



export default function ProductDesc({product}:any) {
  const auth = getAuth(app);
  const router = useRouter();
  const { data: snsSession } = useSession();
  const isLoginUser = auth.currentUser?.uid || snsSession?.user?.name;
  const dispatch = useDispatch();


  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1); //수량

  const updateQuantity = (type: string) => {
      if (type === 'plus') {
        setQuantity(quantity + 1);
      } else {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
      }
  };
  

  const nonUserBtnClickHandler = () => {
    if(!isLoginUser) {
      alert('로그인을 해주세요')
      router.replace('/login');

      return;
    }

    if(!color) alert('색상을 선택해주세요.');
  }

  const filterItemHanlder = (newItem:) => {

  }

  const addToCart = useCallback(async () => {
    if (color !== '') {
      const newItem = {
        name: product[0].name,
        color: color,
        price: product[0].price,
        image: product[0].image,
        quantity: quantity,
      };

      if (isLoginUser) {
        await setDoc(doc(db, "user", isLoginUser),{cart});
        // dispatch(userAddItem({newItem,user:isLoginUser}));
        alert('장바구니에 담겼습니다.');
      } else {
        dispatch(addItem(newItem));
        alert('장바구니에 담겼습니다.');
      }
    } else {
      alert('색상을 선택해 주세요');
    }
  }, [color]);

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
              <BaseButton onClick={addToCart}>카트에 담기</BaseButton>
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
