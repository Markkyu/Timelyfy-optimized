import { Avatar, Chip } from "@mui/material";

const role_descriptions = {
  user: "Basic user with assigned program to schedule to",
  super_user: "Enhanced user with access to all programs",
  master_scheduler:
    "Advanced user with access to all programs and other capabilities",
};

export default function UserProfileHeader({ user }) {
  return (
    <div className="flex items-start gap-4">
      <Avatar
        sx={{
          width: 80,
          height: 80,
          backgroundImage: "linear-gradient(to bottom right, red, maroon)",
          fontSize: "2rem",
          fontWeight: 600,
        }}
      >
        {user?.username?.charAt(0).toUpperCase()}
      </Avatar>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {user?.username}
        </h1>
        <p className="text-gray-600 mb-3">{user?.email}</p>
        <div className="flex items-center capitalize gap-2">
          <Chip
            label={user?.role?.replace("_", " ")}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <span className="text-sm text-gray-500 normal-case">
            {role_descriptions[user?.role]}
          </span>
        </div>
      </div>
    </div>
  );
}
