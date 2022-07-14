import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { CreateUserForm, useCreateUserMutation } from '@/models/user/create';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

interface ControllerReturn {
  loading: boolean;
  goLogin: () => void;
  handleSubmit: (event: FormEvent<CreateUserForm>) => void;
}

const useUserCreateController = (): ControllerReturn => {
  const router = useRouter();

  const [createUser] = useCreateUserMutation();

  const [loading, setLoading] = useState(true);

  const goLogin = () => {
    setLoading(true);
    void router.push(routes.auth.login());
  };

  const handleSubmit = async (event: FormEvent<CreateUserForm>) => {
    event.preventDefault();

    const {
      nameInput,
      emailInput,
      passwordInput,
      dailyHoursInput,
      passwordConfirmationInput,
    } = event.currentTarget;

    const name = nameInput.value;
    const email = emailInput.value;
    const dailyHours = +dailyHoursInput.value;
    const password = passwordInput.value;
    const passwordConfirmation = passwordConfirmationInput.value;

    if (!name || !email || !dailyHours || !password || !passwordConfirmation) {
      return toast.error(errorMessages.emptyFields);
    }

    setLoading(true);

    try {
      const { data } = await createUser({
        variables: {
          input: {
            name,
            email,
            dailyHours,
            password,
            passwordConfirmation,
          },
        },
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
