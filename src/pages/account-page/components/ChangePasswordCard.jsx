import { useState } from "react";
import { Card, CardContent, Button, TextField, Alert } from "@mui/material";
import { Key, Send } from "lucide-react";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestChangePassword, changePassword } from "@api/usersAPI";
import useAuthStore from "@stores/useAuthStore";
import ToastNotification from "@components/ToastNotification";

export default function ChangePasswordCard({ changePasswordStatus, userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [toastTrigger, setToastTrigger] = useState(null);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const { refreshUser } = useAuthStore();

  const { mutate: requestChangeMutation } = useMutation({
    mutationFn: (userId) => {
      // throw new Error("error message");
      return requestChangePassword(userId);
    },

    onSuccess: (data) => {
      console.log(`Request Successful`);
      setToastMessage("Password request successful");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);
      refreshUser();
    },

    onError: (error) => {
      console.error(error.message);
      setToastMessage(error.message);
      setToastTrigger((prev) => prev + 1);
    },
  });

  const handleRequestChange = () => {
    requestChangeMutation(userId);
  };

  const handleRefresh = () => {
    try {
      refreshUser();
    } catch (error) {
      setToastType("error");
      setToastMessage("Error");
      setToastTrigger((prev) => prev + 1);
    }
  };

  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: (newPassword) => {
      // throw new Error("error message");
      return changePassword(newPassword);
    },

    onSuccess: (data) => {
      console.log(`Successfully changed password`);
      setToastMessage("Password Change Successful");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);
      refreshUser();
    },

    onError: (error) => {
      console.error(error.message);
      setToastType("error");
      setToastMessage(error.message);
      setToastTrigger((prev) => prev + 1);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword != confirmPassword) {
      setToastType("error");
      setToastMessage("Confirm password must match the new password!");
      setToastTrigger((prev) => prev + 1);
    }

    // console.log(newPassword, confirmPassword);
    if (newPassword === confirmPassword) {
      changePasswordMutation(newPassword);
    }
  };

  return (
    <Card className="shadow-lg">
      <ToastNotification
        message={toastMessage}
        type={toastType}
        trigger={toastTrigger}
      />
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Key className="text-blue-700" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
            <p className="text-sm text-gray-600">
              Update your account password
            </p>
          </div>
        </div>

        {changePasswordStatus === "no" && (
          <>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                Keep your account secure by regularly updating your password.
                Choose a strong password that you haven't used elsewhere.
              </p>
              <Button
                variant="contained"
                endIcon={<LockIcon />}
                onClick={handleRequestChange}
                sx={{
                  bgcolor: "#2563eb",
                  fontWeight: 600,
                  borderRadius: "12px",
                }}
              >
                Request Password Change
              </Button>
            </div>
          </>
        )}

        {changePasswordStatus === "pending" && (
          <>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                Keep your account secure by regularly updating your password.
                Choose a strong password that you haven't used elsewhere.
              </p>
              <p className="text-gray-700 font-semibold mb-4">
                Password request pending...
              </p>
              <Button
                variant="contained"
                onClick={handleRefresh}
                sx={{
                  bgcolor: "#2563eb",
                  fontWeight: 600,
                  borderRadius: "20px",
                }}
              >
                Refresh Form
              </Button>
            </div>
          </>
        )}

        {changePasswordStatus === "approved" && (
          <>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <div className="flex gap-6">
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  helperText="Must be at least 8 characters"
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    borderColor: "#6b7280",
                    color: "#6b7280",
                    fontWeight: 600,
                    borderRadius: "12px",
                    paddingY: "6px",
                  }}
                  onClick={() => {
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Clear Form
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send />}
                  sx={{
                    bgcolor: "#2563eb",
                    fontWeight: 600,
                    borderRadius: "12px",
                    paddingY: "6px",
                  }}
                  onClick={handleSubmit}
                >
                  Change Password
                </Button>
              </div>
            </form>
          </>
        )}

        {/* {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess(false)}
          >
            Password changed successfully!
          </Alert>
        )}
        */}
      </CardContent>
    </Card>
  );
}
