// components/UserCard.jsx
import {
  Avatar,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVertical,
  Mail,
  Phone,
  Shield,
  User,
  Trash2,
  Settings,
  Key,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const getInitials = (userName) => {
    // const first = firstName?.charAt(0) || "";
    // const last = lastName?.charAt(0) || "";
    // return `${first}${last}`.toUpperCase() || "U";
    const username = userName?.charAt(0) || "";

    return `${username}`.toUpperCase() || "U";
  };

  const handleDeleteUser = () => {
    if (
      confirm(
        `Are you sure you want to delete ${user.first_name} ${user.last_name}?`
      )
    ) {
      // Delete logic here
      console.log("Delete user:", user.id);
    }
    setAnchorEl(null);
  };

  // Role-based styling
  const getRoleConfig = (role) => {
    const configs = {
      admin: {
        gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        bgColor: "#ede9fe",
        textColor: "#5b21b6",
        icon: Shield,
      },
      super_user: {
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        bgColor: "#d1fae5",
        textColor: "#065f46",
        icon: GraduationCap,
      },
      user: {
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        bgColor: "#fef3c7",
        textColor: "#92400e",
        icon: User,
      },
      master_scheduler: {
        gradient: "linear-gradient(135deg, #800000 0%, #ff0000 100%)",
        bgColor: "#fee2e2",
        textColor: "#991b1b",
        icon: Key,
      },
    };
    return configs[role];
  };

  const roleConfig = getRoleConfig(user.role);
  const RoleIcon = roleConfig.icon;

  return (
    <div className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-maroon transition-all duration-300 overflow-hidden hover:shadow-xl">
      {/* Role Indicator Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: roleConfig.gradient }}
      ></div>

      <div className="p-6 flex flex-col justify-between h-full">
        {/* Header with Menu */}
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <Avatar
              sx={{
                width: 72,
                height: 72,
                backgroundImage: roleConfig.gradient,
                fontSize: "1.5rem",
                fontWeight: 700,
                border: "3px solid white",
              }}
            >
              {getInitials(user.username)}
            </Avatar>
            {/* Role Badge Icon */}
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-3 border-white flex items-center justify-center"
              style={{ backgroundColor: roleConfig.bgColor }}
            >
              <RoleIcon size={16} style={{ color: roleConfig.textColor }} />
            </div>
          </div>

          {/* <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              opacity: 0,
              transition: "opacity 0.2s",
              ".group:hover &": { opacity: 1 },
            }}
          >
            <MoreVertical size={20} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Settings size={16} className="mr-2" />
              Edit User
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Key size={16} className="mr-2" />
              Change Role
            </MenuItem>
            <MenuItem onClick={handleDeleteUser} sx={{ color: "error.main" }}>
              <Trash2 size={16} className="mr-2" />
              Delete
            </MenuItem>
          </Menu> */}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-maroon transition-colors">
          {/* {user.first_name} {user.last_name} */}
          {user.username}
        </h3>
        <p className="mb-1 text-gray-500">{user.full_name || "No full name"}</p>

        {/* Role Chip */}
        <Chip
          label={user.role?.replace("_", " ")}
          size="small"
          icon={<RoleIcon size={14} />}
          sx={{
            bgcolor: roleConfig.bgColor,
            color: roleConfig.textColor,
            fontWeight: 600,
            fontSize: "0.75rem",
            mb: 3,
            textTransform: "capitalize",
          }}
        />

        {/* Info Section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{user.email || "No email"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="text-gray-400 flex-shrink-0" />
            <span>{user.phone || "No phone"}</span>
          </div>
          {user.program && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap
                size={16}
                className="text-gray-400 flex-shrink-0"
              />
              <span className="truncate">{user.program}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          endIcon={<Settings size={18} />}
          disableElevation
          sx={{
            bgcolor: "maroon",
            borderRadius: "12px",
            fontWeight: 600,
            py: 1.5,
            textTransform: "none",
          }}
          onClick={() => navigate(`/user-page/${user.id}`)}
        >
          Manage User
        </Button>
      </div>
    </div>
  );
}
