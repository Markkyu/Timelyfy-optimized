import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// Slide Transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{title}</DialogTitle>
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
        >
          Cancel
        </Button>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          variant="contained"
          sx={{ fontWeight: 600 }}
          fullWidth
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
