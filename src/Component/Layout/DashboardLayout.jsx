import React, { useState } from "react";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ListItemButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BusinessIcon from '@mui/icons-material/Business';
// import DevicesIcon from "@mui/icons-material/Devices";

const drawerWidth = 240;

function DashboardLayout({ children }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    const navigate = useNavigate()


  const drawer = (
    <div>
      <Toolbar />
      <List>

        <ListItemButton button onClick={()=>navigate(`/`)}>
          <ListItemIcon>
            {/* <DashboardIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Dashboard"  ></ListItemText>
        </ListItemButton>

        <ListItem button>
          <ListItemIcon>
            {/* <BusinessIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Company" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            {/* <DevicesIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Assets" />
        </ListItem>

      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>

      <CssBaseline />

      {/* Top Navbar */}

        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          marginTop: '60px'
        }}
      >
        <Toolbar>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
             
          </IconButton>

          <Typography variant="h6" noWrap>
            Asset Management System
          </Typography>

        </Toolbar>
      </AppBar> 

      {/* Sidebar */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >

        {/* Mobile Drawer */}

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>

      {/* Main Content */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >

        <Toolbar />

        {children}

      </Box>

    </Box>
  );
}

export default DashboardLayout;