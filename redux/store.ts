'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartItemReducer from './slice/cartItem';
import userCartItemsReducer from './slice/userCartItem';


export const store = configureStore({
    reducer: {
      cartItem: cartItemReducer,
      userCartItem: userCartItemsReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;