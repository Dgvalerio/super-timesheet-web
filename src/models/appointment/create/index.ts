import { AppointmentModel } from '@/models/appointment';
import { CategoryModel } from '@/models/category';
import { ProjectModel } from '@/models/project';
import { gql, useMutation } from '@apollo/client';

export interface CreateAppointmentForm extends HTMLFormElement {
  dateInput: HTMLInputElement;
  startTimeInput: HTMLInputElement;
  endTimeInput: HTMLInputElement;
  notMonetizeInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  commitInput?: HTMLInputElement;
  statusInput: HTMLInputElement;
  userInput: HTMLInputElement;
  projectInput: HTMLInputElement;
  categoryInput: HTMLInputElement;
}

export namespace CreateAppointment {
  export interface Response {
    createAppointment: AppointmentModel;
  }

  export interface Mutation {
    input: {
      projectCode?: ProjectModel['code'];
      categoryCode?: CategoryModel['code'];
      date: AppointmentModel['date'];
      startTime: AppointmentModel['startTime'];
      endTime: AppointmentModel['endTime'];
      notMonetize?: AppointmentModel['notMonetize'];
      description: AppointmentModel['description'];
      commit?: AppointmentModel['commit'];
    };
  }
}

export const createAppointmentMutation = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
    }
  }
`;

export const useCreateAppointmentMutation = () =>
  useMutation<CreateAppointment.Response, CreateAppointment.Mutation>(
    createAppointmentMutation
  );
