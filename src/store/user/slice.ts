import { AuthOutput } from '@/models/auth/login';
import { UserModel } from '@/models/user';
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

export namespace UserStore {
  export interface State {
    id?: UserModel['id'];
    name?: UserModel['name'];
    email?: UserModel['email'];
    dailyHours?: UserModel['dailyHours'];
    token?: AuthOutput['token'];
  }

  export interface Reducers extends SliceCaseReducers<State> {
    saveUser: CaseReducer<State, PayloadAction<AuthOutput>>;
    wipeUser: CaseReducer<State>;
  }
}

const initialState: UserStore.State = {};

const userSlice = createSlice<UserStore.State, UserStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.dailyHours = action.payload.user.dailyHours;
      state.token = action.payload.token;
    },
    wipeUser(state) {
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      state.dailyHours = undefined;
      state.token = undefined;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
