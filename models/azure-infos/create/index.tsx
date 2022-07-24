import { AzureInfosModel } from '@/models/azure-infos';
import { UserModel } from '@/models/user';
import { gql, useMutation } from '@apollo/client';

export interface CreateAzureInfosForm extends HTMLFormElement {
  loginInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}

export namespace CreateAzureInfos {
  export interface Response {
    createAzureInfos: AzureInfosModel;
  }

  export interface Mutation {
    input: {
      login: AzureInfosModel['login'];
      password: string;
      userId: UserModel['id'];
    };
  }
}

export const createAzureInfosMutation = gql`
  mutation CreateAzureInfos($input: CreateAzureInfosInput!) {
    createAzureInfos(input: $input) {
      id
    }
  }
`;

export const useCreateAzureInfosMutation = () =>
  useMutation<CreateAzureInfos.Response, CreateAzureInfos.Mutation>(
    createAzureInfosMutation
  );
