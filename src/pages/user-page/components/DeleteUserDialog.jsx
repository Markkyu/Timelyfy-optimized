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
      <DialogTitle color="error" sx={{ fontWeight: 600 }}>
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
      <DialogActions sx={{ p: 2, gap: 0.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ fontWeight: 600, color: "#7D1414", border: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isDeletingUser}
          sx={{ fontWeight: 600, bgcolor: "#7D1414" }}
          startIcon={<DeleteIcon />}
        >
          {isDeletingUser ? "Deleting..." : "Delete User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
