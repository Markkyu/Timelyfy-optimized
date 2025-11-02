import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmDialog({
  open,
  onClose,
  title,
  desc,
  handleConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Grow}
      keepMounted
    >
      <DialogTitle fontWeight={600}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{desc}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          variant="contained"
          color="inherit"
          onClick={onClose}
          sx={{ fontWeight: 600 }}
          fullWidth
          disableElevation
        >
          Cancel
        </Button>
        <Button
          endIcon={<CheckIcon />}
          color="success"
          onClick={handleConfirm}
          variant="contained"
          sx={{ fontWeight: 600 }}
          fullWidth
          disableElevation
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
