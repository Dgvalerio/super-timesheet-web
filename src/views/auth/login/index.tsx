import { NextPage } from 'next';
import Head from 'next/head';

import { Grid, Typography } from '@mui/material';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid>
        <Grid>
          <Typography variant="h1">Login Page</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
