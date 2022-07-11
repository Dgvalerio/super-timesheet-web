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
