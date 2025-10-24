import { useState } from "react";
import { Card, CardContent, Button, TextField, Alert } from "@mui/material";
import { Key, Send, Lock } from "lucide-react";

export default function ChangePasswordCard() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRequestChange = () => {
    setShowForm(true);
    setSuccess(false);
    setError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsRequesting(true);

    try {
      // TODO: Implement actual API call
      // const response = await axios.post('/api/change-password', {
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setShowForm(false);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Key className="text-blue-700" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Change Password
            </h2>
            <p className="text-sm text-gray-600">
              Update your account password
            </p>
          </div>
        </div>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
            Password changed successfully!
          </Alert>
        )}

        {!showForm ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-gray-700 mb-4">
              Keep your account secure by regularly updating your password.
              Choose a strong password that you haven't used elsewhere.
            </p>
            <Button
              variant="contained"
              startIcon={<Lock />}
              onClick={handleRequestChange}
              sx={{
                bgcolor: "#2563eb",
                fontWeight: 600,
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                },
              }}
            >
              Request Password Change
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <div className="space-y-4">
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                required
                disabled={isRequesting}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
                disabled={isRequesting}
                helperText="Must be at least 6 characters"
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                disabled={isRequesting}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="submit"
                variant="contained"
                disabled={isRequesting}
                startIcon={<Send />}
                sx={{
                  bgcolor: "#2563eb",
                  fontWeight: 600,
                  borderRadius: "20px",
                  flex: 1,
                  "&:hover": {
                    bgcolor: "#1d4ed8",
                  },
                }}
              >
                {isRequesting ? "Changing..." : "Change Password"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                disabled={isRequesting}
                sx={{
                  borderColor: "#6b7280",
                  color: "#6b7280",
                  fontWeight: 600,
                  borderRadius: "20px",
                  flex: 1,
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
