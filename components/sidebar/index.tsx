import { FC, ReactElement } from 'react';

import { useRouter } from 'next/router';

import Styles from '@/components/sidebar/style';
import { Routes, routes } from '@/utils/pages';
import {
  Dashboard as DashboardIcon,
  MoreTime as AddIcon,
  ViewList as ViewListIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

type IItem = FC<{ text: string; icon: ReactElement; route?: Routes }>;

const Item: IItem = ({ text, icon, route }) => {
  const router = useRouter();

  const navigate = (): void => void router.push(route || routes.home());

  return (
    <ListItemButton selected={router.pathname === route} onClick={navigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

interface ISideBarItem {
  name: string;
  items: {
    icon: ReactElement;
    text: string;
    route: Routes;
  }[];
}

const sideBarItems: ISideBarItem[] = [
  {
    name: 'Apontamentos',
    items: [
      { icon: <DashboardIcon />, text: 'Dashboard', route: routes.dashboard() },
      {
        icon: <AddIcon />,
        text: 'Incluir',
        route: routes.appointment.create(),
      },
      {
        icon: <ViewListIcon />,
        text: 'Visualizar',
        route: routes.appointment.read(),
      },
    ],
  },
  {
    name: 'Sistema',
    items: [
      {
        icon: <InfoIcon />,
        text: 'Funcionamento',
        route: routes.system.operation(),
      },
    ],
  },
];

const SideBar: FC = () => (
  <Styles.Container item xs={3}>
    {sideBarItems.map(({ name, items }) => (
      <List key={name} subheader={<ListSubheader>{name}</ListSubheader>}>
        {items.map(({ text, icon, route }) => (
          <Item key={text} icon={icon} text={text} route={route} />
        ))}
      </List>
    ))}
  </Styles.Container>
);

export default SideBar;
