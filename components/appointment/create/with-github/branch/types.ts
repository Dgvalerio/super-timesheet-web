import { Endpoints } from '@octokit/types';

namespace Branch {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/branches'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

export default Branch;
