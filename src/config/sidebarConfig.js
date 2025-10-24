// sidebarConfig.js
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HubIcon from "@mui/icons-material/Hub";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export const sidebarItems = [
  {
    // Access college courses according to roles
    text: "Home",
    path: "",
    icon: HomeRoundedIcon,
    roles: ["*"], // accessible by all
  },
  {
    // see all teaching assignment
    text: "All Teachers",
    path: "teachers",
    icon: PeopleAltOutlinedIcon,
    roles: ["*"],
  },
  {
    // control the phase of the program
    text: "Phase Control",
    path: "phase-control",
    icon: HubIcon,
    roles: ["*"],
  },
  // {
  //   // assign regular users their college programs
  //   text: "College Assignment",
  //   path: "assign-user",
  //   icon: AssignmentReturnedOutlinedIcon,
  //   roles: ["admin", "master_scheduler"], // admin and master scheduler only
  // },
  // {
  //   // manage accounts
  //   text: "User Management",
  //   path: "user-management",
  //   icon: ManageAccountsIcon,
  //   roles: ["admin"],
  // },
  // {
  //   // promote or demote regular users
  //   text: "Manage Roles",
  //   path: "role-management",
  //   icon: KeyOutlinedIcon,
  //   roles: ["admin"],
  // },
  {
    // User management in one page
    text: "Room List",
    path: "room-page",
    icon: MeetingRoomIcon,
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
    divider: true, // special marker for <hr/>
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
