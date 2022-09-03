import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import InboxIcon from '@mui/icons-material/Inbox';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} src="https://i.pinimg.com/280x280_RS/9b/f2/01/9bf201d657ef74c531057d29fbee5328.jpg" />
          </Box>
          <Divider/>
          <Box flex={1}>
          <List component="nav">
          <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary="Home" />
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
