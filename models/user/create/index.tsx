import { UserModel } from '@/models/user';
import { gql, useMutation } from '@apollo/client';

export interface CreateUserForm extends HTMLFormElement {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  dailyHoursInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  passwordConfirmationInput: HTMLInputElement;
}

export namespace CreateUser {
  export interface Response {
    createUser: UserModel;
  }

  export interface Mutation {
    input: {
      name: UserModel['name'];
      email: UserModel['email'];
      dailyHours: UserModel['dailyHours'];
      password: UserModel['password'];
      passwordConfirmation: UserModel['password'];
    };
  }
}

export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const useCreateUserMutation = () =>
  useMutation<CreateUser.Response, CreateUser.Mutation>(createUserMutation);
