import { GithubUser, ICountRepositories } from '@/api/github';
import Branch from '@/components/appointment/create/with-github/branch/types';
import Commit from '@/components/appointment/create/with-github/commit/types';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { persistName } from '@/utils/zustand';
import { Octokit } from '@octokit/core';

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GithubStore {
  org: 'lubysoftware';

  token?: string;

  saveGithubToken(token: string): void;
  removeGithubToken(): void;
  manager(): Octokit;
  countOrganizationRepositories(): Promise<ICountRepositories>;
  getOrganizationRepositories(): Promise<Repository.List>;
  getRepositoryBranches(repo: string): Promise<Branch.List>;
  getBranchCommits(repo: string, sha: string): Promise<Commit.List>;
  countUserRepositories(): Promise<ICountRepositories>;
  getUserRepositories(): Promise<Repository.List>;
  getCurrentUser(): Promise<GithubUser>;
}

const useGithubStore = create<GithubStore>()(
  devtools(
    persist(
      (set, get) => ({
        org: 'lubysoftware',

        manager(): Octokit {
          const auth = get().token;

          return auth ? new Octokit({ auth }) : new Octokit();
        },

        saveGithubToken(token): void {
          set({ token });
        },

        removeGithubToken(): void {
          set({ token: undefined });
        },

        async countOrganizationRepositories(): Promise<ICountRepositories> {
          const { data } = await get().manager().request('GET /orgs/{org}', {
            org: get().org,
          });

          const aux = {
            publicRepositories: data.public_repos,
            privateRepositories: data.total_private_repos || 0,
          };

          return {
            ...aux,
            totalRepositories: aux.publicRepositories + aux.privateRepositories,
          };
        },

        async getOrganizationRepositories(): Promise<Repository.List> {
          const count = await get().countOrganizationRepositories();

          const response = await get()
            .manager()
            .request('GET /orgs/{org}/repos', {
              org: get().org,
              per_page: count.totalRepositories,
            });

          return response.data;
        },

        async getRepositoryBranches(repo): Promise<Branch.List> {
          const response = await get()
            .manager()
            .request('GET /repos/{owner}/{repo}/branches', {
              owner: get().org,
              repo,
            });

          return response.data;
        },

        async getCurrentUser(): Promise<GithubUser> {
          const response = await get().manager().request('GET /user');

          return response.data;
        },

        async getBranchCommits(repo, sha): Promise<Commit.List> {
          const currentUser = await get().getCurrentUser();

          const options = {
            owner: get().org,
            author: currentUser.login,
            repo,
            sha,
            per_page: 100,
          };

          const response = await get()
            .manager()
            .request('GET /repos/{owner}/{repo}/commits', options);

          if (!response.headers.link) return response.data;

          const search = /page=(\d+)>; rel="last"/gm;

          const execArray = search.exec(response.headers.link);

          if (!execArray) return response.data;

          let list: Commit.List = [];

          const pages = Number(execArray[1]);

          for (let page = 1; page <= pages; page++) {
            const response = await get()
              .manager()
              .request('GET /repos/{owner}/{repo}/commits', {
                ...options,
                page,
              });

            list = list.concat(response.data);
          }

          return list;
        },

        async countUserRepositories(): Promise<ICountRepositories> {
          const { data } = await get().manager().request('GET /user');

          const aux = {
            publicRepositories: data.public_repos,
            privateRepositories: data.total_private_repos || 0,
          };

          return {
            ...aux,
            totalRepositories: aux.publicRepositories + aux.privateRepositories,
          };
        },

        async getUserRepositories(): Promise<Repository.List> {
          const current = await get().getCurrentUser();
          const count = await get().countUserRepositories();

          const response = await get()
            .manager()
            .request('GET /users/{username}/repos', {
              username: current.login,
              per_page: count.totalRepositories,
            });

          return response.data;
        },
      }),
      { name: persistName('github') }
    )
  )
);

export default useGithubStore;
