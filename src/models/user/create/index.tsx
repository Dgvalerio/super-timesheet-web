import { UserModel } from '@/models/user';

export interface CreateUserInput {
  name: UserModel['name'];
  email: UserModel['email'];
  password: UserModel['password'];
}

export interface CreateUserForm extends HTMLFormElement {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}
