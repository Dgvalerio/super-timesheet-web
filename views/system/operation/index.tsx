import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import theme from '@/styles/theme';
import {
  Cached as UpdateIcon,
  Description as DraftIcon,
  UploadFile as UploadIcon,
} from '@mui/icons-material';
import { Badge, Box, Card, CardContent, Grid, Typography } from '@mui/material';

const SystemOperationView: NextPage = () => (
  <Box p={2}>
    <Head>
      <title>Sobre o sistema</title>
    </Head>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Sobre o sistema</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent style={{ paddingBottom: 8 }}>
            <Typography variant="subtitle1" paragraph>
              Apontamentos
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Afim de obter um melhor desempenho e facilitar a criação e
              modificação de dados, os apontamentos são inicialmente salvos aqui
              nesse timesheet, melhorando no geral a experiência de usuário.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Assim que salvos aqui, ficam com a notação de rascunho, na
              listagem, são observados com o seguinte ícone &ldquo;
              <DraftIcon
                sx={{
                  color: theme.palette.warning.dark,
                  fontSize: 18,
                  marginBottom: -0.5,
                }}
              />
              &rdquo;.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent style={{ paddingBottom: 8 }}>
            <Typography variant="subtitle1" paragraph>
              <Badge color="primary" sx={{ marginTop: -0.5, marginRight: 1 }}>
                <UploadIcon color="inherit" />
              </Badge>
              Enviar apontamentos
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Esse ícone pode ser encontrado na barra superior, indicando que
              existem apontamentos que ainda não foram lançados para o timesheet
              oficial, o número encontrado junto ao mesmo, indica a quantidade
              de apontamentos a serem lançados.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Para enviar os apontamentos, basta clicar no ícone e esperar a
              execução.
            </Typography>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontSize: 10 }}
            >
              Essa ação não pode ser cancelada.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent style={{ paddingBottom: 8 }}>
            <Typography variant="subtitle1" paragraph>
              <Badge color="primary" sx={{ marginTop: -0.5, marginRight: 1 }}>
                <UpdateIcon color="disabled" />
              </Badge>
              Recarregar dados
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Os principais dados do sistema são importado do timesheet oficial,
              clientes, projetos, categorias e apontamentos são carregados após
              realizar o login com a sua conta do timesheet oficial.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
              paragraph
            >
              Ás vezes, para manter a sincronicidade é necessário atualizar
              esses dados, para isso, clique no ícone de recarregar encontrado
              na barra superior.
            </Typography>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontSize: 10 }}
            >
              Essa ação não pode ser cancelada.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default SystemOperationView;
