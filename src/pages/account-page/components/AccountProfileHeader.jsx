import { Avatar, Chip } from "@mui/material";

const ROLE_DESCRIPTIONS = {
  user: "Basic user with assigned program to schedule to",
  super_user: "Enhanced user with access to all programs",
  master_scheduler:
    "Advanced user with access to all programs and other capabilities",
  admin: "System administrator with full access",
};

export default function AccountProfileHeader({ user }) {
  return (
    <div className="flex items-start gap-4">
      <Avatar
        sx={{
          width: 100,
          height: 100,
          backgroundImage: "linear-gradient(to bottom right, red, maroon)",
          fontSize: "2.5rem",
          fontWeight: 600,
        }}
      >
        {user?.username?.charAt(0).toUpperCase()}
      </Avatar>

      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {user?.username}
        </h1>
        <p className="text-gray-600 text-lg mb-3">{user?.email || "No email provided"}</p>
        <div className="flex items-center capitalize gap-2">
          <Chip
            label={user?.role?.replace("_", " ")}
            color="error"
            variant="outlined"
            sx={{ fontWeight: 600, fontSize: "0.9rem" }}
          />
          <span className="text-sm text-gray-500 normal-case">
            {ROLE_DESCRIPTIONS[user?.role] || "User account"}
          </span>
        </div>
      </div>
    </div>
  );
}
