import { useEffect, useState } from 'react';

import Branch from '@/components/appointment/create/with-github/branch/types';
import Commit from '@/components/appointment/create/with-github/commit/types';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { useAppSelector } from '@/store/hooks';
import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

export type GithubUser = Endpoints['GET /user']['response']['data'];

export namespace GithubManagerTypes {
  export interface ICountOrganizationRepositories {
    publicRepositories: number;
    privateRepositories: number;
    totalRepositories: number;
  }

  export interface HookReturn {
    logged: boolean;
    countOrganizationRepositories(): Promise<ICountOrganizationRepositories>;
    getOrganizationRepositories(): Promise<Repository.List>;
    getRepositoryBranches(repo: string): Promise<Branch.List>;
    getBranchCommits(repo: string, sha: string): Promise<Commit.List>;
    getUserRepositories(username: string): Promise<Repository.List>;
    getCurrentUser(): Promise<GithubUser>;
  }

  export type Hook = () => HookReturn;
}

const org = 'lubysoftware';

export const useGithubManager: GithubManagerTypes.Hook = () => {
  const { githubToken } = useAppSelector((state) => state.user);
  const [manager, setManager] = useState<Octokit>(new Octokit());

  const countOrganizationRepositories =
    async (): Promise<GithubManagerTypes.ICountOrganizationRepositories> => {
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

  const getUserRepositories = async (
    username: string
  ): Promise<Repository.List> => {
    const {
      data: {
        public_repos: publicRepos,
        total_private_repos: totalPrivateRepos,
      },
    } = await manager.request('GET /user');

    const response = await manager.request('GET /users/{username}/repos', {
      username,
      per_page: publicRepos + (totalPrivateRepos || 0),
    });

    return response.data;
  };

  useEffect(() => {
    if (githubToken) setManager(new Octokit({ auth: githubToken }));
  }, [githubToken]);

  return {
    logged: !!githubToken,
    countOrganizationRepositories,
    getOrganizationRepositories,
    getRepositoryBranches,
    getBranchCommits,
    getUserRepositories,
    getCurrentUser,
  };
};
