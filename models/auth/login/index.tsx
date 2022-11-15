import { UserModel } from '@/models/user';
import { gql, MutationTuple, useMutation } from '@apollo/client';

export namespace Login {
  export interface Response {
    login: {
      user: UserModel;
      token: string;
    };
  }

  export interface Mutation {
    input: {
      email: UserModel['email'];
      password: UserModel['password'];
    };
  }

  export type Hook = () => MutationTuple<Login.Response, Login.Mutation>;

  export interface Form extends HTMLFormElement {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
  }
}

export const loginMutation = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      user {
        id
        name
        email
        dailyHours
        githubInfos {
          access_token
        }
      }
      token
    }
  }
`;

export const useLoginMutation: Login.Hook = () =>
  useMutation<Login.Response, Login.Mutation>(loginMutation);
