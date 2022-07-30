import { AppointmentModel } from '@/models/appointment';
import { CategoryModel } from '@/models/category';
import { ProjectModel } from '@/models/project';
import { gql, useMutation } from '@apollo/client';

export namespace UpdateAppointment {
  export interface Response {
    updateAppointment: AppointmentModel;
  }

  export interface Mutation {
    input: {
      id: AppointmentModel['id'];
      code?: AppointmentModel['code'];
      date?: AppointmentModel['date'];
      startTime?: AppointmentModel['startTime'];
      endTime?: AppointmentModel['endTime'];
      notMonetize?: AppointmentModel['notMonetize'];
      description?: AppointmentModel['description'];
      commit?: AppointmentModel['commit'];
      status?: AppointmentModel['status'];
      projectCode?: ProjectModel['code'];
      categoryCode?: CategoryModel['code'];
    };
  }
}

export const updateAppointmentMutation = gql`
  mutation UpdateAppointment($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      id
    }
  }
`;

export const useUpdateAppointmentMutation = () =>
  useMutation<UpdateAppointment.Response, UpdateAppointment.Mutation>(
    updateAppointmentMutation
  );
