import { UserModel } from '@/models/user';

export interface GithubInfosModel {
  id: string;
  access_token: string;
  user: UserModel;
}
