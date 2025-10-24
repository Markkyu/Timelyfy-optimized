import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function PhaseActionButtons({
  currentPhase,
  currentStep,
  phases,
  steps,
  onNext,
  isPending,
}) {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    message: "",
  });

  const isLastPhaseInSemester = currentPhase === phases.length - 1;
  const isLastSemester = currentStep === steps.length - 1;
  const isCompletionPhase = isLastPhaseInSemester && isLastSemester;

  const handleNextClick = () => {
    if (isCompletionPhase) {
      setConfirmDialog({
        open: true,
        type: "completion",
        message:
          "All phases completed! Do you want to reset to Year 1 - Semester 1?",
      });
    } else if (isLastPhaseInSemester && !isLastSemester) {
      const currentSem = steps[currentStep].sem;
      const nextSem = steps[currentStep + 1].sem;

      if (currentSem !== nextSem) {
        const message =
          currentSem === 1
            ? "All departments completed Semester 1. Proceed to Semester 2?"
            : "All departments completed Semester 2. Proceed to next School Year?";

        setConfirmDialog({
          open: true,
          type: "semester",
          message,
        });
      } else {
        handleConfirm();
      }
    } else {
      setConfirmDialog({
        open: true,
        type: "phase",
        message: "Are you sure you want to proceed to the next phase?",
      });
    }
  };

  const handleConfirm = () => {
    onNext();
    setConfirmDialog({ open: false, type: null, message: "" });
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, type: null, message: "" });
  };

  const getButtonText = () => {
    if (isPending) return "Updating...";
    if (isCompletionPhase) return "Complete & Reset";
    if (isLastPhaseInSemester) return "Next Semester/Year";
    return "Next Phase";
  };

  const getButtonIcon = () => {
    if (isCompletionPhase) return <RotateCcw size={20} />;
    return <ArrowRight size={20} />;
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleNextClick}
          disabled={isPending}
          variant="contained"
          size="large"
          endIcon={getButtonIcon()}
          sx={{
            bgcolor: isCompletionPhase ? "#059669" : "#7f1d1d",
            fontWeight: 600,
            borderRadius: "9999px",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            "&:hover": {
              bgcolor: isCompletionPhase ? "#047857" : "#991b1b",
            },
            textTransform: "none",
          }}
        >
          {getButtonText()}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontWeight: 600,
          }}
        >
          {confirmDialog.type === "completion" ? (
            <CheckCircle className="text-green-600" size={28} />
          ) : (
            <AlertTriangle className="text-orange-600" size={28} />
          )}
          {confirmDialog.type === "completion"
            ? "Congratulations!"
            : "Confirm Phase Transition"}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={confirmDialog.type === "completion" ? "success" : "info"}
            sx={{ mb: 2 }}
          >
            {confirmDialog.message}
          </Alert>

          {confirmDialog.type === "completion" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">What will happen:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>System will reset to Year 1 - Semester 1</li>
                <li>Master Scheduler phase will be activated</li>
                <li>All progress tracking will restart</li>
              </ul>
            </div>
          )}

          {confirmDialog.type === "semester" && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This will advance all departments to the
                next academic period. Make sure all current work is completed
                before proceeding.
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{ borderRadius: "20px", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={confirmDialog.type === "completion" ? "success" : "error"}
            disabled={isPending}
            sx={{ borderRadius: "20px", fontWeight: 600 }}
          >
            {confirmDialog.type === "completion" ? "Reset System" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
