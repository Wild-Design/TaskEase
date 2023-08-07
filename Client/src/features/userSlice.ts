import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../app/store';

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export default userSlice.reducer;
