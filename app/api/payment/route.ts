import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {orderId, paymentKey, amount} = req.query;
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
        console.log(res.json()) 
        res.json()});
}