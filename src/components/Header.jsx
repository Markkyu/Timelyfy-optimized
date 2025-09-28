import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Header = ({ user_name, user_role }) => {
  return (
    // Header bar
    <AppBar position="static" sx={{ backgroundColor: "#800000", zIndex: "10" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + Title */}
        <Link
          to="/"
          className="flex items-center text-white hover:text-gray-200"
        >
          <img className="pr-2 h-8 inline" src="/timelyfy.svg" alt="Logo" />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Timelyfy: Scheduler
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginLeft: "4px" }}>
            for MSEUF-CI
          </Typography>
        </Link>

        {/* Right: Guest + Avatar */}
        <div className="flex items-center gap-2">
          <Tooltip title="Username">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {user_name}
            </Typography>
          </Tooltip>
          <Tooltip title="Role">
            <Typography variant="h6" component="div" sx={{ marginLeft: "4px" }}>
              ({user_role})
            </Typography>
          </Tooltip>
          <IconButton size="large" color="inherit">
            <Tooltip title="Go to Account">
              <AccountCircleIcon />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
