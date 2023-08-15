import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IFullDataUser } from '../interfaces/index';

interface IState {
  fullData: IFullDataUser | null;
}

const initialState: IState = {
  fullData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getFullData: (state, action: PayloadAction<IFullDataUser>) => {
      state.fullData = action.payload;
    },
  },
});

export const getFullDataUser = (username: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const fullData: AxiosResponse<IFullDataUser> = await axios.get(
        `http://localhost:3001/user/login/${username}/${password}`
      );
      dispatch(getFullData(fullData.data));
      return true;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const { getFullData } = userSlice.actions;
export default userSlice.reducer;
