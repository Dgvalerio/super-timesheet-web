import { FC } from 'react';

import { Endpoints } from '@octokit/types';

namespace Branch {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/branches'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];

  export interface Simple {
    name: Model['name'];
    sha: Model['commit']['sha'];
  }

  export interface ISelect {
    repository: string | null;
    selected: Simple | null;
    handleSelect(name: Simple | null): void;
  }
  export type Select = FC<ISelect>;

  export interface ICard {
    branch: Model;
    handleClick: ISelect['handleSelect'];
  }
  export type Card = FC<ICard>;
}

export default Branch;
