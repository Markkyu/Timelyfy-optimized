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
  TextField,
} from "@mui/material";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

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
  const [confirmText, setConfirmText] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState("");

  const isLastPhaseInSemester = currentPhase === phases.length - 1;
  const isLastSemester = currentStep === steps.length - 1;
  const isCompletionPhase = isLastPhaseInSemester && isLastSemester;
  const isFirstPhase = currentPhase === 0;
  const isFirstSemester = currentStep === 0;
  const isAtStart = isFirstPhase && isFirstSemester;

  // Check if we're at the start of a semester (after a semester transition)
  // This prevents going back after sem 1 -> sem 2 or sem 2 -> next year transitions
  const isAtSemesterStart = isFirstPhase && !isFirstSemester;
  const currentSem = steps[currentStep]?.sem;
  const prevSem = currentStep > 0 ? steps[currentStep - 1]?.sem : null;
  const isAfterSemesterTransition = isAtSemesterStart && currentSem !== prevSem;

  // Check if this is a semester transition (sem 1 -> sem 2 or sem 2 -> sem 1)
  const isSemesterTransition = (currentSem, nextSem) => {
    return currentSem !== nextSem;
  };

  // Handle Reset All API Call
  const handleResetAll = async () => {
    setIsResetting(true);
    setResetError("");

    try {
      await API.delete(`${API_URL}/api/schedules/reset-all`);
      // After successful reset, proceed with the phase transition
      handleConfirm(confirmDialog.action);
    } catch (error) {
      setResetError("Failed to reset system data. Please try again.");
      console.error("Reset all error:", error);
    } finally {
      setIsResetting(false);
    }
  };

  // Handle Next Button Click
  const handleNextClick = () => {
    if (isCompletionPhase) {
      setConfirmDialog({
        open: true,
        type: "completion-reset",
        message:
          "All phases completed! This will perform a COMPLETE TIMETABLE RESET and reset the phase to Year 1 - Semester 1.",
        action: "next",
      });
    } else if (isLastPhaseInSemester && !isLastSemester) {
      const currentSem = steps[currentStep].sem;
      const nextSem = steps[currentStep + 1].sem;

      if (isSemesterTransition(currentSem, nextSem)) {
        const message =
          currentSem === 1
            ? "All departments completed Semester 1. This will perform a COMPLETE TIMETABLE RESET and reset all system data before proceeding to Semester 2."
            : "All departments completed Semester 2. This will perform a COMPLETE TIMETABLE RESET and reset all system data before proceeding to next School Year.";

        setConfirmDialog({
          open: true,
          type: "semester-reset",
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

      if (isSemesterTransition(currentSem, prevSem)) {
        const message =
          currentSem === 2
            ? "Go back to previous semester? This will perform a COMPLETE SCHEDULE WIPEOUT and reset all system data before returning to the last phase of Semester 1."
            : "Go back to previous school year? This will perform a COMPLETE SCHEDULE WIPEOUT and reset all system data before returning to the last phase of Semester 2.";

        setConfirmDialog({
          open: true,
          type: "semester-reset",
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
    setConfirmText("");
    setResetError("");
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, type: null, message: "", action: null });
    setConfirmText("");
    setResetError("");
  };

  const handleProceed = () => {
    if (
      confirmDialog.type === "semester-reset" ||
      confirmDialog.type === "completion-reset"
    ) {
      if (confirmText.toLowerCase() !== "proceed") {
        setResetError('Please type "proceed" to confirm');
        return;
      }
      handleResetAll();
    } else {
      handleConfirm(confirmDialog.action);
    }
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

  const isConfirmDisabled = () => {
    if (
      confirmDialog.type === "semester-reset" ||
      confirmDialog.type === "completion-reset"
    ) {
      return (
        confirmText.toLowerCase() !== "proceed" || isResetting || isPending
      );
    }
    return isPending || isResetting;
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <RenderWhenRole role={["admin", "master_scheduler"]}>
          {/* Back Button */}
          <Button
            onClick={handleBackClick}
            disabled={isPending || isAtStart || isAfterSemesterTransition}
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

      {/* Warning message when back is disabled after semester transition */}
      {isAfterSemesterTransition && (
        <div className="mt-4 flex justify-center">
          <Alert severity="info" sx={{ maxWidth: "600px" }}>
            <strong>Note:</strong> Going back is disabled after a semester
            transition. The system has performed a schedule wipeout and you
            cannot return to the previous semester.
          </Alert>
        </div>
      )}

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
          {confirmDialog.type === "completion-reset" ? (
            <AlertTriangle className="text-red-600" size={28} />
          ) : (
            <AlertTriangle className="text-orange-600" size={28} />
          )}
          {confirmDialog.type === "completion-reset"
            ? "WARNING: System Completion Reset"
            : confirmDialog.type === "semester-reset"
              ? "WARNING: Semester Transition"
              : confirmDialog.action === "back"
                ? "Confirm Go Back"
                : "Confirm Phase Transition"}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={
              confirmDialog.type === "completion-reset"
                ? "error"
                : confirmDialog.type === "semester-reset"
                  ? "error"
                  : confirmDialog.action === "back"
                    ? "warning"
                    : "info"
            }
            sx={{ mb: 2 }}
          >
            {confirmDialog.message}
          </Alert>

          {/* Completion Reset Confirmation Text Field */}
          {confirmDialog.type === "completion-reset" && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-500">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Complete System Reset
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-900">
                  <li>ALL scheduled data will be deleted</li>
                  <li>Phase will reset to Year 1 - Semester 1</li>
                  <li>Assigned teachers and room will remain the same</li>
                  <li>Master Scheduler phase will be activated</li>
                  <li>This action CANNOT be undone</li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="confirm-proceed"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Type <span className="text-red-600 font-bold">"proceed"</span>{" "}
                  to confirm this action:
                </label>
                <TextField
                  id="confirm-proceed"
                  fullWidth
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setResetError("");
                  }}
                  placeholder="Type 'proceed' to confirm"
                  variant="outlined"
                  disabled={isResetting}
                  autoFocus
                  autoComplete="off"
                  onKeyPress={(e) => {
                    if (
                      e.key === "Enter" &&
                      confirmText.toLowerCase() === "proceed"
                    ) {
                      handleProceed();
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#dc2626",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              </div>

              {resetError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {resetError}
                </Alert>
              )}
            </div>
          )}

          {/* Semester Reset Confirmation Text Field */}
          {confirmDialog.type === "semester-reset" && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-500">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Schedule Timetable Reset. Proceed with caution!
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-900">
                  <li>Only the timetable will be wiped out</li>
                  <li>Subject Courses will remain the same</li>
                  <li>ALL course assignments will remain assigned</li>
                  <li>This action CANNOT be undone</li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="confirm-proceed"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Type <span className="text-red-600 font-bold">"proceed"</span>{" "}
                  to confirm this action:
                </label>
                <TextField
                  id="confirm-proceed"
                  fullWidth
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setResetError("");
                  }}
                  placeholder="Type 'proceed' to confirm"
                  variant="outlined"
                  disabled={isResetting}
                  autoFocus
                  autoComplete="off"
                  onKeyPress={(e) => {
                    if (
                      e.key === "Enter" &&
                      confirmText.toLowerCase() === "proceed"
                    ) {
                      handleProceed();
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#dc2626",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              </div>

              {resetError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {resetError}
                </Alert>
              )}
            </div>
          )}

          {/* Regular Semester Transition Info (Forward) */}
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
            disabled={isResetting}
            sx={{ fontWeight: 600, borderColor: "#7f1d1d", color: "#7f1d1d" }}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            onClick={handleProceed}
            variant="contained"
            color={
              confirmDialog.type === "completion-reset"
                ? "error"
                : confirmDialog.type === "semester-reset"
                  ? "error"
                  : confirmDialog.action === "back"
                    ? "warning"
                    : "error"
            }
            disabled={isConfirmDisabled()}
            sx={{
              fontWeight: 600,
              bgcolor:
                confirmDialog.type === "semester-reset" ||
                confirmDialog.type === "completion-reset"
                  ? "#dc2626"
                  : "#7f1d1d",
            }}
          >
            {isResetting
              ? "Resetting System..."
              : confirmDialog.type === "completion-reset"
                ? "Complete & Reset System"
                : confirmDialog.type === "semester-reset"
                  ? "Proceed with Timetable Reset"
                  : confirmDialog.action === "back"
                    ? "Go Back"
                    : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
