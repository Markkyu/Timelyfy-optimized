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

export default function DeleteConfirmDialog({
  open,
  onClose,
  title,
  desc,
  handleDelete,
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
          // fullWidth
        >
          Cancel
        </Button>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          variant="contained"
          sx={{ fontWeight: 600 }}
          // fullWidth
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
