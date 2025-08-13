import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupIcon from '@mui/icons-material/Group'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'CreateUser', icon: <PersonAddIcon /> },
  { text: 'Users', icon: <GroupIcon /> },
  { text: 'Progress', icon: <TrendingUpIcon /> },
  { text: 'Pending', icon: <HourglassEmptyIcon /> },
  { text: 'Reject', icon: <BlockIcon /> },
  { text: 'Complete', icon: <CheckCircleIcon /> },
];

const Sidebar = ({ setPage }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [ `& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List sx={{mt: "64px"}}>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => setPage(item.text)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar
