import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { styled, useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../contexts/NotificationContext";
import NotificationsPanel from "./NotificationsPanel";

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#0C0C0E",
  color: "#FFFFFF",
  padding: theme.spacing(1),
}));

const Logo = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  cursor: "pointer", 
});

const NavItems = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  marginLeft: theme.spacing(2),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const NotificationDrawer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  right: 0,
  width: "100%", // Full width on mobile
  maxWidth: 400, // Max width for larger screens
  height: "calc(100% - 64px)", // Subtract header height
  backgroundColor: "#0C0C0E",
  boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
  zIndex: 1200,
  overflowY: "auto",
  transition: "transform 0.3s ease",
  transform: "translateX(100%)",
  "&.open": {
    transform: "translateX(0)",
  },
  [theme.breakpoints.up("sm")]: {
    width: 400, // Fixed width for larger screens
  },
}));

const FullWidthMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "100%",
    left: "0 !important",
    right: "0 !important",
    top: "64px !important",
    backgroundColor: "#0C0C0E",
    color: "#FFFFFF",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiList-root": {
    padding: theme.spacing(1, 0),
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "& .MuiListItemIcon-root": {
    color: "#FFD700",
    minWidth: "40px",
  },
  "& .MuiListItemText-primary": {
    fontSize: "1rem",
    fontWeight: 500,
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotificationContext();
  const [openNotifications, setOpenNotifications] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotifications = () =>
    setOpenNotifications(!openNotifications);
  const handleCloseNotifications = () => setOpenNotifications(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Players", path: "/players", icon: <PeopleIcon /> },
    { label: "Clubs", path: "/clubs", icon: <BusinessIcon /> },
    { label: "About", path: "/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];

  return (
    <>
      <HeaderContainer position="fixed">
        <Toolbar>
          <Logo onClick={() => navigate("/")}>
            <img
              src="/header-logo.webp"
              alt="EnskAI Logo"
              style={{ height: 40 }}
            />
          </Logo>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleOpenMenu} edge="start">
                <MenuIcon />
              </IconButton>
              <FullWidthMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                keepMounted
              >
                {navItems.map((item) => (
                  <StyledMenuItem
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </StyledMenuItem>
                ))}
              </FullWidthMenu>
            </>
          ) : (
            <NavItems>
              {navItems.map((item) => (
                <NavButton
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                >
                  {item.label}
                </NavButton>
              ))}
            </NavItems>
          )}

          {unreadCount > 0 && (
            <IconButton color="inherit" onClick={handleOpenNotifications}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </HeaderContainer>

      <NotificationDrawer className={openNotifications ? 'open' : ''}>
        <NotificationsPanel onClose={handleCloseNotifications} />
      </NotificationDrawer>

      <Toolbar />
    </>
  );
};

export default Header;