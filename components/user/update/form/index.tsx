import React, { FC } from 'react';

import { InputField } from '@/components/input-field';
import useController from '@/components/user/update/form/controller';
import FormSkeleton from '@/components/user/update/form/skeleton';
import {
  Button,
  Collapse,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';

const UpdateUserForm: FC = () => {
  const {
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
      <Grid item xs={12}>
        <InputField
          label="Nome"
          onChange={updateField}
          name="nameInput"
          value={name}
          error={!!nameError}
          helperText={nameError}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          label="E-mail"
          type="email"
          onChange={updateField}
          name="emailInput"
          value={email}
          error={!!emailError}
          helperText={emailError}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          label="Carga horária diária"
          type="number"
          onChange={updateField}
          name="dailyHoursInput"
          value={dailyHours}
          error={!!dailyHoursError}
          helperText={dailyHoursError}
          InputProps={{
            endAdornment: <InputAdornment position="end">horas</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          label="Senha"
          type="password"
          onChange={updateField}
          name="passwordInput"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          inputProps={{ minLength: '8' }}
        />
      </Grid>

      <Grid item xs={12} component={Collapse} in={updatePassword}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="overline">Alteração senha</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Nova senha"
              type="password"
              onChange={updateField}
              name="newPasswordInput"
              value={newPassword}
              error={!!newPasswordError}
              helperText={newPasswordError}
              inputProps={{ minLength: '8' }}
              required={updatePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Confirmação da nova senha"
              type="password"
              onChange={updateField}
              name="newPasswordConfirmationInput"
              value={newPasswordConfirmation}
              error={!!newPasswordConfirmationError}
              helperText={newPasswordConfirmationError}
              inputProps={{ minLength: '8' }}
              required={updatePassword}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button onClick={toggleUpdatePassword}>
          {updatePassword ? 'Cancelar alteração de senha' : 'Alterar senha'}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" type="submit" disabled={loading}>
          Atualizar
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateUserForm;
