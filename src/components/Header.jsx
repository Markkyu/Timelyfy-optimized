import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user_name, user_role }) => {
  const navigate = useNavigate();

  return (
    // Header bar
    <AppBar position="static" sx={{ backgroundColor: "#800000", zIndex: "10" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + Title */}
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
            <span className="font-semibold text-xl">Timelyfy Scheduler: </span>
            <span className="font-semibold text-xl text-gray-100">
              MSEUF-CI
            </span>
          </div>
        </Link>

        {/* Right: Guest + Avatar */}
        <div className="flex items-center gap-2">
          <Tooltip title={user_role}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {user_name}
            </Typography>
          </Tooltip>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => navigate("/account")}
          >
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
