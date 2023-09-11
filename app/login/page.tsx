import React from 'react';
import './page.scss';


export default function page() {

  return (
    <div className='login'>
      
        <form className='login__form'>
            <h1>로그인을 해주세요.</h1>
            <div className='login__email'>
                <label className='login__form__label'>이메일</label>
                <input className='login__email__input' placeholder='이메일을 입력해주세요.'/>
            </div>
            <div className='login__password'>
              <label className='login__form__label'>비밀번호</label>
              <input className='login__password__input' placeholder='비밀번호를 입력해주세요.'/>
            </div>
            <button className='login__button'>회원가입</button>
        </form>

        <div className='social'>
          <p>간편하게 로그인해보세요</p>
          <button className='login__button mb-1'>카카오 로그인</button>
          <button className='login__button mb-1'>구글 로그인</button>
          <div className='social__signup'>
            <p>가입만 해도 즉시 1만원 할인</p>
            <button className='social__signup__button'>회원가입</button>
          </div>
        </div>

    </div>
  )
}
