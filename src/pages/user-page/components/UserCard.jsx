import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
// import useDeleteUser from "@hooks/useDeleteUser";
import SettingsIcon from "@mui/icons-material/Settings";

export default function UserCard({ user }) {
  const userRole = user.role;

  return (
    <div className="bg-white shadow-md rounded-xl border p-6 flex items-center justify-between hover:border-red-700 transition">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {user.username}
        </h3>
        <Chip
          className="capitalize"
          label={user.role.replace("_", " ") || "No Role Assigned"}
          size="small"
          color={roleColor(userRole)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          component={Link}
          to={`/user-page/${user.id}`}
          variant="contained"
          sx={{
            borderRadius: "40px",
            fontWeight: "bold",
            backgroundColor: "maroon",
          }}
          endIcon={<SettingsIcon />}
        >
          Manage
        </Button>
      </div>
    </div>
  );
}

const roleColor = (role) => {
  if (role === "admin") return "success";
  if (role === "master_scheduler") return "secondary";
  if (role === "super_user") return "warning";
  if (role === "user") return "inherit";
};
