import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteUser from "@hooks/useDeleteUser";

export default function UserCard({ user }) {
  const { mutate: deleteUser, isPending: deleteUserLoading } = useDeleteUser();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      deleteUser(user.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl border p-6 flex items-center justify-between hover:border-red-500 transition">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {user.username}
        </h3>
        <p>
          <span className="px-1 border rounded-full text-gray-500">
            {user.role || "No Role Assigned"}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
          onClick={handleDelete}
          loading={deleteUserLoading}
          loadingPosition="end"
        >
          Delete User
        </Button>
      </div>
    </div>
  );
}
