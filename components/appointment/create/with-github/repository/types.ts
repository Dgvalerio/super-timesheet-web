import { Endpoints } from '@octokit/types';

namespace Repository {
  export type Endpoint = Endpoints['GET /users/{username}/repos'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

export default Repository;
