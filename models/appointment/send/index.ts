import { AppointmentModel } from '@/models/appointment';
import { getAllAppointmentsQuery } from '@/models/appointment/get';
import { UserModel } from '@/models/user';
import {
  gql,
  MutationTuple,
  SubscriptionResult,
  useMutation,
  useSubscription,
} from '@apollo/client';

export namespace SendAppointments {
  export interface Response {
    sendAppointments: boolean;
  }

  export interface Mutation {
    input: {
      sendAppointments: boolean;
    };
  }

  export type Hook = () => MutationTuple<Response, Mutation>;

  export enum SaveAppointmentsStatus {
    Wait = 'Wait',
    Load = 'Load',
    Process = 'Process',
    Ok = 'Ok',
    Fail = 'Fail',
  }

  export interface AppointmentProgress {
    page: SaveAppointmentsStatus;
    adapteToAzure: SaveAppointmentsStatus;
    id: AppointmentModel[`id`];
    client: SaveAppointmentsStatus;
    project: SaveAppointmentsStatus;
    category: SaveAppointmentsStatus;
    description: SaveAppointmentsStatus;
    date: SaveAppointmentsStatus;
    commit: SaveAppointmentsStatus;
    notMonetize: SaveAppointmentsStatus;
    startTime: SaveAppointmentsStatus;
    endTime: SaveAppointmentsStatus;
    failMessage?: string;
    saveInAzure: SaveAppointmentsStatus;
    search: SaveAppointmentsStatus;
    getMoreData: SaveAppointmentsStatus;
    update: SaveAppointmentsStatus;
  }

  export interface Subscription {
    watchSaveAppointments: {
      userId: UserModel[`id`];
      page: SaveAppointmentsStatus;
      loadAppointments: SaveAppointmentsStatus;
      auth: SaveAppointmentsStatus;
      saving: SaveAppointmentsStatus;
      saved: number;
      updated: number;
      appointment: AppointmentProgress;
    };
  }

  export type SubscriptionHook = () => SubscriptionResult<Subscription>;
}

export const sendAppointmentsMutation = gql`
  mutation {
    sendAppointments
  }
`;

export const useSendAppointmentsMutation: SendAppointments.Hook = () =>
  useMutation(sendAppointmentsMutation, {
    refetchQueries: [getAllAppointmentsQuery],
  });

export const watchSaveAppointmentsSubscription = gql`
  subscription {
    watchSaveAppointments {
      page
      loadAppointments
      auth
      saving
      saved
      updated
      appointment {
        page
        adapteToAzure
        id
        client
        project
        category
        description
        date
        commit
        notMonetize
        startTime
        endTime
        failMessage
        saveInAzure
        search
        getMoreData
        update
      }
    }
  }
`;

export const useSendAppointmentsSubscription: SendAppointments.SubscriptionHook =
  () => useSubscription(watchSaveAppointmentsSubscription);
