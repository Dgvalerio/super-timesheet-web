import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/hooks/store';
import {
  CreateAppointmentForm,
  useCreateAppointmentMutation,
} from '@/models/appointment/create';
import { getAllAppointmentsQuery } from '@/models/appointment/get';
import { GetUserClients, useGetUserClientsQuery } from '@/models/user/get';
import { distinctByCode } from '@/utils/distinctByCode';
import { successMessages } from '@/utils/errorMessages';
import { ApolloError } from '@apollo/client';

import { compareAsc, format } from 'date-fns';

interface ControllerReturn {
  clients: GetUserClients.Client[];
  client: string;
  clientError: string | null;
  projects: GetUserClients.Project[];
  project: string;
  projectError: string | null;
  categories: GetUserClients.Category[];
  category: string;
  categoryError: string | null;
  date: string;
  dateError: string | null;
  startTime: string;
  startTimeError: string | null;
  endTime: string;
  endTimeError: string | null;
  notMonetize: boolean;
  description: string;
  descriptionError: string | null;
  commit: string;
  commitError: string | null;
  commitVisible: boolean;
  loading: boolean;
  handleSubmit: (event: FormEvent<CreateAppointmentForm>) => Promise<void>;
  updateField: (event: ChangeEvent<HTMLInputElement>) => void;
}

export enum InputName {
  Client = 'clientInput',
  Project = 'projectInput',
  Category = 'categoryInput',
  Date = 'dateInput',
  StartTime = 'startTimeInput',
  EndTime = 'endTimeInput',
  NotMonetize = 'notMonetizeInput',
  Description = 'descriptionInput',
  Commit = 'commitInput',
}

export type Controller = () => ControllerReturn;

interface ValidateDateTimeProps {
  date: string;
  startTime: string;
  endTime: string;
}

interface ValidateDateTimeReturn {
  dateError?: string;
  startTimeError?: string;
  endTimeError?: string;
}

const validateDateTime = ({
  date,
  startTime,
  endTime,
}: ValidateDateTimeProps): ValidateDateTimeReturn => {
  const errors: ValidateDateTimeReturn = {};

  const today = new Date();
  const todayZeroDate = new Date(`${format(today, 'yyyy-MM-dd')}T00:00`);
  const appointmentStartTime = new Date(`${date}T${startTime}`);
  const appointmentEndTime = new Date(`${date}T${endTime}`);

  if (compareAsc(new Date(`${date}T00:00`), todayZeroDate) > 0) {
    errors.dateError = 'O dia escolhido não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentStartTime, today) > 0) {
    errors.startTimeError = 'O horário inicial não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentEndTime, today) > 0) {
    errors.endTimeError = 'O horário final não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentStartTime, appointmentEndTime) > 0) {
    errors.startTimeError = 'O horário final deve ser maior que o inicial!';
    errors.endTimeError = 'O horário final deve ser maior que o inicial!';
  }

  return errors;
};

