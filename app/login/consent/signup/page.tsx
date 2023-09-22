'use client'

import React,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '@/lib/firebaseConfig';
import './signup.scss'

type TValidity = {
  email:null | string,
  password:null | string,
  samePassword:null | boolean,
}

export default function SignUpPage() {
  const auth = getAuth(app);
  const [inputsValue, setInputsValue] = useState<TValidity>({
    email:null,
    password:null,
    samePassword:null,
  })

  const checkEmailValidity = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}[A-Z]*$/i;
    
    return emailRegex.test(inputsValue.email as string)
  };

  const inputEventHandler = (e:any, type:string) => {
    const currInputValue = e.target.value;

    if(type !== 'samePassword') {
      setInputsValue({...inputsValue,[type]:currInputValue});
    } 

    if(type === 'samePassword') {
     const isPasswordSame = currInputValue === inputsValue.password;
     setInputsValue({...inputsValue,[type]:isPasswordSame});
    }
  }

  const isPassedValidity = () => {
    if(!inputsValue.email) return false;
    if(!inputsValue.password ) return false;
    if(!inputsValue.samePassword) return false;

    return true;
  }

  const signUp = (e:any) => {
    e.preventDefault();
    const validityResult = isPassedValidity();

    if(validityResult){
      createUserWithEmailAndPassword(auth, inputsValue.email as string , inputsValue.password as string)
      .then((userCredential) => {
       alert('회원가입에 성공하였습니다.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } else {
      return;
    }
    
  }

  return (
    <section className='signUp'>
      <h1 className='mb-4'>가입하기</h1>
      <form className='signUp__form' onSubmit={signUp}>
        <div className='signUp__email'>
          <label className='signUp__form__label'>이메일</label>
          <input className={`signUp__email__input ${inputsValue.email === null ? 'null' : !checkEmailValidity() && 'error'  }`} placeholder='이메일을 입력해주세요.' onBlur={(e) => inputEventHandler(e,'email')}/>
          {inputsValue.email !== null  && !checkEmailValidity() && 'error' && <p>이메일을 확인해주세요.</p>}
        </div>
        <div className='signUp__password'>
          <label className={`signUp__form__label`} >비밀번호</label>
          <input className={`signUp__password__input ${inputsValue.password === null ? null : !inputsValue.password.length && 'error'}`} placeholder='비밀번호를 입력해주세요.' onBlur={(e) => inputEventHandler(e,'password')}/>
          {inputsValue.password === null ? null : !inputsValue.password.length && <p>비밀번호를 입력해주세요.</p>}
        </div>
        <div className='signUp__password'>
          <label className='signUp__form__label' >비밀번호 재입력</label>
          <input className={`signUp__password__input ${inputsValue.samePassword === false ? 'error' : null}`} placeholder='비밀번호를 입력해주세요.' onBlur={(e) => inputEventHandler(e,'samePassword')}/>
          {inputsValue.samePassword === false && <p>비밀번호가 다릅니다.</p>}
        </div>
        <button className='signUp__button' type="submit">회원가입</button>
      </form>
    </section>
  )
}
