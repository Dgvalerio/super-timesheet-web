import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useAppSelector } from '@/hooks/store';
import {
  CreateAzureInfosForm,
  useCreateAzureInfosMutation,
} from '@/models/azure-infos/create';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

interface ControllerReturn {
  loading: boolean;
  handleSubmit: (event: FormEvent<CreateAzureInfosForm>) => void;
}

const useAzureInfosCreateController = (): ControllerReturn => {
  const router = useRouter();
  const { id } = useAppSelector(({ user }) => user);
  const [createAzureInfos] = useCreateAzureInfosMutation();

  const [loading, setLoading] = useState(true);

  const goDashboard = () => {
    setLoading(true);
    void router.push(routes.dashboard());
  };

  const handleSubmit = async (event: FormEvent<CreateAzureInfosForm>) => {
    event.preventDefault();

    const { loginInput, passwordInput } = event.currentTarget;

    const login = loginInput.value;
    const password = passwordInput.value;

    if (!login || !password || !id) {
      return toast.error(errorMessages.emptyFields);
    }

    setLoading(true);

    try {
      const { data } = await createAzureInfos({
        variables: { input: { login, password, userId: id } },
      });

      if (data && data.createAzureInfos.id) {
        toast.success(successMessages.azureInfosCreated);

        goDashboard();
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    handleSubmit,
  };
};

export default useAzureInfosCreateController;
