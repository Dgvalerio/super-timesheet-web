import { AppointmentModel } from '@/models/appointment';
import { gql, useQuery } from '@apollo/client';

export namespace GetAllAppointments {
  export interface Query {
    id?: AppointmentModel['id'];
    code?: AppointmentModel['code'];
    status?: AppointmentModel['status'];
    date?: AppointmentModel['date'];
    month?: AppointmentModel['date'];
  }

  export interface Response {
    getAllAppointments: AppointmentModel[];
  }
}

export const getAllAppointmentsQuery = gql`
  query GetAllAppointments($input: GetAllAppointmentsInput!) {
    getAllAppointments(input: $input) {
      id
      code
      date
      startTime
      endTime
      notMonetize
      description
      commit
      status
      project {
        code
        name
        client {
          code
          name
        }
      }
      category {
        code
        name
      }
    }
  }
`;

export const useGetAllAppointmentsQuery = (input: GetAllAppointments.Query) =>
  useQuery<GetAllAppointments.Response>(getAllAppointmentsQuery, {
    variables: { input },
  });

export namespace GetCurrentMonthWorkedTime {
  export interface Query {
    getCurrentMonthWorkedTime: string;
  }
}

export const getCurrentMonthWorkedTimeQuery = gql`
  query {
    getCurrentMonthWorkedTime
  }
`;

export const useGetCurrentMonthWorkedTimeQuery = () =>
  useQuery<GetCurrentMonthWorkedTime.Query>(getCurrentMonthWorkedTimeQuery);
