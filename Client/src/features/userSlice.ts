import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IFullDataUser, ITask } from '../interfaces/index';

interface IState {
  fullData: IFullDataUser | null;
  dragable: boolean;
}

const initialState: IState = {
  fullData: null,
  dragable: true,
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
    setDragable: (state) => {
      state.dragable = !state.dragable;
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
      dispatch(getFullData(fullData.data));
      return true;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const { getFullData, moveTasks, setDragable } = userSlice.actions;
export default userSlice.reducer;
