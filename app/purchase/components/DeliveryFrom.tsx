import React,{useState}from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode';
import '../purchase.scss';

type Tprops = {
  inputValues:TInputValue,
  setInputValue:React.Dispatch<React.SetStateAction<TInputValue>>
}

export interface TInputValue {
  [key: string]: string | undefined
}


export default function DeliveryFrom({inputValues,setInputValue}:Tprops) {

  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const searchAdressComplete = (data:any) => {
    console.log(data)
    const {address,zonecode } = data;
    setInputValue({
      ...inputValues,
      address,
      zonecode
    })
    // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const searchAddress = () => {
    open({ onComplete: searchAdressComplete});
  }

  const onBlurHandler = (e:any, type:string) => {
    const value = e.target.value;
    setInputValue({...inputValues, [type]:value})
  }

  return (
    <div className='purchase__delivery mb-2'>
        <h1>배송정보</h1>
        <form className='purchase__delivery__form'>
          <div className='purchase__delivery__form__receive'>
            <label htmlFor='name' className='label'>수령인</label>   
            <input className='purchase__delivery__input' name='name' type='text' id='name' placeholder='수령인을 입력해주세요.' onBlur={(e) => onBlurHandler(e, 'name')}/>
          </div>
          <div className='purchase__delivery__form__address'>
            <label className='label' htmlFor='address'>배송지 주소</label>
            <div>
              <input placeholder='우편번호' className='purchase__delivery__input' readOnly value={inputValues.zonecode}/> 
              <button type="button" className='search-button' onClick={searchAddress}>검색</button>
            </div>
            <input className='purchase__delivery__input' placeholder='주소' readOnly  value={inputValues.address}/>
            <input className='purchase__delivery__input' placeholder='상세 주소를 입력해주세요.'  onBlur={(e) => onBlurHandler(e, 'detailAdress')}/>
          </div>

        </form>
    </div>
  )
}
