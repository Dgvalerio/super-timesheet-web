import { AzureInfosModel } from '@/models/azure-infos';
import { CategoryModel } from '@/models/category';
import { ClientModel } from '@/models/client';
import { ProjectModel } from '@/models/project';
import { UserModel } from '@/models/user';
import { gql, useQuery } from '@apollo/client';

export namespace GetUserClients {
  export type Category = Pick<CategoryModel, 'code' | 'name'>;

  export interface Project {
    code: ProjectModel['code'];
    name: ProjectModel['name'];
    categories: Category[];
  }

  export interface Client {
    code: ClientModel['code'];
    name: ClientModel['name'];
    projects: Project[];
  }

  export interface Query {
    getUserClients: Client[];
  }
}

export const getUserClientsQuery = gql`
  query {
    getUserClients {
      code
      name
      projects {
        code
        name
        categories {
          code
          name
        }
      }
    }
  }
`;

export const useGetUserClientsQuery = () =>
  useQuery<GetUserClients.Query>(getUserClientsQuery, {
    fetchPolicy: 'cache-and-network',
  });

export namespace GetUserAzureInfos {
  export interface Query {
    getUser: {
      azureInfos: Pick<AzureInfosModel, 'login'>;
    };
  }
}

export const getUserAzureInfosQuery = (email?: UserModel['email']) => gql`
  query {
    getUser(input: { email: "${email}" }) {
      azureInfos { login }
    }
  }
`;

export const useGetUserAzureInfosQuery = (email?: UserModel['email']) =>
  useQuery<GetUserAzureInfos.Query>(getUserAzureInfosQuery(email), {
    fetchPolicy: 'no-cache',
  });
