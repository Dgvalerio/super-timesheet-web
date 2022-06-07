import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

export namespace UIStore {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
  }

  export interface State {
    themeMode: ThemeMode;
  }

  export interface Reducers extends SliceCaseReducers<State> {
    switchThemeMode: CaseReducer<State>;
  }
}

const initialState: UIStore.State = {
  themeMode: UIStore.ThemeMode.Light,
};

const uiSlice = createSlice<UIStore.State, UIStore.Reducers>({
  name: 'ui',
  initialState,
  reducers: {
    switchThemeMode(state) {
      state.themeMode =
        state.themeMode === UIStore.ThemeMode.Light
          ? UIStore.ThemeMode.Dark
          : UIStore.ThemeMode.Light;
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
