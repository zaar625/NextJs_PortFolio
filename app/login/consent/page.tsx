'use client'

import './consent.scss';
import React, { useState, useRef, useEffect } from 'react'

import Check_CircleIcon from '/public/icon/check_circle.svg';
import CheckIcon from '/public/icon/check.svg';
import Link from 'next/link';

// 동의항목
export default function ConsentPage() {
  const [allIsChecked, setAllIsChecked] = useState(false)

  const consents = [
    {
      display:'[필수] 만 14세 이상입니다.',
      id:'age',
      checked:false,
      require:true
    },
    {
      display:'[필수] BABAN, BABAN 스토어 이용약관',
      id:'terms',
      checked:false,
      require:true
    },
    {
      display:'[필수] 개인정보 수집 및 이용 동의',
      id:'personal information',
      checked:false,
      require:true
    },
    {
      display:'[선택] 광고성 정보 수신 동의',
      id:'ads',
      checked:false,
      require:false
    }
  ]

  const [terms, setTerms]= useState(consents);

  const allCheckedHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      setAllIsChecked(true);
      const allchecked = terms.map((term, index) => {
        return {...term, checked:true}
      });
      setTerms(allchecked);
    } else {
      setAllIsChecked(false);
      const allNotChecked = terms.map((term, index) => {
        return {...term, checked:false};
      })
      setTerms(allNotChecked);
    }
  } 

  useEffect(()=>{
    const isAllchecked = terms.find((term) => term.checked === false);

    if(isAllchecked) {
      setAllIsChecked(false)
    }else{
      setAllIsChecked(true)
    }
  },[terms])


  const requierTerms = terms.filter((term)=> term.require === true);
  const isRequierChecked = !(requierTerms.some((term) => term.checked === false));  

  const eachCheckedHandler = (e:React.ChangeEvent<HTMLInputElement>, checkIndex:number) => {
    const isChecked = e.target.checked;

    const newConsent = terms.map((item, index) => {
      if(index === checkIndex){
        return {...item, checked :isChecked };
      }else {
        return item;
      }
    })

    setTerms(newConsent);
  }

  const nextBtnHandler = (e:React.MouseEvent) => {
    e.preventDefault();

    alert('필수항목을 체크해주세요.')
  }

  return (
    <div className='consent'>
      <h2 className='mb-2'>환영합니다!<br/>BABAN에 가입하시려면<br/>약관에 동의해 주세요.
      </h2>
      <form>
        <div className='icon-wrapper'>
          <Check_CircleIcon width={20} height={20} color={allIsChecked ? '#3879F6' : '#B8B9BC'}/>
          <input type='checkbox' id='allChecked' name='allChecked' onChange={allCheckedHandler}/>
          <label htmlFor='allChecked'>
            약관 전체 동의하기(선택 동의 포함)
          </label>
        </div>
        <ul className='mb-4'>
          {
            terms.map((term, index)=> (
              <li className='icon-wrapper' key={index}>
                <CheckIcon width={18} height={18} color={term.checked ? '#3879F6' : '#B8B9BC'}/>
                <input type='checkbox' id={term.id} name={term.id} onChange={(e)=> eachCheckedHandler(e, index)}/>
                <label htmlFor={term.id}>
                  {term.display}
                </label>
              </li>
            ))
          }
        </ul>
        {isRequierChecked ? (
          <Link href={'/login/consent/signup'}>
            <button type='button' className='consent__next-button'>다음</button>
          </Link>
        ) : (
            <button type='button'className='consent__next-button' onClick={nextBtnHandler}>다음</button>
        )}
      </form>
    </div>
  )
}
