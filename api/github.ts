import Branch from '@/components/appointment/create/with-github/branch/types';
import Commit from '@/components/appointment/create/with-github/commit/types';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { GITHUB_TOKEN_KEY } from '@/pages/auth/process-token';
import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

export type GithubUser = Endpoints['GET /user']['response']['data'];

export namespace GithubManagerTypes {
  export interface ICountRepositories {
    publicRepositories: number;
    privateRepositories: number;
    totalRepositories: number;
  }

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

const org = 'lubysoftware';

const scopes = ['repo', 'user'];
const params = [
  `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
  `scope=${scopes.join(',')}`,
];

export const authorizeLink = `https://github.com/login/oauth/authorize?${params.join(
  `&`
)}`;

export const githubManager: GithubManagerTypes.Manager = () => {
  const manager = new Octokit({
    auth: window.localStorage.getItem(GITHUB_TOKEN_KEY),
  });

  const countOrganizationRepositories =
    async (): Promise<GithubManagerTypes.ICountRepositories> => {
      const { data } = await manager.request('GET /orgs/{org}', { org });

      const aux = {
        publicRepositories: data.public_repos,
        privateRepositories: data.total_private_repos || 0,
      };

      return {
        ...aux,
        totalRepositories: aux.publicRepositories + aux.privateRepositories,
      };
    };

  const getOrganizationRepositories = async (): Promise<Repository.List> => {
    const count = await countOrganizationRepositories();

    const response = await manager.request('GET /orgs/{org}/repos', {
      org,
      per_page: count.totalRepositories,
    });

    return response.data;
  };

  const getRepositoryBranches = async (repo: string): Promise<Branch.List> => {
    const response = await manager.request(
      'GET /repos/{owner}/{repo}/branches',
      { owner: org, repo }
    );

    return response.data;
  };

  const getCurrentUser = async (): Promise<GithubUser> => {
    const response = await manager.request('GET /user');

    return response.data;
  };

  const getBranchCommits = async (
    repo: string,
    sha: string
  ): Promise<Commit.List> => {
    const currentUser = await getCurrentUser();

    const options = {
      owner: org,
      author: currentUser.login,
      repo,
      sha,
      per_page: 100,
    };

    const response = await manager.request(
      'GET /repos/{owner}/{repo}/commits',
      options
    );

    if (!response.headers.link) return response.data;

    const search = /page=(\d+)>; rel="last"/gm;

    const execArray = search.exec(response.headers.link);

    if (!execArray) return response.data;

    let list: Commit.List = [];

    const pages = Number(execArray[1]);

    for (let page = 1; page <= pages; page++) {
      const response = await manager.request(
        'GET /repos/{owner}/{repo}/commits',
        { ...options, page }
      );

      list = list.concat(response.data);
    }

    return list;
  };

  const countUserRepositories =
    async (): Promise<GithubManagerTypes.ICountRepositories> => {
      const { data } = await manager.request('GET /user');

      const aux = {
        publicRepositories: data.public_repos,
        privateRepositories: data.total_private_repos || 0,
      };

      return {
        ...aux,
        totalRepositories: aux.publicRepositories + aux.privateRepositories,
      };
    };

  const getUserRepositories = async (): Promise<Repository.List> => {
    const current = await getCurrentUser();
    const count = await countUserRepositories();

    const response = await manager.request('GET /users/{username}/repos', {
      username: current.login,
      per_page: count.totalRepositories,
    });

    return response.data;
  };

  return {
    logged: !!window.localStorage.getItem(GITHUB_TOKEN_KEY),
    countOrganizationRepositories,
    getOrganizationRepositories,
    getRepositoryBranches,
    getBranchCommits,
    countUserRepositories,
    getUserRepositories,
    getCurrentUser,
  };
};
