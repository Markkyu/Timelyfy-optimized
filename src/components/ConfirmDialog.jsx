import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "proceed",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  severity = "warning",
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === confirmText.toLowerCase()) {
      onConfirm();
      handleClose();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setInputValue("");
    setError(false);
    onClose();
  };

  const isValid = inputValue.toLowerCase() === confirmText.toLowerCase();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-2xl",
      }}
    >
      <DialogTitle className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <AlertTriangle
            className={`${severity === "warning" ? "text-red-600" : "text-blue-500"}`}
            size={24}
          />
        </div>
        <span className="text-xl font-bold text-gray-900">{title}</span>
      </DialogTitle>

      <DialogContent className="pt-6 space-y-4">
        {/* <p className="text-gray-700">{message}</p> */}
        <p className="text-gray-700">Holabels</p>

        {severity === "warning" ? (
          <Alert severity="warning" className="mt-4">
            <strong>This action cannot be undone.</strong> Please type{" "}
            <code className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono text-sm">
              {confirmText}
            </code>{" "}
            to confirm.
          </Alert>
        ) : (
          <Alert severity="info" className="mt-4">
            Please type{" "}
            <code className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-sm">
              {confirmText}
            </code>{" "}
            to confirm.
          </Alert>
        )}

        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder={`Type "${confirmText}" to confirm`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
          error={error}
          helperText={error ? "Text does not match. Please try again." : ""}
          autoFocus
          onKeyPress={(e) => {
            if (e.key === "Enter" && isValid) {
              handleConfirm();
            }
          }}
        />
      </DialogContent>

      <DialogActions className="border-t border-gray-200 px-6 py-4">
        <Button onClick={handleClose} variant="outlined" color="inherit">
          {cancelButtonText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={!isValid}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
