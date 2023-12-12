import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
  username: string;
  token: string;
  id: string | number;
}
const initialState: IState = {
  username: '',
  token: '',
  id: 0,
};
export interface IAuth {
  username: string;
  email: string;
  id: string | number;
  bio: string;
  image: string;
  token: string;
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      if (localStorage.getItem('token')) {
        //state.token = localStorage.getItem('token');

        return {
          ...state,
          token: localStorage.getItem('token') || '',
          username: localStorage.getItem('username') || '',
          id: localStorage.getItem('id') || 0,
        };
      }
    },
    auth: (state, action: PayloadAction<IAuth>) => {
      const { username, token, id } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('id', String(id));
      return { ...state, token, username, id };
    },
    logout: (state) => {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return { ...initialState };
    },
  },
});

export const { logout, auth, checkAuth } = authSlice.actions;
export default authSlice.reducer;
