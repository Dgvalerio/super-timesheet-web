import React, { FC } from 'react';

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import {
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import useAppointmentCardController from '@/components/appointment/list/appointment-card/controller';
import AppointmentFooter from '@/components/appointment/list/appointment-footer';
import EditAppointmentModal from '@/components/topbar/components/edit-appointment-modal';
import TopBarStyled from '@/components/topbar/style';
import { AppointmentModel, AppointmentStatusEnum } from '@/models/appointment';

const { ArrowIconBox, Content } = TopBarStyled;

const AppointmentCard: FC<{ appointment: AppointmentModel }> = ({
  appointment,
}) => {
  const {
    dayText,
    loadingDelete,
    handleDelete,
    closeEditModal,
    openEditModal,
    editOpen,
    toggleCollapsed,
    collapsed,
    timeDifference,
  } = useAppointmentCardController({ appointment });

  const {
    id,
    project,
    category,
    startTime,
    endTime,
    description,
    status,
    commit,
  } = appointment;

  return (
    <Grid item xs={12}>
      <EditAppointmentModal
        open={editOpen}
        closeEditModal={closeEditModal}
        appointmentId={id}
      />
      <Card variant="outlined">
        <Content sx={{ paddingTop: collapsed ? '0px !important' : '16px' }}>
          {collapsed && (
            <AppointmentFooter status={status} collapsed={collapsed} />
          )}
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: collapsed ? '0px !important' : '-8px' }}
          >
            <Grid item>
              <Typography variant="subtitle1" color="text.secondary">
                Das {startTime} às {endTime}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="text.secondary">
                {dayText}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="text.secondary">
                Duração de {timeDifference}
              </Typography>
            </Grid>
            <Grid item xs={12} component={Collapse} in={!collapsed}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                sx={{
                  marginTop: !collapsed ? '-16px !important' : '0px',
                  paddingTop: collapsed ? '0px !important' : '8px',
                }}
              >
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Cliente
                  </Typography>
                  <Typography variant="subtitle1">
                    {project.client.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="text.secondary">
                    Projeto
                  </Typography>
                  <Typography variant="subtitle1">{project.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    align="right"
                    color="text.secondary"
                  >
                    Categoria
                  </Typography>
                  <Typography variant="subtitle1" align="right">
                    {category.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {commit && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Commit
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre' }}>
                      {commit}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Descrição
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {description}
                  </Typography>
                </Grid>
                <AppointmentFooter status={status} />
                <Grid item xs={12} />
                {status === AppointmentStatusEnum.Draft && (
                  <>
                    <Grid item>
                      {status === AppointmentStatusEnum.Draft && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={handleDelete}
                          disabled={loadingDelete}
                        >
                          Apagar
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<EditIcon />}
                        onClick={openEditModal}
                      >
                        Editar
                      </Button>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} pb={1} />
              </Grid>
            </Grid>
          </Grid>
          <ArrowIconBox collapsed={collapsed}>
            <Divider orientation="vertical" />
            <IconButton onClick={toggleCollapsed}>
              {collapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </ArrowIconBox>
        </Content>
      </Card>
    </Grid>
  );
};

export default AppointmentCard;
