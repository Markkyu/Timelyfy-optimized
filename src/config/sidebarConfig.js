import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

export const sidebarItems = [
  {
    // Access college courses according to roles
    text: "College List",
    path: "",
    icon: DashboardIcon,
    roles: ["*"], // accessible by all
  },
  {
    // see all teaching assignment
    text: "Teacher List",
    path: "teachers",
    icon: CoPresentIcon,
    roles: ["*"],
  },
  {
    // User management in one page
    text: "Room List",
    path: "rooms",
    icon: MeetingRoomIcon,
    roles: ["*"],
  },
  {
    // control the phase of the program
    text: "Phase Control",
    path: "phase-control",
    icon: VideogameAssetIcon,
    roles: ["*"],
  },
  {
    // User management in one page
    text: "Manage Users",
    path: "user-page",
    icon: ManageAccountsIcon,
    roles: ["admin", "master_scheduler"],
  },
  {
    divider: true,
  },
  {
    // about page
    text: "About",
    path: "about",
    icon: InfoOutlinedIcon,
    roles: ["*"], // open to all
  },
  {
    // tutorial page
    text: "Tutorial",
    path: "tutorial",
    icon: HelpOutlineOutlinedIcon,
    roles: ["*"],
  },
  {
    // logout of your account
    text: "Logout",
    path: "login",
    icon: LogoutIcon,
    roles: ["*"],
    logout: true,
  },
];
