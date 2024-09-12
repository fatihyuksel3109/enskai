import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Box,
  Slide,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
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
  cursor: "pointer", // make the logo clickable
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

const NotificationDrawer = styled(Box)(({ theme, isMobile }) => ({
  position: "fixed",
  top: "64px",
  right: 0,
  width: isMobile ? "100%" : 400, // Full width on mobile, 400px on larger screens
  height: "100%",
  backgroundColor: "#0C0C0E",
  boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
  zIndex: 1200,
  overflowY: "auto",
  transition: "width 0.3s ease", // Smooth width transition
}));

// Custom full-width Menu for mobile
const FullWidthMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%", // Full width on mobile
    maxWidth: "100%", // Remove the max width limitation
    left: 0, // Align to the left edge
    right: 0, // Align to the right edge
    top: "64px", // Adjust to header height
    backgroundColor: "#0C0C0E", // Background color
    color: "#FFFFFF", // Text color
    paddingLeft: "16px",
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
    { label: "Dashboard", path: "/dashboard" },
    { label: "Players", path: "/players" },
    { label: "Clubs", path: "/clubs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <HeaderContainer position="static">
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
                  <MenuItem
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </FullWidthMenu>
            </>
          ) : (
            <NavItems>
              {navItems.map((item) => (
                <NavButton
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
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

      {/* Notification panel slides from the right */}
      <Slide direction="left" in={openNotifications} mountOnEnter unmountOnExit>
        <NotificationDrawer isMobile={isMobile}>
          <NotificationsPanel onClose={handleCloseNotifications} />
        </NotificationDrawer>
      </Slide>
    </>
  );
};

export default Header;
