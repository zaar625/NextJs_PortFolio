import React from 'react'
import './signup.scss'

export default function SignUpPage() {
  return (
    <div className='signUp'>
      <h1>회원가입</h1>
      <form className='signUp__form'>
        <div className='signUp__email'>
          <label className='signUp__form__label'>이메일</label>
          <input className='signUp__email__input' placeholder='이메일을 입력해주세요.' />
        </div>
        <div className='signUp__password'>
          <label className='signUp__form__label' >비밀번호</label>
          <input className='signUp__password__input' placeholder='비밀번호를 입력해주세요.' />
        </div>
        <div className='signUp__password'>
          <label className='signUp__form__label' >비밀번호 재입력</label>
          <input className='signUp__password__input' placeholder='비밀번호를 입력해주세요.'/>
        </div>
        <button className='signUp__button'>회원가입</button>
      </form>
    </div>
  )
}
