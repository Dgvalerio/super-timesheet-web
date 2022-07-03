import { AzureInfosModel } from '@/models/azure-infos';
import { ProjectModel } from '@/models/project';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  dailyHours: number;
  projects: ProjectModel[];
  azureInfos?: AzureInfosModel;
}

export interface CreateUserInput {
  name: UserModel['name'];
  email: UserModel['email'];
  password: UserModel['password'];
}

export interface CreateUserForm extends HTMLFormElement {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}
