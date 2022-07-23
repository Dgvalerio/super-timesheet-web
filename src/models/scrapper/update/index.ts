import {
  gql,
  MutationHookOptions,
  useMutation,
  useSubscription,
} from '@apollo/client';

export namespace UpdateData {
  export interface Mutation {
    importData: boolean;
  }

  export enum SeedStatus {
    Wait = 'Wait',
    Load = 'Load',
    Save = 'Save',
    Ok = 'Ok',
    Fail = 'Fail',
  }

  export interface Subscription {
    watchImportData: {
      login: SeedStatus;
      clients: SeedStatus;
      projects: SeedStatus;
      categories: SeedStatus;
      appointments: SeedStatus;
    };
  }
}

export const updateDataMutation = gql`
  mutation {
    importData
  }
`;

export const useUpdateDataMutation = (options?: MutationHookOptions) =>
  useMutation<UpdateData.Mutation>(updateDataMutation, { ...options });

export const watchImportDataSubscription = gql`
  subscription {
    watchImportData {
      login
      clients
      projects
      categories
      appointments
    }
  }
`;

export const useUpdateDataSubscription = () =>
  useSubscription<UpdateData.Subscription>(watchImportDataSubscription);
