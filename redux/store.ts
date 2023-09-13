'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartItemReducer from './slice/cartItem';


export const store = configureStore({
    reducer: {
      cartItem: cartItemReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;