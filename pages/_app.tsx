import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { apolloClient } from '@/api/apollo';
import StyleWrapper from '@/components/style-wrapper';
import { store, toPersist } from '@/store';
import { ApolloProvider } from '@apollo/client';

import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>Super Timesheet</title>
      <meta name="description" content="The assistant for timesheet" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <ReduxProvider store={store}>
      <PersistGate persistor={toPersist}>
        <ApolloProvider client={apolloClient}>
          <StyleWrapper>
            <Component {...pageProps} />
            <ToastContainer />
          </StyleWrapper>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  </>
);

export default MyApp;
