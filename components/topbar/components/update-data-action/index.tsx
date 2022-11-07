import React, { FC } from 'react';
import { toast } from 'react-toastify';

import { Cached as UpdateIcon } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';

import WatchUpdateDataModal from '@/components/topbar/components/watch-update-data-modal';
import { useUpdateDataMutation } from '@/models/scrapper/update';
import { ApolloError } from '@apollo/client';

const UpdateDataAction: FC = () => {
  const [updateData, { loading: loadingUpdateData }] = useUpdateDataMutation();

  const handleUpdateData = async (): Promise<void> => {
    if (loadingUpdateData) return;

    try {
      await updateData();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  return (
    <>
      <Tooltip
        title={`${loadingUpdateData ? 'Atualizando' : 'Atualizar'} dados`}
        arrow
      >
        <IconButton
          size="large"
          aria-label="Atualizar clientes, projetos, categorias..."
          color="inherit"
          onClick={handleUpdateData}
        >
          {loadingUpdateData ? (
            <CircularProgress size={24} />
          ) : (
            <UpdateIcon color="disabled" />
          )}
        </IconButton>
      </Tooltip>
      <WatchUpdateDataModal open={loadingUpdateData} />
    </>
  );
};

export default UpdateDataAction;
