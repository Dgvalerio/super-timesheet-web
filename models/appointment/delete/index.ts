import { AppointmentModel } from '@/models/appointment';
import { gql, useMutation } from '@apollo/client';

export namespace DeleteAppointment {
  export interface Response {
    deleteAppointment: boolean;
  }

  export interface Mutation {
    input: {
      id?: AppointmentModel['id'];
      code?: AppointmentModel['code'];
    };
  }
}

export const deleteAppointmentMutation = gql`
  mutation DeleteAppointment($input: DeleteAppointmentInput!) {
    deleteAppointment(input: $input)
  }
`;

export const useDeleteAppointmentMutation = () =>
  useMutation<DeleteAppointment.Response, DeleteAppointment.Mutation>(
    deleteAppointmentMutation
  );
