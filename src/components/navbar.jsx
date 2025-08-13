import { AppBar, Toolbar, Button, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Cookies from 'js-cookie'
import { useState } from 'react'
import beneficiaryLogo from "../assets/beneficiary-logo.png"

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  };

  let authCheck = Cookies.get("token") ? true : false;
  let admin = Cookies.get("isVerified") ? true : false;
  let Deparment = Cookies.get("Deparment") ? true : false;
  let Receptionist = Cookies.get("Receptionist")? true: false
  const userData = JSON.parse(localStorage.getItem("user"))
  const logout = () => {
    authCheck = false
    Cookies.remove("token")
    Cookies.remove("isVerified")
    Cookies.remove("Deparment")
    Cookies.remove("Receptionist")
    localStorage.removeItem("user")
  }

  const menuItems = (
    <>
      {authCheck ? (
        <>
          <ListItem button component={Link} to="/" sx={{ color: "gray" }}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={admin ?        `/admin/dashboard/${userData.id}` 
               :Deparment ?    `/deparment/dashboard/${userData.id}`
               :Receptionist ? `/receptionist/dashboard/${userData.id}`
               : "/"
              }
            sx={{ color: "gray" }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={logout} component={Link} to="/" sx={{ backgroundColor: "#005EB8", color: "#fff" }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          {/* <ListItem button component={Link} to="/signup" sx={{ backgroundColor: "#005EB8", color: "#fff" }} >
            <ListItemText primary="Signup" />
          </ListItem> */}
          <ListItem button component={Link} to="/login" sx={{ backgroundColor: "#005EB8", color: "#fff" }}>
            <ListItemText primary="Login" />
          </ListItem>
        </>
      )}
    </>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ width: "100%", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <Typography variant="h5" fontWeight={700} marginLeft={3.6} color="#8BC441" sx={{ display: "flex", alignItems: "center" }}>
            <img src={beneficiaryLogo} alt="Logo" style={{ height: 65, marginRight: 16 }} />
            {/* logo */}
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {authCheck ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ marginRight: "17px", color: "gray", "&:hover": { color: "#8BC441" } }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to={admin ?        `/admin/dashboard/${userData.id}` 
                     :Deparment ?    `/deparment/dashboard/${userData.id}`
                     :Receptionist ? `/receptionist/dashboard/${userData.id}`
                     : "/"}
                  sx={{ marginRight: "19px", color: "gray", "&:hover": { color: "#8BC441" } }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={logout}
                  component={Link}
                  to="/"
                  sx={{
                    backgroundColor: "#005EB8",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#1976d2" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  sx={{
                    backgroundColor: "#005EB8",
                    color: "#fff",
                    marginRight: "18px",
                    "&:hover": { backgroundColor: "#1976d2" },
                  }}
                >
                  Signup
                </Button> */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    backgroundColor: "#005EB8",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#1976d2" },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "60%",
          },
        }}
      >
        <Box sx={{ width: "100%" }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <List>{menuItems}</List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;



