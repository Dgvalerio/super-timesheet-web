import React, { FC, MouseEvent, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { ITopBar } from '@/components/topbar';
import useGithubStore from '@/store/github';
import { useAppDispatch } from '@/store/hooks';
import { wipeUser } from '@/store/user/actions';
import { routes } from '@/utils/pages';

const MenuOptions: FC<ITopBar> = ({ name, image }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { removeGithubToken } = useGithubStore();

  const handleSignOut = async (): Promise<void> => {
    dispatch(wipeUser());
    removeGithubToken();

    await router.push(routes.auth.login());
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  const goUserUpdate = (): void => void router.push(routes.user.update());

  return (
    <>
      <Tooltip title="Abrir opções" arrow>
        <IconButton onClick={handleOpenUserMenu} className="user-button">
          <Avatar alt={name} src={image} />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={goUserUpdate}>
          <Typography textAlign="center">Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign="center">Sair</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuOptions;
