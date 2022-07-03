import React, { FC, ReactNode } from 'react';

import Head from 'next/head';

import Loading from '@/components/loading';
import useController from '@/components/main-wrapper/controller';
import Styles from '@/components/main-wrapper/style';
import SideBar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import { Backdrop, CircularProgress, Grid } from '@mui/material';

const MainWrapper: FC<{
  children: ReactNode;
  title: string;
  loading: boolean;
}> = ({ children, title, loading }) => {
  const { name, goHome } = useController();

  if (!name) {
    goHome();

    return <Loading />;
  }

  return (
    <Styles.Container>
      <Head>
        <title>{title}</title>
      </Head>
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
    </Styles.Container>
  );
};

export default MainWrapper;
