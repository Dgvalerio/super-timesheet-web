import { Login } from '@/models/auth/login';
import { GithubInfosModel } from '@/models/github-infos';
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
    token?: Login.Response['login']['token'];
    githubToken?: GithubInfosModel['access_token'];
  }

  export interface Reducers extends SliceCaseReducers<State> {
    saveUser: CaseReducer<State, PayloadAction<Login.Response['login']>>;
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
      state.githubToken = action.payload.user.githubInfos?.access_token;
    },
    wipeUser(state) {
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      state.dailyHours = undefined;
      state.token = undefined;
      state.githubToken = undefined;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
