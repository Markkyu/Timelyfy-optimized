// import { useState } from "react";
// import RenderWhenRole from "@components/RenderWhenRole";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Grow,
// } from "@mui/material";
// import {
//   ArrowRight,
//   ArrowLeft,
//   RotateCcw,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";

// export default function PhaseActionButtons({
//   currentPhase,
//   currentStep,
//   phases,
//   steps,
//   onNext,
//   onBack,
//   isPending,
// }) {
//   const [confirmDialog, setConfirmDialog] = useState({
//     open: false,
//     type: null,
//     message: "",
//     action: null,
//   });

//   const isLastPhaseInSemester = currentPhase === phases.length - 1;
//   const isLastSemester = currentStep === steps.length - 1;
//   const isCompletionPhase = isLastPhaseInSemester && isLastSemester;
//   const isFirstPhase = currentPhase === 0;
//   const isFirstSemester = currentStep === 0;
//   const isAtStart = isFirstPhase && isFirstSemester;

//   // Handle Next Button Click
//   const handleNextClick = () => {
//     if (isCompletionPhase) {
//       setConfirmDialog({
//         open: true,
//         type: "completion",
//         message:
//           "All phases completed! Do you want to reset to Year 1 - Semester 1?",
//         action: "next",
//       });
//     } else if (isLastPhaseInSemester && !isLastSemester) {
//       const currentSem = steps[currentStep].sem;
//       const nextSem = steps[currentStep + 1].sem;

//       if (currentSem !== nextSem) {
//         const message =
//           currentSem === 1
//             ? "All departments completed Semester 1. Proceed to Semester 2?"
//             : "All departments completed Semester 2. Proceed to next School Year?";

//         setConfirmDialog({
//           open: true,
//           type: "semester",
//           message,
//           action: "next",
//         });
//       } else {
//         handleConfirm("next");
//       }
//     } else {
//       setConfirmDialog({
//         open: true,
//         type: "phase",
//         message: "Are you sure you want to proceed to the next phase?",
//         action: "next",
//       });
//     }
//   };

//   // Handle Back Button Click
//   const handleBackClick = () => {
//     if (isFirstPhase && !isFirstSemester) {
//       const currentSem = steps[currentStep].sem;
//       const prevSem = steps[currentStep - 1].sem;

//       if (currentSem !== prevSem) {
//         const message =
//           currentSem === 2
//             ? "Go back to previous semester? This will return to the last phase of Semester 1."
//             : "Go back to previous school year? This will return to the last phase of Semester 2.";

//         setConfirmDialog({
//           open: true,
//           type: "semester-back",
//           message,
//           action: "back",
//         });
//       } else {
//         handleConfirm("back");
//       }
//     } else {
//       setConfirmDialog({
//         open: true,
//         type: "phase-back",
//         message: "Are you sure you want to go back to the previous phase?",
//         action: "back",
//       });
//     }
//   };

//   const handleConfirm = (action) => {
//     if (action === "next") {
//       onNext();
//     } else if (action === "back") {
//       onBack();
//     }
//     setConfirmDialog({ open: false, type: null, message: "", action: null });
//   };

//   const handleCancel = () => {
//     setConfirmDialog({ open: false, type: null, message: "", action: null });
//   };

//   const getNextButtonText = () => {
//     if (isPending) return "Updating...";
//     if (isCompletionPhase) return "Complete & Reset";
//     if (isLastPhaseInSemester) return "Next Semester/Year";
//     return "Next Phase";
//   };

//   const getNextButtonIcon = () => {
//     if (isCompletionPhase) return <RotateCcw size={20} />;
//     return <ArrowRight size={20} />;
//   };

//   return (
//     <>
//       <div className="flex justify-center gap-4">
//         <RenderWhenRole role={["admin", "master_scheduler"]}>
//           {/* Back Button */}
//           <Button
//             onClick={handleBackClick}
//             disabled={isPending || isAtStart}
//             variant="outlined"
//             startIcon={<ArrowLeft size={20} />}
//             sx={{
//               borderColor: "#7f1d1d",
//               color: "#7f1d1d",
//               fontWeight: 600,
//               px: 4,
//               py: 1.5,
//               fontSize: "1.1rem",
//               textTransform: "none",
//               borderRadius: "12px",
//             }}
//           >
//             Go Back
//           </Button>

//           {/* Next Button */}
//           <Button
//             onClick={handleNextClick}
//             disabled={isPending}
//             variant="contained"
//             endIcon={getNextButtonIcon()}
//             sx={{
//               bgcolor: isCompletionPhase ? "#059669" : "#7f1d1d",
//               borderRadius: "12px",
//               fontWeight: 600,
//               px: 4,
//               py: 1.5,
//               fontSize: "1.1rem",
//               textTransform: "none",
//             }}
//           >
//             {getNextButtonText()}
//           </Button>
//         </RenderWhenRole>
//       </div>

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={confirmDialog.open}
//         TransitionComponent={Grow}
//         onClose={handleCancel}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             fontWeight: 600,
//           }}
//         >
//           {confirmDialog.type === "completion" ? (
//             <CheckCircle className="text-green-600" size={28} />
//           ) : (
//             <AlertTriangle className="text-orange-600" size={28} />
//           )}
//           {confirmDialog.type === "completion"
//             ? "Congratulations!"
//             : confirmDialog.action === "back"
//               ? "Confirm Go Back"
//               : "Confirm Phase Transition"}
//         </DialogTitle>
//         <DialogContent>
//           <Alert
//             severity={
//               confirmDialog.type === "completion"
//                 ? "success"
//                 : confirmDialog.action === "back"
//                   ? "warning"
//                   : "info"
//             }
//             sx={{ mb: 2 }}
//           >
//             {confirmDialog.message}
//           </Alert>