const useCreateAppointmentFormController: Controller = () => {
  const [loading, setLoading] = useState(true);
  const { email } = useAppSelector((state) => state.user);
  const [createAppointment] = useCreateAppointmentMutation();
  const { data: getUserClientsData, loading: getUserClientsLoading } =
    useGetUserClientsQuery(email);

  const [clients, setClients] = useState<GetUserClients.Client[]>([]);
  const [client, setClient] = useState<string>('');
  const [clientError, setClientError] = useState<string | null>(null);

  const [projects, setProjects] = useState<GetUserClients.Project[]>([]);
  const [project, setProject] = useState<string>('');
  const [projectError, setProjectError] = useState<string | null>(null);

  const [categories, setCategories] = useState<GetUserClients.Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateError, setDateError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<string>('00:00');
  const [startTimeError, setStartTimeError] = useState<string | null>(null);

  const [endTime, setEndTime] = useState<string>('00:01');
  const [endTimeError, setEndTimeError] = useState<string | null>(null);

  const [notMonetize, setNotMonetize] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [commitVisible, setCommitVisible] = useState<boolean>(false);

  const [commit, setCommit] = useState<string>('');
  const [commitError, setCommitError] = useState<string | null>(null);

  const validateField: {
    [key in InputName]: (value: string) => boolean;
  } = {
    [InputName.Client]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setClientError('Um cliente deve ser selecionado!');

        return false;
      }

      setClientError(null);

      return true;
    },
    [InputName.Project]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setProjectError('Um projeto deve ser selecionado!');

        return false;
      }

      setProjectError(null);

      return true;
    },
    [InputName.Category]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setCategoryError('Uma categoria deve ser selecionada!');

        return false;
      }

      setCategoryError(null);

      return true;
    },
    [InputName.Date]: (value: string) => {
      const { dateError, startTimeError, endTimeError } = validateDateTime({
        date: value,
        startTime,
        endTime,
      });

      setDateError(dateError ? dateError : null);
      setStartTimeError(startTimeError ? startTimeError : null);
      setEndTimeError(endTimeError ? endTimeError : null);

      return !(dateError || startTimeError || endTimeError);
    },
    [InputName.StartTime]: (value: string) => {
      const { dateError, startTimeError, endTimeError } = validateDateTime({
        date,
        startTime: value,
        endTime,
      });

      setDateError(dateError ? dateError : null);
      setStartTimeError(startTimeError ? startTimeError : null);
      setEndTimeError(endTimeError ? endTimeError : null);

      return !(dateError || startTimeError || endTimeError);
    },
    [InputName.EndTime]: (value: string) => {
      const { dateError, startTimeError, endTimeError } = validateDateTime({
        date,
        startTime,
        endTime: value,
      });

      setDateError(dateError ? dateError : null);
      setStartTimeError(startTimeError ? startTimeError : null);
      setEndTimeError(endTimeError ? endTimeError : null);

      return !(dateError || startTimeError || endTimeError);
    },
    [InputName.NotMonetize]: () => true,
    [InputName.Description]: (value: string) => {
      if (!value || value === '') {
        setDescriptionError('Uma descrição deve ser informada!');

        return false;
      }
      setDescriptionError(null);

      return true;
    },
    [InputName.Commit]: (value: string) => {
      if (commitVisible && (!value || value === '')) {
        setCommitError('Um link de commit deve ser informado!');

        return false;
      }
      setCommitError(null);

      return true;
    },
  };

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case InputName.Client:
        setClient(value);
        validateField[name](value);
        break;
      case InputName.Project:
        setProject(value);

        const projectCategories = projects.find(
          ({ code }) => code === value
        )?.categories;

        setCategories(projectCategories || []);
        validateField[name](value);
        break;
      case InputName.Category:
        setCategory(value);
        validateField[name](value);
        break;
      case InputName.Date:
        setDate(value);
        validateField[name](value);
        break;
      case InputName.StartTime:
        setStartTime(value);
        validateField[name](value);
        break;
      case InputName.EndTime:
        setEndTime(value);
        validateField[name](value);
        break;
      case InputName.NotMonetize:
        setNotMonetize(checked);
        break;
      case InputName.Description:
        setDescription(value);
        validateField[name](value);
        break;
      case InputName.Commit:
        setCommit(value);
        validateField[name](value);
        break;
      default:
        console.log({ name, value, checked });
    }
  };

  const handleSubmit = async (event: FormEvent<CreateAppointmentForm>) => {
    event.preventDefault();

    setLoading(true);

    if (
      !validateField[InputName.Client](client) ||
      !validateField[InputName.Project](project) ||
      !validateField[InputName.Category](category) ||
      !validateField[InputName.Date](date) ||
      !validateField[InputName.StartTime](startTime) ||
      !validateField[InputName.EndTime](endTime) ||
      !validateField[InputName.Description](description) ||
      !validateField[InputName.Commit](commit)
    ) {
      toast.warn('Verifique os campos do formulário!');
      setLoading(false);

      return;
    }

    try {
      await createAppointment({
        variables: {
          input: {
            commit,
            description,
            endTime,
            startTime,
            date: new Date(date),
            categoryCode: category,
            projectCode: project,
            notMonetize,
          },
        },
        refetchQueries: [getAllAppointmentsQuery],
      });

      toast.success(successMessages.appointmentCreated);
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(getUserClientsLoading);
  }, [getUserClientsLoading, setLoading]);

  // Load Clients
  useEffect(() => {
    if (getUserClientsLoading) return;

    if (getUserClientsData && getUserClientsData.getUser.projects) {
      const { projects } = getUserClientsData.getUser;

      const aux: GetUserClients.Client[] = [];

      projects.forEach((oneProject) =>
        aux.push({
          code: oneProject.client.code,
          name: oneProject.client.name,
          projects: oneProject.client.projects,
        })
      );

      setClients(distinctByCode(aux));
    }
  }, [getUserClientsData, getUserClientsLoading]);

  // Load projects of selected client
  useEffect(() => {
    setProject('');

    if (!client) return setProjects([]);

    const clientProjects = clients.find(
      ({ code }) => code === client
    )?.projects;

    setProjects(clientProjects || []);
  }, [client, clients]);

  // Load categories of selected project
  useEffect(() => {
    setCategory('');

    if (!project) return setCategories([]);

    const projectCategories = projects.find(
      ({ code }) => code === project
    )?.categories;

    setCategories(projectCategories || []);
  }, [project, projects]);

  // Set commit input visibility
  useEffect(() => {
    if (!category || !categories || categories.length === 0) {
      setCommitVisible(false);
    } else {
      const actualCategory = categories.find(({ code }) => code === category);

      setCommitVisible(actualCategory?.name === 'Desenvolvimento');
    }
  }, [categories, category]);

  return {
    clients,
    client,
    clientError,
    projects,
    project,
    projectError,
    categories,
    category,
    categoryError,
    date,
    dateError,
    startTime,
    startTimeError,
    endTime,
    endTimeError,
    notMonetize,
    description,
    descriptionError,
    commit,
    commitError,
    commitVisible,
    loading,
    handleSubmit,
    updateField,
  };
};

export default useCreateAppointmentFormController;
