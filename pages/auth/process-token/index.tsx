import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Loading from '@/components/loading';
import { GetTokenRouteResponse } from '@/pages/api/github/get-token';
import useGithubStore from '@/store/github';
import { routes } from '@/utils/pages';

import axios from 'axios';

const loadGithubToken = async (code: string): Promise<string | undefined> => {
  const res = await axios.get<GetTokenRouteResponse>(
    `/api/github/get-token?code=${code}`
  );

  return res.data.access_token;
};

const ProcessTokenPage: NextPage = () => {
  const router = useRouter();
  const { saveGithubToken } = useGithubStore();

  useEffect(() => {
    if (!router.query.code) {
      void router.push(routes.dashboard());

      return;
    }

    loadGithubToken(router.query.code as string).then((token) => {
      if (token) saveGithubToken(token);
      void router.push(routes.appointment.createWithGithub());
    });
  }, [router, saveGithubToken]);

  return <Loading />;
};

export default ProcessTokenPage;
