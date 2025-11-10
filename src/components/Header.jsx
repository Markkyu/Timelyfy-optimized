import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "@stores/useAuthStore";

const Header = ({ user_name, user_role }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout } = useAuthStore();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleCloseMenu();
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#800000", zIndex: "10" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to="/"
          className="flex gap-2 items-center text-white hover:text-gray-200"
        >
          <img
            className="h-8 inline bg-white p-0.5 rounded-full"
            src="/timelyfy.svg"
            alt="Logo"
          />
          <div>
            <Typography variant="h6">Timelyfy Scheduler: MSEUF-CI</Typography>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Tooltip title={user_role}>
            <Typography variant="h6" component="div">
              {user_name}
            </Typography>
          </Tooltip>
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <AccountCircleIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleNavigate("/account")}>
              Account
            </MenuItem>
            {/* <MenuItem onClick={() => handleNavigate("/settings")}>
              Settings
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                logout();
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
