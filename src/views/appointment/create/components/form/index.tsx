import React, { FC } from 'react';

import { InputField } from '@/components/input-field';
import useController from '@/views/appointment/create/components/form/controller';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Skeleton,
} from '@mui/material';

const FormSkeleton = () => (
  <Grid item xs={12} container spacing={2} justifyContent="space-between">
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={4}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={125} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item>
      <Skeleton height={24} sx={{ transform: 'none' }}>
        <FormControlLabel control={<Checkbox />} label="Não Contabilizado?" />
      </Skeleton>
    </Grid>
    <Grid item>
      <Skeleton height={36} sx={{ transform: 'none' }}>
        <Button variant="outlined" disabled>
          Adicionar
        </Button>
      </Skeleton>
    </Grid>
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
      <Grid item>
        <Button variant="outlined" type="submit" disabled={loading}>
          Adicionar
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateAppointmentForm;
