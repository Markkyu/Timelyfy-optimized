import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteUserDialog({
  open,
  onClose,
  onConfirm,
  username,
  isDeletingUser,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "error.main", fontWeight: 600 }}>
        Confirm Account Deletion
      </DialogTitle>
      <DialogContent>
        <p className="text-gray-700">
          Are you sure you want to delete <strong>{username}</strong>? This
          action cannot be undone and will permanently remove:
        </p>
        <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
          <li>User profile and account data</li>
          <li>All assigned college programs</li>
          <li>Role and permissions</li>
          <li>Associated records</li>
        </ul>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: "20px", fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeletingUser}
          sx={{ borderRadius: "20px", fontWeight: 600 }}
          startIcon={<DeleteIcon />}
        >
          {isDeletingUser ? "Deleting..." : "Delete User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
