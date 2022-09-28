import React, { FC, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, ButtonGroup, Menu, MenuItem } from '@mui/material';

interface IButtonWithCombo {
  disabled: boolean;
  actions: { text: string; handler?: () => void }[];
}

const ButtonWithCombo: FC<IButtonWithCombo> = ({ disabled, actions }) => {
  const [addMenuActive, setAddMenuActive] = useState<null | HTMLElement>(null);
  const open = Boolean(addMenuActive);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
    setAddMenuActive(event.currentTarget);

  const handleClose = (): void => setAddMenuActive(null);

  if (actions.length < 1) return <></>;

  if (actions.length === 1)
    return actions[0].handler ? (
      <Button
        variant="outlined"
        type="button"
        onClick={actions[0].handler}
        disabled={disabled}
      >
        {actions[0].text}
      </Button>
    ) : (
      <Button variant="outlined" type="submit" disabled={disabled}>
        {actions[0].text}
      </Button>
    );

  return (
    <>
      <ButtonGroup disabled={disabled}>
        <Button variant="outlined" type="submit">
          {actions[0].text}
        </Button>
        <Button
          id="button-menu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleOpenMenu}
          sx={{ padding: 0 }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="menu"
        anchorEl={addMenuActive}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'button-menu' }}
      >
        {actions.slice(1).map((action) => (
          <MenuItem
            key={action.text}
            onClick={(): void => {
              if (action.handler) action.handler();
              handleClose();
            }}
          >
            {action.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ButtonWithCombo;
