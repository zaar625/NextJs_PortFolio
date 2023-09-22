// import { loadTossPayments } from '@tosspayments/payment-sdk';
//  //토스 결제하기
//  const tosspaymentHandler = async () => {
//     const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string);
//     const checkEmptyAddressInfo = checkEmptyValues(inputValues);

//     if(checkEmptyAddressInfo) {
//       alert('배송정보를 입력해주세요.');
//       return;
//     }

//     if(product){
//       await tossPayments.requestPayment("카드",{
//         amount:product[0].price * Number(searchQuantity),
//         orderId:Math.random().toString(36).slice(2),
//         orderName:product[0].name,
//         successUrl:`${window.location.origin}/purchase/success?user=${user}`,
//         failUrl:`${window.location.origin}/api/payment/fail`
//       })
//     }
//   }
