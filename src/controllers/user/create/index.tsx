import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { apolloClient } from '@/api/apollo';
import { UserModel } from '@/models/user';
import { CreateUserForm } from '@/models/user/create';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError, gql } from '@apollo/client';

interface ControllerReturn {
  loading: boolean;
  goLogin: () => void;
  handleSubmit: (event: FormEvent<CreateUserForm>) => void;
}

const useUserCreateController = (): ControllerReturn => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const goLogin = () => {
    setLoading(true);
    void router.push(routes.auth.login());
  };

  const handleSubmit = async (event: FormEvent<CreateUserForm>) => {
    event.preventDefault();

    const { nameInput, emailInput, passwordInput } = event.currentTarget;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!name || !email || !password) {
      toast.error(errorMessages.emptyFields);
    }

    setLoading(true);

    try {
      const { data } = await apolloClient.mutate<{ createUser: UserModel }>({
        mutation: gql`
          mutation {
            createUser(input: {
              name: "${name}"
              email: "${email}"
              password: "${password}"
            }) { id }
          }
        `,
      });

      if (data && data.createUser.id) {
        toast.success(successMessages.userCreated);

        goLogin();
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    goLogin,
    handleSubmit,
  };
};

export default useUserCreateController;
