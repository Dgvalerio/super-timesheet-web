import { GithubInfosModel } from '@/models/github-infos';
import { gql, MutationTuple, useMutation } from '@apollo/client';

export interface CreateGithubInfosForm extends HTMLFormElement {
  accessTokenInput: HTMLInputElement;
}

export namespace CreateGithubInfos {
  export interface Response {
    createGithubInfos: GithubInfosModel;
  }

  export interface Mutation {
    input: {
      access_token: string;
    };
  }

  export type Hook = () => MutationTuple<Response, Mutation>;
}

export const createGithubInfosMutation = gql`
  mutation CreateGithubInfos($input: CreateGithubInfosInput!) {
    createGithubInfos(input: $input) {
      id
    }
  }
`;

export const useCreateGithubInfosMutation: CreateGithubInfos.Hook = () =>
  useMutation(createGithubInfosMutation);
