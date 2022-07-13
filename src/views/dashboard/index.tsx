import { Doughnut } from 'react-chartjs-2';

import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import Styles from '@/styles/dashboard';
import useController from '@/views/dashboard/controller';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const DashboardView: NextPage = () => {
  const { toWork, worked, data, loading } = useController();

  return (
    <MainWrapper title="Dashboard" loading={loading}>
      <Styles.Container>
        <Grid container>
          <Grid item xs={4}>
            {loading ? (
              <Skeleton width="100%" height={490} sx={{ transform: 'none' }} />
            ) : (
              <Card variant="outlined">
                <CardContent style={{ paddingBottom: 8 }}>
                  <Doughnut data={data} />
                  <br />
                  <Typography gutterBottom variant="h5" component="div">
                    Horas trabalhadas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No mês atual devem ser trabalhadas <b>{toWork} horas</b>,
                    das quais você já trabalhou <b>{worked} horas</b>.
                  </Typography>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ fontSize: 10 }}
                  >
                    Calculado com base nos dias úteis do mês
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Styles.Container>
    </MainWrapper>
  );
};

export default DashboardView;
