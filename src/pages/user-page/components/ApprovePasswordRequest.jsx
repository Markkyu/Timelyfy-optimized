import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, Button, Alert } from "@mui/material";
import { Check, ShieldAlert } from "lucide-react";
import ToastNotification from "@components/ToastNotification";
import { approvePasswordRequest } from "@api/usersAPI"; // <-- you must create/import this
import useAuthStore from "@stores/useAuthStore";

export default function ApprovePasswordRequest({
  userId,
  passwordRequestStatus,
}) {
  const { refreshUser } = useAuthStore();

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [toastTrigger, setToastTrigger] = useState(0);

  const { mutate: approveMutation, isPending } = useMutation({
    mutationFn: () => approvePasswordRequest(userId),

    onSuccess: () => {
      refreshUser(); // should automatically refresh the user

      setToastMessage("Password request approved");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);

      setCanApprove(false);
    },

    onError: (err) => {
      setToastMessage(err.message);
      setToastType("error");
      setToastTrigger((prev) => prev + 1);
    },
  });

  const statusText = {
    pending: "User has requested permission to change their password.",
    approved: "Password change request approved.",
    no: "No password change request at this time.",
  };

  const canApproveToState = passwordRequestStatus === "pending";

  const [canApprove, setCanApprove] = useState(canApproveToState);

  return (
    <Card className="shadow-md mt-6 border-t border-gray-300">
      <ToastNotification
        message={toastMessage}
        type={toastType}
        trigger={toastTrigger}
      />

      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <ShieldAlert className="text-blue-700" size={28} />
          <h3 className="text-lg font-bold text-gray-800">
            Password Change Request
          </h3>
        </div>

        <Alert severity={canApprove ? "info" : "success"} sx={{ mb: 2 }}>
          {statusText[passwordRequestStatus] || "No request data"}
        </Alert>

        <Button
          variant="contained"
          startIcon={<Check />}
          disabled={!canApprove || isPending}
          onClick={() => approveMutation()}
          sx={{
            bgcolor: canApprove ? "#2563eb" : "#9ca3af",
            fontWeight: 600,
            borderRadius: "10px",
            px: 3,
            py: 1.2,
            textTransform: "none",
          }}
        >
          {canApprove
            ? isPending
              ? "Approving..."
              : "Approve Request"
            : "No Action Needed"}
        </Button>
      </CardContent>
    </Card>
  );
}
