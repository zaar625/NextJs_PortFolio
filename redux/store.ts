'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartItemReducer from './slice/cartItem';
import userCartItemsReducer from './slice/userCartItem';
import userReducer from './slice/user'


export const store = configureStore({
    reducer: {
      cartItem: cartItemReducer,
      userCartItem: userCartItemsReducer,
      user:userReducer
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;