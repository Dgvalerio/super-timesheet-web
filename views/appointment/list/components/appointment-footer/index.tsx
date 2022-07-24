import React, { FC } from 'react';

import { AppointmentModel, AppointmentStatusEnum } from '@/models/appointment';
import theme from '@/styles/theme';
import {
  Description as DraftIcon,
  PendingActions as ReviewIcon,
  TaskAlt as ApprovedIcon,
  Warning as UnapprovedIcon,
} from '@mui/icons-material';
import { Divider, Grid, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/types';

import { transparentize } from 'polished';

const DynamicFooter: FC<{
  text: string;
  color: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}> = ({ text, color, Icon }) => {
  const textColor = transparentize(0.6, color);
  const borderColor = transparentize(0.9, color);

  return (
    <>
      <Grid item xs={12}>
        <Divider sx={{ borderColor }} />
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{ color: textColor }}>
          {text}
        </Typography>
      </Grid>
      <Grid item>
        <Icon sx={{ color: textColor }} />
      </Grid>
    </>
  );
};

const AppointmentFooter: FC<Pick<AppointmentModel, 'status'>> = ({
  status,
}) => {
  switch (status) {
    case AppointmentStatusEnum.Draft:
      return (
        <DynamicFooter
          text="Este apontamento ainda não foi lançado."
          color={theme.palette.warning.dark}
          Icon={DraftIcon}
        />
      );
    case AppointmentStatusEnum.Review:
      return (
        <DynamicFooter
          text="Este apontamento ainda não foi revisado."
          color={theme.palette.info.dark}
          Icon={ReviewIcon}
        />
      );
    case AppointmentStatusEnum.Unapproved:
      return (
        <DynamicFooter
          text="Este apontamento foi reprovado."
          color={theme.palette.error.dark}
          Icon={UnapprovedIcon}
        />
      );
    case AppointmentStatusEnum.Approved:
      return (
        <DynamicFooter
          text="Este apontamento foi aprovado."
          color={theme.palette.success.dark}
          Icon={ApprovedIcon}
        />
      );
    case AppointmentStatusEnum.PreApproved:
      return (
        <DynamicFooter
          text="Este apontamento foi pré-aprovado."
          color={theme.palette.success.light}
          Icon={ApprovedIcon}
        />
      );
    default:
      return <></>;
  }
};

export default AppointmentFooter;
