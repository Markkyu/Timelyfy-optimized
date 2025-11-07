import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteUserDialog({
  open,
  onClose,
  onConfirm,
  username,
  isDeletingUser,
}) {
  const [confirmationText, setConfirmationText] = useState("");

  const handleChange = (e) => setConfirmationText(e.target.value);

  const isConfirmed =
    confirmationText.trim().toLowerCase() === "delete this account";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="error" sx={{ fontWeight: 600 }}>
        Confirm Account Deletion
      </DialogTitle>
      <DialogContent>
        <p className="text-gray-700">
          Are you sure you want to permanently delete{" "}
          <strong>{username}</strong>? This action cannot be undone and will
          permanently remove:
        </p>
        <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
          <li>User profile and account data</li>
          <li>All assigned college programs</li>
          <li>Role and permissions</li>
          <li>Associated records</li>
        </ul>

        <div className="mt-5">
          <p className="text-sm text-gray-600 mb-1">
            To confirm, type <strong>delete this account</strong> below:
          </p>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type 'delete this account'"
            value={confirmationText}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#7D1414" },
                "&.Mui-focused fieldset": { borderColor: "#7D1414" },
              },
            }}
          />
        </div>
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
          disabled={!isConfirmed || isDeletingUser}
          sx={{
            fontWeight: 600,
            bgcolor: "#7D1414",
            "&:disabled": {
              bgcolor: "#d3b5b5",
              color: "#fff",
            },
          }}
          startIcon={<DeleteIcon />}
        >
          {isDeletingUser ? "Deleting..." : "Delete User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
