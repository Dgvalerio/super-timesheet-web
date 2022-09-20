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
    client: SaveAppointmentsStatus;
    _client: AppointmentModel[`project`][`client`][`name`];
    project: SaveAppointmentsStatus;
    _project: AppointmentModel[`project`][`name`];
    category: SaveAppointmentsStatus;
    _category: AppointmentModel[`category`][`name`];
    description: SaveAppointmentsStatus;
    _description: AppointmentModel[`description`];
    date: SaveAppointmentsStatus;
    _date: AppointmentModel[`date`];
    commit: SaveAppointmentsStatus;
    _commit: AppointmentModel[`commit`];
    notMonetize: SaveAppointmentsStatus;
    _notMonetize: AppointmentModel[`notMonetize`];
    startTime: SaveAppointmentsStatus;
    _startTime: AppointmentModel[`startTime`];
    endTime: SaveAppointmentsStatus;
    _endTime: AppointmentModel[`endTime`];
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
      saving: number;
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
