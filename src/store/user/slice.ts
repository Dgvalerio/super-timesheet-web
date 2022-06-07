import { AuthOutput } from '@/models/auth/login';
import { UserModel } from '@/models/user/create';
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
    token?: AuthOutput['token'];
  }

  export interface Reducers extends SliceCaseReducers<State> {
    saveUser: CaseReducer<State, PayloadAction<AuthOutput>>;
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
      state.token = action.payload.token;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
