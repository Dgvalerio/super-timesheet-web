import { UserModel } from '@/models/user';

export interface AuthInput {
  email: UserModel['email'];
  password: UserModel['password'];
}

export interface AuthForm extends HTMLFormElement {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}

export interface AuthOutput {
  user: UserModel;
  token: string;
}
