import { UserModel } from '@/models/user';
import { gql, useMutation } from '@apollo/client';

export interface UpdateUserForm extends HTMLFormElement {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  dailyHoursInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  passwordConfirmationInput: HTMLInputElement;
}

export namespace UpdateUser {
  export interface Response {
    updateUser: UserModel;
  }

  export interface Mutation {
    input: {
      name?: UserModel['name'];
      email?: UserModel['email'];
      dailyHours?: UserModel['dailyHours'];
      password: UserModel['password'];
      newPassword?: UserModel['password'];
      newPasswordConfirmation?: UserModel['password'];
    };
  }
}

export const updateUserMutation = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;

export const useUpdateUserMutation = () =>
  useMutation<UpdateUser.Response, UpdateUser.Mutation>(updateUserMutation);
