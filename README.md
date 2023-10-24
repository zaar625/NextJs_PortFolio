# ECommerce Shop Web Site

 NextJs를 통해 서버사이드 렌더링을 이해하고 이커머스의 SEO 개선을 위한 이커머스웹 사이트 제작
 [BABAN HOME](https://babanshop.vercel.app/)

## 사용 스킬
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/sass-pink?style=flat&logo=Sass&logoColor=white"/>

## 프로젝트 목표
1. 리액트와의 차이점 이해
2. 이커머스를 소비하는 다양한 디바이스를 고려하여 반응형으로 제작
3. UX향상을 위한 간편로그인(소셜)
4. 마크다운 및 접근성을 고려
5. 라이트하우스 측정

## 프로젝트 구조
 <img src='https://github.com/zaar625/wmApp/assets/69461545/5eee7fd8-ca13-4272-8308-cd5e4303f7e7'/>

## 페이지 상세
### 1. 메인페이지
 <img src='https://github.com/zaar625/wmApp/assets/69461545/2ed039f3-2e8b-4b12-bc98-a22949f89fce' width='214px' height='138px'/>

<b>기능</b>

- [x] 사전렌더링
- [x] swiper를 활용한 히어로 영역 슬라이드 구현
- [x] 재생 및 정지가 가능한 인디케이터 적용

<b>설명</b>

- 해당 페이지는 메인 홈페이지 진입점으로 사용자가 검색시 잘 노출 될 수 있도록 사전렌더링을 진행합니다.<br>
- `Next.js`에서 제공하는 `Image`태그를 이용하여 뷰포트에 들어올 때 이미지 로드, 최적화된 이미지 생성 후 동일한 요청에 대해서는 이미 만들어 놓은 캐시로 사용합니다.<br>
 -> 당장 필요하지 않는 로드와 캐싱을 통해 재 진입시 빠르게 화면을 볼 수 있습니다.  

### 2. 상품디테일 페이지
<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/871f0fe7-a063-48dd-a8aa-ffe4b70c0507' width='300px' height='300px'/>

#### 카트에 담기
기능
- [x] 사전렌더링
- [x] Thumb 슬라이드
- [x] 카트에 담기
- [x] 구매하기
- [x] 상품 리뷰

상세

- 홈에서 임의의 상품을 클릭하면 상품 디테일 페이지로 이동하며, 상품 정보를 볼 수 있습니다.
- 해당 페이지는 사용자가 검색시 잘 노출 될 수 있도록 동적으로 사전렌더링을 하며, `generateMetadata`를 이용하여 동적 meta를 생성합니다.
- 디테일 주소를 누군가에게 공유할 때 동적으로 생성한 `generateMetadata`를 통해 대표 이미지가 보입니다.
- 회원과 비회원에 따라 분류하여 카트에 담을 수 있습니다. 카트에 담을 때 고려한 경우의 수는 아래와 같습니다.
  - 컬러와 수량을 입력해야만 카트에 담음   
  - 장바구니에 동일한 컬러와 아이템이 있을 경우 수량 증가
  - 장바구니에 동일한 아이템은 있으나 컬러가 다를 경우 추가
  - 장바구니에 아이템이 없을 경우 추가

#### 구매하기
<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/2a042e34-c0c8-4eb0-aa47-b76a1acc3403' width=350px height='360px'/>
<img src='https://github.com/zaar625/wmApp/assets/69461545/0305f240-f8c5-4c8a-8f52-011976c85f2f' width=250px height='360px'/>

기능
- [x] 카카오 우편서비스 연동
- [x] 토스페이먼츠 연동
- [x] 구매 성공 시 리다이렉트로 구매 완료 페이지로 이동 / 실패시 실패 페이지 이동

설명
- 가입회원이 구매하기를 누르면 배송정보 페이지로 이동합니다.(파라미터로 선택한 상품에 대한 정보를 가져옵니다.)
- ㄴ배송 정보의 유효성은 수령자 및 주소입니다.
- 상품의 수량이 1개 초과일 경우 '외 1' 처럼 보이도록 합니다.

### 4.카트페이지
<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/79aff3ec-3398-4b9d-902e-dffd88b5fee7' width='214px' height='138px'/> 

기능
- [x] 회원/비회원의 경우 상품 보여주기
- [x] 품절된 상품 보여주기
- [x] 장바구니에 아이템 삭제하기

설명
- 해당 페이지는 검색엔진에 노출될 필요성이 없어 클라이언트에서 패칭합니다. (사전렌더링을 하지 않습니다.)
- 회원과 비회원은 카트에 상품을 담을 수 있습니다. 비회원의 경우 로컬스토리지에 저장합니다.
- 카트 리스트에서 삭제 가능합니다.
- 데이터베이스에 상품마다 재고 필드값이 존재합니다. 해당 아이템의 재고가 없을 경우 품절로 표시됩니다.

#### 마이페이지                                                                                                                                                                                                                      
<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/a5b0ebc2-014e-4f2d-9e27-3012a81c58bc' height='360px'/> <img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/3e032e88-7c3b-4403-b434-f6d607ca672a' width=350px height='360px'/>

기능
- [x] 나의 구매 내역 확인 
- [x] 구매한 상품에 대한 리뷰 작성
- [x] 리뷰 중복 작성 불가
- [x] 리뷰 수정 및 삭제
- [x] 최대 이미지 3장 추가 

설명
- 결제가 완료되면 토스페이먼츠에서 리다이렉트로 받은 결제정보를 이용하여 마이페이지에서 구매내역을 확인 할 수 있습니다.
- 구매한 상품에 한해서 리뷰가 작성되며, 리뷰 중복 작성은 불가능합니다. (최대 3장의 이미지 추가 가능합니다.) <br>
- 작성된 리뷰는 수정 및 삭제 가능합니다. 
