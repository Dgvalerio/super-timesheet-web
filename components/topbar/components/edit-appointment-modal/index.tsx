import React, { FC } from 'react';

import FormSkeleton from '@/components/appointment/create/form/skeleton';
import { InputField } from '@/components/input-field';
import useController from '@/components/topbar/components/edit-appointment-modal/controller';
import { AppointmentModel } from '@/models/appointment';
import {
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Divider,
  Typography,
} from '@mui/material';

const EditAppointmentModal: FC<{
  open: boolean;
  closeEditModal: () => void;
  appointmentId: AppointmentModel['id'];
}> = ({ open, closeEditModal, appointmentId }) => {
  const {
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
  } = useController({ appointmentId });

  return (
    <Modal open={open} onClose={closeEditModal} sx={{ display: 'flex' }}>
      {loading ? (
        <FormSkeleton />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item component={Paper} sx={{ padding: 3 }} xs={8}>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              component="form"
              onSubmit={handleSubmit}
              justifyContent="space-between"
            >
              <Grid item xs={12}>
                <Typography variant="h5" paragraph>
                  Editar apontamento
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  select
                  label="Cliente"
                  name="clientInput"
                  value={client}
                  onChange={updateField}
                  disabled={clients.length <= 0}
                  error={!!clientError}
                  helperText={clientError}
                >
                  {clients.map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </InputField>
              </Grid>
              <Grid item xs={4}>
                <InputField
                  select
                  label="Projeto"
                  name="projectInput"
                  value={project}
                  onChange={updateField}
                  disabled={projects.length <= 0}
                  error={!!projectError}
                  helperText={projectError}
                >
                  {projects.map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </InputField>
              </Grid>
              <Grid item xs={4}>
                <InputField
                  select
                  label="Categoria"
                  name="categoryInput"
                  value={category}
                  onChange={updateField}
                  disabled={categories.length <= 0}
                  error={!!categoryError}
                  helperText={categoryError}
                >
                  {categories.map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </InputField>
              </Grid>
              <Grid item xs={4}>
                <InputField
                  label="Data"
                  type="date"
                  onChange={updateField}
                  name="dateInput"
                  value={date}
                  error={!!dateError}
                  helperText={dateError}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  label="Hora Inicial"
                  type="time"
                  onChange={updateField}
                  name="startTimeInput"
                  value={startTime}
                  error={!!startTimeError}
                  helperText={startTimeError}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  label="Hora Final"
                  type="time"
                  onChange={updateField}
                  name="endTimeInput"
                  value={endTime}
                  error={!!endTimeError}
                  helperText={endTimeError}
                />
              </Grid>
              {commitVisible && (
                <Grid item xs={12}>
                  <InputField
                    name="commitInput"
                    label="Link do commit"
                    onChange={updateField}
                    value={commit}
                    error={!!commitError}
                    helperText={commitError}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <InputField
                  label="Informe a Descrição"
                  multiline
                  onChange={updateField}
                  name="descriptionInput"
                  value={description}
                  error={!!descriptionError}
                  helperText={descriptionError}
                  rows={4}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="notMonetizeInput"
                      checked={notMonetize}
                      onChange={updateField}
                    />
                  }
                  label="Não Contabilizado?"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  type="button"
                  color="error"
                  onClick={closeEditModal}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" type="submit" disabled={loading}>
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Modal>
  );
};

export default EditAppointmentModal;
