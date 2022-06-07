/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react-redux';
import { RootState } from '@/store';

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}
}
