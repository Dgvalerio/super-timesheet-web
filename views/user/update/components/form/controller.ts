import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { UserModel } from '@/models/user';
import { useGetUserQuery } from '@/models/user/get';
import {
  UpdateUser,
  UpdateUserForm,
  useUpdateUserMutation,
} from '@/models/user/update';
import { useAppSelector } from '@/store/hooks';
import { successMessages } from '@/utils/errorMessages';
import { ApolloError } from '@apollo/client';

interface ControllerReturn {
  name: UserModel['name'];
  nameError: string | null;
  email: UserModel['email'];
  emailError: string | null;
  dailyHours: UserModel['dailyHours'];
  dailyHoursError: string | null;
  password: UserModel['password'];
  passwordError: string | null;
  updatePassword: boolean;
  toggleUpdatePassword: () => void;
  newPassword: UserModel['password'];
  newPasswordError: string | null;
  newPasswordConfirmation: UserModel['password'];
  newPasswordConfirmationError: string | null;
  loading: boolean;
  handleSubmit: (event: FormEvent<UpdateUserForm>) => Promise<void>;
  updateField: (event: ChangeEvent<HTMLInputElement>) => void;
}

export enum InputName {
  Name = 'nameInput',
  Email = 'emailInput',
  DailyHours = 'dailyHoursInput',
  Password = 'passwordInput',
  NewPassword = 'newPasswordInput',
  NewPasswordConfirmation = 'newPasswordConfirmationInput',
}

export type Controller = () => ControllerReturn;

const useUpdateUserFormController: Controller = () => {
  const { email: actualEmail } = useAppSelector(({ user }) => user);
  const { data: getUserData, loading: getUserLoading } = useGetUserQuery({
    email: actualEmail,
  });

  const [loading, setLoading] = useState(true);
  const [updateUser] = useUpdateUserMutation();

  const [name, setName] = useState<UserModel['name']>('');
  const [nameError, setNameError] = useState<string | null>(null);

  const [email, setEmail] = useState<UserModel['email']>('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const [dailyHours, setDailyHours] = useState<UserModel['dailyHours']>(0);
  const [dailyHoursError, setDailyHoursError] = useState<string | null>(null);

  const [password, setPassword] = useState<UserModel['password']>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [updatePassword, setUpdatePassword] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<UserModel['password']>('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);

  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<UserModel['password']>('');
  const [newPasswordConfirmationError, setNewPasswordConfirmationError] =
    useState<string | null>(null);

  const validateField: {
    [InputName.Name]: (value: UserModel['name']) => boolean;
    [InputName.Email]: (value: UserModel['email']) => boolean;
    [InputName.DailyHours]: (value: UserModel['dailyHours']) => boolean;
    [InputName.Password]: (value: UserModel['password']) => boolean;
    [InputName.NewPassword]: (value: UserModel['password']) => boolean;
    [InputName.NewPasswordConfirmation]: (
      value: UserModel['password']
    ) => boolean;
  } = {
    [InputName.Name]: (value: UserModel['name']) => {
      if (!value || value === '') {
        setNameError('Um nome deve ser informado!');

        return false;
      }
      setNameError(null);

      return true;
    },
    [InputName.Email]: (value: UserModel['email']) => {
      if (!value || value === '') {
        setEmailError('Um e-mail deve ser informado!');

        return false;
      }
      setEmailError(null);

      return true;
    },
    [InputName.DailyHours]: (value: UserModel['dailyHours']) => {
      if (!value || value === 0) {
        setDailyHoursError('Uma carga horária deve ser informada!');

        return false;
      }
      setDailyHoursError(null);

      return true;
    },
    [InputName.Password]: (value: UserModel['password']) => {
      if (!value || value === '') {
        setPasswordError('Uma senha deve ser informada!');

        return false;
      }
      setPasswordError(null);

      return true;
    },
    [InputName.NewPassword]: (value: UserModel['password']) => {
      if (!value || value === '') {
        setNewPasswordError('Uma senha deve ser informada!');

        return false;
      }
      setNewPasswordError(null);

      return true;
    },
    [InputName.NewPasswordConfirmation]: (value: UserModel['password']) => {
      if (!value || value === '') {
        setNewPasswordConfirmationError(
          'Uma confirmação da nova senha deve ser informada!'
        );

        return false;
      } else if (value !== newPasswordConfirmation) {
        setNewPasswordConfirmationError(
          'A confirmação senha da nova senha deve ser igual a nova senha!'
        );

        return false;
      }
      setNewPasswordConfirmationError(null);

      return true;
    },
  };

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case InputName.Name:
        setName(value);
        validateField[name](value);
        break;
      case InputName.Email:
        setEmail(value);
        validateField[name](value);
        break;
      case InputName.DailyHours:
        setDailyHours(+value);
        validateField[name](+value);
        break;
      case InputName.Password:
        setPassword(value);
        validateField[name](value);
        break;
      case InputName.NewPassword:
        setNewPassword(value);
        validateField[name](value);
        break;
      case InputName.NewPasswordConfirmation:
        setNewPasswordConfirmation(value);
        validateField[name](value);
        break;
      default:
    }
  };

  const handleSubmit = async (event: FormEvent<UpdateUserForm>) => {
    event.preventDefault();

    setLoading(true);

    if (
      !validateField[InputName.Name](name) ||
      !validateField[InputName.Email](email) ||
      !validateField[InputName.DailyHours](dailyHours) ||
      !validateField[InputName.Password](password)
    ) {
      toast.warn('Verifique os campos do formulário!');
      setLoading(false);

      return;
    }

    if (
      updatePassword &&
      (!validateField[InputName.NewPassword](newPassword) ||
        !validateField[InputName.NewPasswordConfirmation](
          newPasswordConfirmation
        ))
    ) {
      toast.warn('Verifique os campos do formulário!');
      setLoading(false);

      return;
    }

    try {
      let input: UpdateUser.Mutation['input'] = {
        name,
        email,
        dailyHours,
        password,
      };

      if (updatePassword) {
        input = { ...input, newPassword, newPasswordConfirmation };
      }

      await updateUser({
        variables: { input },
      });

      toast.success(successMessages.userUpdated);
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleUpdatePassword = () =>
    setUpdatePassword((prevState) => !prevState);

  useEffect(() => {
    if (getUserLoading) {
      setLoading(true);
    } else {
      setName(getUserData?.getUser.name || '');
      setEmail(getUserData?.getUser.email || '');
      setDailyHours(getUserData?.getUser.dailyHours || 0);
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirmation('');
      setLoading(false);
    }
  }, [getUserData, getUserLoading]);

  return {
    name,
    nameError,
    email,
    emailError,
    dailyHours,
    dailyHoursError,
    password,
    passwordError,
    updatePassword,
    toggleUpdatePassword,
    newPassword,
    newPasswordError,
    newPasswordConfirmation,
    newPasswordConfirmationError,
    loading,
    handleSubmit,
    updateField,
  };
};

export default useUpdateUserFormController;
