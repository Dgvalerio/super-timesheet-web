import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export interface GetTokenRouteResponse {
  access_token: string;
  token_type: 'bearer';
  scope: 'read:user,user:email';
}

const GetTokenRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<GetTokenRouteResponse>
): Promise<void> => {
  const params = [
    `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
    `client_secret=${process.env.CLIENT_SECRET}`,
    `code=${req.query.code}`,
  ];

  const response = await axios.get<GetTokenRouteResponse>(
    `https://github.com/login/oauth/access_token?${params.join(`&`)}`,
    { headers: { Accept: 'application/json' } }
  );

  res.status(200).json(response.data);
};

export default GetTokenRoute;
