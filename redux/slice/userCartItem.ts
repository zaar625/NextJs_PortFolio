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

const firebaseUpdate= async (user:string ,cart:Item) => {
  const db = getFirestore(app);
  await setDoc(doc(db, "user", user),{cart});
}

// 로컬스토리지 아이템 가져오기
const getCartList = () => {
  let localStorageItem;
  
  if (typeof window !== 'undefined')  localStorageItem = localStorage.getItem('cartItems');    

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
            ...action.payload.newItem,
            id: state.items.length > 0 ? state.items[state.items.length - 1].id + 1 : 1
        }]
        }
    firebaseUpdate(user ,state.items);
    },
    userRemoveItem: (state, action) => {
      const {user} =  action.payload;
      const {item} = action.payload;
      state.items = state.items.filter((e:Item) => e.name !== item.name || e.color !== item.color )
      
      // firebaseUpdate(user,item);
    },
},
  
});

export const { userAddItem ,userRemoveItem} = UsercartItemsSlice.actions;
export default UsercartItemsSlice.reducer;
