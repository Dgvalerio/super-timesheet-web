import React, { FC } from 'react';

import { Checkbox, FormControlLabel, Grid, MenuItem } from '@mui/material';

import useController from '@/components/appointment/create/form/controller';
import FormSkeleton from '@/components/appointment/create/form/skeleton';
import ButtonWithCombo from '@/components/button-with-combo';
import InputField, { InputFieldProps } from '@/components/input-field';

const InputGrid: FC<InputFieldProps & { xs: number }> = ({ xs, ...props }) => (
  <Grid item xs={xs}>
    <InputField {...props} />
  </Grid>
);

const CreateAppointmentForm: FC = () => {
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
  } = useController();

  return loading ? (
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
      <InputGrid
        xs={4}
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
      </InputGrid>
      <InputGrid
        xs={4}
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
      </InputGrid>
      <InputGrid
        xs={4}
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
      </InputGrid>
      <InputGrid
        xs={4}
        label="Data"
        type="date"
        onChange={updateField}
        name="dateInput"
        value={date}
        error={!!dateError}
        helperText={dateError}
      />
      <InputGrid
        xs={4}
        label="Hora Inicial"
        type="time"
        onChange={updateField}
        name="startTimeInput"
        value={startTime}
        error={!!startTimeError}
        helperText={startTimeError}
      />
      <InputGrid
        xs={4}
        label="Hora Final"
        type="time"
        onChange={updateField}
        name="endTimeInput"
        value={endTime}
        error={!!endTimeError}
        helperText={endTimeError}
      />

      {commitVisible && (
        <InputGrid
          xs={12}
          name="commitInput"
          label="Link do commit"
          onChange={updateField}
          value={commit}
          error={!!commitError}
          helperText={commitError}
        />
      )}

      <InputGrid
        xs={12}
        label="Informe a Descrição"
        multiline
        onChange={updateField}
        name="descriptionInput"
        value={description}
        error={!!descriptionError}
        helperText={descriptionError}
        rows={4}
      />

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
        <ButtonWithCombo
          disabled={loading}
          actions={[{ text: 'Adicionar' }, { text: 'Adicionar em série' }]}
        />
      </Grid>
    </Grid>
  );
};

export default CreateAppointmentForm;
