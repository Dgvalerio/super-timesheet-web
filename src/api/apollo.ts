import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}`,
});

const authLink = setContext((_, { headers }) => {
  try {
    const storage = localStorage.getItem('persist:super-timesheet-web');
    const { user } = JSON.parse(`${storage}`);
    const { token } = JSON.parse(user);

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    };
  } catch (e) {
    return {
      headers: { ...headers, authorization: '' },
    };
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
