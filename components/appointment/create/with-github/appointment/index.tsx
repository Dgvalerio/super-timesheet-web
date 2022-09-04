import React, { FC } from 'react';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import useController from '@/components/appointment/create/with-github/appointment/controller';
import FormSkeleton from '@/components/appointment/create/with-github/appointment/skeleton';
import { appointmentTheme } from '@/components/appointment/create/with-github/appointment/style';
import Commit from '@/components/appointment/create/with-github/commit/types';
import InputField from '@/components/input-field';

const CreateAppointmentForm: FC<{ commits: Commit.Simple[] }> = ({
  commits,
}) => {
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
  } = useController({ commits });

  return (
    <ThemeProvider theme={appointmentTheme}>
      {loading ? (
        <FormSkeleton />
      ) : (
        <Grid
          item
          xs={12}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <InputField
              colored
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
              colored
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
              colored
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
              colored
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
              colored
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
              colored
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
                colored
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
              colored
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
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              color="success"
              disabled={loading}
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default CreateAppointmentForm;
