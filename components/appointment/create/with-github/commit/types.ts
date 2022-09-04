import { FC } from 'react';

import { Endpoints } from '@octokit/types';

namespace Commit {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/commits'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];

  export interface Simple {
    id: Model['node_id'];
    last: NonNullable<Model['commit']['committer']>['date'];
    date: NonNullable<Model['commit']['committer']>['date'];
    stipulatedMinutes: number;
    message: Model['commit']['message'];
    url: Model['html_url'];
  }

  export interface ISelect {
    repository: string | null;
    branchSha: string | null;
    selected: Simple[];
    handleSelect(commit: Simple | []): void;
    completed: boolean;
  }
  export type Select = FC<ISelect>;

  export interface ICard {
    commit: Commit.Model;
    selected: boolean;
    handleSelect(): void;
    firstOfDay: boolean;
  }
  export type Card = FC<ICard>;
}

export default Commit;
