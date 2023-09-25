'use client'

import React,{useState} from 'react';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '@/lib/firebaseConfig'
import './login.scss';



export default function LoginPage() {
  const auth = getAuth(app);
  const router = useRouter()
  const [credential, setCredential] = useState({
    email:'',
    password:'',
  });

  const inputOnblur = (e:any, type:string) => {
    const currInputValue = e.target.value;
    setCredential({...credential, [type]:currInputValue })
  }

  const login = (e:any) => {
    e.preventDefault();

    if(!credential.email || !credential.password) {
      alert('로그인 정보를 입력해주세요.');
      return
    }
    
    signInWithEmailAndPassword(auth, credential.email, credential.password)
    .then((userCredential) => {
      router.push('/');
    })
    .catch((error) => {
      alert('아이디 또는 비밀번호를 잘못 입력했습니다.')
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const socialLogin = (type:string) => {
    signIn(type)
  }

  return (
    <section className='login'>
        <form className='login__form' onSubmit={login}>
            <h1>로그인을 해주세요.</h1>
            <div className='login__email'>
                <label className='login__form__label'>이메일</label>
                <input className='login__email__input' placeholder='이메일을 입력해주세요.' onBlur={(e) => inputOnblur(e,'email')}/>
            </div>
            <div className='login__password'>
              <label className='login__form__label'>비밀번호</label>
              <input type='password' className='login__password__input' placeholder='비밀번호를 입력해주세요.' onBlur={(e) => inputOnblur(e,'password')}/>
            </div>
            <button className='login__button' type='submit'>로그인</button>
        </form>

        <div className='social'>
          <p>간편하게 로그인해보세요</p>
          <button className='login__button mb-1' onClick={() =>socialLogin('kakao')}>카카오 로그인</button>
          <button className='login__button mb-1' onClick={() => socialLogin('google')}>구글 로그인</button>
          <div className='social__signup'>
            <p>가입만 해도 즉시 1만원 할인</p>
            <Link href={'/login/consent'}>
              <button className='social__signup__button'>회원가입</button>
            </Link>
          </div>
        </div>

    </section>
  )
}
