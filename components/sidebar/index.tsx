import { FC, ReactElement } from 'react';

import { useRouter } from 'next/router';

import {
  ControlPointDuplicate as AddInSerieIcon,
  Dashboard as DashboardIcon,
  GitHub,
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

import Styles from '@/components/sidebar/style';
import { Routes, routes } from '@/utils/pages';

interface IItem {
  text: string;
  icon: ReactElement;
  route?: Routes;
}

interface ISideBarItem {
  name: string;
  items: IItem[];
}

const Item: FC<IItem> = ({ text, icon, route }) => {
  const router = useRouter();

  const navigate = (): void => void router.push(route || routes.home());

  return route ? (
    <ListItemButton selected={router.pathname === route} onClick={navigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  ) : (
    <ListItemButton disabled onClick={navigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

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
    name: 'Assistente',
    items: [
      {
        icon: <GitHub />,
        text: 'Incluir com Github',
        route: routes.appointment.createWithGithub(),
      },
      {
        icon: <AddInSerieIcon />,
        text: 'Incluir em série',
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
