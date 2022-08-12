import { Endpoints } from '@octokit/types';

namespace Commit {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/commits'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

export default Commit;
