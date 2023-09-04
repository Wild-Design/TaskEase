import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IFullDataUser, ITask } from '../interfaces/index';

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
    moveTasks: (
      state,
      action: PayloadAction<{ listId: string; newArray: ITask }>
    ) => {
      const list = state.fullData?.Lists.find(
        (list) => list.id === action.payload.listId
      );
      console.log(list);
    },
  },
});

export const getFullDataUser = (username: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const fullData: AxiosResponse<IFullDataUser> = await axios.get(
        `http://localhost:3001/user/login/${username}/${password}`
        // `https://taskeaseserver.onrender.com/user/login/${username}/${password}`
      );
      fullData.data.password = password;
      fullData.data.Lists.sort((a, b) => a.order - b.order);

      dispatch(getFullData(fullData.data));
      return true;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const { getFullData, moveTasks } = userSlice.actions;
export default userSlice.reducer;
