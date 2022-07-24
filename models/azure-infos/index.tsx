import { UserModel } from '@/models/user';

export interface AzureInfosModel {
  id: string;
  login: string;
  content: string;
  iv: string;
  currentMonthWorkedTime: string;
  user: UserModel;
  updatedDate: Date;
}
