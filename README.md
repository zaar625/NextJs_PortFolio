# ECommerce Shop Web Site
리액트와 차별되는 점이 무엇인지,서버사이드 렌더링이 가지는 장점이 무엇인지 글이 아닌 직접 체감하고자 만든 프로젝트입니다.
<br>더나아가 React 와 Next.js의 light_house 비교해봅니다. 

## 사용 스킬
```bash
"Next.js(app router)", "@reduxjs/toolkit", "Google firebase",
```

## 페이지 상세
모든 페이지는 ```flex```와 ```grid```를 이용하여 반응형으로 제작되었습니다. 
<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/b287f49c-1f74-4f25-8166-f51267b7d89d'/>

### 1. 홈
해당 페이지는 메인 홈페이지 진입점으로 사용자가 검색시 잘 노출 될 수 있도록 사전렌더링을 진행합니다.<br>
또한 ```Next.js```에서 제공하는 ```Image```태그를 이용하면 간단히 뷰포트에 들어올 때만 이미지 로드, 최적화된 이미지 생성 후 동일한 요청에 대해서는 이미 만들어 놓은 캐시로 사용됨을 알 수 있습니다.
|React|Next|
|-----|----|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/1e6f16b5-e8ad-4912-8ed3-d7eee5746d8f'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/82475a77-6400-4746-9b3d-5043089025a6'/>|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/b2f8b902-fb8a-4b86-9bf0-9eb76a7469a0'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/52d86d1b-1510-4263-8b11-7ebd7004b8fe'/>|


### 2.상품 디테일 페이지 
상품 정보에 대해 보여주며 회원과 비회원에 따라 분류하여 카트에 담습니다. <br>
구매하기의 경우 토스페이먼트 API와 카카오 우편서비스 API를 사용합니다. 
회원가입된 유저와 색상을 선택해야만 상품구매가 가능합니다. 

상품을 카트에 상품을 담을 경우 회원 유저와 비회원유저에 따라 저장을 할 수 있습니다. 
