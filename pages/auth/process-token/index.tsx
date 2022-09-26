import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Loading from '@/components/loading';
import { GetTokenRouteResponse } from '@/pages/api/github/get-token';
import { useAppDispatch } from '@/store/hooks';
import { routes } from '@/utils/pages';

import axios from 'axios';

export const GITHUB_TOKEN_KEY = 'super-timesheet-web:github-token-key';

const loadGithubToken = async (code: string): Promise<void> => {
  const res = await axios.get<GetTokenRouteResponse>(
    `/api/github/get-token?code=${code}`
  );

  if (!res.data.access_token) return;

  window.localStorage.setItem(GITHUB_TOKEN_KEY, res.data.access_token);
};

const ProcessTokenPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!router.query.code) {
      void router.push(routes.dashboard());

      return;
    }

    loadGithubToken(router.query.code as string).then(() =>
      router.push(routes.appointment.createWithGithub())
    );
  }, [dispatch, router]);

  return <Loading />;
};

export default ProcessTokenPage;
