import { toast } from 'react-toastify';

import { ApolloError } from '@apollo/client';

const graphQLErrorsHandler = (apolloError?: ApolloError): void => {
  if (apolloError)
    apolloError.graphQLErrors.forEach(({ message }) => toast.error(message));
};

export default graphQLErrorsHandler;
