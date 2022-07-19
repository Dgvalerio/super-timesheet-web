import { gql, MutationHookOptions, useMutation } from '@apollo/client';

export namespace UpdateData {
  export interface Mutation {
    updateData: boolean;
  }
}

export const updateDataMutation = gql`
  mutation {
    updateData
  }
`;

export const useUpdateDataMutation = (options?: MutationHookOptions) =>
  useMutation<UpdateData.Mutation>(updateDataMutation, { ...options });
