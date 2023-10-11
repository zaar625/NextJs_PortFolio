// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from "next/server";
// export default async function handler(req:NextApiRequest, res:NextApiResponse) {
//     const {orderId, paymentKey, amount} = req.query;
//     const secretKey = process.env.TOSS_CLIENT_SECRET;

//     const url = 'https://api.tosspayments.com/v1/payments/confirm';
//     const basicToken = Buffer.from(`${secretKey}:`,'utf-8').toString('base64');

//     await fetch(url, {
//         method:'post',
//         body:JSON.stringify({amount,orderId,paymentKey}),
//         headers:{
//             Authorization:`Basic ${basicToken}`,
//             "Content-Type" : "application/json"
//         }
//     }).then(res =>{
//         console.log(res.json()) 
//         res.json()});
// }

export async function POST(request: NextRequest ) {
    const {orderId, paymentKey, amount}:any = request.nextUrl.searchParams;
    const secretKey = process.env.TOSS_CLIENT_SECRET;

    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const basicToken = Buffer.from(`${secretKey}:`,'utf-8').toString('base64');

    await fetch(url, {
        method:'post',
        body:JSON.stringify({amount,orderId,paymentKey}),
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type" : "application/json"
        }
    }).then(res =>{
        res.json()});
}