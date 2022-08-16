import { FC } from 'react';

import { Endpoints } from '@octokit/types';

namespace Commit {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/commits'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];

  export interface ISelect {
    repository: string | null;
    branchSha: string | null;
    selected: List;
    handleSelect(commits: List): void;
  }
  export type Select = FC<ISelect>;
}

export default Commit;
