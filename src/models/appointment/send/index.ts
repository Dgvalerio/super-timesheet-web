import { AppointmentModel } from '@/models/appointment';
import { getAllAppointmentsQuery } from '@/models/appointment/get';
import { gql, useMutation } from '@apollo/client';

export namespace SendAppointments {
  export interface Mutation {
    sendAppointments: {
      appointment?: AppointmentModel;
      saved: boolean;
      message: string;
    };
  }
}

export const sendAppointmentsMutation = gql`
  mutation {
    sendAppointments {
      appointment {
        id
        date
        startTime
        endTime
        description
      }
      saved
      message
    }
  }
`;

export const useSendAppointmentsMutation = () =>
  useMutation<SendAppointments.Mutation>(sendAppointmentsMutation, {
    refetchQueries: [getAllAppointmentsQuery],
  });
