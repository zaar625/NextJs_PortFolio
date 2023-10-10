

# ECommerce Shop Web Site
리액트와 차별되는 점이 무엇인지,서버사이드 렌더링이 가지는 장점이 무엇인지 글이 아닌 직접 체감하고자 만든 프로젝트입니다.
<br>더나아가 React 와 Next.js의 light_house 비교해봅니다. 

## 사용 스킬
```bash
"Next.js(app router)", "@reduxjs/toolkit", "Google firebase",
```

## 페이지 상세
- 모든 페이지는 ```flex```와 ```grid```를 이용하여 반응형으로 제작되었습니다.
- 시크릿 모드 환경에서 주요페이지는 라이트하우스로 측정하여 평균 90이상 유지될 수 있도록 개선합니다.

|홈|Google Light House|
|--|-----------------|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/b287f49c-1f74-4f25-8166-f51267b7d89d'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/74ed812c-eb30-4753-92fa-d4a38cabb44a' width='400px' height='100px'/>

### 1. 홈
해당 페이지는 메인 홈페이지 진입점으로 사용자가 검색시 잘 노출 될 수 있도록 사전렌더링을 진행합니다.<br>
또한 ```Next.js```에서 제공하는 ```Image```태그를 이용하면 간단히 뷰포트에 들어올 때만 이미지 로드, 최적화된 이미지 생성 후 동일한 요청에 대해서는 이미 만들어 놓은 캐시로 사용됨을 알 수 있습니다.
|React|Next|
|-----|----|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/82475a77-6400-4746-9b3d-5043089025a6' width='470px' height='180px'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/1e6f16b5-e8ad-4912-8ed3-d7eee5746d8f'/>|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/b2f8b902-fb8a-4b86-9bf0-9eb76a7469a0'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/52d86d1b-1510-4263-8b11-7ebd7004b8fe'/>|


### 2.상품 디테일 페이지 ~ 구매하기 페이지 
- 임의의 상품을 클릭하면 상품 디테일 페이지로 이동하며, 상품 정보를 볼 수 있습니다. <br>
- 해당 페이지는 사용자가 검색시 잘 노출 될 수 있도록 동적으로 사전렌더링을 하며, ```generateMetadata```를 이용하여 동적 meta를 생성합니다. 
- 회원과 비회원에 따라 분류하여 카트에 담을 수 있으며 회원인 경우 ```토스페이먼트 API```와 ```카카오 우편서비스 API```를 사용하여 가상으로 구매까지 가능합니다.

|디테일 페이지|구매하기|
|------|---------|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/871f0fe7-a063-48dd-a8aa-ffe4b70c0507' width='400px' height='400px'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/2a042e34-c0c8-4eb0-aa47-b76a1acc3403'  width=350px height='360px'/>

### 4.카트페이지
|카트 페이지|
|--------|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/79aff3ec-3398-4b9d-902e-dffd88b5fee7'  height='400px'/>|

- 해당 페이지는 검색엔진에 노출될 필요성이 없어 클라이언트에서 패칭합니다. (사전렌더링 x)
- 회원과 비회원은 카트에 상품을 담을 수 있습니다. 비회원의 경우 로컬스토리지에 저장합니다.
- 카트 리스트에서 삭제 가능합니다.
- 데이터베이스에 상품마다 재고 필드값이 존재합니다. 해당 아이템의 재고가 없을 경우 품절로 표시됩니다. 

### 3.마이페이지 ~ 리뷰작성하기 페이지 
- 결제가 완료되면 토스페이먼츠에서 리다이렉트로 받은 결제정보를 이용하여 마이페이지에서 구매내역을 확인 할 수 있습니다.
- 구매한 상품에 한해서 리뷰가 작성되며, 리뷰 중복 작성은 불가능합니다. (최대 3장의 이미지 추가 가능합니다.) <br>
- 작성된 리뷰는 수정 및 삭제 가능합니다.

|마이페이지|리뷰작성하기|
|---------|-------|
|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/a5b0ebc2-014e-4f2d-9e27-3012a81c58bc' height='360px'/>|<img src='https://github.com/zaar625/NextJs_PortFolio/assets/69461545/3e032e88-7c3b-4403-b434-f6d607ca672a' width=350px height='360px'/>|
