import { CategoryModel } from '@/models/category';
import { ProjectModel } from '@/models/project';
import { UserModel } from '@/models/user';

export enum AppointmentStatusEnum {
  PreApproved = 'PreApproved',
  Approved = 'Approved',
  Review = 'Review',
  Unapproved = 'Unapproved',
  Draft = 'Draft',
  Unknown = 'Unknown',
}

export interface AppointmentModel {
  id: string;
  code?: string;
  date: string;
  startTime: string;
  endTime: string;
  notMonetize: boolean;
  description: string;
  commit?: string;
  status: AppointmentStatusEnum;
  user: UserModel;
  project: ProjectModel;
  category: CategoryModel;
}
