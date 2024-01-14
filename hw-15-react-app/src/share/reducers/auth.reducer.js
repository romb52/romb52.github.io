import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
  id: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      const { username, token, id } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      state.token = token;
      state.username = username;
      state.id = id;
    },
    logout: (state) => {
      state = { ...initialState };
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    },
  },
});


export const { logout, auth } = authSlice.actions;
export default authSlice.reducer;