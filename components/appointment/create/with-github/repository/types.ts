import { FC } from 'react';

import { Endpoints } from '@octokit/types';

namespace Repository {
  export type Endpoint = Endpoints['GET /orgs/{org}/repos'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];

  export interface ISelect {
    selected: string | null;
    handleSelect(name: string | null): void;
  }
  export type Select = FC<ISelect>;

  export interface ICard {
    repository: Model;
    handleClick: ISelect['handleSelect'];
  }
  export type Card = FC<ICard>;

  export interface ISelected {
    text: string;
    name: ISelect['selected'];
    color: string;
    handleReset(): void;
  }
  export type Selected = FC<ISelected>;
}

export default Repository;
