import React, { FC } from 'react';

import Link from 'next/link';

import { Grid, Typography } from '@mui/material';

import MenuOptions from '@/components/topbar/components/menu-options';
import SendAppointmentsAction from '@/components/topbar/components/send-appointments-action';
import SwitchThemeModeAction from '@/components/topbar/components/switch-theme-mode-action';
import UpdateDataAction from '@/components/topbar/components/update-data-action';
import Styles from '@/components/topbar/style';
import { routes } from '@/utils/pages';

export interface ITopBar {
  name: string;
  image?: string;
}

const TopBar: FC<ITopBar> = ({ name, image }) => (
  <Styles.Container
    container
    className="top-bar"
    justifyContent="space-between"
  >
    <Grid item xs={3} className="logo">
      <Link href={routes.dashboard()} passHref>
        <Typography variant="h6" component="a">
          Timesheet
        </Typography>
      </Link>
    </Grid>
    <Grid item>
      <SendAppointmentsAction />
      <UpdateDataAction />
      <SwitchThemeModeAction />
      <MenuOptions name={name} image={image} />
    </Grid>
  </Styles.Container>
);

export default TopBar;
