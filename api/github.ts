import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: `https://api.github.com/graphql` });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
}));

const githubClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default githubClient;
