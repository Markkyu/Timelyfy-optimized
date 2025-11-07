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
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function DeleteConfirmDialog({
  open,
  onClose,
  title,
  desc,
  onConfirm,
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
          disableElevation
        >
          Cancel
        </Button>
        <Button
          startIcon={<FileUploadIcon />}
          color="success"
          onClick={onConfirm}
          variant="contained"
          sx={{ fontWeight: 600 }}
          disableElevation
        >
          Plot Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
