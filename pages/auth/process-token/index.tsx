import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Loading from '@/components/loading';
import { useAppDispatch } from '@/store/hooks';
import { loadGithubToken } from '@/store/user/actions';
import { routes } from '@/utils/pages';

const ProcessTokenPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!router.query.code) {
      void router.push(routes.dashboard());

      return;
    }

    loadGithubToken(dispatch, router.query.code as string).then(() =>
      router.push(routes.appointment.createWithGithub())
    );
  }, [dispatch, router]);

  return <Loading />;
};

export default ProcessTokenPage;
