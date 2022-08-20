import React, { FC } from 'react';

import {
  Description as DraftIcon,
  PendingActions as ReviewIcon,
  TaskAlt as ApprovedIcon,
  Warning as UnapprovedIcon,
} from '@mui/icons-material';
import {
  Divider,
  Grid,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/types';

import TopBarStyled from '@/components/topbar/style';
import { AppointmentModel, AppointmentStatusEnum } from '@/models/appointment';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

const { StatusIconBox } = TopBarStyled;

const DynamicFooter: FC<{
  text: string;
  color: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  collapsed?: boolean;
}> = ({ text, color, Icon, collapsed }) => {
  const textColor = transparentize(0.6, color);
  const borderColor = transparentize(0.9, color);

  return collapsed ? (
    <StatusIconBox>
      <Tooltip
        title={<Typography variant="body1">{text}</Typography>}
        placement="left"
        arrow
      >
        <Icon sx={{ color: textColor }} />
      </Tooltip>
      <Divider orientation="vertical" />
    </StatusIconBox>
  ) : (
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
      <Grid item xs={12} sx={{ paddingTop: '0 !important' }}>
        <Divider sx={{ borderColor }} />
      </Grid>
    </>
  );
};

const AppointmentFooter: FC<
  Pick<AppointmentModel, 'status'> & { collapsed?: boolean }
> = ({ status, collapsed }) => {
  switch (status) {
    case AppointmentStatusEnum.Draft:
      return (
        <DynamicFooter
          text="Este apontamento ainda não foi lançado."
          color={theme.palette.warning.dark}
          Icon={DraftIcon}
          collapsed={collapsed}
        />
      );
    case AppointmentStatusEnum.Review:
      return (
        <DynamicFooter
          text="Este apontamento ainda não foi revisado."
          color={theme.palette.info.dark}
          Icon={ReviewIcon}
          collapsed={collapsed}
        />
      );
    case AppointmentStatusEnum.Unapproved:
      return (
        <DynamicFooter
          text="Este apontamento foi reprovado."
          color={theme.palette.error.dark}
          Icon={UnapprovedIcon}
          collapsed={collapsed}
        />
      );
    case AppointmentStatusEnum.Approved:
      return (
        <DynamicFooter
          text="Este apontamento foi aprovado."
          color={theme.palette.success.dark}
          Icon={ApprovedIcon}
          collapsed={collapsed}
        />
      );
    case AppointmentStatusEnum.PreApproved:
      return (
        <DynamicFooter
          text="Este apontamento foi pré-aprovado."
          color={theme.palette.success.light}
          Icon={ApprovedIcon}
          collapsed={collapsed}
        />
      );
    default:
      return <></>;
  }
};

export default AppointmentFooter;
