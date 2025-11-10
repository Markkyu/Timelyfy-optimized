import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteUser from "@hooks/useDeleteUser";
import DeleteUserDialog from "./DeleteUserDialog";
import ToastNotification from "@components/ToastNotification";

export default function DangerZoneSection({ user, isUpdatingRole }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);

  const handleDeleteUser = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        setToastMessage("User deleted successfully!");
        setToastType("success");
        setToastTrigger((prev) => prev + 1);

        navigate("/user-page");
      },
    });
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-3 flex items-center gap-2">
          <DeleteIcon />
          Danger Zone
        </h2>
        <p className="text-gray-700 mb-4">
          Deleting this user will permanently remove all their data and cannot
          be undone. This action is irreversible.
        </p>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteDialogOpen(true)}
          disabled={isDeletingUser || isUpdatingRole}
          sx={{
            fontWeight: 600,
            borderRadius: "12px",
          }}
        >
          Delete User Account
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        username={user?.username}
        isDeletingUser={isDeletingUser}
      />

      <ToastNotification
        message={toastMessage}
        trigger={toastTrigger}
        type={toastType}
      />
    </>
  );
}
