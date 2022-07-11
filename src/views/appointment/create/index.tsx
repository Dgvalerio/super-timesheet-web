import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import useController from '@/controllers/appointment/create';
import Styles from '@/styles/dashboard';
import CreateAppointmentForm from '@/views/appointment/create/components/form';
import AppointmentsList from '@/views/appointment/create/components/list';
import { Grid, Typography } from '@mui/material';

const CreateAppointmentView: NextPage = () => {
  const { loading, setLoading } = useController();

  return (
    <MainWrapper title="Dashboard" loading={loading}>
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Novo apontamento</Typography>
          </Grid>
          <CreateAppointmentForm loading={loading} setLoading={setLoading} />
          <AppointmentsList />
        </Grid>
      </Styles.Container>
    </MainWrapper>
  );
};

export default CreateAppointmentView;
