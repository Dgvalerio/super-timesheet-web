import { useState } from 'react';
import { toast } from 'react-toastify';

import { AppointmentModel } from '@/models/appointment';
import { useDeleteAppointmentMutation } from '@/models/appointment/delete';
import {
  getAllAppointmentsQuery,
  getCurrentMonthWorkedTimeQuery,
} from '@/models/appointment/get';
import { successMessages } from '@/utils/errorMessages';
import { getTimeDifference } from '@/utils/time';
import { ApolloError } from '@apollo/client';

interface ControllerProps {
  appointment: AppointmentModel;
}

interface ControllerReturn {
  collapsed: boolean;
  editOpen: boolean;
  loadingDelete: boolean;
  dayText: string;
  timeDifference: string;
  toggleCollapsed: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
  handleDelete: () => Promise<void>;
}

type Controller = (props: ControllerProps) => ControllerReturn;

const useAppointmentCardController: Controller = ({
  appointment: { id, date, startTime, endTime },
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const dayText = new Date(date.split('.')[0]).toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeDifference = getTimeDifference(date, startTime, endTime);

  const toggleCollapsed = (): void => setCollapsed((prevState) => !prevState);

  const openEditModal = (): void => setEditOpen(true);

  const closeEditModal = (): void => setEditOpen(false);

  const handleDelete = async (): Promise<void> => {
    setLoadingDelete(true);

    try {
      await deleteAppointment({
        variables: { input: { id } },
        refetchQueries: [
          getAllAppointmentsQuery,
          getCurrentMonthWorkedTimeQuery,
        ],
      });

      toast.success(successMessages.appointmentCreated);
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    collapsed,
    editOpen,
    loadingDelete,
    dayText,
    timeDifference,
    toggleCollapsed,
    openEditModal,
    closeEditModal,
    handleDelete,
  };
};

export default useAppointmentCardController;
