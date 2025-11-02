// components/UserListView.jsx
import { Avatar, Chip, IconButton, Button } from "@mui/material";
import {
  Mail,
  Phone,
  Shield,
  User,
  Trash2,
  Settings,
  ChevronRight,
  Key,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserListView({ user }) {
  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const navigate = useNavigate();

  const handleDeleteUser = () => {
    if (
      confirm(
        `Are you sure you want to delete ${user.first_name} ${user.last_name}?`
      )
    ) {
      console.log("Delete user:", user.id);
    }
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
    return configs[role] || configs.student;
  };

  const roleConfig = getRoleConfig(user.role);
  const RoleIcon = roleConfig.icon;

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-maroon hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Avatar with Role Badge */}
        <div className="relative flex-shrink-0">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundImage: roleConfig.gradient,
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            {/* {getInitials(user.first_name, user.last_name)} */}
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: roleConfig.bgColor }}
          >
            <RoleIcon size={14} style={{ color: roleConfig.textColor }} />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon transition-colors">
              {/* {user.first_name} {user.last_name} */}
              {user.username}
            </h3>
            <p className="text-gray-500">{user?.full_name || "No full name"}</p>
            <Chip
              label={user.role?.replace("_", " ")}
              size="small"
              icon={<RoleIcon size={14} />}
              sx={{
                bgcolor: roleConfig.bgColor,
                color: roleConfig.textColor,
                fontWeight: 600,
                fontSize: "0.7rem",
                textTransform: "capitalize",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <span className="truncate max-w-[200px]">
                {user.email || "No email"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span>{user.phone || "No phone"}</span>
            </div>
            {user.program && (
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-gray-400" />
                <span className="truncate max-w-[150px]">{user.program}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>ID: {user.id}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="contained"
            startIcon={<Settings size={16} />}
            sx={{
              bgcolor: "maroon",
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              textTransform: "none",
            }}
            onClick={() => navigate(`/user-page/${user.id}`)}
          >
            Manage
          </Button>

          <IconButton
            onClick={handleDeleteUser}
            sx={{
              color: "error.main",
              "&:hover": {
                bgcolor: "error.lighter",
              },
            }}
          >
            <Trash2 size={20} />
          </IconButton>

          <IconButton
            sx={{
              color: "gray",
            }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
