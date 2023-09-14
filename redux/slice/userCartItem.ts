/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { doc, setDoc,getFirestore } from "firebase/firestore"; 
import {app} from '@/lib/firebaseConfig'



interface Item {
    id:number;
    name:string;
    color:string;
    price:number;
    quantity:number;
  };



const firebaseUpdate= async (user:string) => {
  let cart;
  const localStorageItem = localStorage.getItem('loginCartItems');
  
  if(localStorageItem) {
    cart = JSON.parse(localStorageItem);
  } else {
    cart = [];
  }
  const db = getFirestore(app);
  
  await setDoc(doc(db, "user", user),{cart});
}

// 로컬스토리지 아이템 가져오기
const getCartList = () => {
    const localStorageItem = localStorage.getItem('cartItems');

    if(localStorageItem){
        return JSON.parse(localStorageItem)
    } else {
        return [];
    }
}

const initialState = {
  items: getCartList()
};

const UsercartItemsSlice = createSlice({
  name: 'userCartItem',
  initialState,
  reducers: {
    userAddItem: (state, action) => {
 
      const {newItem} = action.payload;
      const {user} = action.payload;
      const duplicate = state.items.filter(
        (e: Item) => e.name === newItem.name && e.color === newItem.color);

      if (duplicate.length > 0) {
        state.items = state.items.filter(
          (e:Item) => e.name !== newItem.name || e.color !== newItem.color);
          state.items = [...state.items, {
            id: duplicate[0].id,
            name: newItem.name,
            image:newItem.image,
            color: newItem.color,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity
          }]
      }else {
        state.items = [...state.items, {
            ...action.payload,
            id: state.items.length > 0 ? state.items[state.items.length - 1].id + 1 : 1
        }]
        localStorage.setItem('loginCartItems', JSON.stringify(state.items.sort((a:Item, b:Item) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        }
      
    firebaseUpdate(user);
    },
    userUpdateItem: (state, action)=>{
      const newItem = action.payload;
      console.log(newItem);
      const item = state.items.filter((e:Item) => e.name === newItem.name && e.color === newItem.color );//동일아이템
      
      if(item.length > 0) {
        state.items = state.items.filter((e:Item)=>e.name !== newItem.name || e.color !== newItem.color)//다른아이템
        state.items = [...state.items, {
          id:item[0].id,
          name: newItem.name,
          color:newItem.color,
          price: newItem.price,
          image:newItem.image,
          quantity: newItem.quantity
        }]
        state.items = state.items.sort((a:Item, b:Item) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))
      }
    //   firebaseUpdate();
      localStorage.setItem('loginCartItems', JSON.stringify(state.items))
    },
    UserRemoveItem: (state, action) => {
      const item = action.payload
      state.items = state.items.filter((e:Item) => e.name !== item.name || e.color !== item.color )
      
    //   firebaseUpdate();
      localStorage.setItem('loginCartItems', JSON.stringify(state.items.sort((a:Item, b:Item) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
      
    },
},
  
});

export const { userAddItem, userUpdateItem ,UserRemoveItem} = UsercartItemsSlice.actions;
export default UsercartItemsSlice.reducer;
