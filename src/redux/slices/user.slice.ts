import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserSlice {
  _id: string;
  username: string;
  email: string;
  token: string;
  avatar: string;
  isAuth: boolean;
}

const initialState: IUserSlice = {
  _id: '',
  username: '',
  email: '',
  token: '',
  avatar: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state._id = '';
      state.email = '';
      state.username = '';
      state.token = '';
      state.avatar = '';
      state.isAuth = false;
    },
    login: (state, action: PayloadAction<IUserSlice>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
      state.isAuth = true;
    },
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
