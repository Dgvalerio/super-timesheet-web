import { FC, ReactElement } from 'react';

import { useRouter } from 'next/router';

import Styles from '@/components/sidebar/style';
import { Routes, routes } from '@/utils/pages';
import {
  Dashboard as DashboardIcon,
  MoreTime as AddIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const Item: FC<{
  text: string;
  icon: ReactElement;
  route?: Routes;
}> = ({ text, icon, route }) => {
  const router = useRouter();

  const navigate = (): void => void router.push(route || routes.home());

  const selected = (): boolean => router.pathname === route;

  return (
    <ListItemButton selected={selected()} onClick={navigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const SideBar: FC = () => (
  <Styles.Container item xs={3}>
    <List subheader={<ListSubheader>Apontamentos</ListSubheader>}>
      <Item
        icon={<DashboardIcon />}
        text="Dashboard"
        route={routes.dashboard()}
      />
      <Item
        icon={<AddIcon />}
        text="Incluir"
        route={routes.appointment.create()}
      />
      <Item
        icon={<ViewListIcon />}
        text="Visualizar"
        route={routes.appointment.read()}
      />
    </List>
  </Styles.Container>
);

export default SideBar;
