import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { apolloClient } from '@/api/apollo';
import { useAppDispatch } from '@/hooks/store';
import { AuthForm, AuthOutput } from '@/models/auth/login';
import { saveUser } from '@/store/user/actions';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError, gql } from '@apollo/client';

interface ControllerReturn {
  loading: boolean;
  goUserCreate: () => void;
  handleSubmit: (event: FormEvent<AuthForm>) => void;
}

const useAuthLoginController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const goUserCreate = () => {
    setLoading(true);
    void router.push(routes.user.create());
  };

  const handleSubmit = async (event: FormEvent<AuthForm>) => {
    event.preventDefault();

    const { emailInput, passwordInput } = event.currentTarget;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      toast.error(errorMessages.emptyFields);
    }

    setLoading(true);

    try {
      const { data } = await apolloClient.mutate<{ login: AuthOutput }>({
        mutation: gql`
          mutation {
            login(input: {
              email: "${email}"
              password: "${password}"
            }) {
              user {
                id
                name
                email
                dailyHours
              }
              token
            }
          }
        `,
      });

      if (data && data.login.token) {
        dispatch(saveUser({ token: data.login.token, user: data.login.user }));

        toast.success(successMessages.userSigned);

        await router.push(routes.dashboard());
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);

      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    goUserCreate,
    handleSubmit,
  };
};

export default useAuthLoginController;
