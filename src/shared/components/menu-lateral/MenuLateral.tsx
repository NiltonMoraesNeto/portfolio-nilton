import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Button,MenuItem,Menu, Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from "@mui/system";
import InboxIcon from "@mui/icons-material/Inbox";
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useState } from "react";

interface IMenuLateralProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

const MenuItemLink: React.FC<IListItemLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (

    <ListItemButton selected={!!match} onClick={handleClick}>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <MenuItem>{label}</MenuItem>
  </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://i.pinimg.com/280x280_RS/9b/f2/01/9bf201d657ef74c531057d29fbee5328.jpg"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            {/* <List component="nav">
              {drawerOptions.map((drawerOption) => (              
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List> */}
            <div>
      <Button
        id="lock-button"
        aria-controls={open ? 'lock-menu' : undefined}
        aria-haspopup="listbox"
        aria-expanded={open ? 'false' : undefined}
        onClick={handleClick2}
        endIcon={<KeyboardArrowDownIcon />}
      >
         <Typography variant="body2" color="text.secondary">
          Cadastros
          </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {drawerOptions.map((drawerOption) => (  
        <MenuItemLink key={drawerOption.path}
        icon={drawerOption.icon}
        label={drawerOption.label}
        to={drawerOption.path}
        onClick={smDown ? toggleDrawerOpen : undefined}
        />
        ))}
      </Menu>

      <Button
        id="lock-button"
        aria-controls={open ? 'lock-menu' : undefined}
        aria-haspopup="listbox"
        aria-expanded={open ? 'false' : undefined}
        onClick={handleClick2}
        endIcon={<KeyboardArrowDownIcon />}
      >
         <Typography variant="body2" color="text.secondary">
         Cadastros e Cadastros
          </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {drawerOptions.map((drawerOption) => (  
        <MenuItemLink key={drawerOption.path}
        icon={drawerOption.icon}
        label={drawerOption.label}
        to={drawerOption.path}
        onClick={smDown ? toggleDrawerOpen : undefined}
        />
        ))}
      </Menu>
    </div>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar Tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
