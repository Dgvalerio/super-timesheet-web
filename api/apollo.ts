import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

import { createClient } from 'graphql-ws';

const getLocalStorageToken = (): string => {
  try {
    const storage = localStorage.getItem('persist:super-timesheet-web');
    const { user } = JSON.parse(`${storage}`);
    const { token } = JSON.parse(user);

    return token ? `Bearer ${token}` : '';
  } catch (e) {
    return '';
  }
};

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `${process.env.NEXT_PUBLIC_WS_URL}`,
          connectionParams: { token: getLocalStorageToken() },
        })
      )
    : null;

const httpLink = createHttpLink({ uri: `${process.env.NEXT_PUBLIC_API_URI}` });

const authLink = setContext((_, { headers }) => ({
  headers: { ...headers, authorization: getLocalStorageToken() },
}));

const wsAuthLink = wsLink ? authLink.concat(wsLink) : wsLink;
const httpAuthLink = authLink.concat(httpLink);

const splitLink =
  typeof window !== 'undefined' && wsAuthLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);

          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsAuthLink,
        httpAuthLink
      )
    : httpAuthLink;

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