//           {/* Completion Info */}
//           {confirmDialog.type === "completion" && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//               <h4 className="font-semibold mb-2">What will happen:</h4>
//               <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
//                 <li>System will reset to Year 1 - Semester 1</li>
//                 <li>Master Scheduler phase will be activated</li>
//                 <li>All progress tracking will restart</li>
//               </ul>
//             </div>
//           )}

//           {/* Semester Transition Info (Forward) */}
//           {confirmDialog.type === "semester" &&
//             confirmDialog.action === "next" && (
//               <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
//                 <p className="text-sm text-gray-700">
//                   <strong>Important:</strong> This will advance all departments
//                   to the next academic period. Make sure all current work is
//                   completed before proceeding.
//                 </p>
//               </div>
//             )}

//           {/* Semester Transition Info (Backward) */}
//           {confirmDialog.type === "semester-back" && (
//             <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
//               <p className="text-sm text-gray-700">
//                 <strong>Warning:</strong> Going back to a previous semester will
//                 reverse progress. This action should only be done if there was
//                 an error in the phase transition.
//               </p>
//             </div>
//           )}

//           {/* Phase Back Info */}
//           {confirmDialog.type === "phase-back" && (
//             <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//               <p className="text-sm text-gray-700">
//                 <strong>Note:</strong> This will return to the previous phase.
//                 Make sure this is intentional as it may affect ongoing work.
//               </p>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, gap: 0.4 }}>
//           <Button
//             onClick={handleCancel}
//             variant="outlined"
//             disableElevation
//             sx={{ fontWeight: 600, borderColor: "#7f1d1d", color: "#7f1d1d" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             disableElevation
//             onClick={() => handleConfirm(confirmDialog.action)}
//             variant="contained"
//             color={
//               confirmDialog.type === "completion"
//                 ? "success"
//                 : confirmDialog.action === "back"
//                   ? "warning"
//                   : "error"
//             }
//             disabled={isPending}
//             sx={{
//               fontWeight: 600,
//               borderColor: "#7f1d1d",
//               bgcolor: "#7f1d1d",
//               color: "white",
//             }}
//           >
//             {confirmDialog.type === "completion"
//               ? "Reset System"
//               : confirmDialog.action === "back"
//                 ? "Go Back"
//                 : "Confirm"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
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

  // Check if this is a semester transition (sem 1 -> sem 2 or sem 2 -> sem 1)
  const isSemesterTransition = (currentSem, nextSem) => {
    return currentSem !== nextSem;
  };

  // Handle Reset All API Call
  const handleResetAll = async () => {
    setIsResetting(true);
    setResetError("");

    try {
      await axios.delete(`${API_URL}/api/schedules/reset-all`);
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
        type: "completion",
        message:
          "All phases completed! Do you want to reset to Year 1 - Semester 1?",
        action: "next",
      });
    } else if (isLastPhaseInSemester && !isLastSemester) {
      const currentSem = steps[currentStep].sem;
      const nextSem = steps[currentStep + 1].sem;

      if (isSemesterTransition(currentSem, nextSem)) {
        const message =
          currentSem === 1
            ? "All departments completed Semester 1. This will perform a COMPLETE SCHEDULE WIPEOUT and reset all system data before proceeding to Semester 2."
            : "All departments completed Semester 2. This will perform a COMPLETE SCHEDULE WIPEOUT and reset all system data before proceeding to next School Year.";

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
    if (confirmDialog.type === "semester-reset") {
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
    if (confirmDialog.type === "semester-reset") {
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
            : confirmDialog.type === "semester-reset"
              ? "⚠️ CRITICAL: Semester Transition"
              : confirmDialog.action === "back"
                ? "Confirm Go Back"
                : "Confirm Phase Transition"}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={
              confirmDialog.type === "completion"
                ? "success"
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

          {/* Semester Reset Confirmation Text Field */}
          {confirmDialog.type === "semester-reset" && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-500">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  DANGER: Schedule Wipeout
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-900">
                  <li>ALL schedule data will be permanently deleted</li>
                  <li>ALL department schedules will be reset</li>
                  <li>ALL course assignments will be cleared</li>
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
              confirmDialog.type === "completion"
                ? "success"
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
                confirmDialog.type === "semester-reset" ? "#dc2626" : "#7f1d1d",
            }}
          >
            {isResetting
              ? "Resetting System..."
              : confirmDialog.type === "completion"
                ? "Reset System"
                : confirmDialog.type === "semester-reset"
                  ? "Proceed with Wipeout"
                  : confirmDialog.action === "back"
                    ? "Go Back"
                    : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
