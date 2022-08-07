import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Styles from '@/components/layout/style';
import Loading from '@/components/loading';
import SideBar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import { useAppSelector } from '@/store/hooks';
import { routes, Routes } from '@/utils/pages';
import { Backdrop, CircularProgress, Grid } from '@mui/material';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { name } = useAppSelector((state) => state.user);

  useEffect(() => setLoading(false), []);

  if (
    router.pathname === Routes.Dashboard ||
    router.pathname === Routes.UpdateUser ||
    router.pathname === Routes.CreateAppointment ||
    router.pathname === Routes.ReadAppointments ||
    router.pathname === Routes.CreateAzureInfos ||
    router.pathname === Routes.SystemOperation
  ) {
    if (!name) {
      void router.push(routes.home());

      return <Loading />;
    }

    return (
      <Styles.Authenticated>
        <TopBar name={name} />
        <Grid container className="main">
          <SideBar />
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Styles.Authenticated>
    );
  } else if (
    router.pathname === Routes.Home ||
    router.pathname === Routes.AuthLogin ||
    router.pathname === Routes.CreateUser
  ) {
    if (name) {
      void router.push(routes.dashboard());

      return <Loading />;
    }

    return (
      <Styles.Unauthenticated>
        <Grid container spacing={2} justifyContent="center">
          {children}
        </Grid>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Styles.Unauthenticated>
    );
  } else {
    return <Styles.Unauthenticated>{children}</Styles.Unauthenticated>;
  }
};

export default Layout;
