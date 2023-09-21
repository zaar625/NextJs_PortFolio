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
import { doc, setDoc,getFirestore ,collection,getDoc ,addDoc} from 'firebase/firestore';


interface Item {
  id:number;
  name:string;
  color:string;
  price:number;
  quantity:number;
};


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

  const filterItemHanlder = (newItem:any) => {

  }

  const addToCart = useCallback(async () => {
    if(color === '') return alert('색상을 선택해 주세요');

    const newItem = {
      name: product[0].name,
      color: color,
      price: product[0].price,
      image: product[0].image,
      quantity: quantity,
    };

    if (isLoginUser) {
  
      const db = getFirestore(app);
      const docRef = doc(db, "user", isLoginUser);
      const docSnap = await getDoc(docRef);
      const cartData = docSnap.data(); //1. 유저가 없을경우 undefined 반환, 2. 있을경우 {} 로 반환됩니다. 
      
      if(cartData) {
        const {cart:cartList} = cartData;
        const duplicate = cartList.filter((e: Item) => e.name === newItem.name && e.color === newItem.color);

        if(duplicate.length > 0) {
          const noSameProduct = cartList.filter((e:Item) => e.name !== newItem.name || e.color !== newItem.color);
          const newData = [...noSameProduct, {
            id: duplicate[0].id,
            name: newItem.name,
            image:newItem.image,
            color: newItem.color,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity
          }];

          await setDoc(doc(db, "user", isLoginUser),{cart:newData});
        } else {
          const newData = [...cartList, {
            ...newItem,
            id: cartList.length > 0 ? cartList[cartList.length - 1].id + 1 : 1
          }];
          await setDoc(doc(db, "user", isLoginUser),{cart:newData});
        }
      } else {
        await setDoc(doc(db, "user", isLoginUser),{cart:[{...newItem, id:0}]}).then(()=>alert('장바구니에 담겼습니다.'));
      }
      // alert('장바구니에 담겼습니다.');
    } else {
      dispatch(addItem(newItem));
      alert('장바구니에 담겼습니다.');
    }
   
  }, [color,quantity]);

  return (
  <div className='productDetail__des'>
      <div className="productDetail__des__container">
            <h1>{product[0].name}</h1>
            <figcaption>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s,
            </figcaption>
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
