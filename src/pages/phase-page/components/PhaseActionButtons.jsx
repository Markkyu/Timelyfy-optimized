import { useState } from "react";
import RenderWhenRole from "@components/RenderWhenRole";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grow,
} from "@mui/material";
import {
  ArrowRight,
  ArrowLeft,
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
  onBack,
  isPending,
}) {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    message: "",
    action: null,
  });

  const isLastPhaseInSemester = currentPhase === phases.length - 1;
  const isLastSemester = currentStep === steps.length - 1;
  const isCompletionPhase = isLastPhaseInSemester && isLastSemester;
  const isFirstPhase = currentPhase === 0;
  const isFirstSemester = currentStep === 0;
  const isAtStart = isFirstPhase && isFirstSemester;

  // Handle Next Button Click
  const handleNextClick = () => {
    if (isCompletionPhase) {
      setConfirmDialog({
        open: true,
        type: "completion",
        message:
          "All phases completed! Do you want to reset to Year 1 - Semester 1?",
        action: "next",
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
          action: "next",
        });
      } else {
        handleConfirm("next");
      }
    } else {
      setConfirmDialog({
        open: true,
        type: "phase",
        message: "Are you sure you want to proceed to the next phase?",
        action: "next",
      });
    }
  };

  // Handle Back Button Click
  const handleBackClick = () => {
    if (isFirstPhase && !isFirstSemester) {
      const currentSem = steps[currentStep].sem;
      const prevSem = steps[currentStep - 1].sem;

      if (currentSem !== prevSem) {
        const message =
          currentSem === 2
            ? "Go back to previous semester? This will return to the last phase of Semester 1."
            : "Go back to previous school year? This will return to the last phase of Semester 2.";

        setConfirmDialog({
          open: true,
          type: "semester-back",
          message,
          action: "back",
        });
      } else {
        handleConfirm("back");
      }
    } else {
      setConfirmDialog({
        open: true,
        type: "phase-back",
        message: "Are you sure you want to go back to the previous phase?",
        action: "back",
      });
    }
  };

  const handleConfirm = (action) => {
    if (action === "next") {
      onNext();
    } else if (action === "back") {
      onBack();
    }
    setConfirmDialog({ open: false, type: null, message: "", action: null });
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, type: null, message: "", action: null });
  };

  const getNextButtonText = () => {
    if (isPending) return "Updating...";
    if (isCompletionPhase) return "Complete & Reset";
    if (isLastPhaseInSemester) return "Next Semester/Year";
    return "Next Phase";
  };

  const getNextButtonIcon = () => {
    if (isCompletionPhase) return <RotateCcw size={20} />;
    return <ArrowRight size={20} />;
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <RenderWhenRole role={["admin", "master_scheduler"]}>
          {/* Back Button */}
          <Button
            onClick={handleBackClick}
            disabled={isPending || isAtStart}
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            sx={{
              borderColor: "#7f1d1d",
              color: "#7f1d1d",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              borderRadius: "12px",
            }}
          >
            Go Back
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleNextClick}
            disabled={isPending}
            variant="contained"
            endIcon={getNextButtonIcon()}
            sx={{
              bgcolor: isCompletionPhase ? "#059669" : "#7f1d1d",
              borderRadius: "12px",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
            }}
          >
            {getNextButtonText()}
          </Button>
        </RenderWhenRole>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        TransitionComponent={Grow}
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
            : confirmDialog.action === "back"
              ? "Confirm Go Back"
              : "Confirm Phase Transition"}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={
              confirmDialog.type === "completion"
                ? "success"
                : confirmDialog.action === "back"
                  ? "warning"
                  : "info"
            }
            sx={{ mb: 2 }}
          >
            {confirmDialog.message}
          </Alert>

          {/* Completion Info */}
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

          {/* Semester Transition Info (Forward) */}
          {confirmDialog.type === "semester" &&
            confirmDialog.action === "next" && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This will advance all departments
                  to the next academic period. Make sure all current work is
                  completed before proceeding.
                </p>
              </div>
            )}

          {/* Semester Transition Info (Backward) */}
          {confirmDialog.type === "semester-back" && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm text-gray-700">
                <strong>Warning:</strong> Going back to a previous semester will
                reverse progress. This action should only be done if there was
                an error in the phase transition.
              </p>
            </div>
          )}

          {/* Phase Back Info */}
          {confirmDialog.type === "phase-back" && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This will return to the previous phase.
                Make sure this is intentional as it may affect ongoing work.
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 0.4 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            disableElevation
            sx={{ fontWeight: 600, borderColor: "#7f1d1d", color: "#7f1d1d" }}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            onClick={() => handleConfirm(confirmDialog.action)}
            variant="contained"
            color={
              confirmDialog.type === "completion"
                ? "success"
                : confirmDialog.action === "back"
                  ? "warning"
                  : "error"
            }
            disabled={isPending}
            sx={{
              fontWeight: 600,
              borderColor: "#7f1d1d",
              bgcolor: "#7f1d1d",
              color: "white",
            }}
          >
            {confirmDialog.type === "completion"
              ? "Reset System"
              : confirmDialog.action === "back"
                ? "Go Back"
                : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
