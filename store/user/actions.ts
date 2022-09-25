import { GetTokenRouteResponse } from '@/pages/api/github/get-token';
import { AppDispatch } from '@/store';
import { actions } from '@/store/user/slice';

import axios from 'axios';

const { saveUser, wipeUser, setGithubToken } = actions;

const loadGithubToken = async (
  dispatch: AppDispatch,
  code: string
): Promise<void> => {
  const res = await axios.get<GetTokenRouteResponse>(
    `/api/github/get-token?code=${code}`
  );

  if (!res.data.access_token) return;

  dispatch(setGithubToken({ token: res.data.access_token }));
};

export { saveUser, wipeUser, loadGithubToken };
