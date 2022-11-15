import Branch from '@/components/appointment/create/with-github/branch/types';
import Commit from '@/components/appointment/create/with-github/commit/types';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { Endpoints } from '@octokit/types';

export type GithubUser = Endpoints['GET /user']['response']['data'];

export interface ICountRepositories {
  publicRepositories: number;
  privateRepositories: number;
  totalRepositories: number;
}

export namespace GithubManagerTypes {
  export interface Return {
    logged: boolean;
    countOrganizationRepositories(): Promise<ICountRepositories>;
    getOrganizationRepositories(): Promise<Repository.List>;
    getRepositoryBranches(repo: string): Promise<Branch.List>;
    getBranchCommits(repo: string, sha: string): Promise<Commit.List>;
    countUserRepositories(): Promise<ICountRepositories>;
    getUserRepositories(): Promise<Repository.List>;
    getCurrentUser(): Promise<GithubUser>;
  }

  export type Manager = () => Return;
}

const scopes = ['repo', 'user'];
const params = [
  `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
  `scope=${scopes.join(',')}`,
];

export const authorizeLink = `https://github.com/login/oauth/authorize?${params.join(
  `&`
)}`;
