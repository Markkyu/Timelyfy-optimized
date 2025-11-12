import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  TextField,
} from "@mui/material";
import { Trash2, AlertTriangle } from "lucide-react";
import useAuthStore from "@stores/useAuthStore";

export default function DeleteAccountCard() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const { user, logout } = useAuthStore();

  const handleRequestDelete = () => {
    setDeleteDialogOpen(true);
    setConfirmText("");
    setError("");
  };

  const handleConfirmDelete = async () => {
    if (confirmText !== "DELETE MY ACCOUNT") {
      setError('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      // TODO: Implement actual API call
      // const response = await axios.delete(`/api/users/${user.id}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log out user after successful deletion
      logout();

      // Redirect to login or home page
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setDeleteDialogOpen(false);
    setConfirmText("");
    setError("");
  };

  return (
    <>
      <Card className="shadow-lg border-2 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Trash2 className="text-red-700" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-800">Danger Zone</h2>
              <p className="text-sm text-gray-600">
                Permanently delete your account
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-red-600 mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">
                  Warning: This action cannot be undone
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Deleting your account will permanently remove:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Your profile and personal information</li>
                  <li>All assigned schedules and courses</li>
                  <li>Your role and permissions</li>
                  <li>All associated data</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            variant="contained"
            color="error"
            startIcon={<Trash2 />}
            onClick={handleRequestDelete}
            sx={{
              fontWeight: 600,
              borderRadius: "20px",
              "&:hover": {
                bgcolor: "#b91c1c",
              },
            }}
          >
            Request Account Deletion
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            color: "error.main",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AlertTriangle size={28} />
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 3 }}>
            This action is permanent and cannot be undone!
          </Alert>

          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              You are about to permanently delete your account:{" "}
              <strong>{user?.username}</strong>
            </p>
            <p className="text-gray-700 mb-4">
              This will remove all your data from the system. If you're sure you
              want to proceed, type{" "}
              <span className="font-bold text-red-600">DELETE MY ACCOUNT</span>{" "}
              below:
            </p>

            <TextField
              fullWidth
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE MY ACCOUNT"
              disabled={isDeleting}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">
              Before you delete:
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Download any data you want to keep</li>
              <li>Transfer ownership of any shared content</li>
              <li>Inform relevant team members</li>
              <li>Cancel any active subscriptions</li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            disabled={isDeleting}
            sx={{ borderRadius: "20px", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting || confirmText !== "DELETE MY ACCOUNT"}
            startIcon={<Trash2 />}
            sx={{ borderRadius: "20px", fontWeight: 600 }}
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
