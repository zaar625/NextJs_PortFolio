import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false,
  userName:null,
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    islogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { islogin } = loginSlice.actions;
export default loginSlice.reducer;
